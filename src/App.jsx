import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { TransitionProvider } from './context/TransitionContext';
import HomePage from './pages/HomePage';

const ProcessPage = lazy(() => import('./pages/ProcessPage'));

export default function App() {
  return (
    <TransitionProvider>
      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/process" element={<ProcessPage />} />
        </Routes>
      </Suspense>
    </TransitionProvider>
  );
}
