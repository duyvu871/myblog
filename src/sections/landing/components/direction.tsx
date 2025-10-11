'use client';

import { useState, useEffect } from 'react';
import { Box, ActionIcon, Tooltip, Stack, Text, Group } from '@mantine/core';
import {
  IconHome,
  IconBook,
  IconTags,
  IconUser,
  IconCode,
  IconBrandGithub,
} from '@tabler/icons-react';

interface DockItem {
  id: string;
  icon: React.ReactNode;
  label: string;
  sectionId: string;
}

const dockItems: DockItem[] = [
  {
    id: 'hero',
    icon: <IconHome size={20} />,
    label: 'Home',
    sectionId: 'hero',
  },
  {
    id: 'featured-posts',
    icon: <IconBook size={20} />,
    label: 'Latest Notes',
    sectionId: 'featured-posts',
  },
  {
    id: 'categories',
    icon: <IconTags size={20} />,
    label: 'Topics',
    sectionId: 'categories',
  },
  {
    id: 'about',
    icon: <IconUser size={20} />,
    label: 'About',
    sectionId: 'about',
  },
  {
    id: 'tech-stack',
    icon: <IconCode size={20} />,
    label: 'Tech Stack',
    sectionId: 'tech-stack',
  },
  //   {
  //     id: 'footer',
  //     icon: <IconBrandGithub size={20} />,
  //     label: 'Contact',
  //     sectionId: 'footer',
  //   },
];

export function DirectionDock() {
  const [activeSection, setActiveSection] = useState<string>('');

  // Track which section is currently in view
  useEffect(() => {
    const handleScroll = () => {
      const sections = dockItems.map((item) => item.sectionId);
      const currentSection = sections.find((section) => {
        const element = document.getElementById(section);
        if (!element) return false;

        const rect = element.getBoundingClientRect();
        // Check if section is in viewport (with some buffer)
        return rect.top <= 100 && rect.bottom >= 100;
      });

      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial position

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 20; // Account for any fixed header
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <Box
      style={{
        position: 'fixed',
        bottom: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: 'fit-content',
        zIndex: 1000,
        backgroundColor: 'var(--catppuccin-surface0)',
        borderRadius: '20px',
        padding: '10px 10px',
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)',
        border: '1px solid var(--catppuccin-surface1)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
      }}
    >
      <Group gap="8px" align="center" wrap="nowrap" pos={'relative'}>
        {dockItems.map((item) => (
          <Tooltip
            key={item.id}
            label={item.label}
            position="top"
            zIndex={1002}
            offset={15}
            arrowPosition="center"
            style={{
              backgroundColor: 'var(--catppuccin-surface1)',
              color: 'var(--catppuccin-text)',
              fontSize: '12px',
              borderRadius: '10px',
            }}
          >
            <ActionIcon
              size="lg"
              radius="10px"
              variant={activeSection === item.sectionId ? 'filled' : 'subtle'}
              style={{
                backgroundColor:
                  activeSection === item.sectionId ? 'var(--catppuccin-blue)' : 'transparent',
                color:
                  activeSection === item.sectionId
                    ? 'var(--catppuccin-base)'
                    : 'var(--catppuccin-text)',
                border:
                  activeSection === item.sectionId
                    ? 'none'
                    : '1px solid var(--catppuccin-surface1)',
                transition: 'all 0.2s ease',
                transform: activeSection === item.sectionId ? 'scale(1.1)' : 'scale(1)',
                '&:hover': {
                  backgroundColor:
                    activeSection === item.sectionId
                      ? 'var(--catppuccin-blue)'
                      : 'var(--catppuccin-surface1)',
                  transform: 'scale(1.05)',
                },
              }}
              onClick={() => scrollToSection(item.sectionId)}
            >
              {item.icon}
            </ActionIcon>
          </Tooltip>
        ))}
      </Group>
    </Box>
  );
}
