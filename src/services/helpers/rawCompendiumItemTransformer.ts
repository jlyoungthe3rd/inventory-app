import type { CompendiumItem, RawCompendiumItem } from "../../types/compendium";

export const rawCompendiumItemTransformer = (rawItem: RawCompendiumItem): CompendiumItem => {
    return {
        id: rawItem.item_id,
        name: rawItem.item_name,
        rarity: rawItem.item_rarity,
        equipSlot: rawItem.equip_slot,
        stats: rawItem.base_stats,
        descriptionHtml: rawItem.description_html
    }
}