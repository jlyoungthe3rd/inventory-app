# 🎒 React Inventory System (RADIOT Architecture)

> **Live Demo**: [Link to deployed site if applicable]

A high-performance, type-safe inventory management system built with the bleeding-edge React ecosystem (React 19, Tailwind v4, Vite/Rolldown). This project demonstrates advanced state management patterns, strict TypeScript integration, and component composability.

## 🚀 Key Features

- **Complex State Management**: Implements a custom Flux-like architecture using `useReducer` + Context API for predictable state updates.
- **Normalized Data Structure**: Items are stored in a normalized lookup table (ID-based) to optimize performance and prevent data duplication.
- **Equipment & Stats**: Real-time stats calculation based on equipped items.
- **Persisted State**: Debounced local storage synchronization to persist user sessions without performance penalties.
- **Search & Filtering**: Instant inventory filtering.
- **Modern User Interface**: Responsive design built with Tailwind CSS v4.

## 🛠 Tech Stack

- **Core**: [React 19](https://react.dev/) (RC), TypeScript 5.9
- **Build Tool**: [Vite (Rolldown)](https://vitejs.dev/) - Experimental fast Rust-based bundler.
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) - The latest engine.
- **Testing**: [Vitest](https://vitest.dev/) & React Testing Library.
- **Icons**: Lucide React.
- **Architecture**: **RADIOT** Framework (Requirements, Architecture, Data, Interface, Optimization, Testing).

## 🏗 Architecture & Design Patterns

This project follows strict architectural guidelines to ensure scalability:

1.  **Unidirectional Data Flow**:
    -   Actions -> Dispatch -> Reducer -> Store -> View.
    -   See [`architecture.md`](./architecture.md) for the data flow diagram.
2.  **Component Composition**:
    -   `InventoryProvider`: Logic encapsulation.
    -   `EquippedInventory` vs `Bag`: Separation of concerns (View layer).
3.  **Performance Optimizations**:
    -   **Normalization**: State is O(1) accessible by ID.
    -   **Debouncing**: Persistence logic is debounced to 1000ms to avoid blocking the main thread during rapid inventory changes.

## 📦 Installation & Setup

Ensure you have Node.js 20+ installed.

```bash
# 1. Clone the repository
git clone https://github.com/yourusername/inventory-app.git

# 2. Install dependencies
npm install

# 3. specific dependency handling (if using experimental versions)
# The project uses 'rolldown-vite' which might require specific overrides as seen in package.json
```
