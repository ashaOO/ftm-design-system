import '../src/tokens/tokens.css';
import './preview.css';

/** @type { import('@storybook/react').Preview } */
export default {
  parameters: {
    layout: 'centered',
    controls: { expanded: true, matchers: { color: /(background|color)$/i } },
    backgrounds: {
      default: 'game',
      values: [
        { name: 'game', value: '#dde8f2' },
        { name: 'white', value: '#ffffff' },
        { name: 'dark', value: '#14233a' },
      ],
    },
    a11y: {
      test: 'error',
      // Components render alone, so page-level rules (landmarks, h1, regions) don't apply here.
      config: { rules: [{ id: 'region', enabled: false }, { id: 'landmark-one-main', enabled: false }, { id: 'page-has-heading-one', enabled: false }] },
    },
    options: { storySort: { order: ['Introduction', 'Foundations', 'Using with AI agents', 'Components'] } },
  },
  decorators: [
    (Story, ctx) => (
      <div className={ctx.parameters.scene ? 'sb-scene' : 'sb-plain'}>
        <Story />
      </div>
    ),
  ],
};
