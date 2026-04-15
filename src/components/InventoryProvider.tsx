import { useReducer, useCallback, useMemo, useEffect } from 'react';
import { initialState, inventoryReducer } from '../state/inventoryReducer';
import { getTotalStats } from '../state/inventoryUtils';
import type { EquipSlot } from '../types/item';
import { InventoryContext } from '../context/InventoryContext';
import { fetchInitialBag } from '../services/itemService';
import { usePersistence } from '../hooks/usePersistence';

export const InventoryProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer(inventoryReducer, initialState);
  usePersistence(state, dispatch);

  useEffect(() => {
    const controller = new AbortController();

    const loadInventoryitems = async () => {
      try {
        const data = await fetchInitialBag();
        if (!controller.signal.aborted) {
          dispatch({ type: 'SET_BAG', payload: data });
        }
      } catch (err) {
        if (!controller.signal.aborted) console.log(err);
      }
    };
    loadInventoryitems();

    return () => {
      controller.abort();
    };
  }, []);

  const equipItem = useCallback(
    (itemId: string, equipSlot: EquipSlot) => {
      dispatch({
        type: 'EQUIP_ITEM',
        payload: { itemId, equipSlot },
      });
    },
    [dispatch],
  );
  const unEquipItem = useCallback(
    (equipSlot: EquipSlot) =>
      dispatch({
        type: 'UNEQUIP_ITEM',
        payload: equipSlot,
      }),
    [dispatch],
  );

  const statTotals = useMemo(() => {
    return getTotalStats(state.equipped);
  }, [state.equipped]);

  const value = useMemo(() => {
    return {
      isLoading: state.isLoading,
      items: state.items,
      bag: state.bag,
      equipped: state.equipped,
      statTotals,
      equipItem,
      unEquipItem,
    };
  }, [
    state.isLoading,
    state.items,
    state.bag,
    state.equipped,
    statTotals,
    equipItem,
    unEquipItem,
  ]);

  return (
    <InventoryContext.Provider value={value}>
      {children}
    </InventoryContext.Provider>
  );
};
