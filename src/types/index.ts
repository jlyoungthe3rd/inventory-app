export type EquipSlot = 'HEAD' | 'CHEST' | 'LEGS' | 'BOOTS' | 'MAIN_HAND' | 'OFF_HAND' | 'TRINKET'

export type Rarity = 'COMMON' | 'RARE' | 'EPIC'

export interface Item {
    id: string
    name: string
    rarity: Rarity
    equipSlot: EquipSlot
    stats: {
        hp?: number
        mp?: number
        str?: number
        dex?: number
        int?: number

    }
}

export interface InventoryState {
    isLoading: boolean,
    items: Record<string, Item>
    bag: string[];
    equipped: Record<EquipSlot, Item | null>;
}

export type InventoryAction =
    | { type: 'EQUIP_ITEM', payload: { itemId: string, equipSlot: EquipSlot } }
    | { type: 'UNEQUIP_ITEM', payload: EquipSlot }
    | { type: 'SET_BAG', payload: Item[] }