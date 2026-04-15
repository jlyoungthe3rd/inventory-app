import { http, HttpResponse } from 'msw'

export const handlers = [
    http.get('/api/compendium', () => {
        return HttpResponse.json([{
            id: '1',
            name: 'Sword',
            rarity: 'COMMON',
            equipSlot: 'MAIN_HAND',
            stats: {
                str: 1
            },
            descriptionHtml: "Just don't hit them with the flat end and you'll be fine."
        },
        {
            id: '2',
            name: 'Shield',
            rarity: 'COMMON',
            equipSlot: 'OFF_HAND',
            stats: {
                hp: 10
            },
            descriptionHtml: "The smaller you are the more useful it is."
        }])
    }),
    http.post('/api/inventory/items', async ({ request }) => {
        const item = await request.json()
        return HttpResponse.json(item, { status: 201 })
    })
]