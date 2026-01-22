import { useMemo, useReducer } from 'react';
import type {
  EquipSlot,
  InventoryAction,
  InventoryState,
  Item,
} from '../types';

const initialState: InventoryState = {
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

const getTotalStats = (equipped: Record<EquipSlot, Item | null>) => {
  const totals: Item['stats'] = { hp: 0, mp: 0, str: 0, dex: 0, int: 0 };

  Object.values(equipped).forEach((item) => {
    if (!item) return;

    Object.entries(item.stats).forEach(([key, value]) => {
      totals[key as keyof Item['stats']] =
        (totals[key as keyof Item['stats']] || 0) + (value || 0);
    });
  });
  return totals;
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

export const useInventory = () => {
  const [state, dispatch] = useReducer(inventoryReducer, initialState);

  const equip = (item: Item) =>
    dispatch({
      type: 'EQUIP_ITEM',
      payload: item,
    });
  const unEquip = (slot: EquipSlot) =>
    dispatch({
      type: 'UNEQUIP_ITEM',
      payload: slot,
    });

  const totals = useMemo(() => {
    return getTotalStats(state.equipped);
  }, [state.equipped]);

  return {
    bag: state.bag,
    equipped: state.equipped,
    totals,
    equip,
    unEquip,
  };
};
