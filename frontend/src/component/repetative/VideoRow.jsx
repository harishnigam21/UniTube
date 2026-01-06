import { HiDotsVertical } from "react-icons/hi";
import { getDaysBetween } from "../../utils/getDate";
import { millifyNum } from "../../utils/millify";
import { Link } from "react-router-dom";
export default function VideoRow({ vid }) {
  //time machine
  return (
    <Link
      to={`/watch?v=${vid.id}`}
      className={`relative group flex gap-2 p-2 overflow-hidden rounded-xl text-text icon backdrop-blur-2xl w-full`}
    >
      <div className="relative w-30 min-w-30 h-fit aspect-video">
        <img
          src={vid.thumbnail}
          alt={`thumbnail for video ${vid.id}`}
          className="w-full rounded-xl object-cover object-center"
        />
        <small className="absolute bottom-1 right-1 bg-black/60 rounded-md text-white py-0.5 px-3 font-medium">
          {vid.duration}
        </small>
      </div>

      <article className="flex gap-4 grow">
        <div className="flex flex-col">
          <strong className="text-xs">{vid.title}</strong>
          <small className="text-txlight">{vid.channelName}</small>
          <small className="text-txlight flex gap-2 flex-wrap items-center whitespace-nowrap">
            <span>{millifyNum(vid.views)} views</span>
            <span>.</span> {/** //TODO : align it center **/}
            <span>{getDaysBetween(vid.postedAt)}</span>
          </small>
        </div>
        <div className="icon grow flex justify-end">
          <HiDotsVertical className="text-xl" />
        </div>
      </article>

      <div className="absolute inset-0  w-full h-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-1 text-red-500 text-2xl">
        <img
          src={vid.thumbnail}
          alt="backdrop"
          className="w-full h-full blur-[200px]"
        />
      </div>
    </Link>
  );
}
