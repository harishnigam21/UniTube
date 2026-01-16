/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  useNavigate,
  useOutletContext,
  useSearchParams,
} from "react-router-dom";
import HomeSkeleton from "./component/skeleton/Home";
import Video from "./component/repetative/Video";
import Shorts from "./component/repetative/Shorts";
import { setCategories, setItems, addItems } from "./store/Slices/videoSlice";
import useApi from "./hooks/Api";
import LoadMore from "./component/common/LoadMore";
export default function Home() {
  const { loading, sendRequest } = useApi();
  const { short, setSidebarToggle, screenSize } = useOutletContext();
  const video = useSelector((store) => store.videos.items);
  const nextCursor = useSelector((store) => store.videos.nextCursor);
  const categories = useSelector((store) => store.videos.itemsCategories);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const cursorParams = searchParams.get("cursor");
  const categoryParams = searchParams.get("category");
  const handlePostFetch = async () => {
    const params = new URLSearchParams();
    if (categoryParams) params.append("category", categoryParams);
    if (cursorParams) params.append("cursor", cursorParams);
    const result = await sendRequest(`posts?${params.toString()}`, "GET");
    const data = result?.data;
    if (result && result.success) {
      if (cursorParams && video.length > 0) {
        dispatch(
          addItems({
            posts: data?.data,
            nextCursor: data?.nextCursor,
          })
        );
      } else {
        dispatch(
          setItems({
            posts: data?.data,
            nextCursor: data?.nextCursor,
          })
        );
      }

      dispatch(setCategories({ categories: data?.categories }));
    }
  };
  useEffect(() => {
    handlePostFetch();
  }, [searchParams]);
  useEffect(() => {
    screenSize.width >= 768
      ? setSidebarToggle((prev) => ({ ...prev, type: "type1", status: true }))
      : setSidebarToggle((prev) => ({ ...prev, type: "type2", status: false }));
  }, [setSidebarToggle, screenSize]);
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
      {loading && video.length == 0 ? (
        <HomeSkeleton />
      ) : (
        <article className="flex flex-col w-full">
          <article className="w-full flex flex-wrap sticky bg-bgprimary top-0 z-10 py-5 px-2 overflow-x-auto noscrollbar gap-4">
            {categories &&
              categories.map((categ, index) => (
                <span
                  key={`home/filterby/category/${index}`}
                  className="rounded-md bg-border text-text py-1 px-3 icon"
                  onClick={() => {
                    navigate(`?category=${categ}`, { replace: true });
                  }}
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
                                className="w-10 h-10 flex items-center justify-center bg-border text-text hover:bg-zinc-700 rounded-full transition-colors"
                              >
                                ←
                              </button>
                              <button
                                onClick={() => scrollShorts("right")}
                                className="w-10 h-10 flex items-center justify-center bg-border text-text hover:bg-zinc-700 rounded-full transition-colors"
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
                    <div className="col-span-full justify-self-center">
                      <LoadMore nextCursor={nextCursor} loading={loading} />
                    </div>
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
