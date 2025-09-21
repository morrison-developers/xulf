"use client";

import { useEffect, useState } from "react";

export function usePreloadImages(
  priorityUrls: string[],
  otherUrls: string[]
): { loaded: boolean; progress: number } {
  const total = priorityUrls.length + otherUrls.length;
  const [loaded, setLoaded] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let isCancelled = false;
    let completed = 0;

    const updateProgress = () => {
      completed++;
      if (!isCancelled) {
        setProgress(completed / total);
      }
    };

    const preloadOne = (url: string) =>
      new Promise<void>((resolve) => {
        const img = new Image();
        img.src = url;
        img.onload = () => img.decode?.().then(resolve).catch(resolve);
        img.onerror = () => resolve();
      });

    const start = async () => {
      // sequential load for priority assets
      for (const url of priorityUrls) {
        await preloadOne(url);
        updateProgress();
      }
      if (!isCancelled) {
        setLoaded(true); // ✅ unblock preloader early
      }

      // background load others
      otherUrls.forEach((url) => {
        preloadOne(url).then(updateProgress);
      });
    };

    start();
    return () => {
      isCancelled = true;
    };
  }, [priorityUrls, otherUrls, total]);

  return { loaded, progress };
}
