"use client";

import { useEffect, useRef, useState } from "react";

export function useIntersectionObserver(
  options = {
    threshold: 0,
    root: null,
    rootMargin: "0px",
  },
) {
  const [isVisible, setIsVisible] = useState(false);
  const [hasBeenVisible, setHasBeenVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsVisible(entry!.isIntersecting);

      if (entry!.isIntersecting && !hasBeenVisible) {
        setHasBeenVisible(true);
      }
    }, options);

    const currentRef = ref.current;

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [hasBeenVisible, options]);

  return { ref, isVisible, hasBeenVisible };
}
