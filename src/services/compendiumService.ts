import type { CompendiumItem } from "../types/compendium"

export const fetchCompendiumItems = async (): Promise<CompendiumItem[]> => {
    try {
        const response = await fetch('/api/compendium')

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }
        return await response.json()
    } catch (err) {
        console.error(err)
        throw err
    }
}