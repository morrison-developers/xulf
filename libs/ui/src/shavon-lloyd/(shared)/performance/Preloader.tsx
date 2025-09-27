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

interface PreloaderVideoProps {
  src: string;
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
  className?: string;
  bounce?: boolean;
  /**
   * Hold duration (ms) before starting playback when bouncing forward
   */
  holdStart?: number;
  /**
   * Hold duration (ms) at the end before reversing direction when bouncing
   */
  holdEnd?: number;
}

import { useRef } from "react";
import React from "react";

export function PreloaderVideo({
  src,
  autoPlay = true,
  loop = true,
  muted = true,
  className,
  bounce = false,
  holdStart = 0,
  holdEnd = 0,
}: PreloaderVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const playbackDirection = useRef<1 | -1>(1);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  React.useEffect(() => {
    if (!bounce) return;
    const video = videoRef.current;
    if (!video) return;

    let endedHandler: (() => void) | null = null;

    endedHandler = () => {
      // Reverse direction
      playbackDirection.current = playbackDirection.current === 1 ? -1 : 1;
      video.playbackRate = playbackDirection.current;
      // If going backwards, jump to end; if going forwards, jump to start
      if (playbackDirection.current === -1) {
        // Going backward: jump to end, no hold
        video.currentTime = video.duration - 0.01;
        video.play().catch(() => {});
      } else {
        // Going forward: apply holdEnd before reversing
        if (holdEnd > 0) {
          timeoutRef.current = setTimeout(() => {
            video.currentTime = 0;
            // Apply holdStart before playing, if needed
            if (holdStart > 0) {
              timeoutRef.current = setTimeout(() => {
                video.play().catch(() => {});
              }, holdStart);
            } else {
              video.play().catch(() => {});
            }
          }, holdEnd);
        } else {
          video.currentTime = 0;
          if (holdStart > 0) {
            timeoutRef.current = setTimeout(() => {
              video.play().catch(() => {});
            }, holdStart);
          } else {
            video.play().catch(() => {});
          }
        }
      }
    };
    video.playbackRate = 1;
    video.addEventListener("ended", endedHandler);
    return () => {
      video.removeEventListener("ended", endedHandler!);
      // Restore playbackRate in case
      video.playbackRate = 1;
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, [bounce, holdStart, holdEnd]);

  return (
    <video
      ref={videoRef}
      src={src}
      autoPlay={autoPlay}
      loop={bounce ? false : loop}
      muted={muted}
      playsInline
      className={className}
    />
  );
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
      }, 800); // short hold after loaded
      return () => clearTimeout(timeout);
    }
  }, [loaded]);

  return (
    <>
      {/* children always mounted */}
      {children}

      {/* overlay */}
      <AnimatePresence>
        {show && (
          <motion.div
            className={styles.overlay}
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className={styles.content}>
              <PreloaderVideo src="/shavon-loader.mov" className={styles.video} loop={false} />
              {/* Uncomment for debugging */}
              {/* <p>{Math.round(progress * 100)}%</p> */}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
