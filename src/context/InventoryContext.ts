import { createContext } from "react";
import type { Item, EquipSlot } from "../types";

export interface InventoryContextType {
    isLoading: boolean
    items: Record<string, Item>
    bag: string[];
    equipped: Record<EquipSlot, Item | null>;
    totals: Item['stats'];
    equip: (itemId: Item['id'], slot: Item['slot']) => void;
    unEquip: (slot: EquipSlot) => void;
}

export const InventoryContext = createContext<InventoryContextType | undefined>(
    undefined,
);