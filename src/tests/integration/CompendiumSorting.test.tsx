import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, beforeEach } from 'vitest';
import { Compendium } from '../../components/Compendium/Compendium';
import type { CompendiumItem } from '../../types/compendium';
import { http, HttpResponse } from 'msw';
import { server } from '../../mocks/server';

const MOCK_ITEMS: CompendiumItem[] = [
  {
    id: '1',
    name: 'Sword',
    rarity: 'COMMON',
    equipSlot: 'MAIN_HAND',
    stats: {
      str: 10,
    },
    descriptionHtml:
      "Just don't hit them with the flat end and you'll be fine.",
  },
  {
    id: '2',
    name: 'Shield',
    rarity: 'COMMON',
    equipSlot: 'OFF_HAND',
    stats: {
      hp: 10,
    },
    descriptionHtml: 'The smaller you are the more useful it is.',
  },
  {
    id: '4',
    name: 'Cloth Shirt',
    rarity: 'COMMON',
    equipSlot: 'CHEST',
    stats: {
      hp: 20,
    },
    descriptionHtml: 'Nice & Crisp',
  },
];

describe('Compendium Sorting', () => {
  beforeEach(() => {
    server.use(
      http.get('api/compendium/base', () => {
        return HttpResponse.json(MOCK_ITEMS);
      }),
      http.get('api/compendium/dlc', () => {
        return HttpResponse.json([]);
      }),
    );
  });

  it('should sort properly when sorting button is clicked', async () => {
    const user = userEvent.setup();
    render(<Compendium />);

    const sortIdButton = await screen.findByRole('button', {
      name: /Sorted by ID/i,
    });

    await user.click(sortIdButton);

    const sortHPButton = await screen.findByRole('button', {
      name: /Sort by HP/i,
    });

    const items = await screen.findAllByTestId('compendium-list');

    await user.click(sortHPButton);

    let itemText = items.map((item) => item.textContent);

    expect(itemText[0]).toMatch(/Cloth/);
    expect(itemText[1]).toMatch(/Shield/);

    await user.click(sortHPButton);
  });

  it('should sort in reverse order when sorting button is clicked twice', async () => {
    const user = userEvent.setup();
    render(<Compendium />);

    const sortIdButton = await screen.findByRole('button', {
      name: /Sorted by ID/i,
    });

    await user.click(sortIdButton);

    const sortHPButton = await screen.findByRole('button', {
      name: /Sort by HP/i,
    });

    const items = await screen.findAllByTestId('compendium-list');

    await user.click(sortHPButton);
    await user.click(sortHPButton);

    const itemText = items.map((item) => item.textContent);

    screen.debug();

    expect(itemText[0]).toMatch(/Sword/);
    expect(itemText[1]).toMatch(/Shield/);
  });
});

// items.stat defaults to 0 if item doesn't have the stat you're sorting by

// the compendium list will sort by ID if any errors occur with sorting
