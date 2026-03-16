import { Bag } from '../Bag/Bag';
import { EquippedInventory } from '../EquippedInventory';
import { InventoryProvider } from '../InventoryProvider';
import { TotalStats } from '../TotalStats';

const InventoryManager = () => {
  return (
    <InventoryProvider>
      <div className='p-4 max-w-6xl mx-auto'>
        <h1 className='text-3xl font-bold'>Inventory Manager</h1>
        <TotalStats />
        <EquippedInventory />
        <Bag />
      </div>
    </InventoryProvider>
  );
};

export default InventoryManager;
