import { useDispatch } from "react-redux";
import useApi from "../../hooks/Api.jsx";
import { addItems } from "../../store/Slices/videoSlice.js";
export default function LoadMore({ nextCursor }) {
  const { loading, sendRequest } = useApi();
  const dispatch = useDispatch();
  const loadMore = async (cursor) => {
    await sendRequest(`posts?cursor=${cursor}`, "GET").then((result) => {
      if (result && result.success) {
        dispatch(
          addItems({
            posts: result.data.data,
            nextCursor: result.data.nextCursor,
          })
        );
      }
    });
  };
  return (
    <article>
      <button
        className="py-2 px-4 rounded-md bg-primary text-white  my-6 w-fit gap-2 flex justify-center items-center icon"
        onClick={() => loadMore(nextCursor)}
      >
        <p>Load more</p>
        {loading && (
          <p className="w-5 aspect-square rounded-full border-4 border-l-violet-500 border-r-green-500 border-b-orange-600 border-t-red-500 animate-[spin_0.3s_linear_infinite]"></p>
        )}
      </button>
    </article>
  );
}
