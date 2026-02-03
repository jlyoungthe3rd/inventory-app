import { useInventory } from '../hooks/useInventory';
import type { EquipSlot } from '../types';

export const EquippedInventory = () => {
  const { equipped, unEquipItem } = useInventory();

  return (
    <div className='equipped-inventory'>
      {Object.entries(equipped).map(([equipmentSlot, inventoryItem]) => (
        <div key={equipmentSlot}>
          <strong>{equipmentSlot}: </strong>
          {inventoryItem ? (
            <button onClick={() => unEquipItem(equipmentSlot as EquipSlot)}>
              <span>{inventoryItem.name}</span>
            </button>
          ) : (
            ''
          )}
        </div>
      ))}
    </div>
  );
};
