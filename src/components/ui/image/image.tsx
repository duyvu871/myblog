'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { Image as MantineImage, LoadingOverlay } from '@mantine/core';
import { IconPhotoOff } from '@tabler/icons-react';
import { cn } from 'app/lib/cn';

export interface ImageProps {
  src?: string;
  alt?: string;
  width?: number | string;
  height?: number | string;
  className?: string;
  style?: React.CSSProperties;
  fallbackSrc?: string;
  showFallbackIcon?: boolean;
  onLoad?: () => void;
  onError?: () => void;
  priority?: boolean;
  placeholder?: React.ReactNode;
  caption?: string;
  fit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
  radius?: number | string;
  lazy?: boolean;
}

// Default thumbnail as a base64 encoded SVG
const DEFAULT_THUMBNAIL = '/images/default-thumbnail.svg';

export function Image({
  src,
  alt = '',
  width,
  height,
  className,
  style,
  fallbackSrc = DEFAULT_THUMBNAIL,
  showFallbackIcon = true,
  onLoad,
  onError,
  priority = false,
  placeholder,
  caption,
  fit = 'cover',
  radius = '6px',
  lazy = false,
  ...props
}: ImageProps) {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(!lazy); // Start as visible if not lazy
  const [isInView, setIsInView] = useState(!lazy); // Start as in view if not lazy
  const [isLoading, setIsLoading] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (!lazy || !containerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setIsInView(true);
          setIsLoading(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.1,
        rootMargin: '50px',
      }
    );

    observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, [lazy]);

  const handleLoad = useCallback(() => {
    setImageLoaded(true);
    setIsLoading(false);
    onLoad?.();
  }, [onLoad]);

  const handleError = useCallback(() => {
    console.log('Image failed to load:', src);
    setImageError(true);
    setIsLoading(false);
    onError?.();
  }, [onError, src]);

  // If no src provided or error occurred, show fallback
  const hasValidSrc = src && src.trim() !== '';
  const displaySrc = !hasValidSrc || imageError ? fallbackSrc : src;

  // If showing fallback and no custom fallbackSrc, use default thumbnail
  const finalSrc = (!hasValidSrc || imageError) && !fallbackSrc ? DEFAULT_THUMBNAIL : displaySrc;

  return (
    <div ref={containerRef} className={cn('relative overflow-hidden', className)} style={style}>
      <LoadingOverlay
        visible={isLoading}
        overlayProps={{ radius: 'sm', blur: 2 }}
        loaderProps={{ color: 'blue', size: 'md' }}
      />
      {(!hasValidSrc || imageError) && showFallbackIcon ? (
        <div
          className="flex w-full max-w-full items-center justify-center"
          style={{
            height: height || '200px',
            backgroundColor: 'var(--catppuccin-surface0)',
            border: `2px solid var(--catppuccin-surface1)`,
            borderRadius: radius,
          }}
        >
          <div className="flex flex-col items-center gap-2 p-4 text-center">
            <IconPhotoOff size={48} style={{ color: 'var(--catppuccin-surface1)' }} />
            <span
              style={{
                color: 'var(--catppuccin-surface1)',
                fontSize: '14px',
                fontWeight: '600',
              }}
            >
              Image failed to load
            </span>
            <span
              style={{
                color: 'var(--catppuccin-surface1)',
                fontSize: '12px',
                fontWeight: '400',
              }}
            >
              {alt || 'Image not available'}
            </span>
          </div>
        </div>
      ) : (
        hasValidSrc &&
        isInView && (
          <MantineImage
            src={finalSrc}
            alt={alt}
            fit={fit}
            onLoad={handleLoad}
            onError={handleError}
            className={cn(
              'transition-opacity duration-300',
              imageLoaded ? 'opacity-100' : 'opacity-70'
            )}
            style={{
              borderRadius: radius,
              border: imageError ? '1px solid var(--catppuccin-surface1)' : 'none',
              width: width,
              height: height,
            }}
            {...props}
          />
        )
      )}

      {caption && (
        <div
          className="mt-2 text-center"
          style={{
            color: 'var(--catppuccin-subtext1)',
            fontSize: '12px',
            fontWeight: '400',
          }}
        >
          {caption}
        </div>
      )}
    </div>
  );
}

// Responsive image component with multiple sizes
export function ResponsiveImage({
  src,
  alt,
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  className,
  radius = '6px',
  lazy = true,
  ...props
}: Omit<ImageProps, 'width' | 'height'> & {
  sizes?: string;
}) {
  return (
    <Image
      src={src}
      alt={alt}
      className={cn('h-auto w-full', className)}
      radius={radius}
      lazy={lazy}
      {...props}
    />
  );
}

// Avatar-like circular image
export function AvatarImage({
  src,
  alt,
  size = 40,
  className,
  radius = '50%',
  lazy = false,
  ...props
}: Omit<ImageProps, 'width' | 'height'> & {
  size?: number;
}) {
  return (
    <Image
      src={src}
      alt={alt}
      width={size}
      height={size}
      className={cn('object-cover', className)}
      radius={radius}
      lazy={lazy}
      style={{
        border: '2px solid var(--catppuccin-surface1)',
        ...props.style,
      }}
      {...props}
    />
  );
}

// Thumbnail image with fixed aspect ratio
export function ThumbnailImage({
  src,
  alt,
  width = 200,
  height = 150,
  className,
  radius = '6px',
  lazy = true,
  ...props
}: Omit<ImageProps, 'width' | 'height'> & {
  width?: number;
  height?: number;
}) {
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={cn('object-cover', className)}
      fit="cover"
      radius={radius}
      lazy={lazy}
      {...props}
    />
  );
}
