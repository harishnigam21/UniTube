import { useSelector } from "react-redux";
import items from "../../assets/data/static/header";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import Search from "./Search";
import useApi from "../../hooks/Api";
import { LuSun, LuMoon } from "react-icons/lu";
import logoDark from "../../assets/images/logo-dark.png";
import logoLight from "../../assets/images/logo-light.png";
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
  const user = useSelector((store) => store.user.userInfo);
  const [logo, setLogo] = useState(logoDark);
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem("theme");
    if (saved) return saved === "dark";
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });
  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      setLogo(logoDark);
      root.classList.add("dark");
      root.classList.remove("light");
      localStorage.setItem("theme", "dark");
    } else {
      setLogo(logoLight);
      root.classList.add("light");
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);
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
              src={logo}
              alt={items[1].name}
              className="max-w-20 min-w-16 max-h-10 min-h-8 object-center object-cover"
            />
          </Link>
        </article>
        {screenSize.width >= 768 && <Search items={items} />}
        <article className="flex gap-4 items-center text-text">
          <p
            onClick={() => setIsDark(!isDark)}
            className="p-2 rounded-full bg-border hover:opacity-80 transition-all icon"
            aria-label="Toggle Theme"
          >
            {isDark ? (
              <LuSun className="text-primary w-5 h-5" />
            ) : (
              <LuMoon className="text-secondary w-5 h-5" />
            )}
          </p>
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
                    {login && user?.pic ? (
                      <img
                        src={`${import.meta.env.VITE_BACKEND_HOST}/${user.pic}`}
                        alt="userpic"
                        className="w-10 aspect-square rounded-full icon"
                        onClick={() => {
                          setExpandProfile((prev) => !prev);
                        }}
                      />
                    ) : (
                      <item.icon
                        className={`text-4xl icon`}
                        onClick={() => {
                          setExpandProfile((prev) => !prev);
                        }}
                      />
                    )}
                    {expandProfile && (
                      <article
                        className="flex flex-col absolute right-0 top-0 rounded-b-xl z-50 bg-bgprimary min-w-fit whitespace-nowrap border border-border border-t-0 overflow-hidden"
                        style={{ marginTop: `${headerHeight}px` }}
                        onMouseLeave={() => {
                          setExpandProfile(false);
                        }}
                      >
                        {login && user.firstname && user.lastname && (
                          <strong className="py-2 px-8 uppercase font-black text-transparent bg-clip-text bg-linear-to-r from-primary via-tertiary to-primary bg-size-[200%_auto] animate-gradient">
                            {user.firstname} {user.lastname}
                          </strong>
                        )}
                        <Link
                          to={"/post/view"}
                          className="icon py-2 px-8 hover:bg-border self-center justify-self-center w-full transition-all"
                        >
                          My Posts
                        </Link>
                        <Link
                          to={"/channel/view"}
                          className="icon py-2 px-8 hover:bg-border self-center justify-self-center w-full transition-all"
                        >
                          My Channel
                        </Link>
                        <p
                          className="icon py-2 px-8 hover:bg-border self-center justify-self-center w-full transition-all"
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
