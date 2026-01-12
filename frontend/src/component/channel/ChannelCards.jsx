import { Link } from "react-router-dom";
import imageFallback from "../../assets/images/dummy_upload.jpg";
import { MdDelete } from "react-icons/md";
import { useDispatch } from "react-redux";
import { deleteChannel } from "../../store/Slices/channelSlice";
export default function ChannelCards({ channel }) {
  const dispatch = useDispatch();
  const handleDelete = async () => {
    const url = `${import.meta.env.VITE_BACKEND_HOST}/delete_channel/${
      channel._id
    }`;
    const token = window.localStorage.getItem("acTk");
    try {
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          authorization: `bearer ${JSON.parse(token)}`,
          "content-type": "application/json",
        },
        credentials: "include",
      });
      const responseData = await response.json();
      if (response.ok) {
        dispatch(deleteChannel({ id: responseData.data }));
        return;
      }
      //TODO:handle for not response ok
    } catch (error) {
      console.log(error.message);
      //TODO:handle popup here for errors
    }
  };
  return (
    <article className="grid grid-cols-1 min-[360px]:grid-cols-2 sm:grid-cols-1 md:grid-cols-2 gap-2 rounded-xl w-full border border-border overflow-hidden bg-center bg-cover ">
      <Link to={`/channel/${channel._id}`}>
        <img
          src={`${import.meta.env.VITE_BACKEND_HOST}/${channel.channelBanner}`}
          alt="channel picture"
          className="w-full h-full aspect-video object-cover object-center"
          onError={(e) => {
            e.target.src = imageFallback;
            e.target.onerror = null;
          }}
        />
      </Link>
      <div className="relative flex flex-col gap-2 w-full bg-bgprimary text-text p-2">
        <div className="flex flex-nowrap justify-between gap-2">
          <div className="flex flex-col">
            <p>{channel.channelName}</p>
            <small className="break-all">{channel.channelHandler}</small>
          </div>
          <div className="absolute top-1.5 right-1 flex items-start icon">
            <MdDelete
              title="delete"
              className="text-2xl text-red-500 "
              onClick={handleDelete}
            />
          </div>
        </div>
        <p>Subscribers : {channel.subscribers}</p>
        <p>Posts : {channel.posts}</p>
      </div>
    </article>
  );
}
