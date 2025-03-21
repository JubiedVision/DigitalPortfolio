import { useState, useEffect, RefObject } from "react";

interface UseIntersectionObserverOptions {
  root?: Element | null;
  rootMargin?: string;
  threshold?: number | number[];
  once?: boolean;
}

export function useIntersectionObserver<T extends Element>(
  ref: RefObject<T>,
  options: UseIntersectionObserverOptions = {}
): boolean {
  const [isIntersecting, setIsIntersecting] = useState<boolean>(false);
  const { root = null, rootMargin = "0px", threshold = 0, once = false } = options;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
        
        // If 'once' is true and the element is intersecting, unobserve it
        if (once && entry.isIntersecting && ref.current) {
          observer.unobserve(ref.current);
        }
      },
      { root, rootMargin, threshold }
    );

    const currentRef = ref.current;
    
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [ref, root, rootMargin, threshold, once]);

  return isIntersecting;
}
