// apps/your-app/components/ContactForm.tsx
'use client';

import { useCallback, useId, useState } from 'react';

type Props = {
  /** Your Basin endpoint, e.g. https://usebasin.com/f/xxxxxxx */
  action: string;
  /** Optional classes so you can drop in your own styles */
  className?: string;
  fieldClassName?: {
    row?: string;
    label?: string;
    input?: string;
    textarea?: string;
    button?: string;
    status?: string;
  };
  /** Text overrides */
  labels?: {
    name?: string;
    email?: string;
    message?: string;
    submit?: string;
    success?: string;
    error?: string;
  };
  /** Called after a successful submit */
  onSuccess?: () => void;
  /** Set to false to use plain HTML POST (no JS/AJAX) */
  ajax?: boolean;
};

export default function ContactForm({
  action,
  className,
  fieldClassName,
  labels,
  onSuccess,
  ajax = true,
}: Props) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'ok' | 'err'>('idle');
  const [errMsg, setErrMsg] = useState<string | null>(null);

  const nameId = useId();
  const emailId = useId();
  const msgId = useId();

  const onSubmit = useCallback<React.FormEventHandler<HTMLFormElement>>(
    async (e) => {
      if (!ajax) return; // allow native POST fallback
      e.preventDefault();
      setStatus('loading');
      setErrMsg(null);

      const form = e.currentTarget;
      const data = new FormData(form);

      try {
        const res = await fetch(action, {
          method: 'POST',
          body: data,
          headers: { Accept: 'application/json' },
        });

        if (!res.ok) {
          const t = await safeText(res);
          throw new Error(t || `Request failed (${res.status})`);
        }

        form.reset();
        setStatus('ok');
        onSuccess?.();
      } catch (err) {
        setStatus('err');
        setErrMsg((err as Error)?.message ?? 'Something went wrong');
      }
    },
    [action, ajax, onSuccess],
  );

  return (
    <form
      action={action}
      method="POST"
      acceptCharset="UTF-8"
      onSubmit={onSubmit}
      className={className}
      aria-busy={status === 'loading'}
    >
      {/* Honeypot (spam trap) */}
      <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" hidden />

      {/* Row: Name + Email */}
      <div className={fieldClassName?.row}>
        <label htmlFor={nameId} className={fieldClassName?.label}>
          {labels?.name ?? 'Name'}
        </label>
        <input
          id={nameId}
          name="name"
          type="text"
          required
          autoComplete="name"
          placeholder={labels?.name ?? 'Name'}
          className={fieldClassName?.input}
        />
      </div>

      <div className={fieldClassName?.row}>
        <label htmlFor={emailId} className={fieldClassName?.label}>
          {labels?.email ?? 'Email'}
        </label>
        <input
          id={emailId}
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder={labels?.email ?? 'Email'}
          className={fieldClassName?.input}
        />
      </div>

      {/* Row: Message */}
      <div className={fieldClassName?.row}>
        <label htmlFor={msgId} className={fieldClassName?.label}>
          {labels?.message ?? 'Message'}
        </label>
        <textarea
          id={msgId}
          name="message"
          required
          placeholder={labels?.message ?? 'Message'}
          rows={6}
          className={fieldClassName?.textarea}
        />
      </div>

      {/* Submit */}
      <div className={fieldClassName?.row}>
        <button
          type="submit"
          disabled={status === 'loading'}
          className={fieldClassName?.button}
        >
          {status === 'loading' ? 'Sending…' : labels?.submit ?? 'Send'}
        </button>
      </div>

      {/* Status */}
      <p
        role="status"
        aria-live="polite"
        className={fieldClassName?.status}
        hidden={status === 'idle'}
      >
        {status === 'ok'
          ? labels?.success ?? 'Thanks—your message has been sent.'
          : status === 'err'
          ? (labels?.error ?? 'Unable to send right now.') + (errMsg ? ` ${errMsg}` : '')
          : null}
      </p>
    </form>
  );
}

/** Avoid throwing when response has no body */
async function safeText(res: Response) {
  try {
    return await res.text();
  } catch {
    return '';
  }
}
