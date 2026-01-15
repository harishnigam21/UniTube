import { useRef, useState } from "react";
import { getDaysBetween } from "../../utils/getDate";
import { FaChevronDown } from "react-icons/fa";
import PostComment from "./PostComment";
import { useSelector, useDispatch } from "react-redux";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { MdOutlineDeleteOutline, MdOutlineModeEdit } from "react-icons/md";
import { FiFlag } from "react-icons/fi";
import {
  deleteItemComment,
  updateItemComment,
} from "../../store/Slices/videoSlice";
import { BiSolidDislike, BiSolidLike } from "react-icons/bi";
import { millifyNum } from "../../utils/millify";
import useApi from "../../hooks/Api";
export default function Comment({ comm, postid }) {
  const { sendRequest } = useApi();
  const dispatch = useDispatch();
  const likeRef = useRef(null);
  const dislikeRef = useRef(null);
  const [toggleReply, setToggleReply] = useState(false);
  const [toggleReplies, setToggleReplies] = useState(false);
  const [commentOption, seCommentOption] = useState(false);
  const [showUpdateSection, setShowUpdateSection] = useState(false);
  const [updateCommentTxt, setUpdateCommentTxt] = useState(comm.commentText);
  const user = useSelector((store) => store.user.userInfo);
  const [like, setLike] = useState(comm && comm.likes ? comm.likes : 0);
  const handleEdit = async () => {
    if (updateCommentTxt.length > 1) {
      await sendRequest(`comment/${comm._id}`, "PATCH", {
        txt: updateCommentTxt,
      }).then((result) => {
        const data = result?.data;
        if (result && result.success) {
          dispatch(
            updateItemComment({
              commentId: comm._id,
              updatedText: data.txt,
            })
          );
          setShowUpdateSection(false);
        }
      });
    } //TODO:handle if input field is empty
  };
  const handleDelete = async () => {
    await sendRequest(`comment/${comm._id}`, "DELETE").then((result) => {
      if (result && result.success) {
        dispatch(deleteItemComment({ commentIdToDelete: comm._id }));
      }
    });
  };
  const handleReport = async () => {}; //TODO:Complete it later, currently not necessary

  const handleLike = async () => {
    await sendRequest(`clike/${comm._id}`, "PATCH").then((result) => {
      const data = result?.data;
      if (result && result.success) {
        if (!data.status) {
          likeRef.current.style.color = "white";
          likeRef.current.style.transform = "scale(0.5)";
          setTimeout(() => {
            likeRef.current.style.transform = "scale(1)";
          }, 200);
        }
        if (data.status) {
          dislikeRef.current.style.color = "white";
          likeRef.current.style.color = "blue";
          likeRef.current.style.transform = "scale(2)";
          setTimeout(() => {
            likeRef.current.style.transform = "scale(1)";
          }, 200);
        }
        setLike(data.likes);
      }
    });
  };
  const handleDisLike = async () => {
    await sendRequest(`cdislike/${comm._id}`, "PATCH").then((result) => {
      const data = result?.data;
      if (result && result.success) {
        if (!data.status) {
          dislikeRef.current.style.color = "white";
          dislikeRef.current.style.transform = "scale(0.5)";
          setTimeout(() => {
            dislikeRef.current.style.transform = "scale(1)";
          }, 200);
        }
        if (data.status) {
          likeRef.current.style.color = "white";
          dislikeRef.current.style.color = "red";
          dislikeRef.current.style.transform = "scale(2)";
          setTimeout(() => {
            dislikeRef.current.style.transform = "scale(1)";
          }, 200);
        }
      }
      setLike(data?.likes);
    });
  };
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
              {comm.user_id.email == user.email
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
                    <div
                      className="pb-2 flex flex-nowrap items-center gap-2 icon"
                      onClick={() => setShowUpdateSection(true)}
                    >
                      <div className="icon flex items-center">
                        <MdOutlineModeEdit className="text-xl" />
                      </div>
                      <span>Edit</span>
                    </div>
                    <p className="border-txlight/10 border-b w-full scale-x-200"></p>
                    <div
                      className="pt-2 flex flex-nowrap items-center gap-2 icon"
                      onClick={handleDelete}
                    >
                      <div className="icon flex items-center">
                        <MdOutlineDeleteOutline className="text-xl" />
                      </div>
                      <span>Delete</span>
                    </div>
                  </>
                ) : (
                  <div
                    className="pt-2 flex flex-nowrap items-center gap-2 icon"
                    onClick={handleReport}
                  >
                    <div className="icon flex items-center">
                      <FiFlag className="text-xl" />
                    </div>
                    <span className="mb-1.5">Report</span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
        <p className="text-[16px]">{comm.commentText}</p>
        <div className="flex flex-wrap items-center gap-4 text-sm">
          <div className="icon flex gap-2 items-center" onClick={handleLike}>
            <BiSolidLike
              ref={likeRef}
              className={`text-2xl transition-all ${
                comm.isLiked && "text-blue-600"
              }`}
            />
            <small>{millifyNum(like)}</small>
          </div>
          <div
            className="icon flex gap-2 items-center icon"
            onClick={handleDisLike}
          >
            <BiSolidDislike
              ref={dislikeRef}
              className={`text-2xl transition-all ${
                comm.isDisliked && "text-red-600"
              }`}
            />
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
              <article className="flex flex-col gap-8">
                {comm.replies.map((item) => (
                  <Comment key={`subcomment/of/${item._id}`} comm={item} />
                ))}
              </article>
            )}
          </article>
        )}
      </div>

      {/* update comment section */}
      {showUpdateSection && (
        <div className="absolute top-0 left-0 z-2 w-full h-full bg-bgprimary opacity-80 flex flex-col gap-4 items-center justify-center p-8">
          <input
            className="w-full sm:w-3/4 md:1/2 border border-white rounded-md p-2 text-center bg-black text-white font-medium"
            type="text"
            name="updatecomment"
            id="updatecomment"
            value={updateCommentTxt}
            onChange={(e) => setUpdateCommentTxt(e.target.value)}
          />
          <div className="flex gap-2 justify-end items-center">
            <button
              className="py-1 px-3 rounded-md border border-txlight icon"
              onClick={() => setShowUpdateSection(false)}
            >
              Cancel
            </button>
            <button
              disabled={updateCommentTxt.length > 1 ? false : true}
              className="py-1 px-3 rounded-md border border-txlight icon"
              onClick={handleEdit}
            >
              Update
            </button>
          </div>
        </div>
      )}
    </article>
  );
}
