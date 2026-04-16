import { expect, test, describe } from 'vitest'
import type { CompendiumItem } from '../../types/compendium'
import type { RawCompendiumItem } from '../../types/compendium'
import { rawCompendiumItemTransformer } from '../helpers/rawCompendiumItemTransformer'

describe('Raw Compendium Item Transformer', () => {
    test('it should transform a raw API item into a CompendiumItem', () => {
        const fakeRawItem: RawCompendiumItem = {
            item_id: "1",
            item_name: "Sword",
            item_rarity: "COMMON",
            equip_slot: "MAIN_HAND",
            base_stats: { str: 1, dex: 0 },
            description_html: "<p>A basic sword</p>",
            created_at: "2026-04-16T12:00:00Z",
            internal_sku: "ITEM-001"
        }

        const compendiumItem: CompendiumItem = rawCompendiumItemTransformer(fakeRawItem)
        expect(compendiumItem).toMatchObject({
            id: "1",
            name: "Sword",
            rarity: "COMMON",
            equipSlot: "MAIN_HAND",
            stats: { str: 1, dex: 0 },
            descriptionHtml: "<p>A basic sword</p>",
        })
    })
})