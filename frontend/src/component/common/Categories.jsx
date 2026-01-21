import { useRef, useState, useLayoutEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const CategorySlider = () => {
  const scrollRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const navigate = useNavigate();
  const categories = useSelector((store) => store.videos.itemsCategories);
  const checkScroll = useCallback(() => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      // Show left arrow if we have scrolled at least 5px
      setShowLeftArrow(scrollLeft > 5);
      // Show right arrow if there is more content to the right
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 5);
    }
  }, []);
  const scroll = (direction) => {
    if (scrollRef.current) {
      const { clientWidth } = scrollRef.current;
      const scrollAmount =
        direction === "left" ? -clientWidth * 0.7 : clientWidth * 0.7;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };
  useLayoutEffect(() => {
    checkScroll();
    const currentRef = scrollRef.current;
    currentRef?.addEventListener("scroll", checkScroll);
    window.addEventListener("resize", checkScroll);
    return () => {
      currentRef?.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, [checkScroll, categories]);
  {
    /* all category fetched along with post so whenever new category comes it updates the array at redux store and that array will be mapped here*/
  }
  return (
    /* 1. Main Wrapper: overflow-hidden ensures it stays inside the parent */
    categories &&
    categories.length > 0 && (
      <div className="relative w-full max-w-full pt-3 overflow-hidden text-text flex items-center">
        {/* 2. Left Overlay & Button */}
        {showLeftArrow && (
          <div className="z-10 flex items-center">
            <div className="w-10 h-full" />
            <button
              onClick={() => scroll("left")}
              className="absolute left-0 p-1.5 rounded-full bg-border text-text shadow-md border border-border hover:bg-text/50 hover:text-bgprimary transition-colors"
            >
              <ChevronLeft size={18} />
            </button>
          </div>
        )}

        {/* 3. The Scrollable Container */}
        <div
          ref={scrollRef}
          onScroll={checkScroll}
          className="flex items-center overflow-x-auto whitespace-nowrap scrollbar-hide px-4 gap-3 scroll-smooth"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            WebkitOverflowScrolling: "touch",
          }}
        >
          {categories.map((cat, index) => (
            <button
              key={`home/filterby/category/${index}`}
              className="shrink-0 px-4 py-1.5 text-sm font-medium rounded-lg border border-border bg-border text-text hover:bg-bgprimary hover:text-blue-600 transition-all"
              onClick={() => {
                navigate(`?category=${cat}`, { replace: true });
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* 4. Right Overlay & Button */}
        {showRightArrow && (
          <div className="az-10 flex items-center">
            <div className="w-10 h-full" />
            <button
              onClick={() => scroll("right")}
              className="absolute right-0 p-1.5 rounded-full bg-border text-text shadow-md border border-border hover:bg-text/50 hover:text-bgprimary transition-colors"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        )}
      </div>
    )
  );
};

export default CategorySlider;
