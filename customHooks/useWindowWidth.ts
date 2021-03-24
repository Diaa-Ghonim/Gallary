import { useState, useEffect } from 'react';

export function useWindowWidth() {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    // this here and not above instead 0 because next run on server and not o browser and we will wait till component mount on browser
    setWidth(window.innerWidth);
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  });

  return width;
}
