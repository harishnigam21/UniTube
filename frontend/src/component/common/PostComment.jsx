/* eslint-disable no-unused-vars */
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BsEmojiLaughing } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { addItemComment } from "../../store/Slices/videoSlice";
import useApi from "../../hooks/Api";
export default function PostComment({
  size,
  submitText,
  parent,
  setToggleReply,
  setToggleReplies,
}) {
  const { sendRequest } = useApi();
  const postid = useSelector((store) => store.videos.selectedItem._id);
  const user = useSelector((store) => store.user.userInfo);
  const dispatch = useDispatch();
  const [showBtn, setShowBtn] = useState(false);
  const [commentIpt, setCommentIpt] = useState("");
  //send request to add comment on successful response, redux videoSlice is also updated with new comment
  const handleCommentPost = async () => {
    if (commentIpt.length > 1) {
      await sendRequest(`comment/${postid}`, "POST", {
        parent_id: parent,
        commentText: commentIpt,
      }).then((result) => {
        const data = result?.data;
        if (result && result.success) {
          dispatch(addItemComment({ newComment: data.data }));
          setToggleReply(false);
          setToggleReplies(true);
          setCommentIpt("");
          setShowBtn(false);
        }
      });
    } //TODO:handle for field with 0 length
  };
  //sub component of comment component which is mapped when user tries to add comment, having input field of type text to get comment and some button for interaction.
  //TODO : emoji section will be handle later not necessary now
  return (
    <article className="flex gap-4 items-center w-full">
      <div
        className={`w-${size} h-${size} rounded-full overflow-hidden border flex items-center justify-center`}
      >
        {user.pic ? (
          <img
            src={`${import.meta.env.VITE_BACKEND_HOST}/${user.pic}`}
            className="min-w-full object-center aspect-square rounded-full object-cover"
            alt="user pic"
          />
        ) : (
          <>
            <span>{user.firstname[0].toUpperCase()}</span>
            <span>{user.lastname[0].toUpperCase()}</span>
          </>
        )}
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
