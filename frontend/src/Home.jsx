/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useOutletContext } from "react-router-dom";
import HomeSkeleton from "./component/skeleton/Home";
import Video from "./component/repetative/Video";
import Shorts from "./component/repetative/Shorts";
import { changeLoginStatus } from "./store/Slices/userSlice";
import { addItems, setItems } from "./store/Slices/videoSlice";
export default function Home() {
  const navigate = useNavigate();
  const { short, setSidebarToggle } = useOutletContext();
  const video = useSelector((store) => store.videos.items);
  const nextCursor = useSelector((store) => store.videos.nextCursor);
  const [category, setCategory] = useState([]);
  const dispatch = useDispatch();
  const [spinner, setSpinner] = useState(false);
  const [loader, setLoader] = useState(true); //TODO:just to switch between skeleton, delete after testing and also update below code
  useEffect(() => {
    const getPost = async () => {
      setLoader(true);
      const url = `${import.meta.env.VITE_BACKEND_HOST}/posts`;
      const token = window.localStorage.getItem("acTk");
      try {
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "content-type": "application/json",
            authorization: `bearer ${token ? JSON.parse(token) : ""}`,
          },
          credentials: "include",
        });
        const responseData = await response.json();
        console.log(responseData.message);
        if (!response.ok) {
          if (
            response.status == 401 ||
            response.status == 400 ||
            response.status == 403
          ) {
            dispatch(changeLoginStatus({ status: false }));
            window.localStorage.removeItem("acTk");
            navigate("/login");
          }
          return;
        }
        dispatch(
          setItems({
            posts: responseData.data,
            nextCursor: responseData.nextCursor,
          })
        );
      } catch (error) {
        console.log(error.message);
      } finally {
        setTimeout(() => {
          setLoader(false);
        }, 2000);
      }
    };
    getPost();
  }, []);
  useEffect(() => {
    setSidebarToggle((prev) => ({ ...prev, type: "type1", status: true }));
  }, [setSidebarToggle]);
  useEffect(() => {
    const loadLoader = async () => {
      const ctg = video.map((item) => item.category);
      ctg.unshift("All");
      setCategory(ctg);
    };
    loadLoader();
  }, [video]);
  const scrollRef = useRef(null);
  const scrollShorts = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo =
        direction === "left"
          ? scrollLeft - clientWidth
          : scrollLeft + clientWidth;

      scrollRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };
  const loadMore = async (cursor) => {
    setSpinner(true);
    const url = `${import.meta.env.VITE_BACKEND_HOST}/posts?cursor=${cursor}`;
    const token = window.localStorage.getItem("acTk");
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "content-type": "application/json",
          authorization: `bearer ${token ? JSON.parse(token) : ""}`,
        },
        credentials: "include",
      });
      const responseData = await response.json();
      console.log(responseData.message);
      if (!response.ok) {
        if (
          response.status == 401 ||
          response.status == 400 ||
          response.status == 403
        ) {
          dispatch(changeLoginStatus({ status: false }));
          window.localStorage.removeItem("acTk");
          navigate("/login");
        }
        return;
      }
      dispatch(
        addItems({
          posts: responseData.data,
          nextCursor: responseData.nextCursor,
        })
      );
    } catch (error) {
      console.log(error.message);
    } finally {
      setSpinner(false);
    }
  };
  return (
    <section className="flex flex-col gap-3 px-2 h-screen w-full overflow-y-auto overflow-x-hidden">
      {loader ? (
        <HomeSkeleton />
      ) : (
        <article className="relative flex flex-col w-full">
          <article className="min-w-0 w-full max-w-full flex flex-wrap sticky bg-bgprimary top-0 z-10 py-5 px-2 overflow-x-auto noscrollbar gap-4">
            {category.map((categ, index) => (
              <span
                key={`home/filterby/category/${index}`}
                className="rounded-md bg-border text-text py-1 px-3 icon"
              >
                {categ}
              </span>
            ))}
          </article>
          <article className="w-full text-text">
            <article className="flex flex-col gap-8">
              {video.length > 0 ? (
                <article className="w-full grid grid-cols-1 min-[480px]:grid-cols-2 sm:grid-cols-2 lg:grid-cols-3">
                  {video.map((video, index) => (
                    <React.Fragment key={video._id}>
                      <Video
                        key={`video/${video._id}`}
                        vid={video}
                        type={"home"}
                      />
                      {index === 1 && (
                        <article className="w-full max-w-full overflow-x-hidden col-span-full py-6 border-y border-zinc-800/50 my-6 relative">
                          <article className="flex items-center justify-between mb-4 px-2">
                            <div className="flex items-center gap-2">
                              <span className="text-red-600 text-3xl font-bold italic">
                                S
                              </span>
                              <h2 className="text-xl font-bold">Shorts</h2>
                            </div>
                            <div className="hidden md:flex gap-2">
                              <button
                                onClick={() => scrollShorts("left")}
                                className="w-10 h-10 flex items-center justify-center bg-zinc-800 hover:bg-zinc-700 rounded-full transition-colors"
                              >
                                ←
                              </button>
                              <button
                                onClick={() => scrollShorts("right")}
                                className="w-10 h-10 flex items-center justify-center bg-zinc-800 hover:bg-zinc-700 rounded-full transition-colors"
                              >
                                →
                              </button>
                            </div>
                          </article>
                          <article
                            ref={scrollRef}
                            className="flex overflow-x-auto gap-4 pb-4 scroll-smooth scrollbar-hide"
                          >
                            {short.slice(0, 10).map((short) => (
                              <Shorts key={`short/${short.id}`} srt={short} />
                            ))}
                            <div className="flex items-center justify-center whitespace-nowrap icon">
                              View All →
                            </div>
                          </article>
                        </article>
                      )}
                    </React.Fragment>
                  ))}
                  {nextCursor && (
                    <button
                      className="py-2 px-4 rounded-md bg-primary text-white self-center justify-self-center col-span-full my-6 w-fit gap-2 flex justify-center items-center icon"
                      onClick={() => loadMore(nextCursor)}
                    >
                      <p>Load more</p>
                      {spinner && (
                        <p className="w-5 aspect-square rounded-full border-4 border-l-violet-500 border-r-green-500 border-b-orange-600 border-t-red-500 animate-[spin_0.3s_linear_infinite]"></p>
                      )}
                    </button>
                  )}
                </article>
              ) : (
                <p className="text-xl md:text-2xl text-center py-4 col-span-full text-red-500 font-bold font-serif">
                  No Post Found !
                </p>
              )}
            </article>
          </article>
        </article>
      )}
    </section>
  );
}
