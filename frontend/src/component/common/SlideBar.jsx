import items from "../../assets/data/static/sidebar";
import { FaAngleDown } from "react-icons/fa";
export default function SlideBar({ navToggle }) {
  const handleCollapseAndExpand = (e) => {
    const arrowTarget = e.currentTarget.childNodes[1];
    const target = e.currentTarget.parentElement.childNodes[1];
    if (arrowTarget && target) {
      if (target.classList.contains("hidden")) {
        arrowTarget.style.transform = "rotate(-90deg)";
        target.classList.remove("hidden");
        target.classList.add("flex");
      } else {
        arrowTarget.style.transform = "rotate(0deg)";
        target.classList.remove("flex");
        target.classList.add("hidden");
      }
    }
  };
  return (
    <section className=" flex flex-col h-screen pl-4 pt-16 overflow-y-scroll gap-4 min-w-fit whitespace-nowrap transition-all">
      {items.map((item, index) => (
        <article
          key={`sidebar/item/${index}`}
          className="flex gap-4 text-text p-2"
        >
          <item.icon className="icon text-2xl" />
          <article className="flex flex-col justify-center gap-2">
            {navToggle && (
              <article
                className="flex gap-2 items-center icon"
                onClick={(e) => handleCollapseAndExpand(e)}
              >
                <p>{item.name}</p>
                {item["nest"] && (
                  <FaAngleDown className="icon rotate-0 mt-0.8 transition-all" />
                )}
              </article>
            )}
            {item["nest"] && navToggle && (
              <article className="hidden flex-col pt-4 gap-4 justify-center">
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
      ))}
    </section>
  );
}
