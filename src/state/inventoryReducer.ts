import type { InventoryState, InventoryAction, Item } from '../types';

export const initialState: InventoryState = {
  isLoading: true,
  items: {},
  bag: [],
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
      const { itemId, slot } = action.payload
      const itemToEquip = state.items[itemId]
      const oldItem = state.equipped[slot]
      const newBag = state.bag.filter((id) => id !== itemId)
      if (oldItem) {
        newBag.push(oldItem.id)
      }
      return {
        ...state,
        bag: newBag,
        equipped: { ...state.equipped, [slot]: itemToEquip },
      };
    }
    case 'UNEQUIP_ITEM': {
      const slot = action.payload;
      const itemToUnequip = state.equipped[slot];

      if (!itemToUnequip) {
        return state
      }
      return {
        ...state,
        bag: [...state.bag, itemToUnequip.id],
        equipped: {
          ...state.equipped,
          [slot]: null,
        },
      };
    }
    case 'SET_BAG': {
      const newItems = action.payload.reduce((acc, item) => {
        acc[item.id] = item;
        return acc;
      }, {} as Record<string, Item>)

      const newBagIds = action.payload.map(item => item.id)
      return {
        ...state,
        items: newItems,
        bag: newBagIds,
        isLoading: false
      }
    }
  }
};
