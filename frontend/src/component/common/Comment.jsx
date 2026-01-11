import { useState } from "react";
import { getDaysBetween } from "../../utils/getDate";
import { SlLike, SlDislike } from "react-icons/sl";
import { FaChevronDown } from "react-icons/fa";
import PostComment from "./PostComment";
import { useSelector, useDispatch } from "react-redux";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { MdOutlineDeleteOutline, MdOutlineModeEdit } from "react-icons/md";
import { Link } from "react-router-dom";
import {
  deleteItemComment,
  updateItemComment,
} from "../../store/Slices/videoSlice";
export default function Comment({ comm, postid }) {
  const dispatch = useDispatch();
  const [toggleReply, setToggleReply] = useState(false);
  const [toggleReplies, setToggleReplies] = useState(false);
  const [commentOption, seCommentOption] = useState(false);
  const [updateCommentTxt, setUpdateCommentTxt] = useState("");
  const user = useSelector((store) => store.user.userInfo);
  const handleEdit = async () => {
    const url = `${import.meta.env.VITE_BACKEND_HOST}/comment/${comm._id}`;
    const token = window.localStorage.getItem("acTk");
    if (updateCommentTxt.length > 1) {
      const response = await fetch(url, {
        method: "PATCH",
        headers: {
          "content-type": "application/json",
          authorization: `bearer ${token ? JSON.parse(token) : ""}`,
        },
        body: JSON.stringify({ txt: updateCommentTxt }),
        credentials: "include",
      });
      const responseData = await response.json();
      console.log(responseData.message);
      if (response.ok) {
        dispatch(
          updateItemComment({
            commentId: comm._id,
            updatedText: updateCommentTxt,
          })
        );
        setUpdateCommentTxt("");
      }
    }
  };
  const handleDelete = async () => {
    const url = `${import.meta.env.VITE_BACKEND_HOST}/comment/${comm._id}`;
    const token = window.localStorage.getItem("acTk");
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
        authorization: `bearer ${token ? JSON.parse(token) : ""}`,
      },
      credentials: "include",
    });
    const responseData = await response.json();
    console.log(responseData.message);
    if (response.ok) {
      dispatch(deleteItemComment({ commentIdToDelete: comm._id }));
    }
  };
  const handleReport = async () => {}; //TODO:Complete it later, currently not necessary
  return (
    <article className="flex gap-4 w-full">
      <div className="flex w-6 h-6 aspect-square items-center justify-center rounded-full border p-1 text-fit text-[10px] border-txlight">
        <span>{comm.user_id.firstname[0].toUpperCase()}</span>
        <span>{comm.user_id.lastname[0].toUpperCase()}</span>
      </div>
      <div className="flex flex-col gap-2 w-full">
        <div className="flex gap-4 justify-between w-full items-center">
          <div className="flex gap-2 items-center">
            <span className="font-medium">
              {comm.user_id._id == user._id
                ? "you"
                : comm.user_id.email.split("@")[0]}
            </span>
            <span className="text-txlight">
              {getDaysBetween(comm.postedAt)}
            </span>
          </div>
          <div className="relative flex flex-col">
            <div
              className="flex items-center icon"
              onClick={() => seCommentOption((prev) => !prev)}
            >
              <HiOutlineDotsVertical className="text-xl" />
            </div>
            {commentOption && (
              <div
                className="flex flex-col justify-center absolute min-w-fit py-2 px-6 bg-border mt-6 right-0 rounded-md overflow-hidden"
                onMouseLeave={() => seCommentOption(false)}
              >
                {comm.user_id._id == user._id ? (
                  <>
                    <Link
                      className="pb-2 flex flex-nowrap items-center gap-2"
                      onClick={handleEdit}
                    >
                      <div className="icon flex items-center">
                        <MdOutlineModeEdit className="text-xl" />
                      </div>
                      <span>Edit</span>
                    </Link>
                    <p className="border-txlight/10 border-b w-full scale-x-200"></p>
                    <Link
                      className="pt-2 flex flex-nowrap items-center gap-2"
                      onClick={handleDelete}
                    >
                      <div className="icon flex items-center">
                        <MdOutlineDeleteOutline className="text-xl" />
                      </div>
                      <span>Delete</span>
                    </Link>
                  </>
                ) : (
                  <Link className="py-1" onClick={handleReport}>
                    Report
                  </Link>
                )}
              </div>
            )}
          </div>
        </div>
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
                  className={`${
                    toggleReplies ? "-rotate-90" : "rotate-0"
                  } transition-all`}
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
