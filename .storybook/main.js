import remarkGfm from 'remark-gfm';
/** @type { import('@storybook/react-vite').StorybookConfig } */
export default {
  stories: ['../src/docs/*.mdx', '../src/**/*.stories.@(js|jsx)'],
  addons: [
    { name: '@storybook/addon-essentials', options: { docs: false } },
    { name: '@storybook/addon-docs', options: { mdxPluginOptions: { mdxCompileOptions: { remarkPlugins: [remarkGfm] } } } },
    '@storybook/addon-a11y',
  ],
  framework: { name: '@storybook/react-vite', options: {} },
  staticDirs: ['../public'],
  docs: { defaultName: 'Docs' },
};
