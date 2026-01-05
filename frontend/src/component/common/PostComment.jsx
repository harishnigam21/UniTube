import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BsEmojiLaughing } from "react-icons/bs";

export default function PostComment({ size, submitText }) {
  const [showBtn, setShowBtn] = useState(false);
  const [commentIpt, setCommentIpt] = useState("");
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
          defaultValue={commentIpt}
          placeholder="Add a Comment..."
          className="w-full grow py-1 px-2 outline-none border-b border-border"
          onFocus={() => setShowBtn(true)}
          onBlur={() => setShowBtn(false)}
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
                <button className="icon" onClick={() => setShowBtn(false)}>
                  Cancel
                </button>
                <button
                  disabled={commentIpt.length > 0 ? false : true}
                  className="py-2 px-4 rounded-full bg-border icon"
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
