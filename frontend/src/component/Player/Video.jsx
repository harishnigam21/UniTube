import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useOutletContext } from "react-router-dom";
import VideoComment from "./VideoComment";
import VideoDescription from "./VideoDescription";
import VideoInteractiveBar from "./VideoInteractiveBar";
import VideoPlayer from "./VideoPlayer";
import VideoRecommendation from "./VideoRecommendation";
import { setSelectedItem } from "../../store/Slices/videoSlice";
import useApi from "../../hooks/Api";
import Loading from "../other/Loading";
export default function Video() {
  const dispatch = useDispatch();
  const { loading, sendRequest } = useApi();
  const { setSidebarToggle, screenSize } = useOutletContext();
  const VideoInfo = useSelector((store) => store.videos.selectedItem);
  const [searchParams] = useSearchParams();
  const videoId = searchParams.get("v"); //getting video id from url

  //send request to get detailed information about video, on successful response this video info will be stored redux store.
  useEffect(() => {
    sendRequest(`post/${videoId}`, "GET").then((result) => {
      const data = result?.data;
      if (result && result.success) {
        dispatch(
          setSelectedItem({
            selectedItem: data.data,
          })
        );
      }
    });
  }, [dispatch, videoId, sendRequest]);

  //handle sidebar behavior
  useEffect(() => {
    setSidebarToggle((prev) => ({ ...prev, type: "type2", status: false }));
  }, [setSidebarToggle]);

  // This component is parent and created children component to handle this components better
  return loading && Object.keys(VideoInfo).length === 0 ? (
    <div className="flex w-screen h-screen justify-center items-center">
      <Loading />
    </div>
  ) : (
    <section className="w-full overflow-y-auto overflow-x-hidden text-text flex flex-col gap-4">
      {/* THE ACTUAL VIDEO */}
      <VideoPlayer url={VideoInfo.videoURL} />

      <article className="grid grid-cols-1 lg:grid-cols-[70%_30%] gap-4 text-text px-5">
        <article className="flex flex-col gap-4 justify-center self-start w-full">
          <strong className="text-xl">{VideoInfo.title}</strong>
          {/* like, dislike, subscribe and others.... */}
          <VideoInteractiveBar
            postid={VideoInfo._id}
            channelid={VideoInfo.channel_id?._id}
            channelPicture={VideoInfo.channel_id?.channelPicture}
            channelName={VideoInfo.channel_id?.channelName}
            channelHandler={VideoInfo.channel_id?.channelHandler}
            subscriber={VideoInfo.channel_id?.subscribers}
            isSubscribed={VideoInfo.channel_id?.isSubscribed}
            likes={VideoInfo.likes}
            isDisLiked={VideoInfo.isDisLiked}
            isliked={VideoInfo.isliked}
          />
          <VideoDescription
            views={VideoInfo.views}
            postedAt={VideoInfo.postedAt}
            description={VideoInfo.description}
            details={VideoInfo.details}
          />
          {/* comments */}
          {VideoInfo._id && <VideoComment postid={VideoInfo._id} />}
          {/* TODO:Check later that why this component API calls first then its parent API*/}
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
