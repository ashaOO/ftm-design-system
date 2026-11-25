import { fn } from '@storybook/test';
import { Button } from './Button.jsx';

export default {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  args: { children: 'Start training', onClick: fn() },
  argTypes: {
    variant: { control: 'inline-radio', options: ['primary', 'ghost', 'danger'], description: 'primary = the one main action, ghost = secondary, danger = end training' },
    size: { control: 'inline-radio', options: ['md', 'sm'], description: 'md for screens, sm inside cards' },
    fullWidth: { control: 'boolean', description: 'Stretch to the container width' },
    disabled: { control: 'boolean', description: 'Blocks the action until a condition is met' },
  },
  parameters: {
    docs: { description: { component: 'One **primary** button per screen. Use **ghost** for "Back" or "Resume", **danger** only for ending training (always behind a confirmation).' } },
  },
};

export const Primary = {};
export const Ghost = { args: { variant: 'ghost', children: 'Back to main menu' } };
export const Danger = { args: { variant: 'danger', children: 'End training' } };
export const Small = { args: { size: 'sm', children: 'Got it' } };
export const Disabled = { args: { disabled: true, children: 'Type your name to start' } };
export const FullWidth = { args: { fullWidth: true }, decorators: [(S) => <div style={{ width: 360 }}><S /></div>] };
export const AllVariants = {
  render: () => (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
      <Button>Start training</Button>
      <Button variant="ghost">Resume</Button>
      <Button variant="danger">End training</Button>
      <Button disabled>Disabled</Button>
    </div>
  ),
};
