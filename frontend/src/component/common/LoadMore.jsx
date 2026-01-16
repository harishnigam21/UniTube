import { useNavigate, useSearchParams } from "react-router-dom";

export default function LoadMore({ nextCursor, loading }) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const categoryParams = searchParams.get("category");

  const handleLoadMore = () => {
    const params = new URLSearchParams();
    if (categoryParams) params.append("category", categoryParams);
    if (nextCursor) params.append("cursor", nextCursor);

    // replace: true prevents filling the history with dozens of "pages" of the same list
    navigate(`?${params.toString()}`, { replace: true });
  };

  return (
    <article className="w-full flex justify-center">
      <button
        className="py-2 px-6 rounded-full bg-border hover:bg-zinc-700 text-text my-6 flex items-center gap-2 transition-all active:scale-95 icon"
        onClick={handleLoadMore}
      >
        <span>Load more</span>
        {loading && <p className="spinner"></p>}
      </button>
    </article>
  );
}
