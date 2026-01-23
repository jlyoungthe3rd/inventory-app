import { useMemo, useState } from 'react';
import { useInventory } from '../hooks/useInventory';
import { type Rarity } from '../types';

const RARITY_WEIGHT: Record<Rarity, number> = {
  COMMON: 1,
  RARE: 2,
  EPIC: 3,
};

const RARITY_OPTIONS: (Rarity | 'ALL')[] = ['ALL', 'COMMON', 'RARE', 'EPIC'];

export const Bag = () => {
  const [sortBy, setSortBy] = useState<'NAME' | 'RARITY'>('NAME');
  const [filterRarity, setFilterRarity] = useState<Rarity | 'ALL'>('ALL');
  const { bag, equip } = useInventory();

  const filteredBag = useMemo(() => {
    return [...bag]
      .filter((item) => filterRarity === 'ALL' || item.rarity === filterRarity)
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
  }, [bag, filterRarity, sortBy]);

  return (
    <div className='bag-display'>
      {filteredBag.map((item) => (
        <div key={item.id}>
          <button onClick={() => equip(item)}>
            <span>{item.name}</span>
          </button>
        </div>
      ))}
      <div className='sort-button'>
        <button
          onClick={() =>
            setSortBy((prev) => (prev === 'NAME' ? 'RARITY' : 'NAME'))
          }
        >
          {sortBy === 'NAME' ? 'RARITY' : 'NAME'}
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
          {filterRarity}
        </button>
      </div>
    </div>
  );
};
