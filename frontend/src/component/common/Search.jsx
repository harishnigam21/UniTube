export default function Search({items}) {
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
              placeholder="Search"
              className="w-full py-2 px-4"
            />
            <div className="flex items-center absolute right-0 bg-border h-full icon">
              <item.icon className="text-2xl my-2 mx-4 icon" />
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
