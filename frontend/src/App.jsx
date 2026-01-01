/* eslint-disable no-unused-vars */
import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import Footer from "./component/common/Footer";
import Header from "./component/common/Header";
import SlideBar from "./component/common/SlideBar";
import "./App.css";
export default function App() {
  const [navToggle, setNavToggle] = useState(false);
  const [login, setLogin] = useState(true);
  const [video, setVideo] = useState([
    {
      id: "v1",
      thumbnail: "https://picsum.photos/seed/v1/1280/720",
      channelPicture: "https://i.pravatar.cc/150?u=tech",
      title: "Building a Modern YouTube Clone with React 18 & Tailwind CSS",
      channelName: "JavaScript Mastery",
      views: "1.2M views",
      postedAt: "2 days ago",
      duration: "45:12",
      category: "Programming",
      description:
        "In this video, we dive deep into React Router and Tailwind grid layouts.",
      comments: [
        { id: "c1", user: "CodeNewbie", text: "Helpful!", likes: "1.2K" },
      ],
    },
    {
      id: "v2",
      thumbnail: "https://picsum.photos/seed/v2/1280/720",
      channelPicture: "https://i.pravatar.cc/150?u=cooking",
      title: "Why You Should Never Use Cold Butter for Cookies",
      channelName: "Baking Secrets",
      views: "850K views",
      postedAt: "5 hours ago",
      duration: "12:05",
      category: "Cooking",
      description: "Learn the science behind cookie textures.",
      comments: [
        {
          id: "c3",
          user: "CookieMonster",
          text: "Perfect tips.",
          likes: "3.1K",
        },
      ],
    },
    {
      id: "v3",
      thumbnail: "https://picsum.photos/seed/v3/1280/720",
      channelPicture: "https://i.pravatar.cc/150?u=travel",
      title: "Inside Tokyo's Most Expensive Capsule Hotel",
      channelName: "Nomadic Life",
      views: "3.4M views",
      postedAt: "1 month ago",
      duration: "22:45",
      category: "Travel",
      description: "Spending 24 hours in a $200 per night capsule.",
      comments: [
        {
          id: "c4",
          user: "JetSetter",
          text: "That view is insane.",
          likes: "890",
        },
      ],
    },
    {
      id: "v4",
      thumbnail: "https://picsum.photos/seed/v4/1280/720",
      channelPicture: "https://i.pravatar.cc/150?u=lofi",
      title: "Lofi Hip Hop Radio - Beats to Study/Relax To",
      channelName: "Lofi Girl",
      views: "45K watching",
      postedAt: "LIVE",
      duration: "LIVE",
      category: "Music",
      description: "Join the community for 24/7 chill beats.",
      comments: [
        { id: "c5", user: "Student22", text: "Saves my grades.", likes: "15K" },
      ],
    },
    {
      id: "v5",
      thumbnail: "https://picsum.photos/seed/v5/1280/720",
      channelPicture: "https://i.pravatar.cc/150?u=mkbhd",
      title: "The Smartphone Awards 2025!",
      channelName: "TechReviews",
      views: "5.1M views",
      postedAt: "3 days ago",
      duration: "18:20",
      category: "Technology",
      description: "The best and worst phones of the year.",
      comments: [
        { id: "c6", user: "PhoneFan", text: "Expected winner.", likes: "5K" },
      ],
    },
    {
      id: "v6",
      thumbnail: "https://picsum.photos/seed/v6/1280/720",
      channelPicture: "https://i.pravatar.cc/150?u=yoga",
      title: "15 Minute Full Body Stretch - Daily Routine",
      channelName: "Yoga with Sarah",
      views: "200K views",
      postedAt: "1 year ago",
      duration: "15:00",
      category: "Fitness",
      description: "Perfect for beginners sitting at a desk.",
      comments: [
        {
          id: "c7",
          user: "HealthyHabits",
          text: "Back pain gone!",
          likes: "400",
        },
      ],
    },
    {
      id: "v7",
      thumbnail: "https://picsum.photos/seed/v7/1280/720",
      channelPicture: "https://i.pravatar.cc/150?u=gaming",
      title: "Top 10 Secrets in the New RPG Trailer",
      channelName: "Gaming Insider",
      views: "12M views",
      postedAt: "1 week ago",
      duration: "08:15",
      category: "Gaming",
      description: "Did you spot the hidden character?",
      comments: [
        { id: "c8", user: "GamerPro", text: "Missed that one!", likes: "2.5K" },
      ],
    },
    {
      id: "v8",
      thumbnail: "https://picsum.photos/seed/v8/1280/720",
      channelPicture: "https://i.pravatar.cc/150?u=money",
      title: "How to Invest Your First $1000 in 2025",
      channelName: "Money Mindset",
      views: "600K views",
      postedAt: "4 months ago",
      duration: "12:50",
      category: "Finance",
      description: "A beginner's guide to index funds.",
      comments: [
        { id: "c9", user: "Investor101", text: "Great advice.", likes: "120" },
      ],
    },
    {
      id: "v9",
      thumbnail: "https://picsum.photos/seed/v9/1280/720",
      channelPicture: "https://i.pravatar.cc/150?u=comedy",
      title: "Every Zoom Meeting Ever (Parody)",
      channelName: "The Comedy Hub",
      views: "2.8M views",
      postedAt: "2 years ago",
      duration: "04:30",
      category: "Comedy",
      description: "You're on mute! Can everyone see my screen?",
      comments: [
        { id: "c10", user: "OfficeLife", text: "Accurate. 😂", likes: "8K" },
      ],
    },
    {
      id: "v10",
      thumbnail: "https://picsum.photos/seed/v10/1280/720",
      channelPicture: "https://i.pravatar.cc/150?u=space",
      title: "What Happens if You Fall into a Black Hole?",
      channelName: "Space Science",
      views: "900K views",
      postedAt: "6 days ago",
      duration: "14:10",
      category: "Science",
      description: "Exploring theory and time dilation.",
      comments: [
        { id: "c11", user: "SpaceNerd", text: "Mind-blowing.", likes: "1.1K" },
      ],
    },
  ]);
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
  const [screenSize, setScreenSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const screen = {
    video: { "480px": 1, "640px": 2, "768px": 2, "1024px": 3 },
    short: { "480px": 2, "640px": 3, "768px": 4, "1024px": 5 },
  };
  useEffect(() => {
    const handleReSize = () => {
      setScreenSize({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener("resize", handleReSize);
    return () => window.removeEventListener("resize", handleReSize);
  }, []);

  function divideArray(arr, n) {
    const result = [];

    for (let i = 0; i < arr.length; i += n) {
      result.push(arr.slice(i, i + n));
    }

    return result;
  }
  const altContain = (videoArr, shortArr) => {
    const videoArrChunk = divideArray(videoArr, 3);
    const shortArrChunk = divideArray(shortArr, 4);
    const finalContain = [];
    console.log("Video", videoArrChunk);
    console.log("Short", shortArrChunk);
    const maxLength = Math.max(videoArrChunk.length, shortArrChunk.length);
    console.log(maxLength);
    for (let i = 0; i < maxLength; i++) {
      if (videoArrChunk[i]) {
        finalContain.push({ videos: videoArrChunk[i] });
      }
      if (shortArrChunk[i] && i < 2) {
        finalContain.push({ shorts: shortArrChunk[i] });
      }
    }
    console.log(finalContain);
  };
  useEffect(() => {
    altContain(video, short);
  }, [screenSize]);
  return (
    <main className="flex relative flex-col box-border">
      <Header navToggle={navToggle} setNavToggle={setNavToggle} login={login} />
      <section className="flex absolute top-0 box-border w-full max-h-screen overflow-y-scroll">
        <SlideBar navToggle={navToggle} />
        <Outlet context={{ video, short }} />
      </section>
      <Footer />
    </main>
  );
}
