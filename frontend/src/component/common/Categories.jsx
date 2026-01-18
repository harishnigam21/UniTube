import { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const CategorySlider = () => {
  const scrollRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const navigate = useNavigate();
  const categories = useSelector((store) => store.videos.itemsCategories);
  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      // Show left arrow if we have scrolled at least 5px
      setShowLeftArrow(scrollLeft > 5);
      // Show right arrow if there is more content to the right
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 5);
    }
  };
  const scroll = (direction) => {
    if (scrollRef.current) {
      const { clientWidth } = scrollRef.current;
      const scrollAmount =
        direction === "left" ? -clientWidth * 0.7 : clientWidth * 0.7;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };
  useEffect(() => {
    const currentRef = scrollRef.current;
    checkScroll();
    currentRef?.addEventListener("scroll", checkScroll);
    window.addEventListener("resize", checkScroll);
    return () => {
      currentRef?.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, []);
  {
    /* all category fetched along with post so whenever new category comes it updates the array at redux store and that array will be mapped here*/
  }
  return (
    /* 1. Main Wrapper: overflow-hidden ensures it stays inside the parent */
    categories &&
    categories.length > 0 && (
      <div className="relative w-full max-w-full overflow-hidden bg-bgprimary border-b border-border text-text">
        {/* 2. Left Overlay & Button */}
        {showLeftArrow && (
          <div className="absolute left-0 top-0 bottom-0 z-10 flex items-center">
            <div className="w-16 h-full bg-linear-to-r from-bgprimary via-bgprimary/90 to-transparent" />
            <button
              onClick={() => scroll("left")}
              className="absolute left-2 p-1.5 rounded-full bg-bgprimary shadow-md border border-border hover:bg-text/50 hover:text-bgprimary transition-colors"
            >
              <ChevronLeft size={18} />
            </button>
          </div>
        )}

        {/* 3. The Scrollable Container */}
        <div
          ref={scrollRef}
          onScroll={checkScroll}
          className="flex items-center overflow-x-auto whitespace-nowrap scrollbar-hide py-3 px-4 gap-3 scroll-smooth"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            WebkitOverflowScrolling: "touch",
          }}
        >
          {categories.map((cat, index) => (
            <button
              key={`home/filterby/category/${index}`}
              className="shrink-0 px-4 py-1.5 text-sm font-medium rounded-lg border border-border bg-bgprimary hover:bg-bgprimary hover:text-blue-600 transition-all"
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
          <div className="absolute right-0 top-0 bottom-0 z-10 flex items-center">
            <div className="w-16 h-full bg-linear-to-l from-bgprimary via-bgprimary/90 to-transparent" />
            <button
              onClick={() => scroll("right")}
              className="absolute right-2 p-1.5 rounded-full bg-bgprimary shadow-md border border-border hover:bg-text/50 hover:text-bgprimary transition-colors"
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
