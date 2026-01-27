/* eslint-disable react-hooks/set-state-in-effect */
import { useDispatch, useSelector } from "react-redux";
import items from "../../assets/data/static/header";
import { Link, useNavigate } from "react-router-dom";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import Search from "./Search";
import useApi from "../../hooks/Api";
import { LuSun, LuMoon, LuSearch } from "react-icons/lu";
import logoDark from "../../assets/images/logo-dark.png";
import logoLight from "../../assets/images/logo-light.png";
import CategorySlider from "./Categories";
import { setSearchStatus } from "../../store/Slices/videoSlice";
export default function Header({
  showCategory,
  navToggle,
  setNavToggle,
  setSidebarToggle,
  screenSize,
  headerHeight,
  setHeaderHeight,
}) {
  const dispatch = useDispatch();
  const { sendRequest } = useApi();
  const navigate = useNavigate();
  const [expandProfile, setExpandProfile] = useState(false);
  const login = useSelector((store) => store.user.loginStatus);
  const user = useSelector((store) => store.user.userInfo);
  const [logo, setLogo] = useState(logoDark);
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem("theme");
    if (saved) return saved === "dark";
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });
  const [showSearch, setShowSearch] = useState(false);
  const categories = useSelector((store) => store.videos.itemsCategories);
  const headerRef = useRef(null);
  const handleHeight = useCallback(() => {
    if (headerRef.current) {
      const bounds = headerRef.current.getBoundingClientRect();
      setHeaderHeight(bounds.height);
    }
  }, [setHeaderHeight]);

  useLayoutEffect(() => {
    //  Running it immediately when the component mounts
    handleHeight();
    // Set up the listener for subsequent window resizes
    window.addEventListener("resize", handleHeight);
    // Clean up
    return () => window.removeEventListener("resize", handleHeight);
  }, [categories, handleHeight, showCategory]);
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

  //send Request for logout after successful response access token will be deleted from localstorage
  const handleLogout = async () => {
    await sendRequest("logout", "GET").then((result) => {
      if (result && result.success) {
        window.localStorage.clear();
        navigate("/login", { replace: true });
      }
    });
  };

  //Items in header section will be get from items that we have import from static data, which is in form of array, so here our work is only to map that items at their respective positions
  //Search Component is separately created to handle it easy in responsiveness
  return (
    <header
      ref={headerRef}
      className="flex flex-col w-full justify-between sticky top-0 border-b border-border py-3 px-4 z-50 backdrop-blur-[200px] bg-bgprimary/50"
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
          <Link
            to={items[1].path}
            onClick={() => dispatch(setSearchStatus(false))}
          >
            <img
              src={logo}
              alt={items[1].name}
              className="max-w-20 min-w-16 max-h-10 min-h-8 object-center object-cover"
            />
          </Link>
        </article>
        {screenSize.width >= 768 ? (
          <Search items={items} />
        ) : (
          <div className="flex items-center w-full justify-end">
            <div
              className="flex items-center rounded-full p-2 bg-border icon"
              onClick={() => {
                setShowSearch(true);
              }}
            >
              <LuSearch className="text-xl" />
            </div>
          </div>
        )}
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
                  screenSize.width > 430 && (
                    <Link
                      to={item.path}
                      key={`header/item/${item.id}`}
                      className="flex items-center gap-2 px-2.5 py-1.5 rounded-full border border-border bg-border icon"
                      title={item.name}
                    >
                      <item.icon className="text-2xl icon" />
                      {screenSize.width > 500 && (
                        <span className="whitespace-nowrap">{item.name}</span>
                      )}
                    </Link>
                  )
                ) : item.name == "profile" ? (
                  <div
                    key={`header/item/${item.id}`}
                    className="flex items-center"
                  >
                    {login && user?.pic ? (
                      <img
                        src={`${import.meta.env.VITE_BACKEND_HOST}/${user.pic}`}
                        alt="userpic"
                        className="min-w-10 max-w-10 aspect-square rounded-full icon"
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
                        {screenSize.width <= 380 && (
                          <Link
                            to={"/notification"}
                            className="icon py-2 px-8 hover:bg-border self-center justify-self-center w-full transition-all"
                          >
                            Notifications
                          </Link>
                        )}
                        <Link
                          to={"/post/view"}
                          className="icon py-2 px-8 hover:bg-border self-center justify-self-center w-full transition-all"
                        >
                          My Posts
                        </Link>
                        {screenSize.width <= 430 && (
                          <Link
                            to={"/post/create"}
                            className="icon py-2 px-8 hover:bg-border self-center justify-self-center w-full transition-all"
                          >
                            Create Post
                          </Link>
                        )}
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
                  screenSize.width > 380 && (
                    <Link
                      to={item.path}
                      key={`header/item/${item.id}`}
                      className="relative flex items-center"
                    >
                      <item.icon className={`text-2xl icon`} />
                    </Link>
                  )
                ),
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
      {showCategory && <CategorySlider />}
      {showSearch && (
        <article className="absolute self-center justify-self-center flex items-center justify-center py-2 px-4 bg-bgprimary w-full h-full z-10">
          <Search items={items} setShowSearch={setShowSearch} />
        </article>
      )}
    </header>
  );
}
