"use client";

import { useEffect, useRef, useState } from "react";

interface HorizontalScrollWrapperProps {
  children?: React.ReactNode;
}

function HorizontalScrollWrapper({ children }: HorizontalScrollWrapperProps) {
  const scrollableContainerRef = useRef<HTMLDivElement>(null);
  const { 0: scrollRight, 1: setScrollRight } = useState(true);
  const { 0: scrollLeft, 1: setScrollLeft } = useState(false);

  useEffect(() => {
    const el = scrollableContainerRef.current;
    if (!el) return;

    function handleScroll() {
      setScrollLeft(el?.scrollLeft ? el?.scrollLeft > 0 : false);
      setScrollRight(
        el?.scrollWidth && el.scrollLeft && el.clientWidth
          ? el?.scrollWidth - el?.scrollLeft > el?.clientWidth + 0
          : false,
      );
    }

    el.addEventListener("scroll", handleScroll);

    return () => el.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative">
      {scrollRight && (
        <div className="pointer-events-none absolute bottom-0 right-0 top-0 z-10 block w-7 bg-gradient-to-l from-gray-200 to-transparent sm:hidden"></div>
      )}
      {scrollLeft && (
        <div className="pointer-events-none absolute bottom-0 left-0 top-0 z-10 block w-5 bg-gradient-to-r from-slate-100 to-transparent sm:hidden"></div>
      )}
      <div
        ref={scrollableContainerRef}
        className="flashSalesSection grid grid-cols-[1fr_1fr_1fr_1fr] grid-rows-[1fr] gap-2 overflow-x-scroll p-1 sm:grid-cols-[1fr_1fr] sm:grid-rows-[1fr_1fr] sm:gap-4 md:grid-cols-[1fr_1fr_1fr_1fr] md:grid-rows-[1fr]"
      >
        {children}
      </div>
    </div>
  );
}

export default HorizontalScrollWrapper;
