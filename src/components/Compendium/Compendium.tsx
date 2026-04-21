import { useCallback, useState } from 'react';
import { VirtualList } from '../VirtualList/VirtualList';
import type { CompendiumItem } from '../../types/compendium';
import { CompendiumRow } from './CompendiumRow';
import { useCompendium } from '../../hooks/useCompendium';

export const Compendium = () => {
  const { filteredItems, searchText, setSearchText, isLoading, error } =
    useCompendium();

  const [activeRowIndex, setActiveRowIndex] = useState<number>(0);

  const [inspectedItemId, setInspectedItemId] = useState<string | null>(null);

  const handleRowKeyDown = useCallback(
    (e: React.KeyboardEvent, index: number) => {
      if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
        e.preventDefault();
      }

      if (e.key === 'ArrowUp' && index > 0) {
        setActiveRowIndex(index - 1);
      } else if (e.key === 'ArrowDown' && index < filteredItems.length - 1) {
        setActiveRowIndex(index + 1);
      }
    },
    [filteredItems.length],
  );

  const handleRenderItem = useCallback(
    (item: CompendiumItem, index: number) => {
      const isInspected = inspectedItemId === item.id;

      return (
        <CompendiumRow
          item={item}
          index={index}
          isInspected={isInspected}
          onInspect={setInspectedItemId}
          tabIndex={activeRowIndex === index ? 0 : -1}
          onKeyDown={handleRowKeyDown}
        />
      );
    },
    [inspectedItemId, activeRowIndex, handleRowKeyDown],
  );

  if (isLoading) return <div>Loading Compendium...</div>;
  if (error) return <div style={{ color: 'red' }}> Error: {error}</div>;

  return (
    <div className='max-w-4xl mx-auto p-4 bg-white rounded-lg shadow-md'>
      <h2 className='text-2xl font-bold mb-4 text-gray-800'>Item Compendium</h2>
      <div>
        <label htmlFor='search-input' className='sr-only'>Search the Compendium </label>
        <input
          id='search-input'
          autoFocus
          type='text'
          placeholder='Search Compendium...'
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        ></input>
        <p aria-live='polite'>{filteredItems.length} results found</p>
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
