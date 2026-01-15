/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { millifyNum } from "../../utils/millify";
import Comment from "../common/Comment";
import PostComment from "../common/PostComment";
import { setSelectedItemComment } from "../../store/Slices/videoSlice";
import Loading from "../other/Loading";
import useApi from "../../hooks/Api";

export default function VideoComment({ postid }) {
  const { loading, sendRequest } = useApi();
  const [toggleReply, setToggleReply] = useState(false);
  const comments = useSelector((store) => store.videos.selectedItemComment);
  const dispatch = useDispatch();
  useEffect(() => {
    sendRequest(`comment/${postid}`, "GET").then((result) => {
      const data = result?.data;
      if (result && result.success) {
        dispatch(setSelectedItemComment({ selectedItemComment: data.data }));
      }
    });
  }, [postid, dispatch, sendRequest]);
  return loading ? (
    <div className="flex w-screen h-screen justify-center items-center">
      <Loading />
    </div>
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
