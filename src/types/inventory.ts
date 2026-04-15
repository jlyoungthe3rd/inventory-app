import type { Item } from "./items";

export type EquipSlot = 'HEAD' | 'CHEST' | 'LEGS' | 'BOOTS' | 'MAIN_HAND' | 'OFF_HAND' | 'TRINKET'


export interface InventoryState {
    isLoading: boolean,
    loadedFromSave: boolean,
    items: Record<string, Item>
    bag: string[];
    equipped: Record<EquipSlot, Item | null>;
}

export type InventoryAction =
    | { type: 'EQUIP_ITEM', payload: { itemId: string, equipSlot: EquipSlot } }
    | { type: 'UNEQUIP_ITEM', payload: EquipSlot }
    | { type: 'SET_BAG', payload: Item[] }
    | { type: 'LOAD_STATE', payload: { bag: string[], equipped: Record<EquipSlot, Item | null> } }