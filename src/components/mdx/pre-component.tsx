// components/PreComponent.tsx
'use client';

import { JSX, useMemo, useRef, useState } from 'react';
import { Check, Copy } from 'lucide-react';

export type PreComponentProps = JSX.IntrinsicElements['pre'] & { 'data-language'?: string };

export const PreComponent: React.FC<PreComponentProps> = ({ ...props }) => {
  const [copied, setCopied] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);

  const lang = useMemo(() => {
    return props['data-language'] ?? 'text';
  }, [props]);

  const onCopy = async () => {
    const text = rootRef.current?.querySelector('pre > code')?.textContent ?? '';
    if (!text) return;
    try {
      if (navigator.clipboard?.writeText) await navigator.clipboard.writeText(text);
      else {
        const ta = document.createElement('textarea');
        ta.value = text;
        ta.style.position = 'fixed';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        ta.remove();
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch (error) {
      console.error('Error copying text:', error);
    }
  };

  return (
    <div
      ref={rootRef}
      className="not-prose my-4 overflow-hidden rounded-xl"
      style={{
        border: `1px solid var(--catppuccin-surface1)`,
        backgroundColor: `var(--catppuccin-surface0)`,
      }}
    >
      <div
        className="flex items-center justify-between border-0 px-3 py-1.5 text-[11px] tracking-wide uppercase"
        style={{
          color: `var(--catppuccin-subtext1)`,
          backgroundColor: `var(--catppuccin-surface0)`,
          borderBottomColor: `var(--catppuccin-surface1)`,
        }}
      >
        <span className="text-sm font-bold lowercase" style={{ color: `var(--catppuccin-text)` }}>
          {lang}
        </span>
        <button
          onClick={onCopy}
          className="flex cursor-pointer items-center gap-1 px-2 py-0.5 text-[11px] transition-opacity hover:opacity-80"
          style={{
            color: `var(--catppuccin-text)`,
            backgroundColor: `var(--catppuccin-surface1)`,
            borderRadius: '4px',
          }}
        >
          {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}{' '}
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>
      {/* children đã chứa <pre><code>…</code></pre> do rehype-pretty-code tạo */}
      <div className="overflow-hidden rounded-t-xl bg-[var(--catppuccin-surface0)]">
        <pre
          className="relative max-h-[500px] w-full overflow-auto [&>code]:!block [&>code]:!bg-transparent [&>code]:!p-2 lg:[&>code]:!p-4"
          style={{
            backgroundColor: `var(--catppuccin-mantle)`,
            color: `white`,
          }}
          {...props}
        />
      </div>
    </div>
  );
};
