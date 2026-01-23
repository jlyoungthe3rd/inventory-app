import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import InventoryManager from './App.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <InventoryManager />
  </StrictMode>,
);
