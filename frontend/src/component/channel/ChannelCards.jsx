import { Link } from "react-router-dom";
import imageFallback from "../../assets/images/dummy_upload.jpg";
import { MdDelete } from "react-icons/md";
import { useDispatch } from "react-redux";
import { deleteChannelID } from "../../store/Slices/userSlice.js";
import { deleteChannel } from "../../store/Slices/channelSlice.js";
import useApi from "../../hooks/Api.jsx";
import Loading from "../other/Loading.jsx";
export default function ChannelCards({ channel }) {
  const dispatch = useDispatch();
  const { loading, sendRequest } = useApi();
  //send request to handle delete of channels, on successful response redux channel slice items array will be updated
  const handleDelete = async () => {
    await sendRequest(`delete_channel/${channel._id}`, "DELETE").then(
      (result) => {
        const data = result?.data;
        if (result && result.success) {
          dispatch(deleteChannelID({ id: data.data }));
          dispatch(deleteChannel({ id: data.data }));
        }
      }
    );
  };
  //Card that will be show the basic channel info like banner images ,total posts,subscribers
  return loading ? (
    <div className="w-ful h-full flex items-center justify-center">
      <Loading />
    </div>
  ) : (
    <article className="relative grid grid-cols-1 min-[360px]:grid-cols-2 sm:grid-cols-1 md:grid-cols-2 gap-2 rounded-xl w-full border border-border overflow-hidden bg-center bg-cover ">
      <Link to={`/channel/${channel.channelHandler}`}>
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
      <div
        className={`absolute bg-black/60 w-full h-full ${
          loading ? "flex" : "hidden"
        } items-center justify-center`}
      >
        <Loading />
      </div>
    </article>
  );
}
