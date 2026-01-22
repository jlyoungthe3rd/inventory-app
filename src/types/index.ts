export type EquipSlot = 'HEAD' | 'CHEST' | 'LEGS' | 'BOOTS' | 'MAIN_HAND' | 'OFF_HAND' | 'TRINKET'

export type Rarity = 'COMMON' | 'RARE' | 'EPIC'

export interface Item {
    id: string
    name: string
    rarity: Rarity
    slot: EquipSlot
    stats: {
        hp?: number
        mp?: number
        str?: number
        dex?: number
        int?: number

    }
}

export interface InventoryState {
    bag: Item[];
    equipped: Record<EquipSlot, Item | null>;
}

export type InventoryAction =
    | { type: 'EQUIP_ITEM', payload: Item }
    | { type: 'UNEQUIP_ITEM', payload: EquipSlot }