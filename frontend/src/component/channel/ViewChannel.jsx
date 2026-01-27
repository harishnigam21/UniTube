import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setChannel } from "../../store/Slices/channelSlice";
import { useState } from "react";
import ChannelCards from "./ChannelCards";
import { IoMdAdd } from "react-icons/io";
import { Link, useOutletContext } from "react-router-dom";
import Loading from "../other/Loading";

export default function ViewChannel() {
  const { setSidebarToggle, handleNewMessage } = useOutletContext(); //taking props that is provided to outlet
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const channels = useSelector((store) => store.channels.items);
  //Handle sidebar nature
  useEffect(() => {
    setSidebarToggle((prev) => ({ ...prev, type: "type2", status: false }));
  }, [setSidebarToggle]);
  //send Request to get limited channel information for channel preview purpose only, on successful response also update made on redux store
  useEffect(() => {
    const getChannels = async () => {
      setLoading(true);
      const url = `${import.meta.env.VITE_BACKEND_HOST}/my_channels`;
      const token = window.localStorage.getItem("acTk");
      try {
        const response = await fetch(url, {
          method: "GET",
          headers: {
            authorization: `bearer ${JSON.parse(token)}`,
            "content-type": "application/json",
          },
          credentials: "include",
        });
        const responseData = await response.json();
        if (response.ok) {
          dispatch(setChannel({ items: responseData.data }));
          setLoading(false);
          return;
        }
        //TODO:handle for not response ok
      } catch (error) {
        console.log(error.message);
        //TODO:handle popup here for errors
      }
    };
    getChannels();
  }, [dispatch]);
  //receiving data will be array so,here Channel Card component is used, which is mapped with unique key, & this component is passed with props that include all needed information about channel
  return loading ? (
    <div className="w-screen h-screen flex justify-center items-center">
      <Loading />
    </div>
  ) : (
    <section className="text-text flex flex-col gap-8 p-4">
      <article className="flex justify-between gap-4 items-center whitespace-nowrap">
        <h1
          className="
  [font-variant:small-caps] justify-self-center self-center 
  text-2xl md:text-4xl font-medium tracking-wide
  bg-linear-to-b from-text from-0% via-text via-50% to-primary to-50%
  bg-clip-text text-transparent
  drop-shadow-sm
"
        >
          Your Channels
        </h1>
        <Link
          to={"/channel/create"}
          title="create channel"
          className="py-1.5 px-3 rounded-full aspect-square min-[480px]:rounded-md min-[480px]:aspect-auto bg-border flex items-center gap-2"
        >
          <div className="icon flex items-center">
            <IoMdAdd className="text-xl" />
          </div>
          <span className="hidden min-[480px]:flex">Add Channel</span>
        </Link>
      </article>
      {channels.length > 0 ? (
        <article className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {channels.map((channel) => (
            <ChannelCards
              key={`card/channel/${channel._id}`}
              channel={channel}
              handleNewMessage={handleNewMessage}
            />
          ))}
        </article>
      ) : (
        <p className="text-center text-xl md:text-2xl font-serif font-bold text-red-500">
          No Channel Found !
        </p>
      )}
    </section>
  );
}
