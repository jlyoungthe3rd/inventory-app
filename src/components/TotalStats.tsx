import { useInventory } from '../hooks/useInventory';

export const TotalStats = () => {
  const { statTotals } = useInventory();

  return (
    <div className='stats-display'>
      {Object.entries(statTotals).map(
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
