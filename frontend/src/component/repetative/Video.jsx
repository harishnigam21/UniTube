import { HiDotsVertical } from "react-icons/hi";
import { getDaysBetween } from "../../utils/getDate";
import { millifyNum } from "../../utils/millify";
import { Link } from "react-router-dom";
import { memo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MdOutlineDeleteOutline, MdOutlineModeEdit } from "react-icons/md";
import useApi from "../../hooks/Api";
import { deleteSelectedChannelItem } from "../../store/Slices/channelSlice";
import Loading from "../other/Loading";
import UpdatePost from "../post/UpdatePost";
const Video = memo(function Video({ vid, type }) {
  const dispatch = useDispatch();
  const [showUpdate, setShowUpdate] = useState(false);
  const { loading, sendRequest } = useApi();
  let selectedChannel;
  if (type == "channel") {
    selectedChannel = useSelector((store) => store.channels.selectedItems);
  }
  const [showOption, setShowOption] = useState(false);
  const login = useSelector((store) => store.user.loginStatus);
  const handleDelete = async () => {
    await sendRequest(`post/${vid._id}`, "DELETE").then((result) => {
      const data = result?.data;
      if (result && result.success) {
        dispatch(
          deleteSelectedChannelItem({ id: data.data.id, type: data.data.type })
        );
        setShowOption(false);
      }
    });
  };
  return showUpdate ? (
    <UpdatePost
      setShowUpdate={setShowUpdate}
      setShowOption={setShowOption}
      vid={vid}
    />
  ) : (
    <article
      className={`relative group flex flex-col gap-2 p-2 rounded-xl text-text icon backdrop-blur-2xl w-full`}
    >
      <Link to={`/watch?v=${vid._id}`} className="relative overflow-hidden">
        <img
          src={`${import.meta.env.VITE_BACKEND_HOST}/${vid.thumbnail}`}
          alt={`thumbnail for video`}
          className="w-full rounded-xl object-cover object-center aspect-video"
        />
        <small className="absolute bottom-2 right-2 bg-black/60 rounded-md text-white py-0.5 px-3 font-medium">
          {vid.duration}
        </small>
      </Link>

      <article className="flex gap-4">
        {type == "home" && (
          <img
            className="w-8 h-8 rounded-full object-cover object-center"
            src={`${import.meta.env.VITE_BACKEND_HOST}/${
              vid.channel_id.channelPicture
            }`}
            alt={`channel name of ${vid._id}`}
          />
        )}
        <div className="flex flex-col">
          <strong className="text-xs sm:text-sm lg:text-base">
            {vid.title}
          </strong>
          <small className="text-txlight">{vid.channel_id.channelName}</small>
          <small className="text-txlight flex gap-2 flex-nowrap items-center whitespace-nowrap">
            <span>{millifyNum(vid.views)} views</span>
            <span>.</span> {/** //TODO : align it center **/}
            <span>{getDaysBetween(vid.postedAt)}</span>
          </small>
        </div>
        <div className="relative icon grow flex justify-end">
          <HiDotsVertical
            className="text-xl"
            onClick={() => setShowOption((prev) => !prev)}
          />
          {showOption &&
            login &&
            type == "channel" &&
            selectedChannel &&
            selectedChannel.isOwner && (
              <div
                className="absolute flex flex-col bottom-0 right-6 bg-bgprimary text-text rounded-md border w-fit overflow-hidden z-50"
                onMouseLeave={() => setShowOption(false)}
              >
                <div
                  className="py-2 px-4 flex flex-nowrap items-center gap-2 icon"
                  onClick={() => setShowUpdate(true)}
                >
                  <div className="icon flex items-center">
                    <MdOutlineModeEdit className="text-xl" />
                  </div>
                  <span>Edit</span>
                </div>
                <p className="border-txlight/10 border-b w-full scale-x-200"></p>
                <div
                  className="py-2 px-4 flex flex-nowrap items-center gap-2 icon"
                  onClick={handleDelete}
                >
                  <div className="icon flex items-center">
                    <MdOutlineDeleteOutline className="text-xl" />
                  </div>
                  <span>Delete</span>
                </div>
              </div>
            )}
        </div>
      </article>

      <div className="absolute rounded-xl inset-0 overflow-hidden  w-full h-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-1 text-2xl">
        <img
          src={`${import.meta.env.VITE_BACKEND_HOST}/${vid.thumbnail}`}
          alt="backdrop"
          className="w-full h-full blur-[200px] aspect-video"
        />
      </div>
      {loading && (
        <div className="absolute bg-bgprimary/80 w-full h-full flex items-center justify-self-center">
          <Loading />
        </div>
      )}
    </article>
  );
});
export default Video;
