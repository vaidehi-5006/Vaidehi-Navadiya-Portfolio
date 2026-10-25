import React, { createContext, useContext, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const TransitionContext = createContext(null);

export function TransitionProvider({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [isActive, setIsActive] = useState(false);

  const navigateWithTransition = (to) => {
    // If it's a hash link on the same page
    const [path, hash] = to.split('#');
    const currentPath = location.pathname;

    if (currentPath === (path || '/')) {
      if (hash) {
        const el = document.getElementById(hash);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
          return;
        }
      }
      navigate(to);
      return;
    }

    setIsActive(true);
    setTimeout(() => {
      navigate(to);
      window.scrollTo(0, 0);
      setTimeout(() => {
        setIsActive(false);
      }, 50);
    }, 450);
  };

  return (
    <TransitionContext.Provider value={{ navigateWithTransition }}>
      {children}
      <div className={`page-transition-overlay ${isActive ? 'active' : ''}`}>
        <div className="transition-logo">
          Vaidehi<span>.</span>
        </div>
      </div>
    </TransitionContext.Provider>
  );
}

export function usePageTransition() {
  const context = useContext(TransitionContext);
  if (!context) {
    throw new Error('usePageTransition must be used within TransitionProvider');
  }
  return context;
}
