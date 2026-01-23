import { Bag } from './components/Bag';
import { EquippedInventory } from './components/EquippedInventory';
import { InventoryProvider } from './components/InventoryProvider';
import { TotalStats } from './components/TotalStats';
import './index.css';

const InventoryManager = () => {
  return (
    <InventoryProvider>
      <h1>Inventory Manager</h1>
      <TotalStats />
      <EquippedInventory />
      <Bag />
    </InventoryProvider>
  );
};

export default InventoryManager;
