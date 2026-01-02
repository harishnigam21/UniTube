import { HiDotsVertical } from "react-icons/hi";
export default function Video({ vid }) {
  const handleHoverOver = (e) => {
    const target = e.currentTarget.childNodes[2];
    if (target) {
      target.classList.remove("opacity-0");
      target.classList.add("opacity-100");
    }
  };
  const handleHoverOut = (e) => {
    const target = e.currentTarget.childNodes[2];
    if (target) {
      target.classList.remove("opacity-100");
      target.classList.add("opacity-0");
    }
  };
  return (
    <article
      className={`relative flex flex-col gap-2 p-2 rounded-xl overflow-hidden text-text icon backdrop-blur-2xl w-full`}
      onMouseOver={(e) => handleHoverOver(e)}
      onMouseOut={(e) => handleHoverOut(e)}
    >
      <div className="relative">
        <img
          src={vid.thumbnail}
          alt={`thumbnail for video ${vid.id}`}
          className="w-full rounded-xl object-cover object-center"
        />
        <small className="absolute bottom-2 right-2 bg-black/60 rounded-md text-white py-0.5 px-3 font-medium">
          {vid.duration}
        </small>
      </div>

      <article className="flex gap-4">
        <img
          className="w-8 h-8 rounded-full object-cover object-center"
          src={vid.channelPicture}
          alt={`channel name of ${vid.id}`}
        />
        <div className="flex flex-col">
          <strong className="text-xs sm:text-sm lg:text-base">
            {vid.title}
          </strong>
          <small className="text-txlight">{vid.channelName}</small>
          <small className="text-txlight flex gap-2 flex-nowrap items-center whitespace-nowrap">
            <span>{vid.views}</span>
            <span>.</span> {/** //TODO : align it center **/}
            <span>{vid.postedAt}</span>
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
    </article>
  );
}
