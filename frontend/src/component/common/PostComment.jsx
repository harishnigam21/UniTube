/* eslint-disable no-unused-vars */
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BsEmojiLaughing } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { addItemComment } from "../../store/Slices/videoSlice";
export default function PostComment({
  size,
  submitText,
  parent,
  setToggleReply,
  setToggleReplies,
}) {
  const postid = useSelector((store) => store.videos.selectedItem._id);
  const dispatch = useDispatch();
  const [showBtn, setShowBtn] = useState(false);
  const [commentIpt, setCommentIpt] = useState("");
  const handleCommentPost = async () => {
    const url = `${import.meta.env.VITE_BACKEND_HOST}/comment/${postid}`;
    const token = window.localStorage.getItem("acTk");
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `bearer ${token ? JSON.parse(token) : ""}`,
      },
      body: JSON.stringify({ parent_id: parent, commentText: commentIpt }),
      credentials: "include",
    });
    const responseData = await response.json();
    console.log(responseData.message);
    if (response.ok) {
      dispatch(addItemComment({ newComment: responseData.data }));
      setToggleReply(false);
      setToggleReplies(true);
      setCommentIpt("");
      setShowBtn(false);
    }
  };
  return (
    <article className="flex gap-4 items-center w-full">
      {/* //TODO: Replace below div with signed user profile image*/}
      <div
        className={`w-${size} h-${size} rounded-full aspect-square border flex items-center justify-center`}
      >
        <span>Ha</span>
      </div>
      <article className="group flex flex-col gap-2 w-full">
        <input
          type="text"
          name="comment"
          value={commentIpt}
          placeholder="Add a Comment..."
          className="w-full grow py-1 px-2 outline-none border-b border-border"
          onFocus={() => {
            setShowBtn(true);
          }}
          onChange={(e) => setCommentIpt(e.target.value)}
        />
        <AnimatePresence>
          {showBtn && (
            <motion.div
              initial={{ opacity: 0, y: "-50%" }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: "-50%" }}
              transition={{ duration: 0.2, ease: "easeIn" }}
              className="flex justify-between items-center px-2"
            >
              {/* //TODO: Add Emoji feature here */}
              <div className="icon fex items-center">
                <BsEmojiLaughing className="text-2xl" />
              </div>
              <div className="flex gap-4">
                <button
                  className="icon"
                  onClick={() => {
                    setShowBtn(false);
                    setToggleReply(false);
                  }}
                >
                  Cancel
                </button>
                <button
                  disabled={commentIpt.length > 0 ? false : true}
                  className="py-2 px-4 rounded-full bg-border icon"
                  onClick={handleCommentPost}
                >
                  {submitText}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </article>
    </article>
  );
}
