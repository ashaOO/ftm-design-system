import { ProgressBar } from './ProgressBar.jsx';

export default {
  title: 'Components/ProgressBar',
  component: ProgressBar,
  tags: ['autodocs'],
  args: { value: 64, label: 'Loading the city', showValue: true },
  argTypes: {
    value: { control: { type: 'range', min: 0, max: 100 }, description: 'Current value (clamped to 0-max)' },
    size: { control: 'inline-radio', options: ['md', 'sm'], description: 'md for loading, sm for film and zones' },
    label: { control: 'text', description: 'Required: what is loading, read by screen readers' },
    showValue: { control: 'boolean', description: 'Show the percentage' },
  },
  parameters: { docs: { description: { component: 'Used on the loading screen, the intro film and zone progress. Always pass `label` so screen readers announce what is loading.' } } },
};

export const Loading = {};
export const Empty = { args: { value: 0 } };
export const Complete = { args: { value: 100, label: 'Ready' } };
export const Slim = { args: { size: 'sm', label: 'Intro film', showValue: false, value: 35 } };
