import { useReducer, useCallback, useMemo } from 'react';
import { initialState, inventoryReducer } from '../state/inventoryReducer';
import { getTotalStats } from '../state/inventoryUtils';
import type { Item, EquipSlot } from '../types';
import { InventoryContext } from '../context/InventoryContext';

export const InventoryProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer(inventoryReducer, initialState);

  const equip = useCallback(
    (item: Item) =>
      dispatch({
        type: 'EQUIP_ITEM',
        payload: item,
      }),
    [dispatch],
  );
  const unEquip = useCallback(
    (slot: EquipSlot) =>
      dispatch({
        type: 'UNEQUIP_ITEM',
        payload: slot,
      }),
    [dispatch],
  );

  const totals = useMemo(() => {
    return getTotalStats(state.equipped);
  }, [state.equipped]);

  const value = useMemo(() => {
    return { bag: state.bag, equipped: state.equipped, totals, equip, unEquip };
  }, [state.bag, state.equipped, totals, equip, unEquip]);

  return (
    <InventoryContext.Provider value={value}>
      {children}
    </InventoryContext.Provider>
  );
};
