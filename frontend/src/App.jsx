/* eslint-disable no-unused-vars */
import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import Footer from "./component/common/Footer";
import Header from "./component/common/Header";
import SlideBar from "./component/common/SlideBar";
import "./App.css";
export default function App() {
  const [navToggle, setNavToggle] = useState(false);
  const [sidebarToggle, setSidebarToggle] = useState({
    status: true,
    type: "type1",
  });
  const [login, setLogin] = useState(false);
  const [video, setVideo] = useState([
    {
      id: "v1",
      channelId: "ch_js_mastery_01",
      uploader: "JavaScript Mastery Team",
      thumbnail: "https://picsum.photos/seed/v1/1280/720",
      channelPicture: "https://i.pravatar.cc/150?u=tech",
      title: "Building a Modern YouTube Clone with React 18 & Tailwind CSS",
      channelName: "JavaScript Mastery",
      views: 1250000,
      likes: 92000,
      dislikes: 120,
      postedAt: "31-12-2025_10:00:00",
      duration: "45:12",
      category: "Programming",
      description:
        "In this comprehensive masterclass, we dive deep into React 18 features, exploring the power of the new Concurrent Mode and hooks. We specifically focus on building high-performance Tailwind grid layouts that are fully responsive across mobile, tablet, and ultra-wide monitors. You will learn how to implement advanced React Router patterns for seamless navigation and state management techniques used in production-level applications.",
      comments: [
        {
          id: "c1",
          user: "CodeNewbie",
          text: "Finally, a tutorial that explains the logic behind the grid! Super helpful.",
          likes: 1200,
        },
        {
          id: "c1_2",
          user: "DevGuru",
          text: "The way you handled the responsive breakpoints is much cleaner than how I've been doing it.",
          likes: 450,
        },
        {
          id: "c1_3",
          user: "ReactFan",
          text: "Is there a part 2 covering the backend integration?",
          likes: 88,
        },
      ],
    },
    {
      id: "v2",
      channelId: "ch_baking_secrets_02",
      uploader: "Chef Elena Rodriguez",
      thumbnail: "https://picsum.photos/seed/v2/1280/720",
      channelPicture: "https://i.pravatar.cc/150?u=cooking",
      title: "Why You Should Never Use Cold Butter for Cookies",
      channelName: "Baking Secrets",
      views: 850000,
      likes: 42000,
      dislikes: 1100,
      postedAt: "02-01-2026_07:35:26",
      duration: "12:05",
      category: "Cooking",
      description:
        "Learn the scientific chemical reactions behind cookie textures. Many amateur bakers make the mistake of using butter straight from the fridge, but room-temperature 'creamed' butter is the key to that perfect chewy-on-the-inside, crispy-on-the-outside texture. We demonstrate three side-by-side batches—cold, melted, and room temp—to show you exactly how the fat structure changes the final spread and lift of your cookies.",
      comments: [
        {
          id: "c2",
          user: "CookieMonster",
          text: "Perfect tips. My last batch was a flat mess, now I know why!",
          likes: 3100,
        },
        {
          id: "c2_2",
          user: "BakerJoe",
          text: "Does this apply to pie crusts too?",
          likes: 120,
        },
        {
          id: "c2_3",
          user: "SugarRush",
          text: "Can confirm, the room temp butter changed my life.",
          likes: 15,
        },
      ],
    },
    {
      id: "v3",
      channelId: "ch_nomadic_03",
      uploader: "Chris Travels",
      thumbnail: "https://picsum.photos/seed/v3/1280/720",
      channelPicture: "https://i.pravatar.cc/150?u=travel",
      title: "Inside Tokyo's Most Expensive Capsule Hotel",
      channelName: "Nomadic Life",
      views: 3400000,
      likes: 125000,
      dislikes: 3400,
      postedAt: "01-12-2025_15:30:00",
      duration: "22:45",
      category: "Travel",
      description:
        "Spending 24 hours in a luxury $200 per night capsule hotel in the heart of Shinjuku. While most capsules are budget-friendly options for salarymen, this high-end facility offers a full spa, gourmet dining, and AI-controlled sleeping environments. We take you through the entire check-in process, the communal bathing culture, and see if a tiny box can actually feel like a 5-star suite.",
      comments: [
        {
          id: "c3",
          user: "JetSetter",
          text: "That view from the communal lounge is insane for a capsule hotel.",
          likes: 890,
        },
        {
          id: "c3_2",
          user: "TravelBug",
          text: "I stayed there last year! The pajamas they give you are so comfy.",
          likes: 210,
        },
        {
          id: "c3_3",
          user: "TokyoDreamer",
          text: "Still seems expensive for a pod, but the spa looks worth it.",
          likes: 45,
        },
      ],
    },
    {
      id: "v4",
      channelId: "ch_lofi_girl_04",
      uploader: "Lofi Studio Team",
      thumbnail: "https://picsum.photos/seed/v4/1280/720",
      channelPicture: "https://i.pravatar.cc/150?u=lofi",
      title: "Lofi Hip Hop Radio - Beats to Study/Relax To",
      channelName: "Lofi Girl",
      views: 4500000,
      likes: 980000,
      dislikes: 1200,
      postedAt: "01-01-2024_00:00:00",
      duration: "LIVE",
      category: "Music",
      description:
        "Join the global community for 24/7 chill beats, perfect for studying, working, or just relaxing after a long day. Our curated selection features underground producers from all over the world, bringing you the finest in lo-fi hip hop, jazzhop, and ambient sounds. Don't forget to participate in our live chat—it's one of the friendliest places on the internet!",
      comments: [
        {
          id: "c4",
          user: "Student22",
          text: "Saves my grades every single semester.",
          likes: 15000,
        },
        {
          id: "c4_2",
          user: "CoffeeShopVibes",
          text: "Listening to this while the rain hits my window... perfection.",
          likes: 4300,
        },
      ],
    },
    {
      id: "v5",
      channelId: "ch_tech_reviews_05",
      uploader: "Marques K. Brown",
      thumbnail: "https://picsum.photos/seed/v5/1280/720",
      channelPicture: "https://i.pravatar.cc/150?u=mkbhd",
      title: "The Smartphone Awards 2025!",
      channelName: "TechReviews",
      views: 5100000,
      likes: 310000,
      dislikes: 8900,
      postedAt: "30-12-2025_18:00:00",
      duration: "18:20",
      category: "Technology",
      description:
        "It’s that time of year again! We’ve spent the last 12 months testing every major flagship and budget release to bring you the definitive Smartphone Awards. From the 'Best Camera' and 'Best Battery Life' to the dreaded 'Bust of the Year,' we break down which companies pushed the envelope and which ones played it too safe. Stay tuned for the big reveal of our overall Phone of the Year.",
      comments: [
        {
          id: "c5",
          user: "PhoneFan",
          text: "Expected winner for the camera category, but the battery award was a surprise!",
          likes: 5000,
        },
        {
          id: "c5_2",
          user: "AndroidLoyal",
          text: "Finally some recognition for the smaller brands. Great video.",
          likes: 1200,
        },
      ],
    },
    {
      id: "v6",
      channelId: "ch_yoga_sarah_06",
      uploader: "Sarah Zen",
      thumbnail: "https://picsum.photos/seed/v6/1280/720",
      channelPicture: "https://i.pravatar.cc/150?u=yoga",
      title: "15 Minute Full Body Stretch - Daily Routine",
      channelName: "Yoga with Sarah",
      views: 200000,
      likes: 12000,
      dislikes: 50,
      postedAt: "15-06-2025_06:00:00",
      duration: "15:00",
      category: "Fitness",
      description:
        "Perfect for beginners sitting at a desk all day. This routine focuses on opening up the hip flexors, releasing tension in the lower back, and stretching the neck and shoulders. No equipment needed—just 15 minutes of your time to reset your body and mind. Consistent practice will improve your posture and reduce chronic desk-related pain.",
      comments: [
        {
          id: "c6",
          user: "HealthyHabits",
          text: "Back pain gone after just three days of this routine!",
          likes: 400,
        },
        {
          id: "c6_2",
          user: "DeskWorker",
          text: "I do this during my lunch break. It's a game changer.",
          likes: 85,
        },
      ],
    },
    {
      id: "v7",
      channelId: "ch_gaming_insider_07",
      uploader: "Alex Hunter",
      thumbnail: "https://picsum.photos/seed/v7/1280/720",
      channelPicture: "https://i.pravatar.cc/150?u=gaming",
      title: "Top 10 Secrets in the New RPG Trailer",
      channelName: "Gaming Insider",
      views: 12000000,
      likes: 450000,
      dislikes: 12000,
      postedAt: "25-12-2025_12:00:00",
      duration: "08:15",
      category: "Gaming",
      description:
        "Did you spot the hidden character in frame 42? We analyze the latest 4K trailer frame-by-frame to uncover hidden lore, secret weapons, and easter eggs that confirm the return of a fan-favorite villain. We also discuss the leaked map size and how it compares to previous entries in the franchise. This might be the biggest open world we've ever seen.",
      comments: [
        {
          id: "c7",
          user: "GamerPro",
          text: "I totally missed the reflection in the window! Great catch.",
          likes: 2500,
        },
        {
          id: "c7_2",
          user: "LoreMaster",
          text: "The sword he's holding is definitely the one from the first game.",
          likes: 900,
        },
      ],
    },
    {
      id: "v8",
      channelId: "ch_money_mindset_08",
      uploader: "Financial Freedom Group",
      thumbnail: "https://picsum.photos/seed/v8/1280/720",
      channelPicture: "https://i.pravatar.cc/150?u=money",
      title: "How to Invest Your First $1000 in 2025",
      channelName: "Money Mindset",
      views: 650000,
      likes: 38000,
      dislikes: 500,
      postedAt: "10-09-2025_09:15:00",
      duration: "12:50",
      category: "Finance",
      description:
        "A complete beginner's guide to index funds and wealth building. We explain the power of compound interest and why starting with just $1000 can set you up for long-term success. We compare different brokerage accounts, look at low-cost ETFs, and discuss the importance of an emergency fund before you even start investing. Stop letting your money sit in a 0% savings account.",
      comments: [
        {
          id: "c8",
          user: "Investor101",
          text: "The chart on compound interest really opened my eyes.",
          likes: 120,
        },
        {
          id: "c8_2",
          user: "SavingGrace",
          text: "Wish I saw this in my 20s. Better late than never!",
          likes: 55,
        },
      ],
    },
    {
      id: "v9",
      channelId: "ch_comedy_hub_09",
      uploader: "Laugh Factory Team",
      thumbnail: "https://picsum.photos/seed/v9/1280/720",
      channelPicture: "https://i.pravatar.cc/150?u=comedy",
      title: "Every Zoom Meeting Ever (Parody)",
      channelName: "The Comedy Hub",
      views: 2800000,
      likes: 195000,
      dislikes: 1500,
      postedAt: "20-05-2024_14:30:00",
      duration: "04:30",
      category: "Comedy",
      description:
        "You're on mute! Can everyone see my screen? We act out the most relatable and frustrating moments of remote work life. From the awkward 'no you go ahead' silences to the accidental background appearances by family members and pets. If you've spent the last three years in video calls, this video is for you.",
      comments: [
        {
          id: "c9",
          user: "OfficeLife",
          text: "The 'frozen face' bit had me dying. Too accurate! 😂",
          likes: 8000,
        },
        {
          id: "c9_2",
          user: "WfhKing",
          text: "I'm watching this while in a Zoom meeting right now.",
          likes: 3400,
        },
      ],
    },
    {
      id: "v10",
      channelId: "ch_space_science_10",
      uploader: "Dr. Neil Orbit",
      thumbnail: "https://picsum.photos/seed/v10/1280/720",
      channelPicture: "https://i.pravatar.cc/150?u=space",
      title: "What Happens if You Fall into a Black Hole?",
      channelName: "Space Science",
      views: 950000,
      likes: 67000,
      dislikes: 300,
      postedAt: "28-12-2025_14:10:00",
      duration: "14:10",
      category: "Science",
      description:
        "Exploring the terrifying reality of spaghettification and time dilation. We use the latest CGI simulations to show what a journey past the event horizon might look like from both the traveler's perspective and an outside observer's. We also discuss Hawking Radiation and the information paradox—what actually happens to your physical matter once you're inside?",
      comments: [
        {
          id: "c10",
          user: "SpaceNerd",
          text: "The visualization of the photon sphere was mind-blowing.",
          likes: 1100,
        },
        {
          id: "c10_2",
          user: "ScienceRules",
          text: "Time dilation is such a scary concept to think about.",
          likes: 420,
        },
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
  return (
    <main className="flex relative flex-col box-border ">
      <Header
        navToggle={navToggle}
        setNavToggle={setNavToggle}
        setSidebarToggle={setSidebarToggle}
        login={login}
      />
      <section className="flex absolute top-0 box-border w-full max-h-screen overflow-y-scroll">
        <SlideBar
          navToggle={navToggle}
          setNavToggle={setNavToggle}
          sidebarToggle={sidebarToggle}
        />
        <article className="flex flex-col w-full pt-13">
          <Outlet context={{ video, short, setSidebarToggle }} />
        </article>
      </section>
      {/* <Footer /> */}
    </main>
  );
}
