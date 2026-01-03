import { getDaysBetween } from "../../utils/getDate";
import { SlLike, SlDislike } from "react-icons/sl";
import { FaChevronDown } from "react-icons/fa";
import PostComment from "./PostComment";

export default function Comment({ comm }) {
  return (
    <article className="flex gap-4 w-full">
      <img
        src={comm.avatar}
        alt=""
        className="w-8 h-8 object-center object-cover aspect-square rounded-full"
      />
      <div className="flex flex-col gap-2 w-full">
        <small className="flex gap-2">
          <span className="font-medium">{comm.user}</span>
          <span className="text-txlight">{getDaysBetween(comm.timestamp)}</span>
        </small>
        <p className="text-[16px]">{comm.text}</p>
        <div className="flex flex-wrap items-center gap-4 text-sm">
          <div className="icon flex gap-2 items-center">
            <SlLike />
            <small>{comm.likes}</small>
          </div>
          <div className="icon flex gap-2 items-center icon">
            <SlDislike />
          </div>
          <small
            className="font-medium icon"
            onClick={(e) => {
              const target = e.currentTarget.parentElement.lastChild;
              if (target) {
                if (target.classList.contains("hidden")) {
                  target.classList.remove("hidden");
                } else {
                  target.classList.add("hidden");
                }
              }
            }}
          >
            Reply
          </small>
          <div className="hidden w-full basis-full">
            <PostComment size={8} submitText={"Reply"} />
          </div>
        </div>
        {comm.replies && comm.replies.length > 0 && (
          <article className="flex flex-col gap-4">
            <p
              className="icon flex items-center gap-2"
              onClick={(e) => {
                const target = e.currentTarget.parentElement.childNodes[1];
                if (target) {
                  if (target.classList.contains("hidden")) {
                    target.classList.remove("hidden");
                    target.classList.add("flex");
                  } else {
                    target.classList.add("hidden");
                    target.classList.remove("flex");
                  }
                }
              }}
            >
              {comm.replies.length} replies <FaChevronDown />
            </p>
            <article className="hidden flex-col gap-4 ml-4">
              {comm.replies.map((item) => (
                <Comment key={`subcomment/of/${item.id}`} comm={item} />
              ))}
            </article>
          </article>
        )}
      </div>
    </article>
  );
}
