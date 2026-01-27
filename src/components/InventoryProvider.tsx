import { useReducer, useCallback, useMemo, useEffect } from 'react';
import { initialState, inventoryReducer } from '../state/inventoryReducer';
import { getTotalStats } from '../state/inventoryUtils';
import type { EquipSlot } from '../types';
import { InventoryContext } from '../context/InventoryContext';
import { fetchInitialBag } from '../services/itemServices';

export const InventoryProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer(inventoryReducer, initialState);

  useEffect(() => {
    const controller = new AbortController();

    const loadItems = async () => {
      try {
        const data = await fetchInitialBag();
        if (!controller.signal.aborted) {
          dispatch({ type: 'SET_BAG', payload: data });
        }
      } catch (err) {
        if (!controller.signal.aborted) console.log(err);
      }
    };
    loadItems();

    return () => {
      controller.abort();
    };
  }, []);

  const equip = useCallback(
    (itemId: string, slot: EquipSlot) => {
      dispatch({
        type: 'EQUIP_ITEM',
        payload: { itemId, slot },
      });
    },
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
    return {
      isLoading: state.isLoading,
      items: state.items,
      bag: state.bag,
      equipped: state.equipped,
      totals,
      equip,
      unEquip,
    };
  }, [
    state.isLoading,
    state.items,
    state.bag,
    state.equipped,
    totals,
    equip,
    unEquip,
  ]);

  return (
    <InventoryContext.Provider value={value}>
      {children}
    </InventoryContext.Provider>
  );
};
