/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useRef, useState } from "react";
import { millifyNum } from "../../utils/millify";
import { RiShareForwardLine } from "react-icons/ri";
import { FaRegBookmark } from "react-icons/fa";
import { MdFileDownload, MdOutlinedFlag } from "react-icons/md";
import { HiDotsHorizontal, HiScissors } from "react-icons/hi";
import { BiSolidLike, BiSolidDislike } from "react-icons/bi";
import { Link } from "react-router-dom";
import useApi from "../../hooks/Api";

export default function VideoInteractiveBar({
  channelid,
  postid,
  channelPicture,
  channelHandler,
  channelName,
  subscriber,
  isSubscribed,
  likes,
  isliked,
  isDisLiked,
}) {
  const { sendRequest } = useApi();
  const [showExtra, setShowExtra] = useState(false);
  const [like, setLike] = useState(likes);
  const [subscribers, setSubscribers] = useState(subscriber);
  const [isSubscribe, setIsSubscribe] = useState(isSubscribed);

  //dynamic area that view as per screen size
  const dynaBtn = [
    { icon: RiShareForwardLine, name: "Share", number: "", work: "" },
    { icon: FaRegBookmark, name: "Save", number: "", work: "" },
    { icon: MdFileDownload, name: "Download", number: "", work: "" },
    { icon: HiScissors, name: "Clip", number: "", work: "" },
    { icon: MdOutlinedFlag, name: "Report", number: "", work: "" },
  ];
  const dynaBtnRef = useRef(null);
  const [dynaBtnRange, setDynaBtnRange] = useState(dynaBtn.length);

  //ref for like and dislike icons to change element properties
  const likeRef = useRef(null);
  const dislikeRef = useRef(null);
  //set dynamic button range to view within viewport
  const handleAlignment = () => {
    if (dynaBtnRef.current) {
      let need = dynaBtnRef.current.getBoundingClientRect();
      setDynaBtnRange(need.width >= 580 ? 3 : need.width >= 320 ? 2 : 1);
    }
  };
  // handleAlignment function triggers whenever resize occurs
  useEffect(() => {
    handleAlignment();
    window.addEventListener("resize", handleAlignment);
    return () => window.removeEventListener("resize", handleAlignment);
  }, []);
  // send Request to like post and remove like from post, and on successful response update like number with received like number in redux store
  const handleLike = async () => {
    await sendRequest(`like/${postid}`, "PATCH").then((result) => {
      const data = result?.data;
      if (result && result.success) {
        if (!data.status) {
          likeRef.current.style.color = "white";
          likeRef.current.style.transform = "scale(0.5)";
          setTimeout(() => {
            likeRef.current.style.transform = "scale(1)";
          }, 200);
        }
        if (data.status) {
          dislikeRef.current.style.color = "white";
          likeRef.current.style.color = "blue";
          likeRef.current.style.transform = "scale(2)";
          setTimeout(() => {
            likeRef.current.style.transform = "scale(1)";
          }, 200);
        }
        setLike(data.likes);
      }
    });
  };
  // send Request to dislike post and remove dislike from post, and on successful response update like number with received like number in redux store
  const handleDisLike = async () => {
    await sendRequest(`dislike/${postid}`, "PATCH").then((result) => {
      const data = result?.data;
      if (result && result.success) {
        if (!data.status) {
          dislikeRef.current.style.color = "white";
          dislikeRef.current.style.transform = "scale(0.5)";
          setTimeout(() => {
            dislikeRef.current.style.transform = "scale(1)";
          }, 200);
        }
        if (data.status) {
          likeRef.current.style.color = "white";
          dislikeRef.current.style.color = "red";
          dislikeRef.current.style.transform = "scale(2)";
          setTimeout(() => {
            dislikeRef.current.style.transform = "scale(1)";
          }, 200);
        }
        setLike(data?.likes);
      }
    });
  };
  // send Request to subscribe channel and unsubscribe channel
  const handleSubscribe = async () => {
    await sendRequest(`new_subscriber/${channelid}`, "PATCH").then((result) => {
      const data = result?.data;
      if (result && result.success) {
        setSubscribers(data.subscriber);
        setIsSubscribe(data.status);
      }
    });
  };

  //A component with interactive items such as like, dislike, subscribe and others //TODO which will be active later, just not required 
  return (
    <article className="flex justify-between items-start gap-4 flex-wrap md:flex-nowrap w-full">
      <div className="flex items-center gap-4">
        <Link to={`/channel/${channelHandler}`}>
          <img
            src={`${import.meta.env.VITE_BACKEND_HOST}/${channelPicture}`}
            alt="refresh"
            className="w-10 h-10 aspect-square rounded-full object-center object-cover"
          />
        </Link>
        <div className="flex flex-col justify-center whitespace-nowrap">
          <Link to={`/channel/${channelHandler}`} className="font-medium">
            {channelName}
          </Link>
          <small className="text-txlight">
            {millifyNum(subscribers)} subscribers
          </small>
        </div>
        <button
          className="rounded-full bg-text text-bgprimary py-1.5 px-3 font-medium icon"
          onClick={handleSubscribe}
        >
          {isSubscribe ? "UnSubscibe" : "Subscribe"}
        </button>
      </div>
      <div
        className="flex items-center gap-4 flex-wrap grow justify-start md:justify-end"
        ref={dynaBtnRef}
        onLoad={handleAlignment}
      >
        <div className="flex items-center flex-nowrap gap-4 bg-border rounded-full py-2 px-4 overflow-hidden">
          <div className="flex gap-2 items-center icon" onClick={handleLike}>
            <BiSolidLike
              ref={likeRef}
              className={`text-2xl transition-all ${
                isliked && "text-blue-600"
              }`}
            />
            <p>{millifyNum(like)}</p>
          </div>
          <span className="mb-1 text-gray-500 scale-y-400 text-xs font-thin">
            |
          </span>
          <div className="flex gap-4 items-center icon" onClick={handleDisLike}>
            <BiSolidDislike
              ref={dislikeRef}
              className={`text-2xl transition-all ${
                isDisLiked && "text-red-600"
              }`}
            />
          </div>
        </div>
        {dynaBtn.slice(0, dynaBtnRange - 1).map((item, index) => (
          <div
            title={item.name}
            className="flex items-center gap-2 bg-border rounded-full py-2 px-4 icon"
            key={`video/player/icon/${index}`}
          >
            <item.icon className="text-xl" />
            <p>{item.name}</p>
          </div>
        ))}
        <div className="relative flex items-center flex-nowrap gap-4 bg-border rounded-full py-2 px-4">
          <div className="flex gap-2 items-center icon">
            <HiDotsHorizontal
              className="text-xl"
              onClick={() => {
                setShowExtra((prev) => !prev);
              }}
            />
            {showExtra && (
              <ol className="absolute top-0 right-0 bg-border w-fit py-2 pl-1 pr-3 z-20 mt-14 rounded-xl shadow-[0.1px_0.1px_10px_0.1px_black]">
                {dynaBtn.slice(dynaBtnRange - 1).map((item, index) => (
                  <div
                    title={item.name}
                    className="flex items-center gap-2 bg-border rounded-full py-2 px-4 icon"
                    key={`video/player/icon/hidden/${index}`}
                  >
                    <item.icon className="text-xl" />
                    <p>{item.name}</p>
                  </div>
                ))}
              </ol>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
