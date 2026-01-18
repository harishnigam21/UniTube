import { useState } from "react";
import { useDispatch } from "react-redux";
import { setSearchItems, setSearchStatus } from "../../store/Slices/videoSlice";
import { ImCross } from "react-icons/im";
//Currently this search component only manages local search.
//TODO:handle searches from backend as we done for category, currently not required.
export default function Search({ items }) {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  return (
    <article className="flex gap-4 items-center justify-center grow">
      {items.slice(2, 4).map((item) =>
        item.name == "search" ? (
          <div
            key={`header/item/${item.id}`}
            className="flex items-center rounded-full overflow-hidden relative border border-border text-text grow w-full md:max-w-3/4 lg:max-w-1/2 min-w-56"
          >
            <input
              id="search"
              name="search"
              value={search}
              placeholder="Search..."
              className="w-full py-2 px-4"
              onChange={(e) => setSearch(e.target.value)}
            />
            <div className="flex items-center absolute right-0 h-full">
              {/* Changing search status to show search item at home page */}
              <div
                className="flex items-center icon mx-2"
                onClick={() => {
                  dispatch(setSearchStatus(false));
                  setSearch("");
                }}
              >
                <ImCross className="text-sm text-red-500" />
              </div>
              <div
                className="flex items-center bg-border h-full icon"
                // when this icon is clicked search item will be clear and all item will be mapped
                onClick={() => {
                  dispatch(setSearchItems({ search: search }));
                  dispatch(setSearchStatus({ status: true }));
                  setSearch("");
                }}
              >
                <item.icon className="text-2xl my-2 mx-4 icon" />
              </div>
            </div>
          </div>
        ) : item.name == "mic" ? (
          <div
            key={`header/item/${item.id}`}
            className="flex items-center rounded-full bg-border text-text icon"
          >
            <item.icon className="text-2xl m-2" />
          </div>
        ) : (
          <></>
        )
      )}
    </article>
  );
}
