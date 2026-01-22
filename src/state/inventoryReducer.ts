import type { InventoryState, InventoryAction } from '../types';

export const initialState: InventoryState = {
  bag: [
    {
      id: '1',
      name: 'sword',
      rarity: 'COMMON',
      slot: 'MAIN_HAND',
      stats: {
        str: 2,
      },
    },
    {
      id: '2',
      name: 'staff',
      rarity: 'COMMON',
      slot: 'MAIN_HAND',
      stats: {
        int: 2,
      },
    },
  ],
  equipped: {
    HEAD: null,
    CHEST: null,
    LEGS: null,
    BOOTS: null,
    MAIN_HAND: null,
    OFF_HAND: null,
    TRINKET: null,
  },
};

export const inventoryReducer = (
  state: InventoryState,
  action: InventoryAction,
): InventoryState => {
  switch (action.type) {
    case 'EQUIP_ITEM': {
      const newItem = action.payload;
      const oldItem = state.equipped[newItem.slot];
      const filteredBag = state.bag.filter((item) => item.id !== newItem.id);
      // Use this pattern to enforce immutability
      const updatedBag = oldItem ? [...filteredBag, oldItem] : filteredBag;

      return {
        ...state,
        bag: updatedBag,
        equipped: { ...state.equipped, [newItem.slot]: newItem },
      };
    }
    case 'UNEQUIP_ITEM': {
      const slot = action.payload;
      const itemToUnequip = state.equipped[slot];

      if (!itemToUnequip) {
        return {
          ...state,
        };
      }
      return {
        ...state,
        bag: [...state.bag, itemToUnequip],
        equipped: {
          ...state.equipped,
          [slot]: null,
        },
      };
    }
  }
};
