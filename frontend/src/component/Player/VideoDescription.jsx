import { useState } from "react";
import { millifyNum } from "../../utils/millify";

export default function VideoDescription({
  views,
  postedAt,
  description,
  details,
}) {
  const [showMore, setShowMore] = useState(false);

  return (
    <article className="flex flex-col gap-2 bg-border rounded-xl p-4 text-sm">
      <p className="font-medium flex gap-2">
        <span>{millifyNum(views)} views</span>
        <span>{postedAt.slice(0, 10)}</span>
      </p>
      {/* description */}
      <div>
        <p className="pb-6">{description}</p>

        {showMore &&
          Object.entries(details).map(([key, value]) => (
            <p key={key}>
              <strong>{key} - </strong> {String(value)}
            </p>
          ))}

        <p
          className="font-medium icon w-fit pt-4"
          onClick={() => setShowMore(!showMore)}
        >
          {showMore ? "show less..." : "show more..."}
        </p>
      </div>
    </article>
  );
}
