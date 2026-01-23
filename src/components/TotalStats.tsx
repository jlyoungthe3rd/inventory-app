import { useInventory } from '../hooks/useInventory';

export const TotalStats = () => {
  const { totals } = useInventory();

  return (
    <div className='stats-display'>
      {Object.entries(totals).map(
        ([stat, value]) =>
          value !== 0 && (
            <div key={stat}>
              <p>
                {stat.toUpperCase()}: {value}
              </p>
            </div>
          ),
      )}
    </div>
  );
};
