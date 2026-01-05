import { useMemo } from "react";
import { inthereRecommendations } from "../../store/Selectors/videoSelectors";
import { useSelector } from "react-redux";
import Video from "../repetative/Video";
import VideoRow from "../repetative/VideoRow";

export default function VideoRecommendation({ tags }) {
  const recommendationSelector = useMemo(
    () => inthereRecommendations(tags),
    [tags]
  );
  const RecommendVideos = useSelector(recommendationSelector);
  console.log(RecommendVideos);
  return (
    <article>
      {RecommendVideos.map((item, index) => (
        <VideoRow key={`recommend/video/${index}`} vid={item} />
      ))}
    </article>
  );
}
