import type { EquipSlot } from "./inventory"

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

