import items from "../../assets/data/static/sidebar";
import { useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SlideBarItem from "./SlideBarItem";
export default function SlideBar({ navToggle, sidebarToggle, setNavToggle }) {
  const barRef = useRef(null);
  //sidebar variation for different component to manage responsiveness of component
  useEffect(() => {
    if (barRef.current) {
      if (sidebarToggle.type == "type2") {
        setNavToggle(true);
        barRef.current.classList.add("fixed");
        barRef.current.classList.remove("sticky");
      } else {
        barRef.current.classList.remove("fixed");
        barRef.current.classList.add("sticky");
      }
    }
  }, [sidebarToggle, setNavToggle]);
  // Same as Header component, all items os sidebar is got from static data and then mapped here
  //Separated Item component to manage their toggle within state
  return (
    <AnimatePresence>
      {sidebarToggle.status && (
        <motion.section
          initial={{ opacity: 0, x: "-100%" }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: "-100%" }}
          transition={{ duration: 0.25, ease: "easeIn" }}
          ref={barRef}
          className=" flex flex-col z-40 sticky left-0 h-screen bg-bgprimary pl-4 pt-16 overflow-y-scroll gap-4 min-w-fit whitespace-nowrap transition-all"
        >
          {items.map((item, index) => (
            <SlideBarItem
              key={`sidebar/item/${index}`}
              item={item}
              navToggle={navToggle}
              motion={motion}
            />
          ))}
        </motion.section>
      )}
    </AnimatePresence>
  );
}
