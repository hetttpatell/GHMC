import { useEffect, useRef } from 'react';
import { initSmoothScroll } from './animations/smoothScroll';
import Home from './pages/Home';

/**
 * Root application component.
 *
 * Initialises Lenis smooth scrolling on mount and tears it down on unmount.
 * Rendering is delegated entirely to the Home page.
 */
function App() {
  const lenisRef = useRef(null);

  useEffect(() => {
    lenisRef.current = initSmoothScroll();

    return () => {
      lenisRef.current?.destroy();
    };
  }, []);

  return <Home />;
}

export default App;
