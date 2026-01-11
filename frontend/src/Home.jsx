/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useOutletContext } from "react-router-dom";
import HomeSkeleton from "./component/skeleton/Home";
import Video from "./component/repetative/Video";
import Shorts from "./component/repetative/Shorts";
import { changeLoginStatus } from "./store/Slices/userSlice";
import { setItems } from "./store/Slices/videoSlice";
export default function Home() {
  const { short, setSidebarToggle } = useOutletContext();
  const video = useSelector((store) => store.videos.items);
  const [videos, setVideos] = useState([]);
  const [category, setCategory] = useState([]);
  const [categorySelected, setCategorySelected] = useState("all");
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(true); //TODO:just to switch between skeleton, delete after testing and also update below code
  useEffect(() => {
    const getPost = async () => {
      setLoader(true);
      const url = `${import.meta.env.VITE_BACKEND_HOST}/posts`;
      const token = window.localStorage.getItem("acTk");
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
        if (response.status == 401 || response.status == 400) {
          dispatch(changeLoginStatus({ status: false }));
          window.localStorage.removeItem("acTk");
        }
        alert(responseData.message);
        return;
      }
      setLoader(false);
      dispatch(
        setItems({
          posts: responseData.data,
          nextCursor: responseData.nextCursor,
        })
      );
    };
    getPost();
  }, []);
  useEffect(() => {
    setSidebarToggle((prev) => ({ ...prev, type: "type1", status: true }));
  }, [setSidebarToggle]);
  useEffect(() => {
    const filterItem = async () => {
      if (categorySelected.toLowerCase() == "all") {
        setLoader(true);
        setTimeout(() => {
          setVideos(video);
          setLoader(false);
        }, 1000);
      } else {
        setVideos(
          video.filter(
            (item) =>
              item.category.toLowerCase() == categorySelected.toLowerCase()
          )
        );
      }
    };
    filterItem();
  }, [video, categorySelected]);
  useEffect(() => {
    const loadLoader = async () => {
      if (videos.length > 0) {
        const ctg = video.map((item) => item.category);
        ctg.unshift("All");
        setCategory(ctg);
        setLoader(false);
      } else {
        setLoader(true);
      }
    };
    loadLoader();
  }, [video, videos]);
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
                onClick={() => setCategorySelected(categ.toLowerCase())}
              >
                {categ}
              </span>
            ))}
          </article>
          <article className="w-full text-text">
            <article className="w-full grid grid-cols-1 min-[480px]:grid-cols-2 sm:grid-cols-2 lg:grid-cols-3">
              {videos.length > 0 &&
                videos.map((video, index) => (
                  <React.Fragment key={video._id}>
                    <Video key={`video/${video._id}`} vid={video} />
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
            </article>
          </article>
        </article>
      )}
    </section>
  );
}
