import { useSelector } from "react-redux";
import items from "../../assets/data/static/header";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import Search from "./Search";
import useApi from "../../hooks/Api";
export default function Header({
  navToggle,
  setNavToggle,
  setSidebarToggle,
  screenSize,
}) {
  const { sendRequest } = useApi();
  const headerRef = useRef(null);
  const navigate = useNavigate();
  const [headerHeight, setHeaderHeight] = useState(0);
  const [expandProfile, setExpandProfile] = useState(false);
  const login = useSelector((store) => store.user.loginStatus);
  const handleHeight = () => {
    if (headerRef.current) {
      let need = headerRef.current.getBoundingClientRect();
      setHeaderHeight(need.height);
    }
  };
  const handleLogout = async () => {
    await sendRequest("logout", "GET").then((result) => {
      if (result && result.success) {
        window.localStorage.clear();
        navigate("/login");
      }
    });
  };
  useEffect(() => {
    handleHeight();
    window.addEventListener("resize", handleHeight);
    return () => window.removeEventListener("resize", handleHeight);
  }, []);
  return (
    <header
      ref={headerRef}
      className="flex flex-col w-full justify-between sticky top-0 py-1.5 px-4 z-50 bg-bgprimary" //TODO:and remove this hidden and settle down header
    >
      <article className="flex gap-4 justify-between items-center">
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
        {screenSize.width >= 768 && <Search items={items} />}
        <article className="flex gap-4 items-center text-text">
          {login
            ? items.slice(-4, -1).map((item) =>
                item.name.toLowerCase() == "create" ? (
                  <Link
                    to={item.path}
                    key={`header/item/${item.id}`}
                    className="flex items-center gap-2 px-2.5 py-1.5 rounded-full border border-border bg-border icon"
                    title={item.name}
                  >
                    <item.icon className="text-2xl icon" />
                    {screenSize.width > 420 && (
                      <span className="whitespace-nowrap">{item.name}</span>
                    )}
                  </Link>
                ) : item.name == "profile" ? (
                  <div
                    key={`header/item/${item.id}`}
                    className="flex items-center"
                  >
                    <item.icon
                      className={`text-3xl icon`}
                      onClick={() => {
                        setExpandProfile((prev) => !prev);
                      }}
                    />
                    {expandProfile && (
                      <article
                        className="flex flex-col absolute right-0 top-0 rounded-b-xl z-50 bg-bgprimary min-w-fit whitespace-nowrap border border-border border-t-0 overflow-hidden"
                        style={{ marginTop: `${headerHeight}px` }}
                        onMouseLeave={() => {
                          setExpandProfile(false);
                        }}
                      >
                        <Link
                          to={"/post/view"}
                          className="icon py-2 px-8 hover:bg-border transition-all"
                        >
                          My Posts
                        </Link>
                        <Link
                          to={"/channel/view"}
                          className="icon py-2 px-8 hover:bg-border transition-all"
                        >
                          My Channel
                        </Link>
                        <p
                          className="icon py-2 px-8 hover:bg-border transition-all"
                          onClick={handleLogout}
                        >
                          Log Out
                        </p>
                      </article>
                    )}
                  </div>
                ) : (
                  <Link
                    to={item.path}
                    key={`header/item/${item.id}`}
                    className="relative flex items-center"
                  >
                    <item.icon className={`text-2xl icon`} />
                  </Link>
                )
              )
            : items.slice(-1).map((item) => (
                <Link
                  to={item.path}
                  key={`header/item/${item.id}`}
                  className="flex items-center gap-2 p-1.5 rounded-full border border-border icon"
                >
                  <item.icon className="text-2xl icon" />
                  <span className="whitespace-nowrap">{item.name}</span>
                </Link>
              ))}
        </article>
      </article>
    </header>
  );
}
