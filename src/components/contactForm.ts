/**
 * Contact Form Component
 * Strictly adheres to Contact-Content-Package specifications
 */

export function initContactForm(): void {
  const form = document.getElementById('contact-form') as HTMLFormElement | null;
  if (!form) return;

  const nameInput = document.getElementById('contact-name') as HTMLInputElement | null;
  const emailInput = document.getElementById('contact-email') as HTMLInputElement | null;
  const topicSelect = document.getElementById('contact-topic') as HTMLSelectElement | null;
  const pageUrlInput = document.getElementById('contact-page-url') as HTMLInputElement | null;
  const messageInput = document.getElementById('contact-message') as HTMLTextAreaElement | null;
  const honeypotInput = document.getElementById('contact-hp') as HTMLInputElement | null;
  const submitBtn = document.getElementById('contact-submit-btn') as HTMLButtonElement | null;
  const statusBox = document.getElementById('contact-status-box') as HTMLDivElement | null;
  const formFieldsContainer = document.getElementById('contact-fields-container') as HTMLDivElement | null;

  if (!emailInput || !topicSelect || !messageInput || !submitBtn || !statusBox) {
    return;
  }

  // Safely activate client-handled submission
  form.setAttribute('novalidate', '');
  submitBtn.removeAttribute('disabled');
  submitBtn.removeAttribute('aria-disabled');

  // Rate limiting tracker in memory (session scope)
  const SUBMISSION_TIMESTAMPS: number[] = [];
  const RATE_LIMIT_WINDOW_MS = 5 * 60 * 1000; // 5 minutes
  const MAX_SUBMISSIONS_PER_WINDOW = 3;

  // Track which fields have been validated/shown errors
  const touchedFields = new Set<string>();

  function setFieldError(fieldId: string, errorId: string, errorMessage: string | null): void {
    const errorEl = document.getElementById(errorId);
    const inputEl = document.getElementById(fieldId);
    const parentField = inputEl?.closest('.form-field');

    if (errorMessage) {
      if (errorEl) {
        errorEl.textContent = errorMessage;
        errorEl.classList.add('visible');
      }
      if (inputEl) {
        inputEl.setAttribute('aria-invalid', 'true');
      }
      parentField?.classList.add('has-error');
    } else {
      if (errorEl) {
        errorEl.textContent = '';
        errorEl.classList.remove('visible');
      }
      if (inputEl) {
        inputEl.removeAttribute('aria-invalid');
      }
      parentField?.classList.remove('has-error');
    }
  }

  function validateEmail(val: string): string | null {
    const trimmed = val.trim();
    if (!trimmed) {
      return 'Enter your email address.';
    }
    if (trimmed.length > 254) {
      return 'Keep your email address to 254 characters or fewer.';
    }
    // Standard RFC 5322 compatible email regex
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
    if (!emailRegex.test(trimmed)) {
      return 'Enter a valid email address, such as name@example.com.';
    }
    return null;
  }

  function validateName(val: string): string | null {
    if (val && val.length > 100) {
      return 'Keep your name to 100 characters or fewer.';
    }
    return null;
  }

  function validateTopic(val: string): string | null {
    const validTopics = [
      'Conversion question',
      'Report an error',
      'Ingredient request',
      'Other feedback'
    ];
    if (!val || !validTopics.includes(val)) {
      return 'Choose a topic.';
    }
    return null;
  }

  function validatePageUrl(val: string): string | null {
    const trimmed = val.trim();
    if (!trimmed) return null;

    if (trimmed.length > 2048) {
      return 'Keep the page address to 2,048 characters or fewer.';
    }

    try {
      const parsed = new URL(trimmed);
      if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
        return 'Enter a full web address starting with https:// or http://, or leave this field blank.';
      }
    } catch {
      return 'Enter a full web address starting with https:// or http://, or leave this field blank.';
    }

    return null;
  }

  function validateMessage(val: string): string | null {
    const trimmed = val.trim();
    if (!trimmed) {
      return 'Enter your message.';
    }
    if (val.length > 5000) {
      return 'Keep your message to 5,000 characters or fewer.';
    }
    return null;
  }

  // Real-time re-validation for touched fields
  nameInput?.addEventListener('input', () => {
    if (touchedFields.has('contact-name')) {
      const err = validateName(nameInput.value);
      setFieldError('contact-name', 'contact-name-error', err);
    }
  });

  emailInput.addEventListener('input', () => {
    if (touchedFields.has('contact-email')) {
      const err = validateEmail(emailInput.value);
      setFieldError('contact-email', 'contact-email-error', err);
    }
  });

  topicSelect.addEventListener('change', () => {
    if (touchedFields.has('contact-topic')) {
      const err = validateTopic(topicSelect.value);
      setFieldError('contact-topic', 'contact-topic-error', err);
    }
  });

  pageUrlInput?.addEventListener('input', () => {
    if (touchedFields.has('contact-page-url')) {
      const err = validatePageUrl(pageUrlInput.value);
      setFieldError('contact-page-url', 'contact-page-url-error', err);
    }
  });

  messageInput.addEventListener('input', () => {
    if (touchedFields.has('contact-message')) {
      const err = validateMessage(messageInput.value);
      setFieldError('contact-message', 'contact-message-error', err);
    }
  });

  function showStatus(type: 'success' | 'error' | 'rate-limit', message: string, title?: string): void {
    if (!statusBox) return;

    statusBox.className = 'contact-status-box visible';
    if (type === 'success') {
      statusBox.classList.add('status-success');
      statusBox.innerHTML = `
        <h3 class="status-success-title">${title || 'Message submitted'}</h3>
        <p>${message}</p>
        <button type="button" class="btn-send-another" id="btn-send-another">Send another message</button>
      `;
      const resetBtn = document.getElementById('btn-send-another');
      resetBtn?.addEventListener('click', () => {
        statusBox.className = 'contact-status-box';
        statusBox.innerHTML = '';
        if (formFieldsContainer) {
          formFieldsContainer.style.display = 'grid';
        }
        submitBtn!.style.display = 'inline-flex';
        form?.reset();
        touchedFields.clear();
        nameInput?.focus();
      });
    } else if (type === 'rate-limit') {
      statusBox.classList.add('status-rate-limit');
      statusBox.innerHTML = `<p>${message}</p>`;
    } else {
      statusBox.classList.add('status-error');
      statusBox.innerHTML = `<p>${message}</p>`;
    }
  }

  function clearStatus(): void {
    if (!statusBox) return;
    statusBox.className = 'contact-status-box';
    statusBox.innerHTML = '';
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    clearStatus();

    // Mark all required fields as touched
    touchedFields.add('contact-name');
    touchedFields.add('contact-email');
    touchedFields.add('contact-topic');
    touchedFields.add('contact-page-url');
    touchedFields.add('contact-message');

    const nameErr = nameInput ? validateName(nameInput.value) : null;
    const emailErr = validateEmail(emailInput.value);
    const topicErr = validateTopic(topicSelect.value);
    const urlErr = pageUrlInput ? validatePageUrl(pageUrlInput.value) : null;
    const messageErr = validateMessage(messageInput.value);

    setFieldError('contact-name', 'contact-name-error', nameErr);
    setFieldError('contact-email', 'contact-email-error', emailErr);
    setFieldError('contact-topic', 'contact-topic-error', topicErr);
    setFieldError('contact-page-url', 'contact-page-url-error', urlErr);
    setFieldError('contact-message', 'contact-message-error', messageErr);

    // Focus the first invalid field
    if (nameErr && nameInput) {
      nameInput.focus();
      return;
    }
    if (emailErr) {
      emailInput.focus();
      return;
    }
    if (topicErr) {
      topicSelect.focus();
      return;
    }
    if (urlErr && pageUrlInput) {
      pageUrlInput.focus();
      return;
    }
    if (messageErr) {
      messageInput.focus();
      return;
    }

    // Check client-side rate limit
    const now = Date.now();
    const recentSubmissions = SUBMISSION_TIMESTAMPS.filter(
      (ts) => now - ts < RATE_LIMIT_WINDOW_MS
    );
    if (recentSubmissions.length >= MAX_SUBMISSIONS_PER_WINDOW) {
      showStatus(
        'rate-limit',
        'You’ve sent several messages recently. Please wait a few minutes and try again, or email support@thegramstocups.com.'
      );
      return;
    }

    // Check honeypot
    const honeypotVal = honeypotInput ? honeypotInput.value.trim() : '';
    if (honeypotVal) {
      // Bot detected: silent success
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending…';
      submitBtn.setAttribute('aria-busy', 'true');
      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Send message';
        submitBtn.removeAttribute('aria-busy');
        form.reset();
        showStatus('success', 'Thank you. Your message has been submitted.', 'Message submitted');
        if (formFieldsContainer) formFieldsContainer.style.display = 'none';
        submitBtn.style.display = 'none';
      }, 700);
      return;
    }

    // Submit state
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending…';
    submitBtn.setAttribute('aria-busy', 'true');

    const payload = {
      name: nameInput?.value.trim() || '',
      email: emailInput.value.trim(),
      topic: topicSelect.value,
      pageUrl: pageUrlInput?.value.trim() || '',
      message: messageInput.value.trim(),
      website_hp: honeypotVal
    };

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (response.status === 429) {
        showStatus(
          'rate-limit',
          'You’ve sent several messages recently. Please wait a few minutes and try again, or email support@thegramstocups.com.'
        );
        return;
      }

      if (!response.ok) {
        showStatus(
          'error',
          'We couldn’t submit your message. Your details are still here—please try again, or email support@thegramstocups.com.'
        );
        return;
      }

      // Success
      SUBMISSION_TIMESTAMPS.push(now);
      form.reset();
      touchedFields.clear();
      showStatus('success', 'Thank you. Your message has been submitted.', 'Message submitted');
      if (formFieldsContainer) formFieldsContainer.style.display = 'none';
      submitBtn.style.display = 'none';

    } catch (networkError) {
      showStatus(
        'error',
        'We couldn’t submit your message. Your details are still here—please try again, or email support@thegramstocups.com.'
      );
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Send message';
      submitBtn.removeAttribute('aria-busy');
    }
  });
}
