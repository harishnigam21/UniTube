import { CgProfile, CgPlayList } from "react-icons/cg";
import {
  MdOutlineSubscriptions,
  MdOutlineExplore,
  MdOutlineHelpOutline,
  MdOutlineFeedback,
  MdHistory,
  MdOutlineWatchLater,
} from "react-icons/md";
import { SiYoutubeshorts } from "react-icons/si";
import { SlLike } from "react-icons/sl";
import { GoVideo } from "react-icons/go";
import { AiFillHome } from "react-icons/ai";
import { IoSettingsOutline } from "react-icons/io5";
//all items for sidebar
const items = [
  { id: 0, name: "Home", icon: AiFillHome, path: "/home" },
  { id: 1, name: "Shorts", icon: SiYoutubeshorts, path: "/Shorts" },
  {
    id: 2,
    name: "Subscription",
    icon: MdOutlineSubscriptions,
    path: "/subscription",
  },
  {
    id: 3,
    name: "You",
    icon: CgProfile,
    path: "/you",
    nest: [
      {
        id: 0,
        name: "History",
        icon: MdHistory,
        path: "/history",
      },
      {
        id: 1,
        name: "Playlist",
        icon: CgPlayList,
        path: "/playlist",
      },
      {
        id: 2,
        name: "Watch later",
        icon: MdOutlineWatchLater,
        path: "/watch_later",
      },
      {
        id: 3,
        name: "Liked videos",
        icon: SlLike,
        path: "/liked_videos",
      },
      {
        id: 4,
        name: "Your videos",
        icon: GoVideo,
        path: "/your_videos",
      },
    ],
  },
  {
    id: 4,
    name: "Explore",
    icon: MdOutlineExplore,
    path: "/explore",
    nest: [
      {
        id: 0,
        name: "Shopping",
        icon: MdHistory,
        path: "/shopping",
      },
      {
        id: 1,
        name: "Music",
        icon: CgPlayList,
        path: "/music",
      },
      {
        id: 2,
        name: "Movies",
        icon: MdOutlineWatchLater,
        path: "/movies",
      },
      {
        id: 3,
        name: "News",
        icon: SlLike,
        path: "/news",
      },
      {
        id: 4,
        name: "Sports",
        icon: SlLike,
        path: "/sports",
      },
    ],
  },
  { id: 5, name: "Setting", icon: IoSettingsOutline, path: "/setting" },
  { id: 6, name: "Help", icon: MdOutlineHelpOutline, path: "/help" },
  { id: 7, name: "Send Feedback", icon: MdOutlineFeedback, path: "/feedback" },
];
export default items;
