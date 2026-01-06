import { useEffect, useMemo } from "react";
import { getVideoInfo } from "../../store/Selectors/videoSelectors";
import { useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useOutletContext } from "react-router-dom";
import VideoComment from "./VideoComment";
import VideoDescription from "./VideoDescription";
import VideoInteractiveBar from "./VideoInteractiveBar";
import VideoPlayer from "./VideoPlayer";
import VideoRecommendation from "./VideoRecommendation";

export default function Video() {
  const { setSidebarToggle, screenSize } = useOutletContext();
  const [searchParams] = useSearchParams();
  const videoId = searchParams.get("v");
  const videoInfoSelector = useMemo(() => getVideoInfo(videoId), [videoId]);
  const VideoInfo = useSelector(videoInfoSelector);

  useEffect(() => {
    setSidebarToggle((prev) => ({ ...prev, type: "type2", status: false }));
  }, [setSidebarToggle]);

  return (
    <section className="w-full overflow-y-auto overflow-x-hidden text-text flex flex-col gap-4">
      {/* THE ACTUAL VIDEO */}
      <VideoPlayer />

      <article className="grid grid-cols-1 lg:grid-cols-[70%_30%] gap-4 text-text px-5">
        <article className="flex flex-col gap-4 justify-center self-start w-full">
          <strong className="text-xl">{VideoInfo.title}</strong>
          <VideoInteractiveBar
            channelPicture={VideoInfo.channelPicture}
            channelName={VideoInfo.channelName}
            subscriber={VideoInfo.subscriber}
            isSubscribed={VideoInfo.isSubscribed}
            likes={VideoInfo.likes}
          />
          <VideoDescription
            views={VideoInfo.views}
            postedAt={VideoInfo.postedAt}
            description={VideoInfo.description}
            details={VideoInfo.details}
          />
          {/* comments */}
          <VideoComment comments={VideoInfo.comments} />
        </article>
        <VideoRecommendation
          tags={VideoInfo.tags}
          id={VideoInfo.id}
          screenSize={screenSize}
        />
      </article>
    </section>
  );
}
