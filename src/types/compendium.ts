import { type Item, type Rarity } from "./item"
import type { EquipSlot } from "./inventory"

export interface CompendiumItem extends Item {
    descriptionHtml: string
}

export interface CompendiumFilters {
    search: string
    rarity?: Rarity
    equipSlot?: EquipSlot
}

export interface CompendiumState {
    items: CompendiumItem[]
    isLoading: boolean
    error?: string | null
    searchFilters: CompendiumFilters
}

export type CompendiumAction =
    | { type: 'FETCH_START' }
    | { type: 'FETCH_SUCCESS', payload: CompendiumItem[] }
    | { type: 'FETCH_ERROR', payload: string }
    | { type: 'SET_FILTER', payload: Partial<CompendiumFilters> }

export interface RawCompendiumItem {
    item_id: string
    item_name: string
    item_rarity: Rarity
    equip_slot: EquipSlot
    base_stats: {
        hp?: number
        str?: number
        mp?: number
        dex?: number
        int?: number
    },
    description_html: string
    created_at: string
    internal_sku: string
}