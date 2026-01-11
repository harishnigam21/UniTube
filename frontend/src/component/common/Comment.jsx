import { useState } from "react";
import { getDaysBetween } from "../../utils/getDate";
import { SlLike, SlDislike } from "react-icons/sl";
import { FaChevronDown } from "react-icons/fa";
import PostComment from "./PostComment";
export default function Comment({ comm, postid }) {
  const [toggleReply, setToggleReply] = useState(false);
  const [toggleReplies, setToggleReplies] = useState(false);
  return (
    <article className="flex gap-4 w-full">
      <img
        src={comm.avatar}
        alt=""
        className="w-8 h-8 object-center object-cover aspect-square rounded-full"
      />
      <div className="flex flex-col gap-2 w-full">
        <small className="flex gap-2">
          <span className="font-medium">{comm.user_id.firstname}</span>
          <span className="text-txlight">{getDaysBetween(comm.postedAt)}</span>
        </small>
        <p className="text-[16px]">{comm.commentText}</p>
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
            onClick={() => setToggleReply((prev) => !prev)}
          >
            Reply
          </small>
          {toggleReply && (
            <div className=" w-full basis-full">
              <PostComment
                size={8}
                submitText={"Reply"}
                parent={comm._id}
                postid={postid}
                setToggleReply={setToggleReply}
                setToggleReplies={setToggleReplies}
              />
            </div>
          )}
        </div>
        {comm.replies && comm.replies.length > 0 && (
          <article className="flex flex-col gap-4">
            <div
              className="icon flex items-center gap-2"
              onClick={() => {
                setToggleReplies((prev) => !prev);
              }}
            >
              <p>{comm.replies.length} replies </p>
              <div className="mt-1">
                <FaChevronDown
                  className={`${toggleReplies ? "-rotate-90" : "rotate-0"} transition-all`}
                />
              </div>
            </div>
            {toggleReplies && (
              <article className="flex flex-col gap-8 ml-4">
                {comm.replies.map((item) => (
                  <Comment key={`subcomment/of/${item._id}`} comm={item} />
                ))}
              </article>
            )}
          </article>
        )}
      </div>
    </article>
  );
}
