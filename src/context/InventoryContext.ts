import { createContext } from "react";
import type { Item, EquipSlot } from "../types/item";

export interface InventoryContextType {
    isLoading: boolean
    items: Record<string, Item>
    bag: string[];
    equipped: Record<EquipSlot, Item | null>;
    statTotals: Item['stats'];
    equipItem: (itemId: Item['id'], equipSlot: Item['equipSlot']) => void;
    unEquipItem: (slot: EquipSlot) => void;
}

export const InventoryContext = createContext<InventoryContextType | undefined>(
    undefined,
);