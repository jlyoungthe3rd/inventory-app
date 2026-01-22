import { createContext } from "react";
import type { Item, EquipSlot } from "../types";

export interface InventoryContextType {
    bag: Item[];
    equipped: Record<EquipSlot, Item | null>;
    totals: Item['stats'];
    equip: (item: Item) => void;
    unEquip: (slot: EquipSlot) => void;
}

export const InventoryContext = createContext<InventoryContextType | undefined>(
    undefined,
);