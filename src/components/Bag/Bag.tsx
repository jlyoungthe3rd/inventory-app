import { useMemo, useState } from 'react';
import { useInventory } from '../../hooks/useInventory';
import { type Rarity } from '../../types';
import { Searchbar } from './SearchBar';

const RARITY_WEIGHT: Record<Rarity, number> = {
  COMMON: 1,
  RARE: 2,
  EPIC: 3,
};

const RARITY_OPTIONS: (Rarity | 'ALL')[] = ['ALL', 'COMMON', 'RARE', 'EPIC'];

export const Bag = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'NAME' | 'RARITY'>('NAME');
  const [filterRarity, setFilterRarity] = useState<Rarity | 'ALL'>('ALL');
  const { isLoading, items, bag, equipItem } = useInventory();

  const filteredBag = useMemo(() => {
    const allItems = bag.map((id) => items[id]);

    return [...allItems]
      .filter((item) => filterRarity === 'ALL' || item.rarity === filterRarity)
      .filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()),
      )
      .sort((a, b) => {
        if (sortBy === 'NAME') {
          return a.name.localeCompare(b.name);
        }
        if (sortBy === 'RARITY') {
          const weightA = RARITY_WEIGHT[a.rarity];
          const weightB = RARITY_WEIGHT[b.rarity];
          return weightB - weightA;
        }
        return 0;
      });
  }, [bag, items, filterRarity, sortBy, searchTerm]);

  return (
    <div className='bag-container'>
      <Searchbar value={searchTerm} onChange={setSearchTerm} />
      {isLoading && filteredBag.length !== 0 && <div>Loading...</div>}
      <div className='bag-display'>
        {filteredBag.length === 0 ? (
          <div>No items found...</div>
        ) : (
          filteredBag.map((item) => (
            <div key={item.id}>
              <button
                onClick={() => {
                  equipItem(item.id, item.equipSlot);
                }}
              >
                <span>{item.name}</span>
              </button>
            </div>
          ))
        )}
        <div className='sort-button'>
          <button
            onClick={() =>
              setSortBy((prev) => (prev === 'NAME' ? 'RARITY' : 'NAME'))
            }
          >
            <strong>Sort By:</strong> {sortBy === 'NAME' ? 'RARITY' : 'NAME'}
          </button>
        </div>

        <div className='rarity-sort-button'>
          <button
            onClick={() =>
              setFilterRarity((prev) => {
                const currentIndex = RARITY_OPTIONS.indexOf(prev);
                const nextIndex = (currentIndex + 1) % RARITY_OPTIONS.length;
                return RARITY_OPTIONS[nextIndex];
              })
            }
          >
            <strong>Filter:</strong> {filterRarity}
          </button>
        </div>
      </div>
    </div>
  );
};
