```mermaid
graph TD
    App[App.tsx]
    Provider[InventoryProvider]
    Context[InventoryContext]

    Bag[Bag.tsx]
    Equipped[EquippedInventory.tsx]
    Stats[TotalStats.tsx]

    App --> Provider
    Provider --> Context

    Context -.->|Provides Data| Bag
    Context -.->|Provides Data| Equipped
    Context -.->|Provides Data| Stats

    subgraph ViewLayer
        Bag
        Equipped
        Stats
    end

    subgraph LogicLayer
        Provider
        Reducer[inventoryReducer]
        Services[itemServices]
    end

    Provider --> Reducer
    Provider --> Services