/* eslint-disable no-unused-vars */
import { useState } from "react";
import { FaAngleDown } from "react-icons/fa";
//Side bar Item component, this are mapped with their nested item.
//TODO : If nested Item increases then switch it to recursive method of calling Item component.
export default function SlideBarItem({ item, navToggle, motion }) {
  const [show, setShow] = useState(false);
  return (
    <article className="flex gap-4 text-text p-2">
      <item.icon className="icon text-2xl" />
      <article className="flex flex-col justify-center gap-2">
        {navToggle && (
          <motion.article
            initial={{ opacity: 0, x: "-100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "-100%" }}
            transition={{ duration: 0.25, ease: "easeIn" }}
            className="flex gap-2 items-center icon"
            onClick={() => setShow((prev) => !prev)}
          >
            <p>{item.name}</p>
            {item["nest"] && (
              <FaAngleDown
                className={`icon ${
                  show ? "-rotate-90" : "rotate-0"
                } mt-0.8 transition-all`}
              />
            )}
          </motion.article>
        )}
        {item["nest"] && navToggle && show && (
          <article className="flex flex-col pt-4 gap-4 justify-center">
            {item.nest.map((initem, index) => (
              <div
                key={`slidebar/${item.name}/subitem/${index}`}
                className="flex gap-4 items-center"
              >
                <div className="flex items-center icon">
                  <initem.icon className="text-2xl" />
                </div>
                <p>{initem.name}</p>
              </div>
            ))}
          </article>
        )}
      </article>
    </article>
  );
}
