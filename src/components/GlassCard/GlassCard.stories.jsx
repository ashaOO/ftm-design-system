import { GlassCard } from './GlassCard.jsx';
import { Button } from '../Button/Button.jsx';
import { Pill } from '../Pill/Pill.jsx';

export default {
  title: 'Components/GlassCard',
  component: GlassCard,
  tags: ['autodocs'],
  parameters: {
    scene: true,
    docs: { description: { component: 'Frosted glass panel for briefings, questions and results. Sits on top of the 3D scene. Falls back to a solid fill when the user prefers reduced transparency or the game runs in low-quality mode.' } },
  },
  argTypes: {
    tone: { control: 'inline-radio', options: ['default', 'flag'], description: 'flag adds a coral top edge for red-flag moments' },
    width: { control: 'inline-radio', options: ['sm', 'md', 'lg'], description: 'sm 340px, md 460px, lg 640px' },
    eyebrow: { control: 'text', description: 'Short uppercase context line' },
    title: { control: 'text', description: 'Card heading (h2)' },
  },
  args: {
    eyebrow: 'Zone 1 · Bank Lobby',
    title: 'Placement',
    children: <p>Dirty cash enters the system. Check ID and source of funds before any money goes in.</p>,
    actions: <Button size="sm">Got it</Button>,
  },
};

export const Briefing = {};
export const RedFlag = {
  args: {
    tone: 'flag',
    eyebrow: 'Red flag',
    title: 'Split deposits',
    children: <><p>4 cash deposits just under the 10,000 reporting limit, at different tellers, in one week.</p><Pill tone="coral">Structuring</Pill></>,
    actions: <><Button variant="ghost" size="sm">Review case</Button><Button size="sm">Flag it</Button></>,
  },
};
export const Wide = { args: { width: 'lg', title: 'Your 3 learning objectives', children: <ol style={{ margin: 0, paddingLeft: 18 }}><li>Name the 3 stages of laundering</li><li>Spot 5 common red flags</li><li>Decide when to approve, flag or freeze</li></ol> } };
export const NoActions = { args: { actions: null } };
