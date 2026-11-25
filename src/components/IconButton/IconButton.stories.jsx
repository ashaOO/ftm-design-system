import { fn } from '@storybook/test';
import { IconButton } from './IconButton.jsx';

export default {
  title: 'Components/IconButton',
  component: IconButton,
  tags: ['autodocs'],
  args: { icon: 'menu', label: 'Open menu', onClick: fn() },
  argTypes: {
    icon: { control: 'inline-radio', options: ['menu', 'sound', 'mute', 'close'], description: 'Built-in HUD icons' },
    label: { control: 'text', description: 'Required: the only text a screen reader hears' },
    pressed: { control: 'boolean', description: 'Toggle state, e.g. muted' },
  },
  parameters: { scene: true, docs: { description: { component: 'Round glass HUD buttons in the top-right corner. `label` is required, it is all a screen reader hears.' } } },
};

export const Menu = {};
export const Sound = { args: { icon: 'sound', label: 'Sound settings' } };
export const Muted = { args: { icon: 'mute', label: 'Unmute', pressed: true } };
export const HudCorner = {
  render: () => (
    <div style={{ display: 'flex', gap: 10 }}>
      <IconButton icon="sound" label="Sound settings" />
      <IconButton icon="menu" label="Open menu" />
    </div>
  ),
};
