import { renderHook } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { localStorageMock } from '../../tests/setup';

import { usePersistence } from '../usePersistence';
import type { InventoryState } from '../../types/inventory';

// Mock times for debounce testing
vi.useFakeTimers();

describe('usePersistence Hook', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'localStorage', {
      value: localStorageMock,
      writable: true,
    });
    localStorageMock.clear();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should write to localStorage after debounce delay', () => {
    // 1. Arrange
    const mockState = {
      bag: ['Item 1'],
      equipped: { MAIN_HAND: null },
      isLoading: false,
      items: {},
    } as InventoryState;

    const mockDispatch = vi.fn();

    // 2. Act
    renderHook(() => usePersistence(mockState, mockDispatch));

    // Fast-forward debounce time
    vi.advanceTimersByTime(500);

    // 3. Assert
    expect(window.localStorage.setItem).toHaveBeenCalledWith(
      'inventory_data',
      JSON.stringify({
        bag: mockState.bag,
        equipped: mockState.equipped,
      }),
    );
  });

  it('should load data from localStorage on mount', () => {
    // Arrange
    const mockState = {
      bag: ['Item 1'],
      equipped: {
        MAIN_HAND: {
          id: '1',
          name: 'Iron Sword',
          rarity: 'COMMON',
          equipSlot: 'MAIN_HAND',
          stats: {
            str: 5,
          },
        },
      },
      isLoading: false,
      items: {},
    } as InventoryState;

    localStorage.setItem(
      'inventory_data',
      JSON.stringify({
        bag: mockState.bag,
        equipped: mockState.equipped,
      }),
    );

    const mockDispatch = vi.fn();

    // Act
    renderHook(() => usePersistence(mockState, mockDispatch));

    // Assert
    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'LOAD_STATE',
      payload: {
        bag: mockState.bag,
        equipped: mockState.equipped,
      },
    });
  });
});
