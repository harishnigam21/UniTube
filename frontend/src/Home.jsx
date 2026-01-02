import React, { useEffect, useRef, useState } from "react";
import { useOutletContext } from "react-router-dom";
import HomeSkeleton from "./component/skeleton/Home";
import Video from "./component/repetative/Video";
import Shorts from "./component/repetative/Shorts";
export default function Home() {
  const { video, short } = useOutletContext();
  const [videos, setVideos] = useState([]);
  const [category, setCategory] = useState([]);
  const [categorySelected, setCategorySelected] = useState("all");
  const [loader, setLoader] = useState(true); //TODO:just to switch between skeleton, delete after testing and also update below code
  useEffect(() => {
    const filterItem = async () => {
      if (categorySelected.toLowerCase() == "all") {
        setLoader(true);
        setTimeout(() => {
          setVideos(video);
          setLoader(false);
        }, 3000);
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
    <section className="relative flex flex-col gap-3 px-2 pt-13 h-screen w-full overflow-y-scroll">
      {loader ? (
        <HomeSkeleton />
      ) : (
        <>
          <article className="flex sticky top-0 min-h-fit w-full flex-nowrap overflow-x-scroll noscrollbar gap-4 items-center p-2 z-40 bg-bgprimary">
            {category.map((categ, index) => (
              <p
                key={`home/filterby/category/${index}`}
                className="rounded-md bg-border text-text py-1 px-3 icon"
                onClick={() => setCategorySelected(categ.toLowerCase())}
              >
                {categ}
              </p>
            ))}
          </article>
          <article className=" text-text">
            <article className="grid grid-cols-1 min-[480px]:grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-5 max-w-450 mx-auto">
              {videos.map((video, index) => (
                <React.Fragment key={video.id}>
                  <Video key={`video/${video.id}`} vid={video} />
                  {index === 1 && (
                    <article className="col-span-full py-6 border-y border-zinc-800/50 my-6 relative">
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
        </>
      )}
    </section>
  );
}
