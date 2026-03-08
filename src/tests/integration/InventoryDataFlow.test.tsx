import { describe, it, vi } from 'vitest';

vi.mock('../../services/itemServices', () => ({
  fetchInitialBag: vi.fn(),
}));

describe('InventoryDataFlow', () => {
  it('should prioritize localStorage data over API initial data', () => {
    // Arrange
    const savedState = {
      bag: [{ id: '99', name: 'Mock Sword' }],
      equipped: {},
      items: {},
    };

    window.localStorage.setItem('inventory_data', JSON.stringify(savedState));
  });
});
