'use client';

import { ActionIcon } from '@mantine/core';
import { IconArrowUp } from '@tabler/icons-react';
import { useHeadroom, useWindowScroll } from '@mantine/hooks';
import { cn } from 'app/lib/cn';

export interface ScrollToTopProps {
  threshold?: number;
  className?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  style?: React.CSSProperties;
}

export function ScrollToTop({
  threshold = 120,
  className,
  size = 'md',
  position = 'bottom-right',
  style,
}: ScrollToTopProps) {
  const [scroll, scrollTo] = useWindowScroll();
  const isVisible = scroll.y > threshold;

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const positionClasses = {
    'bottom-right': 'fixed bottom-6 right-6 z-50',
    'bottom-left': 'fixed bottom-6 left-6 z-50',
    'top-right': 'fixed top-6 right-6 z-50',
    'top-left': 'fixed top-6 left-6 z-50',
  };

  return (
    <div
      className={positionClasses[position]}
      style={{
        transition: 'opacity 0.3s ease-in-out, transform 0.3s ease-in-out',
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.8)',
        pointerEvents: isVisible ? 'auto' : 'none',
      }}
    >
      <ActionIcon
        variant="light"
        size={size}
        radius="xl"
        onClick={scrollToTop}
        className={cn(
          'transition-all duration-200 ease-in-out',
          'opacity-90 hover:opacity-100',
          'shadow-lg hover:shadow-xl',
          'transform hover:scale-105 active:scale-95',
          className
        )}
        style={{
          backgroundColor: 'var(--catppuccin-blue)',
          color: 'var(--catppuccin-base)',
          border: '1px solid var(--catppuccin-blue)',
          ...style,
        }}
        aria-label="Scroll to top"
        title="Scroll to top"
      >
        <IconArrowUp size={24} />
      </ActionIcon>
    </div>
  );
}

// Floating variant with backdrop blur
export function FloatingScrollToTop({ threshold = 120, ...props }: ScrollToTopProps) {
  const pinned = useHeadroom({ fixedAt: threshold });

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div
      className="fixed right-6 bottom-6 z-600"
      style={{
        transition: 'opacity 0.3s ease-in-out, transform 0.3s ease-in-out',
        opacity: pinned ? 1 : 0,
        transform: pinned ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.8)',
        pointerEvents: pinned ? 'auto' : 'none',
      }}
    >
      <ActionIcon
        variant="light"
        size={props.size || 'md'}
        radius="xl"
        onClick={scrollToTop}
        className={cn(
          'bg-opacity-80 backdrop-blur-md',
          'border border-white/20 dark:border-white/10',
          'transition-all duration-200 ease-in-out',
          'opacity-90 hover:opacity-100',
          'shadow-lg hover:shadow-xl',
          'transform hover:scale-105 active:scale-95',
          props.className
        )}
        style={{
          backgroundColor: 'var(--catppuccin-surface0)',
          color: 'var(--catppuccin-text)',
          borderColor: 'var(--catppuccin-surface1)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          ...props.style,
        }}
        aria-label="Scroll to top"
        title="Scroll to top"
      >
        <IconArrowUp size={16} />
      </ActionIcon>
    </div>
  );
}
