import { millifyNum } from "../../utils/millify";
import Comment from "../common/Comment";
import PostComment from "../common/PostComment";

export default function VideoComment({ comments }) {
  return (
    <article className="flex flex-col gap-8">
      <div className="flex gap-4">
        <strong className="text-xl">
          {millifyNum(comments.length)} Comments
        </strong>
      </div>
      {/* Post Comment */}
      <article>
        <PostComment size={12} submitText={"Comment"} />
      </article>
      {/* other comments */}
      <article className="flex flex-col gap-8">
        {comments.map((comm) => (
          <Comment key={`toplevel/comment/${comm.id}`} comm={comm} />
        ))}
      </article>
    </article>
  );
}
