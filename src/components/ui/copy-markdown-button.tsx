'use client';

import { useState } from 'react';
import { Button, Tooltip, Menu, ActionIcon, rem } from '@mantine/core';
import {
  Check,
  Copy,
  AlertTriangle,
  ChevronDown,
  FileText,
  Code,
  AlignLeft,
  Share2,
  Facebook,
} from 'lucide-react';
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
  /** Post title for sharing */
  title?: string;
  /** Post URL for sharing */
  url?: string;
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
  title,
  url,
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

  const handleShare = (platform: 'facebook' | 'threads') => {
    const shareUrl = url || (typeof window !== 'undefined' ? window.location.href : '');
    const shareTitle = title || 'Check out this post';

    let shareLink = '';
    const windowFeatures = 'width=600,height=400,scrollbars=yes';

    switch (platform) {
      case 'facebook':
        shareLink = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
        break;

      case 'threads':
        // Threads share URL format
        shareLink = `https://www.threads.net/intent/post?text=${encodeURIComponent(shareTitle + ' ' + shareUrl)}`;
        break;
    }

    if (typeof window !== 'undefined') {
      window.open(shareLink, '_blank', windowFeatures);

      const platformNames = {
        facebook: 'Facebook',
        threads: 'Threads',
      };

      notifications.show({
        title: 'Đang mở...',
        message: `Chia sẻ lên ${platformNames[platform]}`,
        color: 'blue',
        icon: <Share2 size={18} />,
        autoClose: 2000,
      });
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
        {/* 
        <Menu.Divider />

        <Menu.Label>Share</Menu.Label>
        <Menu.Item
          leftSection={<Facebook style={{ width: rem(14), height: rem(14) }} />}
          onClick={() => handleShare('facebook')}
          color="blue"
        >
          Chia sẻ lên Facebook
        </Menu.Item>
        <Menu.Item
          leftSection={
            <svg
              style={{ width: rem(14), height: rem(14) }}
              viewBox="0 0 192 192"
              fill="currentColor"
            >
              <path d="M141.537 88.988a66.667 66.667 0 0 0-2.518-1.143c-1.482-27.307-16.403-42.94-41.457-43.1h-.34c-14.986 0-27.449 6.396-35.12 18.036l13.779 9.452c5.73-8.695 14.924-10.548 21.342-10.548h.24c6.64.038 11.647 1.783 14.875 5.183 2.838 2.988 4.647 7.622 5.32 13.746-5.382-.426-11.124-.45-17.175-.074-23.978 1.484-39.532 16.06-38.644 36.193.477 10.82 5.956 19.893 15.42 25.534 6.954 4.15 15.616 6.005 24.344 5.225 13.106-1.175 23.014-6.926 28.652-16.633 5.38-9.257 6.844-21.38 6.844-34.282v-3.55c0-3.81-.052-6.86-.153-9.136 5.348 2.964 9.31 7.35 11.546 12.845l14.78-8.53c-4.063-9.99-11.687-17.086-21.735-20.218Zm-26.371 52.984c-4.1 7.057-11.138 10.788-19.8 10.495-5.53-.187-10.368-1.67-13.656-4.193-3.495-2.68-5.61-6.674-5.844-11.022-.523-9.798 6.948-18.52 24.687-19.656 5.418-.347 10.668-.3 15.64.15.11 6.772.454 15.447-1.027 24.226Z" />
            </svg>
          }
          onClick={() => handleShare('threads')}
        >
          Chia sẻ lên Threads
        </Menu.Item> */}
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
  title,
  url,
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

  const handleShare = (platform: 'facebook' | 'threads') => {
    const shareUrl = url || (typeof window !== 'undefined' ? window.location.href : '');
    const shareTitle = title || 'Check out this post';

    let shareLink = '';

    switch (platform) {
      case 'facebook':
        shareLink = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
        break;
      case 'threads':
        shareLink = `https://www.threads.net/intent/post?text=${encodeURIComponent(shareTitle + ' ' + shareUrl)}`;
        break;
    }

    if (typeof window !== 'undefined') {
      window.open(shareLink, '_blank', 'width=600,height=400');
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

        {/* <Menu.Divider /> */}

        {/* <Menu.Label>Share</Menu.Label>
        <Menu.Item
          leftSection={<Facebook style={{ width: rem(14), height: rem(14) }} />}
          onClick={() => handleShare('facebook')}
        >
          Facebook
        </Menu.Item>
        <Menu.Item
          leftSection={
            <svg
              style={{ width: rem(14), height: rem(14) }}
              viewBox="0 0 192 192"
              fill="currentColor"
            >
              <path d="M141.537 88.988a66.667 66.667 0 0 0-2.518-1.143c-1.482-27.307-16.403-42.94-41.457-43.1h-.34c-14.986 0-27.449 6.396-35.12 18.036l13.779 9.452c5.73-8.695 14.924-10.548 21.342-10.548h.24c6.64.038 11.647 1.783 14.875 5.183 2.838 2.988 4.647 7.622 5.32 13.746-5.382-.426-11.124-.45-17.175-.074-23.978 1.484-39.532 16.06-38.644 36.193.477 10.82 5.956 19.893 15.42 25.534 6.954 4.15 15.616 6.005 24.344 5.225 13.106-1.175 23.014-6.926 28.652-16.633 5.38-9.257 6.844-21.38 6.844-34.282v-3.55c0-3.81-.052-6.86-.153-9.136 5.348 2.964 9.31 7.35 11.546 12.845l14.78-8.53c-4.063-9.99-11.687-17.086-21.735-20.218Zm-26.371 52.984c-4.1 7.057-11.138 10.788-19.8 10.495-5.53-.187-10.368-1.67-13.656-4.193-3.495-2.68-5.61-6.674-5.844-11.022-.523-9.798 6.948-18.52 24.687-19.656 5.418-.347 10.668-.3 15.64.15.11 6.772.454 15.447-1.027 24.226Z" />
            </svg>
          }
          onClick={() => handleShare('threads')}
        >
          Threads
        </Menu.Item> */}
      </Menu.Dropdown>
    </Menu>
  );
}
