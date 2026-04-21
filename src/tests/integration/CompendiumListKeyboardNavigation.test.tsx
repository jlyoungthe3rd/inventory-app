import { Compendium } from '../../components/Compendium/Compendium';
import { describe, expect, it } from 'vitest';
import userEvent from '@testing-library/user-event';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';

describe('Compendium Keyboard Navigation', () => {
  it('should navigate the compendium list when pressing arrow keys', async () => {
    const user = userEvent.setup();

    render(<Compendium />);

    const rows = await screen.findAllByRole('button');

    expect(rows[0]).toHaveAttribute('tabindex', '0');
    expect(rows[1]).toHaveAttribute('tabindex', '-1');

    await user.tab();
    expect(rows[0]).toHaveFocus();

    await user.keyboard('{ArrowDown}');

    await waitFor(() => {
      expect(rows[0]).toHaveAttribute('tabindex', '-1');
      expect(rows[1]).toHaveAttribute('tabindex', '0');
      expect(rows[1]).toHaveFocus();
    });
  });
});
