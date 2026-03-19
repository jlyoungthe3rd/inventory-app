import { useCallback, useEffect, useMemo, useReducer, useState } from 'react';
import { compendiumReducer } from '../../state/compendiumReducer';
import { initialState } from '../../state/compendiumReducer';
import { fetchCompendiumItems } from '../../services/compendiumService';
import { VirtualList } from '../VirtualList/VirtualList';
import type { CompendiumItem } from '../../types/compendium';
import { CompendiumRow } from './CompendiumRow';

export const Compendium = () => {
  const [state, dispatch] = useReducer(compendiumReducer, initialState);
  const [inspectedItemId, setInspectedItemId] = useState<string | null>(null);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    const loadWrapper = async () => {
      dispatch({ type: 'FETCH_START' }); // Start loading

      try {
        const data = await fetchCompendiumItems();
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (error: unknown) {
        let errorMessage = 'An unknown error occured';

        if (error instanceof Error) {
          errorMessage = error.message;
        } else if (typeof error === 'string') {
          errorMessage = error;
        }
        dispatch({
          type: 'FETCH_ERROR',
          payload: errorMessage || 'Unknown Error',
        });
      }
    };

    loadWrapper();
  }, []);

  const handleRenderItem = useCallback(
    (item: CompendiumItem, index: number) => {
      const isInspected = inspectedItemId === item.id;

      return (
        <CompendiumRow
          item={item}
          index={index}
          isInspected={isInspected}
          onInspect={setInspectedItemId}
        />
      );
    },
    [inspectedItemId],
  );

  const filteredItems = useMemo(() => {
    return state.items.filter((item) =>
      item.name.toLowerCase().includes(searchText.toLowerCase()),
    );
  }, [state.items, searchText]);

  if (state.isLoading) return <div>Loading Compendium...</div>;
  if (state.error)
    return <div style={{ color: 'red' }}> Error: {state.error}</div>;

  return (
    <div className='max-w-4xl mx-auto p-4 bg-white rounded-lg shadow-md'>
      <h2 className='text-2xl font-bold mb-4 text-gray-800'>Item Compendium</h2>
      <div>
        <input
          type='text'
          placeholder='Search Compendium...'
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        ></input>
      </div>
      <VirtualList
        items={filteredItems}
        itemHeight={80}
        containerHeight={600}
        renderItem={handleRenderItem}
      />
    </div>
  );
};
