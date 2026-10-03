import nodemailer from 'nodemailer';

/**
 * Vercel Serverless Function: /api/contact
 * Production-hardened contact form handler:
 * 1. Payload size controls (Content-Length < 16KB)
 * 2. Strict Content-Type enforcement (application/json)
 * 3. Safe JSON parsing with zero unhandled exception escape
 * 4. Control character stripping & XSS entity escaping
 * 5. Anti-header-injection guards (\r, \n)
 * 6. Origin / Referer validation against cross-origin spam bots
 * 7. Serverless-safe memory-bounded sliding-window rate limiting
 * 8. Honeypot + link-density spam heuristics with silent drop
 * 9. Information leakage prevention & security response headers
 * 10. Multi-provider delivery pipeline (Resend, Postmark, SendGrid, Webhook, SMTP)
 */

// Max body size in bytes (16 KB is plenty for 5,000 char message + metadata)
const MAX_PAYLOAD_BYTES = 16 * 1024;

// Rate limiting parameters (5 requests per 5 minutes per IP)
const RATE_LIMIT_WINDOW_MS = 5 * 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 5;
const MAX_RATE_LIMIT_ENTRIES = 1000; // Cap map size to prevent serverless memory bloat

// Bounded in-memory store for warm container lifecycle
const rateLimitMap = new Map();

/**
 * Clean control characters, null bytes, and directional overrides
 */
function sanitizeString(str) {
  if (typeof str !== 'string') return '';
  return str
    // Strip null bytes
    .replace(/\0/g, '')
    // Strip ASCII control chars except standard whitespace (\t, \n, \r)
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '')
    // Strip Unicode bidirectional override characters (prevents visual spoofing)
    .replace(/[\u202A-\u202E\u2066-\u2069]/g, '')
    .trim();
}

/**
 * Comprehensive HTML escaping for safe injection into email templates
 */
function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
    .replace(/\//g, '&#x2F;')
    .replace(/`/g, '&#x60;');
}

/**
 * Extract true client IP across edge proxies & headers
 */
function getClientIp(req) {
  const xRealIp = req.headers['x-real-ip'];
  if (typeof xRealIp === 'string' && xRealIp.trim()) {
    return xRealIp.trim();
  }
  const xForwardedFor = req.headers['x-forwarded-for'];
  if (typeof xForwardedFor === 'string' && xForwardedFor.trim()) {
    return xForwardedFor.split(',')[0].trim();
  }
  return req.socket?.remoteAddress || 'unknown';
}

/**
 * Sliding window rate limiting with automatic pruning to prevent memory leaks
 */
function checkRateLimit(clientIp) {
  const now = Date.now();

  // Prune map if it grows beyond threshold
  if (rateLimitMap.size > MAX_RATE_LIMIT_ENTRIES) {
    for (const [ip, timestamps] of rateLimitMap.entries()) {
      const active = timestamps.filter(t => now - t < RATE_LIMIT_WINDOW_MS);
      if (active.length === 0) {
        rateLimitMap.delete(ip);
      } else {
        rateLimitMap.set(ip, active);
      }
    }
  }

  const existing = rateLimitMap.get(clientIp) || [];
  const recent = existing.filter(t => now - t < RATE_LIMIT_WINDOW_MS);

  if (recent.length >= MAX_REQUESTS_PER_WINDOW) {
    return false;
  }

  recent.push(now);
  rateLimitMap.set(clientIp, recent);
  return true;
}

/**
 * Origin validation: prevent cross-origin automated script abuse
 */
function isAllowedOrigin(req) {
  const origin = req.headers['origin'] || req.headers['referer'];
  if (!origin) {
    // If headers are omitted (e.g. privacy proxy), don't block outright,
    // let remaining security layers evaluate.
    return true;
  }

  try {
    const parsed = new URL(origin);
    const host = parsed.hostname.toLowerCase();

    // Whitelist production domains, Vercel preview deployments, and local dev
    return (
      host === 'thegramstocups.com' ||
      host === 'www.thegramstocups.com' ||
      host.endsWith('.vercel.app') ||
      host === 'localhost' ||
      host === '127.0.0.1'
    );
  } catch {
    return false;
  }
}

export default async function handler(req, res) {
  // Apply uniform security and caching headers to all responses
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0');
  res.setHeader('Pragma', 'no-cache');

  // 1. Method verification
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({
      error: 'Method Not Allowed',
      message: 'Only POST requests are permitted.'
    });
  }

  // 2. Origin / Referer validation (Anti-CSRF & Bot Gateway)
  if (!isAllowedOrigin(req)) {
    return res.status(403).json({
      error: 'Forbidden',
      message: 'Cross-origin request blocked.'
    });
  }

  // 3. Payload size check (before body parsing)
  const contentLength = parseInt(req.headers['content-length'] || '0', 10);
  if (contentLength > MAX_PAYLOAD_BYTES) {
    return res.status(413).json({
      error: 'Payload Too Large',
      message: 'Request payload exceeds the maximum allowed limit of 16KB.'
    });
  }

  // 4. Content-Type check
  const contentType = req.headers['content-type'] || '';
  if (!contentType.toLowerCase().includes('application/json')) {
    return res.status(415).json({
      error: 'Unsupported Media Type',
      message: 'Content-Type must be application/json.'
    });
  }

  // 5. Rate limiting with bounded memory
  const clientIp = getClientIp(req);
  if (!checkRateLimit(clientIp)) {
    return res.status(429).json({
      error: 'Too Many Requests',
      message: 'You’ve sent several messages recently. Please wait a few minutes and try again, or email support@thegramstocups.com.'
    });
  }

  // 6. Safe body parsing wrapped in exception handler
  let body;
  try {
    body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});
    if (typeof body !== 'object' || body === null || Array.isArray(body)) {
      return res.status(400).json({
        error: 'Bad Request',
        message: 'Request payload must be a JSON object.'
      });
    }
  } catch {
    return res.status(400).json({
      error: 'Malformed JSON',
      message: 'Unable to parse request body as valid JSON.'
    });
  }

  const { name, email, topic, pageUrl, message, website_hp } = body;

  // 7. Bot Honeypot: silently accept without sending if filled
  if (website_hp && String(website_hp).trim().length > 0) {
    return res.status(200).json({ ok: true });
  }

  // 8. Sanitize input strings (strip control chars, null bytes, bidirectional overrides)
  const cleanName = sanitizeString(name);
  const cleanEmail = sanitizeString(email);
  const cleanTopic = sanitizeString(topic);
  const cleanUrl = sanitizeString(pageUrl);
  const cleanMessage = sanitizeString(message);

  // 9. Anti-Spam Heuristic: Hyperlink density & BBCode check in message body
  const urlMatches = cleanMessage.match(/https?:\/\/[^\s]+/gi) || [];
  const hasBbCode = /\[url[=\]]|\[link[=\]]|<a\s+href=/i.test(cleanMessage);
  if (urlMatches.length > 2 || hasBbCode) {
    // Silent drop: automated spam bot gets 200 OK without dispatching email
    return res.status(200).json({ ok: true });
  }

  // 10. Strict Server-Side Validation
  const errors = {};

  // Name: optional, max 100
  if (cleanName.length > 100) {
    errors.name = 'Keep your name to 100 characters or fewer.';
  }

  // Email: required, max 254, RFC 5322 compliant regex
  if (!cleanEmail) {
    errors.email = 'Enter your email address.';
  } else if (cleanEmail.length > 254) {
    errors.email = 'Keep your email address to 254 characters or fewer.';
  } else {
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
    if (!emailRegex.test(cleanEmail)) {
      errors.email = 'Enter a valid email address, such as name@example.com.';
    }
  }

  // Topic: required, whitelist enforcement
  const validTopics = [
    'Conversion question',
    'Report an error',
    'Ingredient request',
    'Other feedback'
  ];
  if (!cleanTopic || !validTopics.includes(cleanTopic)) {
    errors.topic = 'Choose a topic.';
  }

  // Page URL: optional, max 2048, strictly http: or https:
  if (cleanUrl) {
    if (cleanUrl.length > 2048) {
      errors.pageUrl = 'Keep the page address to 2,048 characters or fewer.';
    } else {
      try {
        const parsed = new URL(cleanUrl);
        if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
          errors.pageUrl = 'Enter a full web address starting with https:// or http://, or leave this field blank.';
        }
      } catch {
        errors.pageUrl = 'Enter a full web address starting with https:// or http://, or leave this field blank.';
      }
    }
  }

  // Message: required, max 5000, not whitespace only
  if (!cleanMessage) {
    errors.message = 'Enter your message.';
  } else if (cleanMessage.length > 5000) {
    errors.message = 'Keep your message to 5,000 characters or fewer.';
  }

  // Header injection prevention: reject CRLF in single-line headers
  if (/[\r\n]/.test(cleanEmail) || /[\r\n]/.test(cleanName) || /[\r\n]/.test(cleanTopic) || /[\r\n]/.test(cleanUrl)) {
    return res.status(400).json({
      error: 'Invalid Characters',
      message: 'Invalid newline characters detected in single-line fields.'
    });
  }

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ error: 'Validation failed', errors });
  }

  // 11. Compose Message Templates
  const destinationEmail = process.env.CONTACT_DESTINATION_EMAIL || 'support@thegramstocups.com';
  const senderEmail = process.env.CONTACT_SENDER_EMAIL || process.env.SMTP_USER || 'support@thegramstocups.com';
  const subject = `[The Grams to Cups] ${cleanTopic}: ${cleanName || 'Visitor'}`;

  const plainTextContent = `New contact inquiry received via The Grams to Cups:

Topic: ${cleanTopic}
Name: ${cleanName || 'Not provided'}
Email: ${cleanEmail}
Page URL: ${cleanUrl || 'None specified'}

Message:
${cleanMessage}
`;

  const htmlContent = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #1C1917; max-width: 600px; margin: 0 auto; padding: 20px;">
  <h2 style="color: #C2410C; border-bottom: 2px solid #E7E5E4; padding-bottom: 8px;">New Message from The Grams to Cups</h2>
  <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
    <tr><td style="padding: 6px 0; font-weight: bold; width: 100px;">Topic:</td><td>${escapeHtml(cleanTopic)}</td></tr>
    <tr><td style="padding: 6px 0; font-weight: bold;">Name:</td><td>${escapeHtml(cleanName) || '<em>Not provided</em>'}</td></tr>
    <tr><td style="padding: 6px 0; font-weight: bold;">Email:</td><td><a href="mailto:${escapeHtml(cleanEmail)}">${escapeHtml(cleanEmail)}</a></td></tr>
    ${cleanUrl ? `<tr><td style="padding: 6px 0; font-weight: bold;">Page URL:</td><td>${escapeHtml(cleanUrl)}</td></tr>` : ''}
  </table>
  <h3 style="margin-bottom: 8px;">Message:</h3>
  <div style="background-color: #FAF8F5; border: 1px solid #E7E5E4; border-radius: 6px; padding: 16px; white-space: pre-wrap;">${escapeHtml(cleanMessage)}</div>
</body>
</html>`;

  // 12. Transactional Email Dispatch Pipeline
  try {
    // A. Resend API
    if (process.env.RESEND_API_KEY) {
      const resendRes = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          from: senderEmail,
          to: [destinationEmail],
          reply_to: cleanEmail,
          subject,
          text: plainTextContent,
          html: htmlContent
        })
      });

      if (!resendRes.ok) {
        const errSnippet = (await resendRes.text()).slice(0, 200);
        console.error('Resend delivery failure:', errSnippet);
        return res.status(502).json({
          error: 'Delivery failed',
          message: 'We couldn’t submit your message. Your details are still here—please try again, or email support@thegramstocups.com.'
        });
      }

      return res.status(200).json({ ok: true });
    }

    // B. Postmark API
    if (process.env.POSTMARK_SERVER_TOKEN) {
      const postmarkRes = await fetch('https://api.postmarkapp.com/email', {
        method: 'POST',
        headers: {
          'X-Postmark-Server-Token': process.env.POSTMARK_SERVER_TOKEN,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          From: senderEmail,
          To: destinationEmail,
          ReplyTo: cleanEmail,
          Subject: subject,
          TextBody: plainTextContent,
          HtmlBody: htmlContent
        })
      });

      if (!postmarkRes.ok) {
        const errSnippet = (await postmarkRes.text()).slice(0, 200);
        console.error('Postmark delivery failure:', errSnippet);
        return res.status(502).json({
          error: 'Delivery failed',
          message: 'We couldn’t submit your message. Your details are still here—please try again, or email support@thegramstocups.com.'
        });
      }

      return res.status(200).json({ ok: true });
    }

    // C. SendGrid API
    if (process.env.SENDGRID_API_KEY) {
      const sendgridRes = await fetch('https://api.sendgrid.com/v3/mail/send', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.SENDGRID_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          personalizations: [{ to: [{ email: destinationEmail }] }],
          from: { email: senderEmail },
          reply_to: { email: cleanEmail, name: cleanName || undefined },
          subject,
          content: [
            { type: 'text/plain', value: plainTextContent },
            { type: 'text/html', value: htmlContent }
          ]
        })
      });

      if (!sendgridRes.ok) {
        const errSnippet = (await sendgridRes.text()).slice(0, 200);
        console.error('SendGrid delivery failure:', errSnippet);
        return res.status(502).json({
          error: 'Delivery failed',
          message: 'We couldn’t submit your message. Your details are still here—please try again, or email support@thegramstocups.com.'
        });
      }

      return res.status(200).json({ ok: true });
    }

    // D. Webhook Gateway
    if (process.env.CONTACT_WEBHOOK_URL) {
      const hookRes = await fetch(process.env.CONTACT_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: destinationEmail,
          replyTo: cleanEmail,
          name: cleanName,
          topic: cleanTopic,
          pageUrl: cleanUrl,
          message: cleanMessage,
          subject,
          timestamp: new Date().toISOString()
        })
      });

      if (!hookRes.ok) {
        return res.status(502).json({
          error: 'Webhook delivery failed',
          message: 'We couldn’t submit your message. Your details are still here—please try again, or email support@thegramstocups.com.'
        });
      }

      return res.status(200).json({ ok: true });
    }

    // E. Hostinger / Custom SMTP via nodemailer
    if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
      const port = parseInt(process.env.SMTP_PORT || '465', 10);
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: port,
        secure: port === 465,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS
        }
      });

      await transporter.sendMail({
        from: senderEmail,
        to: destinationEmail,
        replyTo: cleanEmail,
        subject: subject,
        text: plainTextContent,
        html: htmlContent
      });

      return res.status(200).json({ ok: true });
    }

    // If no provider credentials exist in runtime environment, return 503
    console.warn('Contact API: No transactional email provider credentials configured.');
    return res.status(503).json({
      error: 'Service Unavailable',
      message: 'We couldn’t submit your message. Your details are still here—please try again, or email support@thegramstocups.com.'
    });

  } catch (err) {
    console.error('Unexpected contact delivery error:', err?.message || 'Unknown error');
    return res.status(500).json({
      error: 'Internal Server Error',
      message: 'We couldn’t submit your message. Your details are still here—please try again, or email support@thegramstocups.com.'
    });
  }
}
