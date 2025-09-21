"use client";
import { motion, AnimatePresence } from "framer-motion";
import { usePreloadImages } from "./usePreloadImages";
import { useEffect, useState } from "react";
import styles from "./Preloader.module.css";

interface PreloaderProps {
  children: React.ReactNode;
  priorityUrls: string[];
  otherUrls: string[];
}

export function Preloader({
  children,
  priorityUrls,
  otherUrls,
}: PreloaderProps) {
  const { loaded, progress } = usePreloadImages(priorityUrls, otherUrls);
  const [show, setShow] = useState(true);

  useEffect(() => {
    if (loaded) {
      const timeout = setTimeout(() => {
        setShow(false);
      }, 500); // hold 1s after loaded
      return () => clearTimeout(timeout);
    }
  }, [loaded]);

  return (
    <>
      {/* Children always mounted */}
      {children}

      {/* Overlay sits above until show=false */}
      <AnimatePresence>
        {show && (
          <motion.div
            className={styles.overlay}
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.1 }}
          >
            <div className={styles.content}>
              <motion.div className={styles.spinner} />
              {/* <p>{Math.round(progress * 100)}%</p> */}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
