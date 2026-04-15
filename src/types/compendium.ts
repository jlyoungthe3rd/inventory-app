import { type Item, type Rarity } from "./items"
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