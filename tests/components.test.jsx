import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { DecisionGroup, DecisionButton } from '../src/components/DecisionButton/DecisionButton.jsx';
import { IconButton } from '../src/components/IconButton/IconButton.jsx';
import { ProgressBar } from '../src/components/ProgressBar/ProgressBar.jsx';
import { useState } from 'react';

describe('DecisionButton', () => {
  it('announces state in its accessible name, not just colour', () => {
    render(<DecisionButton decision="flag" state="wrong" />);
    expect(screen.getByRole('button', { name: 'Flag, not the right call' })).toBeTruthy();
  });

  it('DecisionGroup marks the pick, then reveals the correct answer and locks', () => {
    function Harness() {
      const [v, setV] = useState();
      return <DecisionGroup value={v} onChange={setV} result={v ? { correct: 'freeze' } : undefined} />;
    }
    render(<Harness />);
    fireEvent.click(screen.getByRole('button', { name: 'Approve' }));
    expect(screen.getByRole('button', { name: 'Freeze, correct answer' })).toBeTruthy();
    expect(screen.getByRole('button', { name: 'Approve, not the right call' }).disabled).toBe(true);
  });
});

describe('IconButton', () => {
  it('refuses to render without a label', () => {
    expect(() => render(<IconButton icon="menu" />)).toThrow(/label/);
  });
});

describe('ProgressBar', () => {
  it('exposes value to assistive tech and clamps to 0-100', () => {
    render(<ProgressBar value={140} label="Loading" />);
    const bar = screen.getByRole('progressbar', { name: 'Loading' });
    expect(bar.getAttribute('aria-valuenow')).toBe('140');
    expect(bar.querySelector('b').style.width).toBe('100%');
  });
});
