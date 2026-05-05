import type { CompendiumItem } from "../types/compendium"

export const fetchCompendiumItems = async (): Promise<CompendiumItem[]> => {
    try {
        const [baseResponse, dlcResponse] = await Promise.all([
            fetch('/api/compendium/base'),
            fetch('/api/compendium/dlc')
        ])
        // const response = await fetch('/api/compendium')

        if (!baseResponse.ok || !dlcResponse.ok) {
            throw new Error(`HTTP error! 
                Base: ${baseResponse.status}, 
                DLC: ${dlcResponse.status}`)
        }

        const [baseItems, dlcItems] = await Promise.all([
            baseResponse.json(),
            dlcResponse.json()
        ])

        return [...baseItems, ...dlcItems].sort((a, b) => parseInt(a.id) - parseInt(b.id))

    } catch (err) {
        console.error(err)
        throw err
    }
}