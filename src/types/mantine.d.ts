// mantine.d.ts
import type { ButtonVariant, ButtonProps as MantineButtonProps } from '@mantine/core';

declare module '@mantine/core' {
  export interface ButtonProps extends MantineButtonProps {
    variant?:
      | ButtonVariant
      | 'filled'
      | 'light'
      | 'outline'
      | 'transparent'
      | 'subtle'
      | 'gradient'
      | 'rosewater'
      | 'flamingo'
      | 'pink'
      | 'mauve'
      | 'red'
      | 'maroon'
      | 'peach'
      | 'yellow'
      | 'green'
      | 'teal'
      | 'sky'
      | 'sapphire'
      | 'blue'
      | 'lavender';
  }
}

import { DefaultMantineColor, MantineColorsTuple } from '@mantine/core';

// Extended color palette including all Catppuccin colors
type ExtendedCustomColors =
  | 'rosewater'
  | 'flamingo'
  | 'pink'
  | 'mauve'
  | 'maroon'
  | 'peach'
  | 'teal'
  | 'sky'
  | 'sapphire'
  | 'blue'
  | 'lavender'
  | 'text'
  | 'subtext1'
  | 'subtext0'
  | 'overlay2'
  | 'overlay1'
  | 'overlay0'
  | 'surface2'
  | 'surface1'
  | 'surface0'
  | 'base'
  | 'mantle'
  | 'crust'
  | DefaultMantineColor;

declare module '@mantine/core' {
  export interface MantineThemeColorsOverride {
    colors: Record<ExtendedCustomColors, MantineColorsTuple>;
  }
}
