import { LuMenu, LuMic, LuSearch } from "react-icons/lu";
import { MdAdd } from "react-icons/md";
import { IoNotificationsOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";

import logo from "../../images/logo.png";
const items = [
  { id: 0, name: "navbar", icon: LuMenu, path: "/navbar" },
  { id: 1, name: "logo", icon: logo, path: "/" },
  { id: 2, name: "search", icon: LuSearch, path: "/" },
  { id: 3, name: "mic", icon: LuMic, path: "/" },
  { id: 4, name: "Create", icon: MdAdd, path: "/post/create" },
  { id: 5, name: "notify", icon: IoNotificationsOutline, path: "/" },
  { id: 6, name: "profile", icon: CgProfile, path: "/profile" },
  { id: 7, name: "Sign in", icon: CgProfile, path: "/login" },
];
export default items;
