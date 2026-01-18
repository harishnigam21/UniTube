// Skeleton for home page``
export default function Home() {
  return (
    <section className="flex flex-col px-2 h-screen w-full overflow-y-hidden">
      <article className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
        {Array.from({ length: 20 }).map((item, index) => (
          <Skeleton key={`skeleton/home/repeat/${index}`} index={index} />
        ))}
        <Skeleton />
      </article>
    </section>
  );
}
const Skeleton = ({ index }) => {
  return (
    <article className="flex flex-col gap-2 p-2 rounded-xl overflow-hidden text-text">
      <div
        className={`relative w-full bg-gray-600 rounded-xl h-40 animate-pulse delay-${
          index * 100
        }`}
      ></div>
      <article className="flex gap-4 items-center">
        <div
          className={`w-12 h-12 aspect-square bg-gray-400 rounded-full animate-bounce delay-${
            index * 100
          }`}
        ></div>
        <div
          className={`flex flex-col w-full h-10 bg-gray-400 rounded-md animate-pulse delay-${
            (index + 100) * 100
          }`}
        ></div>
      </article>
    </article>
  );
};
