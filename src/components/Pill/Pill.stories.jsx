import { Pill } from './Pill.jsx';

export default {
  title: 'Components/Pill',
  component: Pill,
  tags: ['autodocs'],
  args: { children: 'Zone 1' },
  argTypes: {
    tone: { control: 'inline-radio', options: ['neutral', 'accent', 'mint', 'coral', 'glass'], description: 'coral only for red flags, mint for correct/online, glass for HUD chips' },
    live: { control: 'boolean', description: 'Pulsing online dot' },
  },
  parameters: { docs: { description: { component: 'Short status labels. 1 to 3 words. **coral** only for red flags and wrong answers, **mint** for correct and online, **glass** for HUD chips over the 3D scene.' } } },
};

export const Neutral = {};
export const Accent = { args: { tone: 'accent', children: 'Chief Noor' } };
export const Mint = { args: { tone: 'mint', children: 'Correct' } };
export const Coral = { args: { tone: 'coral', children: 'Red flag' } };
export const OnlineCounter = { args: { tone: 'glass', live: true, children: '3 officers online' }, parameters: { scene: true } };
export const AllTones = {
  render: () => (
    <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
      <Pill>Zone 1</Pill><Pill tone="accent">Chief Noor</Pill><Pill tone="mint">Correct</Pill><Pill tone="coral">Red flag</Pill><Pill tone="glass" live>3 officers online</Pill>
    </div>
  ),
};
