import { createTheme, MantineTheme } from '@mantine/core';

// Catppuccin color variables - can be changed dynamically
const catppuccinColors = {
  rosewater: 'var(--catppuccin-rosewater, #f5e0dc)',
  flamingo: 'var(--catppuccin-flamingo, #f2cdcd)',
  pink: 'var(--catppuccin-pink, #f5c2e7)',
  mauve: 'var(--catppuccin-mauve, #cba6f7)',
  red: 'var(--catppuccin-red, #f38ba8)',
  maroon: 'var(--catppuccin-maroon, #eba0ac)',
  peach: 'var(--catppuccin-peach, #fab387)',
  yellow: 'var(--catppuccin-yellow, #f9e2af)',
  green: 'var(--catppuccin-green, #a6e3a1)',
  teal: 'var(--catppuccin-teal, #94e2d5)',
  sky: 'var(--catppuccin-sky, #89dceb)',
  sapphire: 'var(--catppuccin-sapphire, #74c7ec)',
  blue: 'var(--catppuccin-blue, #89b4fa)',
  lavender: 'var(--catppuccin-lavender, #b4befe)',
  text: 'var(--catppuccin-text, #cdd6f4)',
  subtext1: 'var(--catppuccin-subtext1, #bac2de)',
  subtext0: 'var(--catppuccin-subtext0, #a6adc8)',
  overlay2: 'var(--catppuccin-overlay2, #9399b2)',
  overlay1: 'var(--catppuccin-overlay1, #7f849c)',
  overlay0: 'var(--catppuccin-overlay0, #6c7086)',
  surface2: 'var(--catppuccin-surface2, #585b70)',
  surface1: 'var(--catppuccin-surface1, #45475a)',
  surface0: 'var(--catppuccin-surface0, #313244)',
  base: 'var(--catppuccin-base, #1e1e2e)',
  mantle: 'var(--catppuccin-mantle, #181825)',
  crust: 'var(--catppuccin-crust, #11111b)',
} as const;

export const theme = createTheme({
  // Color palette - Use Catppuccin colors for semantic roles
  colors: {
    // Create explicit tuples with the same color for all shades (Catppuccin style)
    text: [
      catppuccinColors.text,
      catppuccinColors.text,
      catppuccinColors.text,
      catppuccinColors.text,
      catppuccinColors.text,
      catppuccinColors.text,
      catppuccinColors.text,
      catppuccinColors.text,
      catppuccinColors.text,
      catppuccinColors.text,
    ],
    subtext1: [
      catppuccinColors.subtext1,
      catppuccinColors.subtext1,
      catppuccinColors.subtext1,
      catppuccinColors.subtext1,
      catppuccinColors.subtext1,
      catppuccinColors.subtext1,
      catppuccinColors.subtext1,
      catppuccinColors.subtext1,
      catppuccinColors.subtext1,
      catppuccinColors.subtext1,
    ],
    subtext0: [
      catppuccinColors.subtext0,
      catppuccinColors.subtext0,
      catppuccinColors.subtext0,
      catppuccinColors.subtext0,
      catppuccinColors.subtext0,
      catppuccinColors.subtext0,
      catppuccinColors.subtext0,
      catppuccinColors.subtext0,
      catppuccinColors.subtext0,
      catppuccinColors.subtext0,
    ],
    overlay2: [
      catppuccinColors.overlay2,
      catppuccinColors.overlay2,
      catppuccinColors.overlay2,
      catppuccinColors.overlay2,
      catppuccinColors.overlay2,
      catppuccinColors.overlay2,
      catppuccinColors.overlay2,
      catppuccinColors.overlay2,
      catppuccinColors.overlay2,
      catppuccinColors.overlay2,
    ],
    overlay1: [
      catppuccinColors.overlay1,
      catppuccinColors.overlay1,
      catppuccinColors.overlay1,
      catppuccinColors.overlay1,
      catppuccinColors.overlay1,
      catppuccinColors.overlay1,
      catppuccinColors.overlay1,
      catppuccinColors.overlay1,
      catppuccinColors.overlay1,
      catppuccinColors.overlay1,
    ],
    overlay0: [
      catppuccinColors.overlay0,
      catppuccinColors.overlay0,
      catppuccinColors.overlay0,
      catppuccinColors.overlay0,
      catppuccinColors.overlay0,
      catppuccinColors.overlay0,
      catppuccinColors.overlay0,
      catppuccinColors.overlay0,
      catppuccinColors.overlay0,
      catppuccinColors.overlay0,
    ],
    surface2: [
      catppuccinColors.surface2,
      catppuccinColors.surface2,
      catppuccinColors.surface2,
      catppuccinColors.surface2,
      catppuccinColors.surface2,
      catppuccinColors.surface2,
      catppuccinColors.surface2,
      catppuccinColors.surface2,
      catppuccinColors.surface2,
      catppuccinColors.surface2,
    ],
    surface1: [
      catppuccinColors.surface1,
      catppuccinColors.surface1,
      catppuccinColors.surface1,
      catppuccinColors.surface1,
      catppuccinColors.surface1,
      catppuccinColors.surface1,
      catppuccinColors.surface1,
      catppuccinColors.surface1,
      catppuccinColors.surface1,
      catppuccinColors.surface1,
    ],
    surface0: [
      catppuccinColors.surface0,
      catppuccinColors.surface0,
      catppuccinColors.surface0,
      catppuccinColors.surface0,
      catppuccinColors.surface0,
      catppuccinColors.surface0,
      catppuccinColors.surface0,
      catppuccinColors.surface0,
      catppuccinColors.surface0,
      catppuccinColors.surface0,
    ],
    base: [
      catppuccinColors.base,
      catppuccinColors.base,
      catppuccinColors.base,
      catppuccinColors.base,
      catppuccinColors.base,
      catppuccinColors.base,
      catppuccinColors.base,
      catppuccinColors.base,
      catppuccinColors.base,
      catppuccinColors.base,
    ],
    mantle: [
      catppuccinColors.mantle,
      catppuccinColors.mantle,
      catppuccinColors.mantle,
      catppuccinColors.mantle,
      catppuccinColors.mantle,
      catppuccinColors.mantle,
      catppuccinColors.mantle,
      catppuccinColors.mantle,
      catppuccinColors.mantle,
      catppuccinColors.mantle,
    ],
    crust: [
      catppuccinColors.crust,
      catppuccinColors.crust,
      catppuccinColors.crust,
      catppuccinColors.crust,
      catppuccinColors.crust,
      catppuccinColors.crust,
      catppuccinColors.crust,
      catppuccinColors.crust,
      catppuccinColors.crust,
      catppuccinColors.crust,
    ],
    blue: [
      catppuccinColors.blue,
      catppuccinColors.blue,
      catppuccinColors.blue,
      catppuccinColors.blue,
      catppuccinColors.blue,
      catppuccinColors.blue,
      catppuccinColors.blue,
      catppuccinColors.blue,
      catppuccinColors.blue,
      catppuccinColors.blue,
    ],
    green: [
      catppuccinColors.green,
      catppuccinColors.green,
      catppuccinColors.green,
      catppuccinColors.green,
      catppuccinColors.green,
      catppuccinColors.green,
      catppuccinColors.green,
      catppuccinColors.green,
      catppuccinColors.green,
      catppuccinColors.green,
    ],
    red: [
      catppuccinColors.red,
      catppuccinColors.red,
      catppuccinColors.red,
      catppuccinColors.red,
      catppuccinColors.red,
      catppuccinColors.red,
      catppuccinColors.red,
      catppuccinColors.red,
      catppuccinColors.red,
      catppuccinColors.red,
    ],
    yellow: [
      catppuccinColors.yellow,
      catppuccinColors.yellow,
      catppuccinColors.yellow,
      catppuccinColors.yellow,
      catppuccinColors.yellow,
      catppuccinColors.yellow,
      catppuccinColors.yellow,
      catppuccinColors.yellow,
      catppuccinColors.yellow,
      catppuccinColors.yellow,
    ],
    orange: [
      catppuccinColors.peach,
      catppuccinColors.peach,
      catppuccinColors.peach,
      catppuccinColors.peach,
      catppuccinColors.peach,
      catppuccinColors.peach,
      catppuccinColors.peach,
      catppuccinColors.peach,
      catppuccinColors.peach,
      catppuccinColors.peach,
    ],
    gray: [
      catppuccinColors.overlay0,
      catppuccinColors.overlay0,
      catppuccinColors.overlay0,
      catppuccinColors.overlay0,
      catppuccinColors.overlay0,
      catppuccinColors.overlay0,
      catppuccinColors.overlay0,
      catppuccinColors.overlay0,
      catppuccinColors.overlay0,
      catppuccinColors.overlay0,
    ],
    lavender: [
      catppuccinColors.lavender,
      catppuccinColors.lavender,
      catppuccinColors.lavender,
      catppuccinColors.lavender,
      catppuccinColors.lavender,
      catppuccinColors.lavender,
      catppuccinColors.lavender,
      catppuccinColors.lavender,
      catppuccinColors.lavender,
      catppuccinColors.lavender,
    ],
    // Semantic colors map to Catppuccin equivalents
    primary: [
      catppuccinColors.lavender,
      catppuccinColors.lavender,
      catppuccinColors.lavender,
      catppuccinColors.lavender,
      catppuccinColors.lavender,
      catppuccinColors.lavender,
      catppuccinColors.lavender,
      catppuccinColors.lavender,
      catppuccinColors.lavender,
      catppuccinColors.lavender,
    ],
    secondary: [
      catppuccinColors.overlay0,
      catppuccinColors.overlay0,
      catppuccinColors.overlay0,
      catppuccinColors.overlay0,
      catppuccinColors.overlay0,
      catppuccinColors.overlay0,
      catppuccinColors.overlay0,
      catppuccinColors.overlay0,
      catppuccinColors.overlay0,
      catppuccinColors.overlay0,
    ],
    success: [
      catppuccinColors.green,
      catppuccinColors.green,
      catppuccinColors.green,
      catppuccinColors.green,
      catppuccinColors.green,
      catppuccinColors.green,
      catppuccinColors.green,
      catppuccinColors.green,
      catppuccinColors.green,
      catppuccinColors.green,
    ],
    error: [
      catppuccinColors.red,
      catppuccinColors.red,
      catppuccinColors.red,
      catppuccinColors.red,
      catppuccinColors.red,
      catppuccinColors.red,
      catppuccinColors.red,
      catppuccinColors.red,
      catppuccinColors.red,
      catppuccinColors.red,
    ],
    warning: [
      catppuccinColors.yellow,
      catppuccinColors.yellow,
      catppuccinColors.yellow,
      catppuccinColors.yellow,
      catppuccinColors.yellow,
      catppuccinColors.yellow,
      catppuccinColors.yellow,
      catppuccinColors.yellow,
      catppuccinColors.yellow,
      catppuccinColors.yellow,
    ],
    info: [
      catppuccinColors.blue,
      catppuccinColors.blue,
      catppuccinColors.blue,
      catppuccinColors.blue,
      catppuccinColors.blue,
      catppuccinColors.blue,
      catppuccinColors.blue,
      catppuccinColors.blue,
      catppuccinColors.blue,
      catppuccinColors.blue,
    ],
    rosewater: [
      catppuccinColors.rosewater,
      catppuccinColors.rosewater,
      catppuccinColors.rosewater,
      catppuccinColors.rosewater,
      catppuccinColors.rosewater,
      catppuccinColors.rosewater,
      catppuccinColors.rosewater,
      catppuccinColors.rosewater,
      catppuccinColors.rosewater,
      catppuccinColors.rosewater,
    ],
    flamingo: [
      catppuccinColors.flamingo,
      catppuccinColors.flamingo,
      catppuccinColors.flamingo,
      catppuccinColors.flamingo,
      catppuccinColors.flamingo,
      catppuccinColors.flamingo,
      catppuccinColors.flamingo,
      catppuccinColors.flamingo,
      catppuccinColors.flamingo,
      catppuccinColors.flamingo,
    ],
    pink: [
      catppuccinColors.pink,
      catppuccinColors.pink,
      catppuccinColors.pink,
      catppuccinColors.pink,
      catppuccinColors.pink,
      catppuccinColors.pink,
      catppuccinColors.pink,
      catppuccinColors.pink,
      catppuccinColors.pink,
      catppuccinColors.pink,
    ],
    mauve: [
      catppuccinColors.mauve,
      catppuccinColors.mauve,
      catppuccinColors.mauve,
      catppuccinColors.mauve,
      catppuccinColors.mauve,
      catppuccinColors.mauve,
      catppuccinColors.mauve,
      catppuccinColors.mauve,
      catppuccinColors.mauve,
      catppuccinColors.mauve,
    ],
    maroon: [
      catppuccinColors.maroon,
      catppuccinColors.maroon,
      catppuccinColors.maroon,
      catppuccinColors.maroon,
      catppuccinColors.maroon,
      catppuccinColors.maroon,
      catppuccinColors.maroon,
      catppuccinColors.maroon,
      catppuccinColors.maroon,
      catppuccinColors.maroon,
    ],
    peach: [
      catppuccinColors.peach,
      catppuccinColors.peach,
      catppuccinColors.peach,
      catppuccinColors.peach,
      catppuccinColors.peach,
      catppuccinColors.peach,
      catppuccinColors.peach,
      catppuccinColors.peach,
      catppuccinColors.peach,
      catppuccinColors.peach,
    ],
    teal: [
      catppuccinColors.teal,
      catppuccinColors.teal,
      catppuccinColors.teal,
      catppuccinColors.teal,
      catppuccinColors.teal,
      catppuccinColors.teal,
      catppuccinColors.teal,
      catppuccinColors.teal,
      catppuccinColors.teal,
      catppuccinColors.teal,
    ],
    sky: [
      catppuccinColors.sky,
      catppuccinColors.sky,
      catppuccinColors.sky,
      catppuccinColors.sky,
      catppuccinColors.sky,
      catppuccinColors.sky,
      catppuccinColors.sky,
      catppuccinColors.sky,
      catppuccinColors.sky,
      catppuccinColors.sky,
    ],
    sapphire: [
      catppuccinColors.sapphire,
      catppuccinColors.sapphire,
      catppuccinColors.sapphire,
      catppuccinColors.sapphire,
      catppuccinColors.sapphire,
      catppuccinColors.sapphire,
      catppuccinColors.sapphire,
      catppuccinColors.sapphire,
      catppuccinColors.sapphire,
      catppuccinColors.sapphire,
    ],
  },

  // Primary color
  primaryColor: 'lavender',

  // Font family
  fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
  fontFamilyMonospace: 'JetBrains Mono, ui-monospace, SFMono-Regular, monospace',

  // Global styles
  defaultRadius: 'md',

  // Component-specific theme overrides
  components: {
    Button: {
      defaultProps: {
        variant: 'filled',
        size: 'md',
      },
      styles: {
        root: {
          borderRadius: '6px',
          fontWeight: 500,
          transition: 'all 0.2s ease',
          '&:hover': {
            filter: 'brightness(1.1)',
            transform: 'translateY(-1px)',
          },
          '&:active': {
            transform: 'translateY(0)',
            filter: 'brightness(0.95)',
          },
        },
      },
    },

    ActionIcon: {
      styles: {
        root: {
          transition: 'all 0.2s ease',
          '&:hover': {
            transform: 'scale(1.05)',
          },
          '&:active': {
            transform: 'scale(0.95)',
          },
        },
      },
    },

    Badge: {
      styles: {
        root: {
          borderRadius: '4px',
          fontWeight: 600,
        },
      },
    },

    Chip: {
      styles: {
        root: {
          backgroundColor: catppuccinColors.mantle,
          borderColor: catppuccinColors.surface1,
          color: catppuccinColors.text,
          borderRadius: '6px',
          '&[data-checked]': {
            backgroundColor: catppuccinColors.blue,
            color: catppuccinColors.base,
            borderColor: catppuccinColors.blue,
          },
          '&:hover': {
            backgroundColor: catppuccinColors.surface0,
          },
        },
        checkIcon: {
          color: 'inherit',
        },
      },
    },

    // Form Components
    TextInput: {
      styles: {
        input: {
          backgroundColor: catppuccinColors.mantle,
          borderColor: catppuccinColors.surface1,
          color: catppuccinColors.text,
          '&:focus': {
            borderColor: catppuccinColors.blue,
            boxShadow: `0 0 0 2px ${catppuccinColors.blue}20`,
          },
          '&:hover': {
            borderColor: catppuccinColors.overlay0,
          },
        },
        label: {
          color: catppuccinColors.text,
          fontWeight: 500,
        },
        description: {
          color: catppuccinColors.subtext1,
        },
        error: {
          color: catppuccinColors.red,
        },
      },
    },

    PasswordInput: {
      styles: {
        input: {
          backgroundColor: catppuccinColors.mantle,
          borderColor: catppuccinColors.surface1,
          color: catppuccinColors.text,
          '&:focus': {
            borderColor: catppuccinColors.blue,
            boxShadow: `0 0 0 2px ${catppuccinColors.blue}20`,
          },
          '&:hover': {
            borderColor: catppuccinColors.overlay0,
          },
        },
        label: {
          color: catppuccinColors.text,
          fontWeight: 500,
        },
        description: {
          color: catppuccinColors.subtext1,
        },
        error: {
          color: catppuccinColors.red,
        },
      },
    },

    NumberInput: {
      styles: {
        input: {
          backgroundColor: catppuccinColors.mantle,
          borderColor: catppuccinColors.surface1,
          color: catppuccinColors.text,
          '&:focus': {
            borderColor: catppuccinColors.blue,
            boxShadow: `0 0 0 2px ${catppuccinColors.blue}20`,
          },
          '&:hover': {
            borderColor: catppuccinColors.overlay0,
          },
        },
        label: {
          color: catppuccinColors.text,
          fontWeight: 500,
        },
        description: {
          color: catppuccinColors.subtext1,
        },
        error: {
          color: catppuccinColors.red,
        },
        control: {
          backgroundColor: catppuccinColors.mantle,
          borderColor: catppuccinColors.surface1,
          color: catppuccinColors.text,
          '&:hover': {
            backgroundColor: catppuccinColors.surface0,
          },
        },
      },
    },

    Textarea: {
      styles: {
        input: {
          backgroundColor: catppuccinColors.mantle,
          borderColor: catppuccinColors.surface1,
          color: catppuccinColors.text,
          '&:focus': {
            borderColor: catppuccinColors.blue,
            boxShadow: `0 0 0 2px ${catppuccinColors.blue}20`,
          },
          '&:hover': {
            borderColor: catppuccinColors.overlay0,
          },
        },
        label: {
          color: catppuccinColors.text,
          fontWeight: 500,
        },
        description: {
          color: catppuccinColors.subtext1,
        },
        error: {
          color: catppuccinColors.red,
        },
      },
    },

    Checkbox: {
      styles: {
        input: {
          backgroundColor: catppuccinColors.mantle,
          borderColor: catppuccinColors.surface1,
          '&:checked': {
            backgroundColor: catppuccinColors.blue,
            borderColor: catppuccinColors.blue,
          },
          '&:focus': {
            borderColor: catppuccinColors.blue,
            boxShadow: `0 0 0 2px ${catppuccinColors.blue}20`,
          },
        },
        label: {
          color: catppuccinColors.text,
        },
        description: {
          color: catppuccinColors.subtext1,
        },
        error: {
          color: catppuccinColors.red,
        },
      },
    },

    Radio: {
      styles: {
        radio: {
          backgroundColor: catppuccinColors.mantle,
          borderColor: catppuccinColors.surface1,
          '&:checked': {
            backgroundColor: catppuccinColors.blue,
            borderColor: catppuccinColors.blue,
          },
          '&:focus': {
            borderColor: catppuccinColors.blue,
            boxShadow: `0 0 0 2px ${catppuccinColors.blue}20`,
          },
        },
        label: {
          color: catppuccinColors.text,
        },
        description: {
          color: catppuccinColors.subtext1,
        },
        error: {
          color: catppuccinColors.red,
        },
      },
    },

    Switch: {
      styles: {
        track: {
          backgroundColor: catppuccinColors.surface1,
          '&[data-checked]': {
            backgroundColor: catppuccinColors.blue,
          },
        },
        thumb: {
          backgroundColor: catppuccinColors.mantle,
          borderColor: catppuccinColors.surface1,
          '&[data-checked]': {
            backgroundColor: catppuccinColors.base,
          },
        },
        label: {
          color: catppuccinColors.text,
        },
        description: {
          color: catppuccinColors.subtext1,
        },
        error: {
          color: catppuccinColors.red,
        },
      },
    },

    FileInput: {
      styles: {
        input: {
          backgroundColor: catppuccinColors.mantle,
          borderColor: catppuccinColors.surface1,
          color: catppuccinColors.text,
          '&:focus': {
            borderColor: catppuccinColors.blue,
            boxShadow: `0 0 0 2px ${catppuccinColors.blue}20`,
          },
          '&:hover': {
            borderColor: catppuccinColors.overlay0,
          },
        },
        label: {
          color: catppuccinColors.text,
          fontWeight: 500,
        },
        description: {
          color: catppuccinColors.subtext1,
        },
        error: {
          color: catppuccinColors.red,
        },
        placeholder: {
          color: catppuccinColors.subtext1,
        },
      },
    },

    ColorInput: {
      styles: {
        input: {
          backgroundColor: catppuccinColors.mantle,
          borderColor: catppuccinColors.surface1,
          color: catppuccinColors.text,
          '&:focus': {
            borderColor: catppuccinColors.blue,
            boxShadow: `0 0 0 2px ${catppuccinColors.blue}20`,
          },
          '&:hover': {
            borderColor: catppuccinColors.overlay0,
          },
        },
        label: {
          color: catppuccinColors.text,
          fontWeight: 500,
        },
        description: {
          color: catppuccinColors.subtext1,
        },
        error: {
          color: catppuccinColors.red,
        },
        preview: {
          borderColor: catppuccinColors.surface1,
        },
      },
    },

    Select: {
      styles: {
        input: {
          backgroundColor: catppuccinColors.mantle,
          borderColor: catppuccinColors.surface1,
          color: catppuccinColors.text,
          '&:focus': {
            borderColor: catppuccinColors.blue,
            boxShadow: `0 0 0 2px ${catppuccinColors.blue}20`,
          },
          '&:hover': {
            borderColor: catppuccinColors.overlay0,
          },
        },
        dropdown: {
          backgroundColor: catppuccinColors.mantle,
          borderColor: catppuccinColors.surface1,
        },
        option: {
          color: catppuccinColors.text,
          '&[data-selected]': {
            backgroundColor: catppuccinColors.blue,
            color: catppuccinColors.base,
          },
          '&:hover': {
            backgroundColor: catppuccinColors.surface0,
          },
        },
      },
    },

    Modal: {
      styles: {
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
          backdropFilter: 'blur(4px)',
        },
        content: {
          backgroundColor: catppuccinColors.mantle,
          borderColor: catppuccinColors.surface1,
          color: catppuccinColors.text,
        },
        header: {
          backgroundColor: catppuccinColors.mantle,
          borderColor: catppuccinColors.surface1,
          color: catppuccinColors.text,
        },
        title: {
          color: catppuccinColors.text,
          fontWeight: 600,
        },
        body: {
          color: catppuccinColors.text,
        },
        close: {
          color: catppuccinColors.text,
          '&:hover': {
            backgroundColor: catppuccinColors.surface0,
          },
        },
      },
    },

    Notification: {
      styles: (theme: MantineTheme, props: any) => ({
        root: {
          backgroundColor: catppuccinColors.mantle,
          borderColor: catppuccinColors.surface1,
          color: catppuccinColors.text,
          boxShadow: theme.shadows.lg,
        },
        title: {
          color: catppuccinColors.text,
          fontWeight: 600,
        },
        description: {
          color: catppuccinColors.subtext1,
        },
        closeButton: {
          color: catppuccinColors.text,
          '&:hover': {
            backgroundColor: catppuccinColors.surface0,
          },
        },
        icon: {
          backgroundColor: catppuccinColors.blue,
          color: catppuccinColors.base,
        },
      }),
    },

    Alert: {
      styles: (theme: MantineTheme, props: any) => ({
        root: {
          backgroundColor: catppuccinColors.mantle,
          borderColor: catppuccinColors.surface1,
          color: catppuccinColors.text,
        },
        title: {
          color: 'inherit',
          fontWeight: 600,
        },
        message: {
          color: 'inherit',
        },
        closeButton: {
          color: 'inherit',
          '&:hover': {
            backgroundColor: catppuccinColors.surface0,
          },
        },
      }),
    },

    Tabs: {
      styles: {
        tab: {
          color: catppuccinColors.text,
          borderColor: catppuccinColors.surface1,
          '&[data-active]': {
            backgroundColor: catppuccinColors.blue,
            color: catppuccinColors.base,
            borderColor: catppuccinColors.blue,
          },
          '&:hover': {
            backgroundColor: catppuccinColors.surface0,
            borderColor: catppuccinColors.surface1,
          },
        },
        list: {
          borderColor: catppuccinColors.surface1,
        },
      },
    },

    // Navigation Components
    Breadcrumbs: {
      styles: {
        breadcrumb: {
          color: catppuccinColors.text,
          '&:hover': {
            color: catppuccinColors.blue,
          },
        },
        separator: {
          color: catppuccinColors.subtext0,
        },
      },
    },

    Pagination: {
      styles: {
        control: {
          backgroundColor: catppuccinColors.mantle,
          borderColor: catppuccinColors.surface1,
          color: catppuccinColors.text,
          '&[data-active]': {
            backgroundColor: catppuccinColors.blue,
            borderColor: catppuccinColors.blue,
            color: catppuccinColors.base,
          },
          '&:hover': {
            backgroundColor: catppuccinColors.surface0,
            borderColor: catppuccinColors.surface1,
          },
          '&:disabled': {
            backgroundColor: catppuccinColors.mantle,
            borderColor: catppuccinColors.surface1,
            color: catppuccinColors.subtext0,
            '&:hover': {
              backgroundColor: catppuccinColors.mantle,
            },
          },
        },
      },
    },

    Stepper: {
      styles: {
        step: {
          '& .mantine-Stepper-stepIcon': {
            backgroundColor: catppuccinColors.mantle,
            borderColor: catppuccinColors.surface1,
            color: catppuccinColors.text,
          },
          '&[data-progress]': {
            '& .mantine-Stepper-stepIcon': {
              backgroundColor: catppuccinColors.blue,
              borderColor: catppuccinColors.blue,
              color: catppuccinColors.base,
            },
          },
          '&[data-completed]': {
            '& .mantine-Stepper-stepIcon': {
              backgroundColor: catppuccinColors.green,
              borderColor: catppuccinColors.green,
              color: catppuccinColors.base,
            },
          },
        },
        stepLabel: {
          color: catppuccinColors.text,
        },
        stepDescription: {
          color: catppuccinColors.subtext1,
        },
        separator: {
          backgroundColor: catppuccinColors.surface1,
        },
      },
    },

    // Overlay Components
    Drawer: {
      styles: {
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
          backdropFilter: 'blur(4px)',
        },
        content: {
          backgroundColor: catppuccinColors.mantle,
          borderColor: catppuccinColors.surface1,
          color: catppuccinColors.text,
        },
        header: {
          backgroundColor: catppuccinColors.mantle,
          borderColor: catppuccinColors.surface1,
          color: catppuccinColors.text,
        },
        title: {
          color: catppuccinColors.text,
          fontWeight: 600,
        },
        body: {
          color: catppuccinColors.text,
        },
        close: {
          color: catppuccinColors.text,
          '&:hover': {
            backgroundColor: catppuccinColors.surface0,
          },
        },
      },
    },

    Popover: {
      styles: {
        dropdown: {
          backgroundColor: catppuccinColors.mantle,
          borderColor: catppuccinColors.surface1,
          color: catppuccinColors.text,
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.14)',
        },
        arrow: {
          borderColor: catppuccinColors.surface1,
          '&::before': {
            backgroundColor: catppuccinColors.mantle,
          },
        },
      },
    },

    Tooltip: {
      styles: {
        tooltip: {
          backgroundColor: catppuccinColors.mantle,
          borderColor: catppuccinColors.surface1,
          color: catppuccinColors.text,
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.14)',
        },
        arrow: {
          borderColor: catppuccinColors.surface1,
          '&::before': {
            backgroundColor: catppuccinColors.mantle,
          },
        },
      },
    },

    Menu: {
      styles: {
        dropdown: {
          backgroundColor: catppuccinColors.mantle,
          borderColor: catppuccinColors.surface1,
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.14)',
        },
        item: {
          color: catppuccinColors.text,
        },
        itemLabel: {
          color: 'inherit',
        },
        itemSection: {
          color: catppuccinColors.subtext0,
        },
        divider: {
          borderColor: catppuccinColors.surface1,
        },
        label: {
          color: catppuccinColors.subtext1,
          fontWeight: 500,
        },
      },
      classNames: {
        item: 'hover:!bg-[var(--catppuccin-surface0)] mt-1',
      },
    },

    // Data Display Components
    Accordion: {
      styles: {
        control: {
          backgroundColor: catppuccinColors.mantle,
          color: catppuccinColors.text,
          borderColor: catppuccinColors.surface1,
          '&:where(:hover, :focus)': {
            backgroundColor: catppuccinColors.surface0,
          },
          '&:where([data-active], :focus)': {
            backgroundColor: catppuccinColors.surface0,
            color: catppuccinColors.blue,
          },
        },
        panel: {
          backgroundColor: catppuccinColors.mantle,
          borderColor: catppuccinColors.surface1,
          color: catppuccinColors.text,
        },
        chevron: {
          color: catppuccinColors.subtext0,
        },
        label: {
          color: 'inherit',
        },
      },
    },

    Avatar: {
      styles: {
        root: {
          backgroundColor: catppuccinColors.surface0,
          color: catppuccinColors.text,
          borderColor: catppuccinColors.surface1,
        },
      },
    },

    Image: {
      styles: {
        root: {
          borderRadius: '6px',
        },
      },
    },

    // Feedback Components
    Progress: {
      styles: {
        bar: {
          backgroundColor: catppuccinColors.blue,
        },
        root: {
          backgroundColor: catppuccinColors.surface1,
        },
        label: {
          color: catppuccinColors.text,
        },
      },
    },

    RingProgress: {
      styles: {
        root: {
          '--progress-color': catppuccinColors.blue,
        },
        label: {
          color: catppuccinColors.text,
        },
      },
    },

    SemiCircleProgress: {
      styles: {
        root: {
          '--progress-color': catppuccinColors.blue,
        },
        label: {
          color: catppuccinColors.text,
        },
      },
    },

    Skeleton: {
      styles: {
        root: {
          backgroundColor: catppuccinColors.surface1,
          '&::after': {
            background: `linear-gradient(90deg, transparent, ${catppuccinColors.surface0}, transparent)`,
          },
        },
      },
    },

    Loader: {
      styles: {
        root: {
          color: catppuccinColors.blue,
        },
      },
    },

    // Layout Components
    Paper: {
      styles: {
        root: {
          backgroundColor: catppuccinColors.mantle,
          borderColor: catppuccinColors.surface1,
          color: catppuccinColors.text,
        },
      },
    },

    Card: {
      styles: {
        root: {
          backgroundColor: catppuccinColors.mantle,
          borderColor: catppuccinColors.surface1,
          color: catppuccinColors.text,
        },
      },
    },

    Divider: {
      styles: {
        root: {
          borderColor: catppuccinColors.surface1,
        },
      },
    },

    ScrollArea: {
      styles: {
        scrollbar: {
          backgroundColor: catppuccinColors.surface1,
        },
        thumb: {
          backgroundColor: catppuccinColors.overlay0,
          '&:hover': {
            backgroundColor: catppuccinColors.overlay1,
          },
        },
      },
    },

    // Typography Components
    Anchor: {
      styles: {
        root: {
          color: catppuccinColors.blue,
          textDecorationColor: catppuccinColors.blue,
          '&:hover': {
            color: catppuccinColors.sapphire,
            textDecorationColor: catppuccinColors.sapphire,
          },
        },
      },
    },

    Code: {
      styles: {
        root: {
          backgroundColor: catppuccinColors.surface0,
          color: catppuccinColors.text,
          //   border: `1px solid ${catppuccinColors.surface1}`,
        },
      },
    },

    Kbd: {
      styles: {
        root: {
          backgroundColor: catppuccinColors.surface0,
          color: catppuccinColors.text,
          border: `1px solid ${catppuccinColors.surface1}`,
          borderRadius: '6px',
          fontWeight: 600,
          fontFamily:
            'ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace',
          letterSpacing: '0.025em',
          boxShadow: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
        },
      },
    },

    Blockquote: {
      styles: {
        root: {
          borderLeftColor: catppuccinColors.blue,
          backgroundColor: catppuccinColors.surface0,
          color: catppuccinColors.text,
        },
      },
    },

    Table: {
      styles: {
        th: {
          backgroundColor: catppuccinColors.mantle,
          color: catppuccinColors.text,
          borderColor: catppuccinColors.surface1,
          fontWeight: 600,
        },
        td: {
          borderColor: catppuccinColors.surface1,
          color: catppuccinColors.text,
        },
        tr: {
          '&:hover': {
            backgroundColor: catppuccinColors.surface0,
          },
        },
        tbody: {
          '& tr:nthOfType(even)': {
            backgroundColor: catppuccinColors.mantle,
          },
        },
      },
      classNames: {
        tr: '[data-striped="odd"]:bg-[var(--catppuccin-surface0)]',
      },
    },

    // Additional Interactive Components
    SegmentedControl: {
      styles: {
        root: {
          backgroundColor: catppuccinColors.mantle,
          borderColor: catppuccinColors.surface1,
        },
        control: {
          color: catppuccinColors.text,
          '&[data-active]': {
            backgroundColor: catppuccinColors.blue,
            color: catppuccinColors.base,
          },
          '&:hover': {
            backgroundColor: catppuccinColors.surface0,
          },
        },
        label: {
          color: 'inherit',
        },
      },
    },

    Slider: {
      styles: {
        track: {
          backgroundColor: catppuccinColors.surface1,
        },
        bar: {
          backgroundColor: catppuccinColors.blue,
        },
        thumb: {
          backgroundColor: catppuccinColors.blue,
          borderColor: catppuccinColors.mantle,
          '&:hover': {
            backgroundColor: catppuccinColors.sapphire,
          },
        },
        label: {
          backgroundColor: catppuccinColors.mantle,
          color: catppuccinColors.text,
          borderColor: catppuccinColors.surface1,
        },
      },
    },

    RangeSlider: {
      styles: {
        track: {
          backgroundColor: catppuccinColors.surface1,
        },
        bar: {
          backgroundColor: catppuccinColors.blue,
        },
        thumb: {
          backgroundColor: catppuccinColors.blue,
          borderColor: catppuccinColors.mantle,
          '&:hover': {
            backgroundColor: catppuccinColors.sapphire,
          },
        },
        label: {
          backgroundColor: catppuccinColors.mantle,
          color: catppuccinColors.text,
          borderColor: catppuccinColors.surface1,
        },
      },
    },

    Rating: {
      styles: {
        symbolBody: {
          color: catppuccinColors.yellow,
        },
        symbolGroup: {
          '&[data-active]': {
            color: catppuccinColors.yellow,
          },
        },
      },
    },

    Spoiler: {
      styles: {
        control: {
          color: catppuccinColors.blue,
          '&:hover': {
            color: catppuccinColors.sapphire,
          },
        },
      },
    },
  },

  // Other theme options
  focusRing: 'auto',
  cursorType: 'pointer',
  respectReducedMotion: true,
});
