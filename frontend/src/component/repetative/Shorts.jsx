import { HiDotsVertical } from "react-icons/hi";
export default function Shorts({ srt }) {
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
      className="relative flex flex-col rounded-xl overflow-hidden gap-2 p-2 icon min-w-40 sm:min-w-50 lg:min-w-60"
      onMouseOver={(e) => handleHoverOver(e)}
      onMouseOut={(e) => handleHoverOut(e)}
    >
      <img
        src={srt.thumbnail}
        alt={`thumbnail for short ${srt.id}`}
        className="w-full rounded-xl object-cover object-center"
      />
      <article className="flex gap-4 text-text">
        <div className="flex flex-col">
          <p className="text-xs sm:text-sm lg:text-base">{srt.title}</p>
          <small className="text-txlight">{srt.views} views</small>
        </div>
        <div className="icon grow flex justify-end">
          <HiDotsVertical className="text-xl" />
        </div>
      </article>
      <div className="absolute inset-0  w-full h-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-1 text-2xl">
        <img
          src={srt.thumbnail}
          alt="backdrop"
          className="w-full h-full blur-[100px]"
        />
      </div>
    </article>
  );
}
