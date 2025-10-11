import type { MDXComponents } from 'mdx/types';
import Link from 'next/link';
import Image from 'next/image';
import { ComponentProps } from 'react';
import { cn } from 'app/lib/cn';
import {
  Title,
  Text,
  Anchor,
  Code,
  Table,
  TableThead,
  TableTbody,
  TableTr,
  TableTh,
  TableTd,
  Divider,
  Blockquote,
  Paper,
} from '@mantine/core';
import { IconHeart, IconStar, IconCode, IconRocket, IconQuote } from '@tabler/icons-react';
import { CodeComponent } from './code-component';
import { PreComponent } from './pre-component';

// This file allows you to provide custom React components
// to be used in MDX files. You can import and use any
// React component you want, including components from
// other libraries.

type HeadingProps = ComponentProps<'h1'>;
type ParagraphProps = ComponentProps<'p'>;
type AnchorProps = ComponentProps<'a'>;
type ImageProps = ComponentProps<'img'>;
type PreProps = ComponentProps<'pre'>;
type CodeProps = ComponentProps<'code'>;
type UlProps = ComponentProps<'ul'>;
type OlProps = ComponentProps<'ol'>;
type ListItemProps = ComponentProps<'li'>;
type BlockquoteProps = ComponentProps<'blockquote'>;
type HrProps = ComponentProps<'hr'>;

export function MDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Icon components for MDX
    IconHeart,
    IconStar,
    IconCode,
    IconRocket,

    // Customize headings
    // h1: ({ className, ...props }: HeadingProps) => (
    //     <h1
    //         className={cn(
    //             'mt-12 mb-6 text-3xl font-bold tracking-tight first:mt-0',
    //             className,
    //         )}
    //         {...props}
    //     />
    // ),
    // h2: ({ className, ...props }: HeadingProps) => (
    //     <h2
    //         className={cn(
    //             'mt-10 mb-4 text-2xl font-semibold tracking-tight',
    //             className,
    //         )}
    //         {...props}
    //     />
    // ),
    // h3: ({ className, ...props }: HeadingProps) => (
    //     <h3
    //         className={cn(
    //             'mt-8 mb-4 text-xl font-semibold tracking-tight',
    //             className,
    //         )}
    //         {...props}
    //     />
    // ),
    // h4: ({ className, ...props }: HeadingProps) => (
    //     <h4
    //         className={cn(
    //             'mt-6 mb-3 text-lg font-semibold tracking-tight',
    //             className,
    //         )}
    //         {...props}
    //     />
    // ),
    // h5: ({ className, ...props }: HeadingProps) => (
    //     <h5
    //         className={cn(
    //             'mt-6 mb-3 text-md font-semibold tracking-tight',
    //             className,
    //         )}
    //         {...props}
    //     />
    // ),
    // h6: ({ className, ...props }: HeadingProps) => (
    //     <h6
    //         className={cn(
    //             'mt-6 mb-3 text-base font-semibold tracking-tight',
    //             className,
    //         )}
    //         {...props}
    //     />
    // ),

    // Customize paragraphs using Mantine Text to keep theme consistency
    p: ({ className, ...props }: ParagraphProps) => (
      <Text
        component="p"
        size="md"
        c={'subtext1'}
        className={cn('not-prose mb-4 leading-7 [&:not(:first-child)]:mt-6', className)}
        {...props}
      />
    ),

    // Customize anchor links with Mantine Anchor
    a: ({ className, children, ...props }: AnchorProps) =>
      className?.includes('heading-anchor') ? (
        <a className={className} {...props}>
          {children}
        </a>
      ) : (
        <Anchor className={className} {...props}>
          {children}
        </Anchor>
      ),
    // Customize links with Mantine Anchor
    h1: ({ className, ...props }: HeadingProps) => (
      <Title
        order={1}
        // Tailwind: text-3xl -> Mantine size 'xl' approximated
        // size="xl"
        // c="blue"
        className={cn(
          'not-prose !mt-12 !mb-6 !text-3xl font-bold tracking-tight first:!mt-0',
          className
        )}
        {...props}
      />
    ),
    h2: ({ className, ...props }: HeadingProps) => (
      <Title
        order={2}
        // Tailwind: text-2xl -> Mantine size 'lg'
        // size="lg"
        // c="blue"
        className={cn('!mt-10 !mb-4 !text-2xl font-semibold tracking-tight', className)}
        {...props}
      />
    ),
    h3: ({ className, ...props }: HeadingProps) => (
      <Title
        order={3}
        // Tailwind: text-xl -> Mantine size 'md'
        // size="md"
        // c="blue"
        className={cn('!mt-8 !mb-4 !text-xl font-semibold tracking-tight', className)}
        {...props}
      />
    ),
    h4: ({ className, ...props }: HeadingProps) => (
      <Title
        order={4}
        // Tailwind: text-lg -> Mantine size 'sm'
        // size="sm"
        // c="blue"
        className={cn('!mt-6 !mb-3 !text-lg font-semibold tracking-tight', className)}
        {...props}
      />
    ),
    h5: ({ className, ...props }: HeadingProps) => (
      <Title
        order={5}
        // Tailwind: text-md -> use smaller size
        // size="xs"
        // c="blue"
        className={cn('!text-md !mt-6 !mb-3 font-semibold tracking-tight', className)}
        {...props}
      />
    ),
    h6: ({ className, ...props }: HeadingProps) => (
      <Title
        order={6}
        // Tailwind: text-base -> Mantine default small size
        // size="xs"
        // c="blue"
        className={cn('!mt-6 !mb-3 !text-base font-semibold tracking-tight', className)}
        {...props}
      />
    ),

    pre: (props) => <PreComponent {...props} />,

    // Inline code with Mantine Code
    code: ({ className, children, ...props }: CodeProps) => (
      <Code className={className} {...props}>
        {children}
      </Code>
    ),

    // Lists - keeping HTML elements for better MDX compatibility
    ul: ({ className, ...props }: UlProps) => (
      <ul className={cn('text-dimmed mb-4 list-disc pl-6 [&>li]:mt-2', className)} {...props} />
    ),
    ol: ({ className, ...props }: OlProps) => (
      <ol className={cn('text-dimmed mb-4 list-decimal pl-6 [&>li]:mt-2', className)} {...props} />
    ),
    li: ({ className, children, ...props }: ListItemProps) => (
      <li className={cn('text-dimmed', className)} {...props}>
        {children}
      </li>
    ),

    // Blockquotes with Mantine Blockquote
    blockquote: ({ className, ...props }: BlockquoteProps) => (
      <Blockquote
        my="md"
        icon={<IconQuote />}
        color="lavender"
        variant="filled"
        radius="xl"
        iconSize={30}
        className={className}
        {...props}
      />
    ),

    // Tables - using Mantine Table components
    table: ({ className, ...props }: any) => (
      <div className="my-4 overflow-x-auto">
        <Table
          className={className}
          withColumnBorders
          withRowBorders
          withTableBorder
          stickyHeader
          style={{
            backgroundColor: 'var(--catppuccin-base)',
            border: '1px solid var(--catppuccin-surface1)',
            borderRadius: '8px',
            overflow: 'hidden',
          }}
          {...props}
        />
      </div>
    ),
    thead: ({ className, ...props }: any) => (
      <TableThead
        className={className}
        style={{
          backgroundColor: 'var(--catppuccin-surface0)',
        }}
        {...props}
      />
    ),
    tbody: ({ className, ...props }: any) => <TableTbody className={className} {...props} />,
    tr: ({ className, ...props }: any) => (
      <TableTr
        className={className}
        style={{
          '&:hover': {
            backgroundColor: 'var(--catppuccin-surface0)',
          },
          transition: 'background-color 0.2s ease',
        }}
        {...props}
      />
    ),
    th: ({ className, ...props }: any) => (
      <TableTh
        className={className}
        style={{
          color: 'var(--catppuccin-text)',
          fontWeight: 600,
          borderRight: '1px solid var(--catppuccin-surface1)',
          backgroundColor: 'var(--catppuccin-surface0)',
        }}
        {...props}
      />
    ),
    td: ({ className, ...props }: any) => (
      <TableTd
        className={className}
        style={{
          color: 'var(--catppuccin-text)',
          borderRight: '1px solid var(--catppuccin-surface1)',
        }}
        {...props}
      />
    ),

    // Horizontal rule with Mantine Divider
    hr: ({ className, ...props }: HrProps) => <Divider my="xl" className={className} {...props} />,

    // Custom components can be added here
    // For example, you can add custom components like:
    // CustomComponent: ({ children }) => <div className="custom">{children}</div>,

    ...components,
  };
}
