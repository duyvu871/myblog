'use client';

import { useState } from 'react';
import { Button, Tooltip, Menu, ActionIcon, rem } from '@mantine/core';
import { Check, Copy, AlertTriangle, ChevronDown, FileText, Code, AlignLeft } from 'lucide-react';
import { notifications } from '@mantine/notifications';
import {
  prepareMarkdownForCopy,
  validateMarkdownSafety,
  sanitizeMarkdown,
} from 'app/utils/markdown-sanitizer';

export type CopyFormat = 'markdown' | 'markdown-no-frontmatter' | 'plain-text' | 'html';

interface CopyOption {
  value: CopyFormat;
  label: string;
  icon: React.ReactNode;
  description: string;
}

const COPY_OPTIONS: CopyOption[] = [
  {
    value: 'markdown',
    label: 'Copy as Markdown',
    icon: <FileText size={16} />,
    description: 'Copy with frontmatter and formatting',
  },
  {
    value: 'markdown-no-frontmatter',
    label: 'Copy Markdown (No Frontmatter)',
    icon: <Code size={16} />,
    description: 'Copy markdown without frontmatter',
  },
  {
    value: 'plain-text',
    label: 'Copy as Plain Text',
    icon: <AlignLeft size={16} />,
    description: 'Copy without markdown formatting',
  },
  {
    value: 'html',
    label: 'Copy as HTML',
    icon: <Code size={16} />,
    description: 'Copy as HTML markup',
  },
];

/**
 * Convert markdown to plain text by removing markdown syntax
 */
function markdownToPlainText(markdown: string): string {
  let text = markdown;

  // Remove headers
  text = text.replace(/^#{1,6}\s+/gm, '');

  // Remove bold/italic
  text = text.replace(/(\*\*|__)(.*?)\1/g, '$2');
  text = text.replace(/(\*|_)(.*?)\1/g, '$2');

  // Remove strikethrough
  text = text.replace(/~~(.*?)~~/g, '$1');

  // Remove inline code
  text = text.replace(/`([^`]+)`/g, '$1');

  // Remove code blocks
  text = text.replace(/```[\s\S]*?```/g, '');

  // Remove links but keep text
  text = text.replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1');

  // Remove images
  text = text.replace(/!\[([^\]]*)\]\([^\)]+\)/g, '$1');

  // Remove blockquotes
  text = text.replace(/^>\s+/gm, '');

  // Remove horizontal rules
  text = text.replace(/^(-{3,}|\*{3,}|_{3,})$/gm, '');

  // Remove list markers
  text = text.replace(/^[\s]*[-*+]\s+/gm, '');
  text = text.replace(/^[\s]*\d+\.\s+/gm, '');

  // Clean up multiple blank lines
  text = text.replace(/\n{3,}/g, '\n\n');

  return text.trim();
}

/**
 * Convert markdown to basic HTML
 */
function markdownToHTML(markdown: string): string {
  let html = markdown;

  // Convert headers
  html = html.replace(/^######\s+(.+)$/gm, '<h6>$1</h6>');
  html = html.replace(/^#####\s+(.+)$/gm, '<h5>$1</h5>');
  html = html.replace(/^####\s+(.+)$/gm, '<h4>$1</h4>');
  html = html.replace(/^###\s+(.+)$/gm, '<h3>$1</h3>');
  html = html.replace(/^##\s+(.+)$/gm, '<h2>$1</h2>');
  html = html.replace(/^#\s+(.+)$/gm, '<h1>$1</h1>');

  // Convert bold/italic
  html = html.replace(/\*\*\*(.+?)\*\*\*/g, '<strong><em>$1</em></strong>');
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/\*(.+?)\*/g, '<em>$1</em>');
  html = html.replace(/___(.+?)___/g, '<strong><em>$1</em></strong>');
  html = html.replace(/__(.+?)__/g, '<strong>$1</strong>');
  html = html.replace(/_(.+?)_/g, '<em>$1</em>');

  // Convert strikethrough
  html = html.replace(/~~(.+?)~~/g, '<del>$1</del>');

  // Convert inline code
  html = html.replace(/`([^`]+)`/g, '<code>$1</code>');

  // Convert code blocks
  html = html.replace(/```(\w+)?\n([\s\S]*?)```/g, (_, lang, code) => {
    return `<pre><code${lang ? ` class="language-${lang}"` : ''}>${code.trim()}</code></pre>`;
  });

  // Convert links
  html = html.replace(/\[([^\]]+)\]\(([^\)]+)\)/g, '<a href="$2">$1</a>');

  // Convert images
  html = html.replace(/!\[([^\]]*)\]\(([^\)]+)\)/g, '<img src="$2" alt="$1" />');

  // Convert blockquotes
  html = html.replace(/^>\s+(.+)$/gm, '<blockquote>$1</blockquote>');

  // Convert horizontal rules
  html = html.replace(/^(-{3,}|\*{3,}|_{3,})$/gm, '<hr />');

  // Convert unordered lists
  html = html.replace(/^[\s]*[-*+]\s+(.+)$/gm, '<li>$1</li>');

  // Convert ordered lists
  html = html.replace(/^[\s]*\d+\.\s+(.+)$/gm, '<li>$1</li>');

  // Wrap consecutive <li> in <ul> or <ol>
  html = html.replace(/(<li>.*<\/li>\n?)+/g, (match) => {
    return `<ul>\n${match}</ul>\n`;
  });

  // Convert line breaks to <p>
  html = html.replace(/\n\n/g, '</p><p>');
  html = `<p>${html}</p>`;

  return html;
}

/**
 * Prepare content based on the selected format
 */
function prepareContentForFormat(
  markdown: string,
  format: CopyFormat,
  frontmatter?: any,
  validateSafety: boolean = true
): string {
  // Sanitize markdown first if validation is enabled
  const sanitized = validateSafety ? sanitizeMarkdown(markdown) : markdown;

  switch (format) {
    case 'markdown':
      return prepareMarkdownForCopy(sanitized, frontmatter);

    case 'markdown-no-frontmatter':
      return prepareMarkdownForCopy(sanitized);

    case 'plain-text':
      return markdownToPlainText(sanitized);

    case 'html':
      return markdownToHTML(sanitized);

    default:
      return sanitized;
  }
}

interface CopyMarkdownButtonProps {
  /** The raw markdown content to copy */
  markdown: string;
  /** Optional frontmatter to include */
  frontmatter?: any;
  /** Button variant */
  variant?: 'filled' | 'light' | 'outline' | 'subtle' | 'default';
  /** Button size */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  /** Custom button text */
  buttonText?: string;
  /** Whether to show icon */
  showIcon?: boolean;
  /** Whether to validate markdown safety before copying */
  validateSafety?: boolean;
  /** Callback fired after successful copy */
  onCopySuccess?: () => void;
  /** Callback fired on copy error */
  onCopyError?: (error: Error) => void;
}

/**
 * Dropdown button with multiple copy format options
 */
export function CopyMarkdownButton({
  markdown,
  frontmatter,
  variant = 'light',
  size = 'sm',
  buttonText = '',
  showIcon = true,
  validateSafety = true,
  onCopySuccess,
  onCopyError,
}: CopyMarkdownButtonProps) {
  const [isCopied, setIsCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleCopy = async (format: CopyFormat) => {
    setIsLoading(true);

    try {
      // Validate safety if enabled
      if (validateSafety) {
        const validation = validateMarkdownSafety(markdown);
        if (!validation.isSafe) {
          console.log(`Content sanitized: ${validation.warnings.join(', ')}`);
          //   notifications.show({
          //     title: 'Content Sanitized',
          //     message: `Content sanitized: ${validation.warnings.join(', ')}`,
          //     color: 'yellow',
          //     icon: <AlertTriangle size={18} />,
          //     autoClose: 4000,
          //   });
        }
      }

      // Prepare content based on format
      const preparedContent = prepareContentForFormat(
        markdown,
        format,
        frontmatter,
        validateSafety
      );

      // Copy to clipboard
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(preparedContent);
      } else {
        const textArea = document.createElement('textarea');
        textArea.value = preparedContent;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();

        try {
          document.execCommand('copy');
        } finally {
          textArea.remove();
        }
      }

      // Update state
      setIsCopied(true);

      // Show success notification
      const option = COPY_OPTIONS.find((opt) => opt.value === format);
      notifications.show({
        title: 'Copied!',
        message: option?.description || 'Content copied to clipboard',
        color: 'green',
        icon: <Check size={18} />,
        autoClose: 2000,
      });

      onCopySuccess?.();

      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    } catch (error) {
      console.error('Failed to copy:', error);

      notifications.show({
        title: 'Copy Failed',
        message: 'Failed to copy content. Please try again.',
        color: 'red',
        autoClose: 3000,
      });

      if (error instanceof Error) {
        onCopyError?.(error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Menu shadow="md" width={280} position="bottom-end">
      <Menu.Target>
        <Button
          variant={variant}
          size={size}
          loading={isLoading}
          disabled={!markdown}
          leftSection={showIcon ? isCopied ? <Check size={16} /> : <Copy size={16} /> : undefined}
          rightSection={<ChevronDown size={14} />}
          color={isCopied ? 'green' : 'lavender'}
        >
          {isCopied ? 'Copied!' : buttonText}
        </Button>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>Copy Format</Menu.Label>
        {COPY_OPTIONS.map((option) => (
          <Menu.Item
            key={option.value}
            leftSection={option.icon}
            onClick={() => handleCopy(option.value)}
            disabled={isLoading || isCopied}
          >
            <div>
              <div style={{ fontWeight: 500 }}>{option.label}</div>
              <div style={{ fontSize: rem(12), opacity: 0.7 }}>{option.description}</div>
            </div>
          </Menu.Item>
        ))}
      </Menu.Dropdown>
    </Menu>
  );
}

/**
 * Compact icon-only version with dropdown
 */
interface CopyMarkdownIconButtonProps
  extends Omit<CopyMarkdownButtonProps, 'buttonText' | 'showIcon'> {
  tooltipText?: string;
}

export function CopyMarkdownIconButton({
  markdown,
  frontmatter,
  variant = 'subtle',
  size = 'sm',
  tooltipText = 'Copy',
  validateSafety = true,
  onCopySuccess,
  onCopyError,
}: CopyMarkdownIconButtonProps) {
  const [isCopied, setIsCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleCopy = async (format: CopyFormat) => {
    setIsLoading(true);

    try {
      if (validateSafety) {
        const validation = validateMarkdownSafety(markdown);
        if (!validation.isSafe) {
          notifications.show({
            title: 'Content Sanitized',
            message: `Sanitized: ${validation.warnings.join(', ')}`,
            color: 'yellow',
            icon: <AlertTriangle size={18} />,
            autoClose: 3000,
          });
        }
      }

      const preparedContent = prepareContentForFormat(
        markdown,
        format,
        frontmatter,
        validateSafety
      );

      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(preparedContent);
      } else {
        const textArea = document.createElement('textarea');
        textArea.value = preparedContent;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        document.body.appendChild(textArea);
        textArea.select();

        try {
          document.execCommand('copy');
        } finally {
          textArea.remove();
        }
      }

      setIsCopied(true);

      const option = COPY_OPTIONS.find((opt) => opt.value === format);
      notifications.show({
        title: 'Copied!',
        message: option?.label || 'Copied to clipboard',
        color: 'green',
        icon: <Check size={18} />,
        autoClose: 2000,
      });

      onCopySuccess?.();
      setTimeout(() => setIsCopied(false), 2000);
    } catch (error) {
      notifications.show({
        title: 'Copy Failed',
        message: 'Failed to copy.',
        color: 'red',
        autoClose: 2000,
      });

      if (error instanceof Error) {
        onCopyError?.(error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Menu shadow="md" width={280} position="bottom-end">
      <Menu.Target>
        <Tooltip label={isCopied ? 'Copied!' : tooltipText} position="bottom" withArrow>
          <ActionIcon
            variant={variant}
            size={size}
            loading={isLoading}
            disabled={!markdown || isCopied}
            color={isCopied ? 'green' : 'gray'}
          >
            {isCopied ? <Check size={18} /> : <Copy size={18} />}
          </ActionIcon>
        </Tooltip>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>Copy Format</Menu.Label>
        {COPY_OPTIONS.map((option) => (
          <Menu.Item
            key={option.value}
            leftSection={option.icon}
            onClick={() => handleCopy(option.value)}
            disabled={isLoading || isCopied}
          >
            <div>
              <div style={{ fontWeight: 500 }}>{option.label}</div>
              <div style={{ fontSize: rem(12), opacity: 0.7 }}>{option.description}</div>
            </div>
          </Menu.Item>
        ))}
      </Menu.Dropdown>
    </Menu>
  );
}
