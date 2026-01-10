import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useOutletContext } from "react-router-dom";
import VideoComment from "./VideoComment";
import VideoDescription from "./VideoDescription";
import VideoInteractiveBar from "./VideoInteractiveBar";
import VideoPlayer from "./VideoPlayer";
import VideoRecommendation from "./VideoRecommendation";
import { setSelectedItem } from "../../store/Slices/videoSlice";
import { changeLoginStatus } from "../../store/Slices/User";
export default function Video() {
  const dispatch = useDispatch();
  const { setSidebarToggle, screenSize } = useOutletContext();
  const selectedItem = useSelector((store) => store.videos.selectedItem);
  const [VideoInfo, setVideoInfo] = useState(selectedItem);
  const [searchParams] = useSearchParams();
  const videoId = searchParams.get("v");
  useEffect(() => {
    setVideoInfo(selectedItem);
  }, [selectedItem]);
  useEffect(() => {
    const getPost = async () => {
      const url = `${import.meta.env.VITE_BACKEND_HOST}/post/${videoId}`;
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
        if (response.status == 401) {
          dispatch(changeLoginStatus(false));
        }
        alert(responseData.message);
        return;
      }
      dispatch(
        setSelectedItem({
          selectedItem: responseData.data,
        })
      );
    };
    getPost();
  }, [dispatch, videoId]);

  useEffect(() => {
    setSidebarToggle((prev) => ({ ...prev, type: "type2", status: false }));
  }, [setSidebarToggle]);

  return (
    <section className="w-full overflow-y-auto overflow-x-hidden text-text flex flex-col gap-4">
      {/* THE ACTUAL VIDEO */}
      <VideoPlayer url={VideoInfo.videoURL} />

      <article className="grid grid-cols-1 lg:grid-cols-[70%_30%] gap-4 text-text px-5">
        <article className="flex flex-col gap-4 justify-center self-start w-full">
          <strong className="text-xl">{VideoInfo.title}</strong>
          <VideoInteractiveBar
            channelPicture={VideoInfo.channel_id?.channelPicture}
            channelName={VideoInfo.channel_id?.channelName}
            subscriber={VideoInfo.channel_id?.subscribers}
            isSubscribed={VideoInfo.channel_id?.isSubscribed}
            likes={VideoInfo.likes}
          />
          <VideoDescription
            views={VideoInfo.views}
            postedAt={VideoInfo.postedAt}
            description={VideoInfo.description}
            details={VideoInfo.details}
          />
          {/* comments */}
          {/* <VideoComment comments={VideoInfo.comments} /> */}
        </article>
        <VideoRecommendation
          tags={VideoInfo.tags}
          id={VideoInfo._id}
          screenSize={screenSize}
        />
      </article>
    </section>
  );
}
