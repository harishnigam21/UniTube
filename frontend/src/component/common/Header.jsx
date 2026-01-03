import items from "../../assets/data/static/header";
import { Link } from "react-router-dom";
export default function Header({
  navToggle,
  setNavToggle,
  login,
  setSidebarToggle,
}) {
  return (
    <header className="flex flex-col w-full justify-between sticky top-0 py-1.5 px-4 overflow-hidden z-50 bg-bgprimary">
      <article className="flex gap-8 justify-between items-center">
        <article className="flex gap-4 items-center">
          {items
            .filter((item) => item.id == 0)
            .map((item) => (
              <div
                onClick={() => {
                  setNavToggle(!navToggle);
                  setSidebarToggle((prev) => ({
                    ...prev,
                    status: prev.type == "type1" ? true : !prev.status,
                  }));
                }}
                key={`${item.name}`}
                className="flex items-center p-2 rounded-full hover:bg-border icon transition-all"
              >
                <item.icon className="text-text text-2xl" />
              </div>
            ))}
          <Link to={items[1].path}>
            <img
              src={items[1].icon}
              alt={items[1].name}
              className="max-w-20 min-w-16 max-h-10 min-h-8 object-center object-cover"
            />
          </Link>
        </article>
        <article className="flex gap-4 items-center justify-center grow">
          {items.slice(2, 4).map((item) =>
            item.name == "search" ? (
              <div
                key={`header/item/${item.id}`}
                className="flex items-center rounded-full overflow-hidden relative border border-border text-text grow w-full md:max-w-3/4 lg:max-w-1/2 min-w-56"
              >
                <input
                  id="search"
                  name="search"
                  placeholder="Search"
                  className="w-full py-2 px-4"
                />
                <div className="flex items-center absolute right-0 bg-border h-full icon">
                  <item.icon className="text-2xl my-2 mx-4 icon" />
                </div>
              </div>
            ) : item.name == "mic" ? (
              <div
                key={`header/item/${item.id}`}
                className="flex items-center rounded-full bg-border text-text icon"
              >
                <item.icon className="text-2xl m-2" />
              </div>
            ) : (
              <></>
            )
          )}
        </article>
        <article className=" flex gap-4 items-center text-text">
          {login
            ? items.slice(-4, -1).map((item) =>
                item.name.toLowerCase() == "create" ? (
                  <div
                    key={`header/item/${item.id}`}
                    className="flex items-center gap-2 px-2.5 py-1.5 rounded-full border border-border bg-border icon"
                  >
                    <item.icon className="text-2xl icon" />
                    <span className="whitespace-nowrap">{item.name}</span>
                  </div>
                ) : (
                  <div
                    key={`header/item/${item.id}`}
                    className="flex items-center"
                  >
                    <item.icon
                      className={`${
                        item.name == "profile" ? "text-3xl" : "text-2xl"
                      } icon`}
                    />
                  </div>
                )
              )
            : items.slice(-1).map((item) => (
                <div
                  key={`header/item/${item.id}`}
                  className="flex items-center gap-2 p-1.5 rounded-full border border-border icon"
                >
                  <item.icon className="text-2xl icon" />
                  <span className="whitespace-nowrap">{item.name}</span>
                </div>
              ))}
        </article>
      </article>
    </header>
  );
}
