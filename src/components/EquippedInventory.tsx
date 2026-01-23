import { useInventory } from '../hooks/useInventory';
import type { EquipSlot } from '../types';

export const EquippedInventory = () => {
  const { equipped, unEquip } = useInventory();

  return (
    <div className='equipped-inventory'>
      {Object.entries(equipped).map(([slot, item]) => (
        <div key={slot}>
          <strong>{slot}: </strong>
          {item ? (
            <button onClick={() => unEquip(slot as EquipSlot)}>
              <span>{item.name}</span>
            </button>
          ) : (
            ''
          )}
        </div>
      ))}
    </div>
  );
};
