'use client';

import { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { ActionIcon, Menu, Stack, Text, ScrollArea, TableOfContents } from '@mantine/core';
import { IconList } from '@tabler/icons-react';
import { HeadingItem, indexHeadings } from 'app/lib/mdx/remark-collect-headings';
import styles from './table-of-contents.module.css';

export interface TocProps {
  headings: HeadingItem[];
}

export function Toc({ headings }: TocProps) {
  const [opened, setOpened] = useState(false);

  const reinitializeRef = useRef(() => {});

  useLayoutEffect(() => {
    reinitializeRef.current();
  }, [headings]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (opened) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [opened]);

  if (!headings || headings.length === 0) {
    return null;
  }

  const getSize = (depth: number) => {
    if (depth === 1) return 'md';
    if (depth === 2) return 'sm';
    if (depth === 3) return 'xs';
    return 'xs';
  };

  const getWeight = (depth: number) => {
    if (depth === 1) return 'bold';
    if (depth === 2) return 'semibold';
    if (depth === 3) return 'normal';
    return 'normal';
  };

  return (
    <>
      {/* Overlay when menu is open */}
      {opened && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setOpened(false)}
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.2)',
            backdropFilter: 'blur(2px)',
            WebkitBackdropFilter: 'blur(2px)',
          }}
        />
      )}

      <div className="fixed right-6 bottom-20 z-50">
        <Menu
          opened={opened}
          onChange={setOpened}
          shadow="md"
          width={280}
          position="top-end"
          styles={{
            dropdown: {
              backgroundColor: 'var(--catppuccin-surface0)',
              border: `1px solid var(--catppuccin-surface1)`,
              borderRadius: '8px',
              maxHeight: '550px',
              overflow: 'hidden',
              boxShadow:
                '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
            },
          }}
        >
          <Menu.Target>
            <ActionIcon
              variant="light"
              size="xl"
              radius="xl"
              style={{
                backgroundColor: 'var(--catppuccin-surface0)',
                color: 'var(--catppuccin-text)',
                border: '1px solid var(--catppuccin-surface1)',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
              }}
              aria-label="Table of Contents"
              title="Table of Contents"
            >
              <IconList size={24} />
            </ActionIcon>
          </Menu.Target>

          <Menu.Dropdown>
            <Menu.Label
              style={{
                color: 'var(--catppuccin-text)',
                fontWeight: 600,
                fontSize: '14px',
              }}
            >
              Table of Contents
            </Menu.Label>

            <ScrollArea
              style={{
                height: '550px',
              }}
              className={styles.scrollArea}
            >
              <div className="p-2 pr-4">
                <TableOfContents
                  minDepthToOffset={0}
                  depthOffset={40}
                  size="xs"
                  radius="md"
                  variant="light"
                  color="lavender"
                  reinitializeRef={reinitializeRef}
                  scrollSpyOptions={{
                    selector: ':is(h1, h2, h3)',
                  }}
                  getControlProps={({ data }) => ({
                    href: `#${data.id}`,
                    component: 'a',
                    color: 'lavender',
                    className: 'hover:!bg-[var(--toc-bg)] hover:!text-[var(--toc-color)]',
                    children: (
                      <Text size={getSize(data.depth)} fw={getWeight(data.depth)} color="text">
                        {data.value}
                      </Text>
                    ),
                  })}
                />
              </div>
            </ScrollArea>
          </Menu.Dropdown>
        </Menu>
      </div>
    </>
  );
}
