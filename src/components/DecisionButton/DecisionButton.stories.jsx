import { useState } from 'react';
import { fn, expect, userEvent, within } from '@storybook/test';
import { DecisionButton, DecisionGroup } from './DecisionButton.jsx';
import { Button } from '../Button/Button.jsx';

export default {
  title: 'Components/DecisionButton',
  component: DecisionButton,
  tags: ['autodocs'],
  args: { decision: 'approve', state: 'idle', onClick: fn() },
  argTypes: {
    decision: { control: 'inline-radio', options: ['approve', 'flag', 'freeze'], description: 'approve = checks out, flag = suspicious, freeze = evidence' },
    state: { control: 'inline-radio', options: ['idle', 'selected', 'correct', 'wrong'], description: 'Changes colour, icon and screen-reader label together' },
    shortcut: { control: 'text', description: 'Keyboard key shown on the button (1, 2, 3)' },
    disabled: { control: 'boolean', description: 'Locked after an answer is revealed' },
  },
  parameters: {
    docs: { description: { component: 'The three calls a compliance officer can make at the Showroom deal desk. **Approve** = everything checks out. **Flag** = suspicious, needs a specialist. **Freeze** = evidence of laundering. Colour is never the only signal: states also change the label, an icon or the screen-reader text.' } },
  },
};

export const Approve = {};
export const Flag = { args: { decision: 'flag' } };
export const Freeze = { args: { decision: 'freeze' } };
export const WithShortcut = { args: { shortcut: '1' } };
export const Selected = { args: { decision: 'flag', state: 'selected' } };
export const Correct = { args: { decision: 'freeze', state: 'correct', disabled: true } };
export const Wrong = { args: { decision: 'approve', state: 'wrong', disabled: true } };

/** The full desk, as learners use it. Pick a decision, then reveal the answer. */
export const DeskFlow = {
  parameters: { scene: true },
  render: () => {
    const [value, setValue] = useState();
    const [result, setResult] = useState();
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'flex-start' }}>
        <DecisionGroup value={value} result={result} onChange={setValue} />
        <div style={{ display: 'flex', gap: 8 }}>
          <Button size="sm" disabled={!value || Boolean(result)} onClick={() => setResult({ correct: 'freeze' })}>Lock in decision</Button>
          <Button size="sm" variant="ghost" onClick={() => { setValue(); setResult(); }}>Reset</Button>
        </div>
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    const c = within(canvasElement);
    await userEvent.click(c.getByRole('button', { name: 'Approve' }));
    await expect(c.getByRole('button', { name: 'Approve, selected' })).toHaveAttribute('aria-pressed', 'true');
    await userEvent.click(c.getByRole('button', { name: 'Lock in decision' }));
    await expect(c.getByRole('button', { name: 'Freeze, correct answer' })).toBeInTheDocument();
    await expect(c.getByRole('button', { name: 'Approve, not the right call' })).toBeDisabled();
  },
};
