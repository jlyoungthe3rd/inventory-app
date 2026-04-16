import { useCallback, useState } from 'react';
import { VirtualList } from '../VirtualList/VirtualList';
import type { CompendiumItem } from '../../types/compendium';
import { CompendiumRow } from './CompendiumRow';
import { useCompendium } from '../../hooks/useCompendium';

export const Compendium = () => {
  const { filteredItems, searchText, setSearchText, isLoading, error } =
    useCompendium();

  const [inspectedItemId, setInspectedItemId] = useState<string | null>(null);

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

  if (isLoading) return <div>Loading Compendium...</div>;
  if (error) return <div style={{ color: 'red' }}> Error: {error}</div>;

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
