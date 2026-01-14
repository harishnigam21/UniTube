import { HiDotsVertical } from "react-icons/hi";
import { getDaysBetween } from "../../utils/getDate";
import { millifyNum } from "../../utils/millify";
import { Link } from "react-router-dom";
export default function Video({ vid, type }) {
  return (
    <Link
      to={`/watch?v=${vid._id}`}
      className={`relative group flex flex-col gap-2 p-2 rounded-xl overflow-hidden text-text icon backdrop-blur-2xl w-full`}
    >
      <div className="relative">
        <img
          src={`${import.meta.env.VITE_BACKEND_HOST}/${vid.thumbnail}`}
          alt={`thumbnail for video ${vid._id}`}
          className="w-full rounded-xl object-cover object-center"
        />
        <small className="absolute bottom-2 right-2 bg-black/60 rounded-md text-white py-0.5 px-3 font-medium">
          {vid.duration}
        </small>
      </div>

      <article className="flex gap-4">
        {type == "home" && (
          <img
            className="w-8 h-8 rounded-full object-cover object-center"
            src={`${import.meta.env.VITE_BACKEND_HOST}/${
              vid.channel_id.channelPicture
            }`}
            alt={`channel name of ${vid._id}`}
          />
        )}
        <div className="flex flex-col">
          <strong className="text-xs sm:text-sm lg:text-base">
            {vid.title}
          </strong>
          <small className="text-txlight">{vid.channel_id.channelName}</small>
          <small className="text-txlight flex gap-2 flex-nowrap items-center whitespace-nowrap">
            <span>{millifyNum(vid.views)} views</span>
            <span>.</span> {/** //TODO : align it center **/}
            <span>{getDaysBetween(vid.postedAt)}</span>
          </small>
        </div>
        <div className="icon grow flex justify-end">
          <HiDotsVertical className="text-xl" />
        </div>
      </article>

      <div className="absolute inset-0  w-full h-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-1 text-2xl">
        <img
          src={`${import.meta.env.VITE_BACKEND_HOST}/${vid.thumbnail}`}
          alt="backdrop"
          className="w-full h-full blur-[200px]"
        />
      </div>
    </Link>
  );
}
