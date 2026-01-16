import { inthereRecommendations } from "../../store/Selectors/videoSelectors";
import { useSelector } from "react-redux";
import Video from "../repetative/Video";
import VideoRow from "../repetative/VideoRow";
import { useMemo } from "react";

export default function VideoRecommendation({ id, tags, screenSize }) {
  const memoTags = useMemo(() => tags, [tags]);

  const RecommendVideos = useSelector((state) =>
    inthereRecommendations(state, memoTags, id)
  );
  return (
    <article className="flex flex-col">
      <strong className="text-xl">Recommended</strong>
      <article className="grid grid-cols-1 gap-4 sm:grid-cols-2 min-[930px]:grid-cols-3 lg:flex lg:flex-col lg:gap-4">
        {RecommendVideos.length == 0 || !RecommendVideos ? (
          <p className="text-red-500 items-center">No Video Found !</p>
        ) : (
          RecommendVideos.map((item, index) =>
            screenSize.width >= 1024 ? (
              <VideoRow key={`recommend/video/${index}`} vid={item} />
            ) : (
              <Video key={`recommend/video/${index}`} vid={item} />
            )
          )
        )}
      </article>
    </article>
  );
}
