/* eslint-disable no-unused-vars */
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Footer from "./component/common/Footer";
import Header from "./component/common/Header";
import SlideBar from "./component/common/SlideBar";
import "./App.css";
import { useDispatch } from "react-redux";
import { changeLoginStatus, newUser } from "./store/Slices/userSlice";
export default function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [navToggle, setNavToggle] = useState(false);
  const [sidebarToggle, setSidebarToggle] = useState({
    status: true,
    type: "type1",
  });
  const [screenSize, setScreenSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  useEffect(() => {
    const onRefresh = async () => {
      const url = `${import.meta.env.VITE_BACKEND_HOST}/refresh`;
      try {
        const response = await fetch(url, {
          method: "GET",
          headers: { "content-type": "application/json" },
          credentials: "include",
        });
        const responseData = await response.json();
        if (response.ok) {
          dispatch(newUser({ userInfo: responseData.userInfo }));
          dispatch(changeLoginStatus({ status: true }));
          window.localStorage.setItem(
            "acTk",
            JSON.stringify(responseData.acTk)
          );
          return;
        }
        navigate("/login", { replace: true }); //TODO:page not redirecting to login
        return;
      } catch (error) {
        console.log(error.message);
      }
    };
    onRefresh();
  }, [dispatch, navigate]);
  useEffect(() => {
    const handleResize = () => {
      setScreenSize({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const [short, setShort] = useState([
    {
      id: "s1",
      thumbnail: "https://picsum.photos/seed/s1/720/1280",
      title: "How to center a div in 2025 💻",
      views: "1.2M",
      likes: "45K",
      category: "Coding",
      channelName: "CodeWithMe",
      comments: [
        {
          id: "sc1",
          user: "DevJ",
          text: "Grid is still better! 😂",
          likes: "2K",
        },
        { id: "sc2", user: "Asha", text: "Finally, I get it!", likes: "400" },
      ],
    },
    {
      id: "s2",
      thumbnail: "https://picsum.photos/seed/s2/720/1280",
      title: "iPhone 16 Pro Camera Test 📸",
      views: "800K",
      likes: "120K",
      category: "Tech",
      channelName: "TechReviews",
      comments: [
        { id: "sc3", user: "Sam", text: "That zoom is crazy!", likes: "5K" },
      ],
    },
    {
      id: "s3",
      thumbnail: "https://picsum.photos/seed/s3/720/1280",
      title: "Morning Routine ☀️",
      views: "2.5M",
      likes: "300K",
      category: "Lifestyle",
      channelName: "DailyVlogs",
      comments: [
        {
          id: "sc4",
          user: "Zoe",
          text: "I wish I could wake up that early.",
          likes: "12K",
        },
      ],
    },
    {
      id: "s4",
      thumbnail: "https://picsum.photos/seed/s4/720/1280",
      title: "Life Hack: Garlic Peeling 🧄",
      views: "5M",
      likes: "1M",
      category: "Food",
      channelName: "ChefHacks",
      comments: [
        {
          id: "sc5",
          user: "Foodie",
          text: "Wait, actually works!",
          likes: "50K",
        },
      ],
    },
    {
      id: "s5",
      thumbnail: "https://picsum.photos/seed/s5/720/1280",
      title: "Talking Cat! 🐱",
      views: "10M",
      likes: "2.1M",
      category: "Pets",
      channelName: "PetLovers",
      comments: [
        {
          id: "sc6",
          user: "CatMom",
          text: "Did he just say 'Hello'?",
          likes: "100K",
        },
      ],
    },
    {
      id: "s6",
      thumbnail: "https://picsum.photos/seed/s6/720/1280",
      title: "Bali Sunset 🌅",
      views: "300K",
      likes: "25K",
      category: "Travel",
      channelName: "TravelWithMe",
      comments: [
        {
          id: "sc7",
          user: "BeachBum",
          text: "Adding this to my bucket list.",
          likes: "1K",
        },
      ],
    },
    {
      id: "s7",
      thumbnail: "https://picsum.photos/seed/s7/720/1280",
      title: "Minimalist Setup 🛠️",
      views: "1.1M",
      likes: "88K",
      category: "Tech",
      channelName: "AestheticHome",
      comments: [
        {
          id: "sc8",
          user: "PCMaster",
          text: "What monitor is that?",
          likes: "200",
        },
      ],
    },
    {
      id: "s8",
      thumbnail: "https://picsum.photos/seed/s8/720/1280",
      title: "Can You Solve This? 🧠",
      views: "4.2M",
      likes: "200K",
      category: "Education",
      channelName: "BrainTeasers",
      comments: [
        {
          id: "sc9",
          user: "Smarty",
          text: "The answer is 'Silence'.",
          likes: "15K",
        },
      ],
    },
    {
      id: "s9",
      thumbnail: "https://picsum.photos/seed/s9/720/1280",
      title: "10 min Abs 💪",
      views: "900K",
      likes: "50K",
      category: "Fitness",
      channelName: "FitLife",
      comments: [
        {
          id: "sc10",
          user: "GymRat",
          text: "I'm dying but it's worth it.",
          likes: "3K",
        },
      ],
    },
    {
      id: "s10",
      thumbnail: "https://picsum.photos/seed/s10/720/1280",
      title: "Tokyo Street Food 🍜",
      views: "6.7M",
      likes: "450K",
      category: "Food",
      channelName: "FoodieJapan",
      comments: [
        {
          id: "sc11",
          user: "Hungry",
          text: "Need that ramen now.",
          likes: "25K",
        },
      ],
    },
    {
      id: "s11",
      thumbnail: "https://picsum.photos/seed/s11/720/1280",
      title: "Drawing Spider-Man ✍️",
      views: "150K",
      likes: "12K",
      category: "Art",
      channelName: "ArtByAlex",
      comments: [
        {
          id: "sc12",
          user: "MarvelFan",
          text: "The shading is incredible.",
          likes: "1K",
        },
      ],
    },
    {
      id: "s12",
      thumbnail: "https://picsum.photos/seed/s12/720/1280",
      title: "Tesla Cyberbeast 🚗",
      views: "3.1M",
      likes: "105K",
      category: "Automotive",
      channelName: "AutoNews",
      comments: [
        {
          id: "sc13",
          user: "ElonFan",
          text: "Looks like a polygon lol.",
          likes: "8K",
        },
      ],
    },
    {
      id: "s13",
      thumbnail: "https://picsum.photos/seed/s13/720/1280",
      title: "Python in 60s 🐍",
      views: "2.2M",
      likes: "180K",
      category: "Coding",
      channelName: "DevLife",
      comments: [
        {
          id: "sc14",
          user: "Coder",
          text: "Best language for beginners.",
          likes: "4K",
        },
      ],
    },
    {
      id: "s14",
      thumbnail: "https://picsum.photos/seed/s14/720/1280",
      title: "Card Trick revealed! 😲",
      views: "8.9M",
      likes: "1M",
      category: "Entertainment",
      channelName: "MagicMike",
      comments: [
        { id: "sc15", user: "Trickster", text: "I KNEW IT!", likes: "20K" },
      ],
    },
    {
      id: "s15",
      thumbnail: "https://picsum.photos/seed/s15/720/1280",
      title: "The History of Tea 🍵",
      views: "400K",
      likes: "30K",
      category: "Education",
      channelName: "FactCheck",
      comments: [
        {
          id: "sc16",
          user: "HistoryNerd",
          text: "Actually very interesting.",
          likes: "500",
        },
      ],
    },
    {
      id: "s16",
      thumbnail: "https://picsum.photos/seed/s16/720/1280",
      title: "Satisfying Kinetic Sand ⏳",
      views: "12M",
      likes: "3M",
      category: "Satisfying",
      channelName: "OddlySatisfying",
      comments: [
        {
          id: "sc17",
          user: "Relax",
          text: "I could watch this all day.",
          likes: "200K",
        },
      ],
    },
    {
      id: "s17",
      thumbnail: "https://picsum.photos/seed/s17/720/1280",
      title: "React vs Vue ⚛️",
      views: "500K",
      likes: "40K",
      category: "Coding",
      channelName: "WebSimplified",
      comments: [
        {
          id: "sc18",
          user: "JS_Dev",
          text: "React team forever.",
          likes: "2K",
        },
      ],
    },
    {
      id: "s18",
      thumbnail: "https://picsum.photos/seed/s18/720/1280",
      title: "Tiny Pancake 🥞",
      views: "7.3M",
      likes: "600K",
      category: "Food",
      channelName: "TinyKitchen",
      comments: [
        { id: "sc19", user: "Kawaii", text: "It's so cute!", likes: "30K" },
      ],
    },
    {
      id: "s19",
      thumbnail: "https://picsum.photos/seed/s19/720/1280",
      title: "Stock Market for Kids 💰",
      views: "1.5M",
      likes: "95K",
      category: "Finance",
      channelName: "FinanceBro",
      comments: [
        {
          id: "sc20",
          user: "Dad",
          text: "Showing this to my son.",
          likes: "1K",
        },
      ],
    },
    {
      id: "s20",
      thumbnail: "https://picsum.photos/seed/s20/720/1280",
      title: "Windows 11 Secret 💻",
      views: "3.8M",
      likes: "250K",
      category: "Tech",
      channelName: "PCMasterRace",
      comments: [
        {
          id: "sc21",
          user: "Techie",
          text: "Shift + Click is a lifesaver.",
          likes: "10K",
        },
      ],
    },
  ]);
  return (
    <main className="flex relative flex-col box-border ">
      <Header
        navToggle={navToggle}
        setNavToggle={setNavToggle}
        setSidebarToggle={setSidebarToggle}
      />
      <section className="flex absolute top-0 left-0 box-border w-full max-h-screen overflow-y-auto noscrollbar">
        <SlideBar
          navToggle={navToggle}
          setNavToggle={setNavToggle}
          sidebarToggle={sidebarToggle}
        />
        <article className="flex flex-col w-full max-w-full pt-13">
          <Outlet context={{ short, setSidebarToggle, screenSize }} />
        </article>
      </section>
      {/* <Footer /> */}
    </main>
  );
}
