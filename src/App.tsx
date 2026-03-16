import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { SplashScreen } from './components/SplashScreen';
import { ErrorBoundary } from './components/ErrorBoundary';

const LazyInventory = lazy(
  () => import('./components/InventoryManager/InventoryManager'),
);

const LazyCompendium = lazy(() =>
  import('./components/Compendium/Compendium').then((module) => ({
    default: module.Compendium,
  })),
);

const App = () => {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Suspense fallback={'loading ui...'}>
          <Routes>
            <Route path='/' element={<SplashScreen />}></Route>
            <Route path='/inventory' element={<LazyInventory />}></Route>
            <Route path='/compendium' element={<LazyCompendium />}></Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </ErrorBoundary>
  );
};

export default App;
