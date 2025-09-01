import { useState, useEffect } from 'react';

function useScreenSize() {
  function getDeviceType(width: number) {
    if (width <= 768) return 'mobile';
    if (width <= 1024) return 'tablet';
    return 'desktop';
  }

  function getSizeCategory(width: number) {
    if (width < 512) return 'small';
    if (width <= 768) return 'medium';
    return 'large';
  }

  const [size, setSize] = useState(() => {
    if (typeof window === "undefined") {
      return { width: 0, height: 0, deviceType: "desktop", sizeCategory: "large" };
    }
    const width = window.innerWidth;
    return {
      width,
      height: window.innerHeight,
      deviceType: getDeviceType(width),
      sizeCategory: getSizeCategory(width),
    };
  });

  useEffect(() => {
    let timeout: NodeJS.Timeout | null = null;

    function handleResize() {
      if (timeout) return;
      timeout = setTimeout(() => {
        const width = window.innerWidth;
        setSize({
          width,
          height: window.innerHeight,
          deviceType: getDeviceType(width),
          sizeCategory: getSizeCategory(width),
        });
        timeout = null;
      }, 100); // update at most every 100ms
    }

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);
    return size;
  }

export default useScreenSize;
