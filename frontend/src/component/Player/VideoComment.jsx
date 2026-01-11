import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { millifyNum } from "../../utils/millify";
import Comment from "../common/Comment";
import PostComment from "../common/PostComment";
import { setSelectedItemComment } from "../../store/Slices/videoSlice";

export default function VideoComment({ postid }) {
  const [toggleReply, setToggleReply] = useState(false);
  const comments = useSelector((store) => store.videos.selectedItemComment);
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(true);
  useEffect(() => {
    const getComment = async () => {
      setLoader(true);
      const url = `${import.meta.env.VITE_BACKEND_HOST}/comment/${postid}`;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "content-type": "application/json",
        },
        credentials: "include",
      });
      const responseData = await response.json();
      console.log(responseData.message);
      if (response.ok) {
        dispatch(
          setSelectedItemComment({ selectedItemComment: responseData.data })
        );
        setLoader(false);
      }
    };
    getComment();
  }, [postid, dispatch]);
  return loader ? (
    <p className="text-xl text-red">Loading...</p>
  ) : (
    <article className="flex flex-col gap-8">
      <div className="flex gap-4">
        <strong className="text-xl">
          {millifyNum(comments.length)} Comments
        </strong>
      </div>
      {/* Post Comment */}
      <article>
        <PostComment
          size={12}
          submitText={"Comment"}
          parent={null}
          postid={postid}
          setToggleReply={setToggleReply}
          setToggleReplies={setToggleReply}
        />
      </article>
      {/* other comments */}
      <article className="flex flex-col gap-8">
        {comments.map((comm) => (
          <Comment
            key={`toplevel/comment/${comm._id}`}
            comm={comm}
            postid={postid}
          />
        ))}
      </article>
    </article>
  );
}
