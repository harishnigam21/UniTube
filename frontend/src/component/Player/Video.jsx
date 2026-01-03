import { useEffect, useRef, useState } from "react";
import { millifyNum } from "../../utils/millify";
import dummy from "../../assets/videos/dummy.MOV";
import { FaPlay } from "react-icons/fa";
import { FaPause } from "react-icons/fa";
import {
  FaVolumeDown,
  FaVolumeMute,
  FaVolumeOff,
  FaVolumeUp,
} from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";
import { AiOutlineFullscreenExit, AiOutlineFullscreen } from "react-icons/ai";
import { SlLike, SlDislike } from "react-icons/sl";
import { RiShareForwardLine } from "react-icons/ri";
import { useOutletContext } from "react-router-dom";
import { FaRegBookmark } from "react-icons/fa";
import { MdFileDownload, MdOutlinedFlag } from "react-icons/md";
import { HiDotsHorizontal, HiScissors } from "react-icons/hi";
import Comment from "../common/Comment";
import PostComment from "../common/PostComment";

export default function Video() {
  const [VideoInfo, setVideoInfo] = useState({
    title:
      "फुलवा के डोरी | माँ के बाजे पैजनिया | Best Bhakti Video Song Collection",
    channelLogo:
      "https://yt3.ggpht.com/020nsWBJCQfeWqEoiyqKLddje5JQxQ_0tdgxCc5FQVlgeWR6v4Y80hKAAsFTCacmhTx5fiX58g=s88-c-k-c0x00ffffff-no-rj",
    channelName: "Sundrani CG Bhakti",
    subscriber: 1280000,
    isSubscribed: false,
    like: 39000,
    dislike: 2,
    views: 16770928,
    postedAt: "18-04-2017_01:54:55",
    description:
      "फुलवा के डोरी | माँ के बाजे पैजनिया | Best Bhakti Video Song Collection WhatsApp Only - 7049323232",
    details: {
      Song: " Fulva Ke Dori",
      Album: " Maa Ke Baje Paijaniya",
      Singer: "Alka Chandrakar",
      Music: "",
      Director: "Mohan Sundrani",
      Producer: "Lakhi Sundrani",
      CamraMan: "Mohan Sahu",
      Editor: "Rupesh Nirvan, prahalad Nishad",
      Recordist: "Niraj Verma",
      Graphics: "Sushil Yadav",
      Production: "Video World Raipur",
    },
    comments: [
      {
        id: "1",
        user: "Alpha_User",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alpha",
        text: "This is a top-level comment (Level 1). Let the nesting begin!",
        timestamp: "03-01-2026_10:02:00",
        likes: 50,
        replies: [
          {
            id: "1.1",
            user: "Beta_Responder",
            text: "Level 2: Replying to the start of the chain.",
            timestamp: "03-01-2026_10:05:00",
            replies: [
              {
                id: "1.1.1",
                user: "Gamma_Dev",
                text: "Level 3: Still going deeper...",
                timestamp: "03-01-2026_10:10:00",
                replies: [
                  {
                    id: "1.1.1.1",
                    user: "Delta_Explorer",
                    text: "Level 4: We are halfway to the limit.",
                    timestamp: "03-01-2026_10:15:00",
                    replies: [
                      {
                        id: "1.1.1.1.1",
                        user: "Epsilon_Tech",
                        text: "Level 5: Deep nesting check.",
                        timestamp: "03-01-2026_10:20:00",
                        replies: [
                          {
                            id: "1.1.1.1.1.1",
                            user: "Zeta_Node",
                            text: "Level 6: Testing UI indentation limits.",
                            timestamp: "03-01-2026_10:25:00",
                            replies: [
                              {
                                id: "1.1.1.1.1.1.1",
                                user: "Eta_Branch",
                                text: "Level 7: Almost there.",
                                timestamp: "03-01-2026_10:30:00",
                                replies: [
                                  {
                                    id: "1.1.1.1.1.1.1.1",
                                    user: "Theta_Link",
                                    text: "Level 8: Can you still see this?",
                                    timestamp: "03-01-2026_10:35:00",
                                    replies: [
                                      {
                                        id: "1.1.1.1.1.1.1.1.1",
                                        user: "Iota_Core",
                                        text: "Level 9: Penultimate nested layer.",
                                        timestamp: "03-01-2026_10:40:00",
                                        replies: [
                                          {
                                            id: "1.1.1.1.1.1.1.1.1.1",
                                            user: "Kappa_Final",
                                            text: "Level 10: Deepest possible reply achieved.",
                                            timestamp: "03-01-2026_10:45:00",
                                            replies: [],
                                          },
                                        ],
                                      },
                                    ],
                                  },
                                ],
                              },
                            ],
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "2",
        user: "Creative_Mind",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Creative",
        text: "Second top-level comment. Amazing video quality!",
        timestamp: "03-01-2026_11:12:30",
        likes: 12,
        replies: [],
      },
      {
        id: "3",
        user: "Tech_Reviewer",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Tech",
        text: "What microphone did you use for this recording?",
        timestamp: "03-01-2026_12:05:45",
        likes: 5,
        replies: [],
      },
      {
        id: "4",
        user: "Nature_Lover",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Nature",
        text: "The colors in the background are so vibrant.",
        timestamp: "03-01-2026_12:45:10",
        likes: 22,
        replies: [],
      },
      {
        id: "5",
        user: "Travel_Bug",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Travel",
        text: "Where was this filmed? Looks like Switzerland.",
        timestamp: "03-01-2026_13:00:00",
        likes: 8,
        replies: [],
      },
      {
        id: "6",
        user: "Gadget_Fan",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Gadget",
        text: "Love the editing style, very snappy!",
        timestamp: "03-01-2026_13:15:22",
        likes: 15,
        replies: [],
      },
      {
        id: "7",
        user: "Silent_Watcher",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Silent",
        text: "First time watching this channel, subscribed.",
        timestamp: "03-01-2026_13:20:55",
        likes: 30,
        replies: [],
      },
      {
        id: "8",
        user: "Chef_Table",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Chef",
        text: "The background music is a bit too loud for me.",
        timestamp: "03-01-2026_13:25:10",
        likes: 2,
        replies: [],
      },
      {
        id: "9",
        user: "History_Buff",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=History",
        text: "Interesting facts shared in the second half.",
        timestamp: "03-01-2026_13:30:00",
        likes: 11,
        replies: [],
      },
      {
        id: "10",
        user: "Final_Boss",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Final",
        text: "Comment #10 reached. Great thread everyone!",
        timestamp: "03-01-2026_13:35:15",
        likes: 100,
        replies: [],
      },
    ],
  });
  const [showMore, setShowMore] = useState(false);
  const videoRef = useRef(null);
  const dynaBtnRef = useRef(null);
  const containerRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(0.5);
  const [volumeIcon, setVolumeIcon] = useState(true);
  const [beforeMute, setBeforeMute] = useState(volume);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const { setSidebarToggle } = useOutletContext();
  const dynaBtn = [
    { icon: RiShareForwardLine, name: "Share", number: "", work: "" },
    { icon: FaRegBookmark, name: "Save", number: "", work: "" },
    { icon: MdFileDownload, name: "Download", number: "", work: "" },
    { icon: HiScissors, name: "Clip", number: "", work: "" },
    { icon: MdOutlinedFlag, name: "Report", number: "", work: "" },
  ];
  const [dynaBtnRange, setDynaBtnRange] = useState(dynaBtn.length);
  const handleAlignment = () => {
    if (dynaBtnRef.current) {
      let need = dynaBtnRef.current.getBoundingClientRect();
      setDynaBtnRange(need.width >= 580 ? 3 : need.width >= 320 ? 2 : 1);
    }
  };
  useEffect(() => {
    window.addEventListener("resize", handleAlignment);
    return () => window.removeEventListener("resize", handleAlignment);
  }, []);
  // Toggle Play/Pause
  const togglePlay = () => {
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  useEffect(() => {
    setSidebarToggle((prev) => ({ ...prev, type: "type2", status: false }));
  }, []);
  useEffect(() => {
    if (progress == 100) {
      setIsPlaying(false);
    }
  }, [progress]);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () =>
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  // Called when the video file is first loaded
  const handleLoadedMetadata = () => {
    setDuration(videoRef.current.duration);
  };
  // Update progress bar as video plays
  const handleTimeUpdate = () => {
    const currentProgress =
      (videoRef.current.currentTime / videoRef.current.duration) * 100;
    setProgress(currentProgress);
    setCurrentTime(videoRef.current.currentTime);
  };

  const formatTime = (timeInSeconds) => {
    if (isNaN(timeInSeconds)) return "0:00";
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    const paddedSeconds = seconds < 10 ? `0${seconds}` : seconds;
    if (hours > 0) {
      const paddedMinutes = minutes < 10 ? `0${minutes}` : minutes;
      return `${hours}:${paddedMinutes}:${paddedSeconds}`;
    }
    return `${minutes}:${paddedSeconds}`;
  };
  const toggleFullscreen = () => {
    const container = containerRef.current;
    if (!document.fullscreenElement) {
      if (container.requestFullscreen) {
        container.requestFullscreen();
      } else if (container.webkitRequestFullscreen) {
        container.webkitRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };
  return (
    <section
      className="w-full overflow-scroll text-text flex flex-col gap-4"
      onMouseOver={() =>
        setSidebarToggle((prev) => ({ ...prev, status: false }))
      }
    >
      <article
        className="relative group w-full md:min-h-[80vh] min-h-fit aspect-video overflow-hidden bg-black"
        ref={containerRef}
      >
        <video
          ref={videoRef}
          src={dummy}
          onLoadedMetadata={handleLoadedMetadata}
          onTimeUpdate={handleTimeUpdate}
          onClick={togglePlay} // Click video to play/pause
          className="w-full h-full cursor-pointer"
        />

        {/* CUSTOM CONTROLS OVERLAY */}
        <article className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-bgprimary text-text to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity">
          {/* Progress Bar */}
          <article className="w-full h-1 bg-zinc-600 mb-4 cursor-pointer relative">
            <div
              className="absolute top-0 left-0 h-full bg-red-600"
              style={{ width: `${progress}%` }}
            />
          </article>

          <article className="flex items-center justify-between">
            <article className="flex items-center gap-8">
              <button onClick={togglePlay} className="text-2xl">
                {isPlaying ? (
                  <FaPause className="text-xl text-text" />
                ) : (
                  <FaPlay className="text-xl text-text" />
                )}
              </button>
              <div className="group/volume flex gap-2 items-center text-text rounded-full hover:bg-border p-1.5">
                <div
                  className="relative flex items-center transition-all text-xl icon"
                  onClick={() => {
                    setVolume((prev) => {
                      if (prev == 0) {
                        setVolumeIcon(true);
                        return beforeMute;
                      } else {
                        setVolumeIcon(false);
                        setBeforeMute(prev);
                        return 0;
                      }
                    });
                  }}
                  onMouseOver={() => {}}
                >
                  {volume <= 0 && !volumeIcon ? (
                    <FaVolumeMute />
                  ) : volume <= 0 ? (
                    <FaVolumeOff />
                  ) : volume > 0 && volume < 0.3 ? (
                    <FaVolumeDown />
                  ) : (
                    <FaVolumeUp />
                  )}
                </div>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={volume}
                  onChange={(e) => {
                    const v = e.target.value;
                    setVolume(v);
                    videoRef.current.volume = v;
                  }}
                  className="w-0 h-0.5 accent-white icon opacity-0 group-hover/volume:w-20 group-hover/volume:opacity-100 transition-all"
                />
              </div>
              <div className="flex gap-2 items-center">
                <span>{formatTime(currentTime)}</span>
                <span>/</span>
                <span>{formatTime(duration)}</span>
              </div>
            </article>
            <article className="flex items-center gap-8">
              <div className="icon flex items-center">
                <IoSettingsOutline className="text-xl" />
              </div>
              <div
                className="icon flex items-center"
                onClick={toggleFullscreen}
              >
                {isFullscreen ? (
                  <AiOutlineFullscreenExit />
                ) : (
                  <AiOutlineFullscreen />
                )}
              </div>
            </article>
          </article>
        </article>
      </article>
      {/* THE ACTUAL VIDEO */}

      <article className="grid grid-cols-1 lg:grid-cols-[70%_30%] gap-4 text-text px-5">
        <article className="flex flex-col gap-4 justify-center w-full">
          <strong className="text-xl">{VideoInfo.title}</strong>
          <article className="flex justify-between items-start gap-4 flex-wrap md:flex-nowrap w-full">
            <div className="flex items-center gap-4">
              <img
                src={VideoInfo.channelLogo}
                alt="refresh"
                className="w-10 h-10 aspect-square rounded-full object-center object-cover"
              />
              <div className="flex flex-col justify-center whitespace-nowrap">
                <p className="font-medium">{VideoInfo.channelName}</p>
                <small className="text-txlight">
                  {millifyNum(VideoInfo.subscriber)} subscribers
                </small>
              </div>
              <button
                className="rounded-full bg-text text-black py-1.5 px-3 font-medium icon"
                onClick={handleAlignment}
              >
                {VideoInfo.isSubscribed ? "Subscribed" : "Subscribe"}
              </button>
            </div>
            <div
              className="flex items-center gap-4 flex-wrap grow justify-start md:justify-end"
              ref={dynaBtnRef}
            >
              <div className="flex items-center flex-nowrap gap-4 bg-border rounded-full py-2 px-4 overflow-hidden">
                <div className="flex gap-2 items-center icon">
                  <SlLike className="text-xl" />
                  <p>{millifyNum(VideoInfo.like)}</p>
                </div>
                <span className="mb-1 text-gray-500 scale-y-400 text-xs font-thin">
                  |
                </span>
                <div className="flex gap-4 items-center icon">
                  <SlDislike className="text-xl" />
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
                    onClick={(e) => {
                      const target =
                        e.currentTarget.parentElement.childNodes[1];
                      if (target) {
                        if (target.classList.contains("hidden")) {
                          target.classList.remove("hidden");
                        } else {
                          target.classList.add("hidden");
                        }
                      }
                    }}
                  />
                  <ol className="absolute hidden top-0 right-0 bg-border w-fit py-2 pl-1 pr-3 z-20 mt-14 rounded-xl shadow-[0.1px_0.1px_10px_0.1px_black]">
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
                </div>
              </div>
            </div>
          </article>
          <article className="flex flex-col gap-2 bg-border rounded-xl p-4 text-sm">
            <p className="font-medium flex gap-2">
              <span>{millifyNum(VideoInfo.views)} views</span>
              <span>{VideoInfo.postedAt.slice(0, 10)}</span>
            </p>
            {/* description */}
            <div>
              <p className="pb-6">{VideoInfo.description}</p>

              {showMore &&
                Object.entries(VideoInfo.details).map(([key, value]) => (
                  <p key={key}>
                    <strong>{key} - </strong> {String(value)}
                  </p>
                ))}

              <p
                className="font-medium icon w-fit pt-4"
                onClick={() => setShowMore(!showMore)}
              >
                {showMore ? "show less..." : "show more..."}
              </p>
            </div>
          </article>
          {/* comments */}
          <article className="flex flex-col gap-8">
            <div className="flex gap-4">
              <strong className="text-xl">
                {millifyNum(VideoInfo.comments.length)} Comments
              </strong>
            </div>
            {/* Post Comment */}
            <article>
              <PostComment size={12} submitText={"Comment"} />
            </article>
            {/* other comments */}
            <article className="flex flex-col gap-8">
              {VideoInfo.comments.map((comm) => (
                <Comment key={`toplevel/comment/${comm.id}`} comm={comm} />
              ))}
            </article>
          </article>
        </article>
        <article>Recommendation</article>
      </article>
    </section>
  );
}
