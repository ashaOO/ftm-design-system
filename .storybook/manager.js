import { addons } from '@storybook/manager-api';
import { create } from '@storybook/theming/create';
addons.setConfig({
  theme: create({
    base: 'light',
    brandTitle: 'Follow the Money · Design System',
    brandImage: '/img/logo.png',
    colorPrimary: '#3d8bff',
    colorSecondary: '#2a6fe0',
    fontBase: 'Inter, system-ui, sans-serif',
    appBg: '#eef4fb',
  }),
});
