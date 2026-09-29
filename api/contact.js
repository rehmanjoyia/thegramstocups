import nodemailer from 'nodemailer';

/**
 * Vercel Serverless Function: /api/contact
 * Handles contact form submissions with server-side validation,
 * sanitization, honeypot spam protection, and transactional email dispatch.
 */

// Helper to escape HTML characters in email templates
function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// In-memory rate limiting by IP (per serverless lambda instance)
const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW_MS = 5 * 60 * 1000; // 5 minutes
const MAX_REQUESTS_PER_WINDOW = 5;

export default async function handler(req, res) {
  // Only accept POST requests
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  // Basic IP rate limiting
  const clientIp = req.headers['x-forwarded-for'] || req.socket?.remoteAddress || 'unknown';
  const now = Date.now();
  const clientTimestamps = rateLimitMap.get(clientIp) || [];
  const recentTimestamps = clientTimestamps.filter(t => now - t < RATE_LIMIT_WINDOW_MS);

  if (recentTimestamps.length >= MAX_REQUESTS_PER_WINDOW) {
    return res.status(429).json({
      error: 'Too Many Requests',
      message: 'You’ve sent several messages recently. Please wait a few minutes and try again, or email support@thegramstocups.com.'
    });
  }

  recentTimestamps.push(now);
  rateLimitMap.set(clientIp, recentTimestamps);

  // Parse body safely
  const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});
  const { name, email, topic, pageUrl, message, website_hp } = body;

  // Bot Honeypot: silently accept without sending if filled
  if (website_hp && String(website_hp).trim().length > 0) {
    return res.status(200).json({ ok: true });
  }

  // Server-side validation
  const errors = {};

  // 1. Name: optional, max 100
  const cleanName = (typeof name === 'string' ? name.trim() : '');
  if (cleanName.length > 100) {
    errors.name = 'Keep your name to 100 characters or fewer.';
  }

  // 2. Email: required, max 254, valid format
  const cleanEmail = (typeof email === 'string' ? email.trim() : '');
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

  // 3. Topic: required, must match allowed set
  const validTopics = [
    'Conversion question',
    'Report an error',
    'Ingredient request',
    'Other feedback'
  ];
  const cleanTopic = (typeof topic === 'string' ? topic.trim() : '');
  if (!cleanTopic || !validTopics.includes(cleanTopic)) {
    errors.topic = 'Choose a topic.';
  }

  // 4. Page URL: optional, max 2048, http/https only
  const cleanUrl = (typeof pageUrl === 'string' ? pageUrl.trim() : '');
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

  // 5. Message: required, max 5000, not whitespace only
  const cleanMessage = (typeof message === 'string' ? message.trim() : '');
  if (!cleanMessage) {
    errors.message = 'Enter your message.';
  } else if (cleanMessage.length > 5000) {
    errors.message = 'Keep your message to 5,000 characters or fewer.';
  }

  // Prevent header injection (newlines in single-line fields)
  if (/[\r\n]/.test(cleanEmail) || /[\r\n]/.test(cleanName) || /[\r\n]/.test(cleanTopic)) {
    return res.status(400).json({ error: 'Invalid input characters detected' });
  }

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ error: 'Validation failed', errors });
  }

  // Dispatch Email
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

  const htmlContent = `
<!DOCTYPE html>
<html>
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
</html>
`;

  // Delivery Provider Integration
  try {
    // 1. Resend API
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
        const errText = await resendRes.text();
        console.error('Resend delivery failure:', errText);
        return res.status(502).json({
          error: 'Delivery failed',
          message: 'We couldn’t submit your message. Your details are still here—please try again, or email support@thegramstocups.com.'
        });
      }

      return res.status(200).json({ ok: true });
    }

    // 2. Postmark API
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
        const errText = await postmarkRes.text();
        console.error('Postmark delivery failure:', errText);
        return res.status(502).json({
          error: 'Delivery failed',
          message: 'We couldn’t submit your message. Your details are still here—please try again, or email support@thegramstocups.com.'
        });
      }

      return res.status(200).json({ ok: true });
    }

    // 3. SendGrid API
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
        const errText = await sendgridRes.text();
        console.error('SendGrid delivery failure:', errText);
        return res.status(502).json({
          error: 'Delivery failed',
          message: 'We couldn’t submit your message. Your details are still here—please try again, or email support@thegramstocups.com.'
        });
      }

      return res.status(200).json({ ok: true });
    }

    // 4. Webhook / Internal Gateway
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

    // 5. Hostinger / Custom SMTP via nodemailer
    if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
      const port = parseInt(process.env.SMTP_PORT || '465', 10);
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: port,
        secure: port === 465, // true for 465, false for 587
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

    // If no provider API key is configured in production, report 503 Service Unavailable
    // as required by Section D so that the user is guided to email support directly without false success.
    console.warn('Contact API: No email provider credentials configured (SMTP_HOST/SMTP_USER/SMTP_PASS, RESEND_API_KEY, POSTMARK_SERVER_TOKEN, SENDGRID_API_KEY, or CONTACT_WEBHOOK_URL).');
    return res.status(503).json({
      error: 'Service Unavailable',
      message: 'We couldn’t submit your message. Your details are still here—please try again, or email support@thegramstocups.com.'
    });

  } catch (err) {
    console.error('Unexpected contact delivery error:', err);
    return res.status(500).json({
      error: 'Internal Server Error',
      message: 'We couldn’t submit your message. Your details are still here—please try again, or email support@thegramstocups.com.'
    });
  }
}
