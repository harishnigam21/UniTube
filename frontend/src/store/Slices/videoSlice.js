import { createSlice } from "@reduxjs/toolkit";
const videoSlice = createSlice({
  name: "videos",
  initialState: {
    // items: [
    //   {
    //     id: "v1",
    //     channelId: "bhakti@001",
    //     uploader: "Sundrani CG Bhakti Team",
    //     thumbnail:
    //       "https://res.cloudinary.com/db8okew0k/image/upload/v1767603039/Screenshot_2026-01-05_141533_xm3mqp.png",
    //     channelPicture: "https://i.pravatar.cc/150?u=bhakti1",
    //     title: "फुलवा के डोरी | माँ के बाजे पैजनिया",
    //     channelName: "Sundrani CG Bhakti",
    //     videoUrl: "",
    //     views: 1250000,
    //     likes: 92000,
    //     dislikes: 120,
    //     subscriber: 1280000,
    //     postedAt: "31-12-2025_10:00:00",
    //     duration: "45:12",
    //     category: "Music",
    //     tags: ["bhajans", "durga", "mata", "female", "Alka Chandrakar"],
    //     description: "Best Bhakti Song Collection",
    //     details: {
    //       Song: "Fulva Ke Dori",
    //       Singer: "Alka Chandrakar",
    //       Director: "Mohan Sundrani",
    //     },
    //     comments: [
    //       {
    //         id: "1",
    //         user: "Alpha_User",
    //         avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alpha",
    //         text: "This is a top-level comment (Level 1). Let the nesting begin!",
    //         timestamp: "03-01-2026_10:02:00",
    //         likes: 50,
    //         replies: [
    //           {
    //             id: "1.1",
    //             user: "Beta_Responder",
    //             text: "Level 2: Replying to the start of the chain.",
    //             timestamp: "03-01-2026_10:05:00",
    //             replies: [
    //               {
    //                 id: "1.1.1",
    //                 user: "Gamma_Dev",
    //                 text: "Level 3: Still going deeper...",
    //                 timestamp: "03-01-2026_10:10:00",
    //                 replies: [
    //                   {
    //                     id: "1.1.1.1",
    //                     user: "Delta_Explorer",
    //                     text: "Level 4: We are halfway to the limit.",
    //                     timestamp: "03-01-2026_10:15:00",
    //                     replies: [
    //                       {
    //                         id: "1.1.1.1.1",
    //                         user: "Epsilon_Tech",
    //                         text: "Level 5: Deep nesting check.",
    //                         timestamp: "03-01-2026_10:20:00",
    //                         replies: [
    //                           {
    //                             id: "1.1.1.1.1.1",
    //                             user: "Zeta_Node",
    //                             text: "Level 6: Testing UI indentation limits.",
    //                             timestamp: "03-01-2026_10:25:00",
    //                             replies: [
    //                               {
    //                                 id: "1.1.1.1.1.1.1",
    //                                 user: "Eta_Branch",
    //                                 text: "Level 7: Almost there.",
    //                                 timestamp: "03-01-2026_10:30:00",
    //                                 replies: [
    //                                   {
    //                                     id: "1.1.1.1.1.1.1.1",
    //                                     user: "Theta_Link",
    //                                     text: "Level 8: Can you still see this?",
    //                                     timestamp: "03-01-2026_10:35:00",
    //                                     replies: [
    //                                       {
    //                                         id: "1.1.1.1.1.1.1.1.1",
    //                                         user: "Iota_Core",
    //                                         text: "Level 9: Penultimate nested layer.",
    //                                         timestamp: "03-01-2026_10:40:00",
    //                                         replies: [
    //                                           {
    //                                             id: "1.1.1.1.1.1.1.1.1.1",
    //                                             user: "Kappa_Final",
    //                                             text: "Level 10: Deepest possible reply achieved.",
    //                                             timestamp:
    //                                               "03-01-2026_10:45:00",
    //                                             replies: [],
    //                                           },
    //                                         ],
    //                                       },
    //                                     ],
    //                                   },
    //                                 ],
    //                               },
    //                             ],
    //                           },
    //                         ],
    //                       },
    //                     ],
    //                   },
    //                 ],
    //               },
    //             ],
    //           },
    //         ],
    //       },
    //       {
    //         id: "2",
    //         user: "Creative_Mind",
    //         avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Creative",
    //         text: "Second top-level comment. Amazing video quality!",
    //         timestamp: "03-01-2026_11:12:30",
    //         likes: 12,
    //         replies: [],
    //       },
    //       {
    //         id: "3",
    //         user: "Tech_Reviewer",
    //         avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Tech",
    //         text: "What microphone did you use for this recording?",
    //         timestamp: "03-01-2026_12:05:45",
    //         likes: 5,
    //         replies: [],
    //       },
    //       {
    //         id: "4",
    //         user: "Nature_Lover",
    //         avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Nature",
    //         text: "The colors in the background are so vibrant.",
    //         timestamp: "03-01-2026_12:45:10",
    //         likes: 22,
    //         replies: [],
    //       },
    //       {
    //         id: "5",
    //         user: "Travel_Bug",
    //         avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Travel",
    //         text: "Where was this filmed? Looks like Switzerland.",
    //         timestamp: "03-01-2026_13:00:00",
    //         likes: 8,
    //         replies: [],
    //       },
    //       {
    //         id: "6",
    //         user: "Gadget_Fan",
    //         avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Gadget",
    //         text: "Love the editing style, very snappy!",
    //         timestamp: "03-01-2026_13:15:22",
    //         likes: 15,
    //         replies: [],
    //       },
    //       {
    //         id: "7",
    //         user: "Silent_Watcher",
    //         avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Silent",
    //         text: "First time watching this channel, subscribed.",
    //         timestamp: "03-01-2026_13:20:55",
    //         likes: 30,
    //         replies: [],
    //       },
    //       {
    //         id: "8",
    //         user: "Chef_Table",
    //         avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Chef",
    //         text: "The background music is a bit too loud for me.",
    //         timestamp: "03-01-2026_13:25:10",
    //         likes: 2,
    //         replies: [],
    //       },
    //       {
    //         id: "9",
    //         user: "History_Buff",
    //         avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=History",
    //         text: "Interesting facts shared in the second half.",
    //         timestamp: "03-01-2026_13:30:00",
    //         likes: 11,
    //         replies: [],
    //       },
    //       {
    //         id: "10",
    //         user: "Final_Boss",
    //         avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Final",
    //         text: "Comment #10 reached. Great thread everyone!",
    //         timestamp: "03-01-2026_13:35:15",
    //         likes: 100,
    //         replies: [],
    //       },
    //     ],
    //   },

    //   {
    //     id: "v2",
    //     channelId: "tech@002",
    //     uploader: "CodeWithRaj",
    //     thumbnail: "https://picsum.photos/seed/v2/1280/720",
    //     channelPicture: "https://i.pravatar.cc/150?u=tech2",
    //     title: "Redux Toolkit Explained in 20 Minutes",
    //     channelName: "CodeWithRaj",
    //     videoUrl: "",
    //     views: 980000,
    //     likes: 56000,
    //     dislikes: 800,
    //     subscriber: 410000,
    //     postedAt: "02-01-2026_11:30:00",
    //     duration: "20:45",
    //     category: "Education",
    //     tags: ["redux", "react", "javascript", "frontend"],
    //     description: "Learn Redux Toolkit step by step",
    //     details: {
    //       Topic: "Redux Toolkit",
    //       Level: "Intermediate",
    //       Language: "English",
    //     },
    //     comments: [
    //       {
    //         id: "1",
    //         user: "FrontendDev",
    //         avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=fd",
    //         text: "Best Redux explanation so far!",
    //         timestamp: "02-01-2026_12:00:00",
    //         likes: 90,
    //         replies: [
    //           {
    //             id: "1.1",
    //             user: "Beginner",
    //             avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=bg",
    //             text: "Selectors finally make sense.",
    //             timestamp: "02-01-2026_12:05:00",
    //             likes: 25,
    //             replies: [
    //               {
    //                 id: "1.1.1",
    //                 user: "Raj",
    //                 avatar:
    //                   "https://api.dicebear.com/7.x/avataaars/svg?seed=raj",
    //                 text: "Glad it helped 🙂",
    //                 timestamp: "02-01-2026_12:10:00",
    //                 likes: 40,
    //                 replies: [],
    //               },
    //             ],
    //           },
    //         ],
    //       },
    //     ],
    //   },

    //   {
    //     id: "v3",
    //     channelId: "travel@003",
    //     uploader: "Nomad Vlogs",
    //     thumbnail: "https://picsum.photos/seed/v3/1280/720",
    //     channelPicture: "https://i.pravatar.cc/150?u=travel3",
    //     title: "Solo Trip to Manali on Budget",
    //     channelName: "Nomad Vlogs",
    //     videoUrl: "",
    //     views: 2150000,
    //     likes: 130000,
    //     dislikes: 2300,
    //     subscriber: 890000,
    //     postedAt: "28-12-2025_07:00:00",
    //     duration: "18:22",
    //     category: "Travel",
    //     tags: ["manali", "mountains", "budget", "solo", "comedy"],
    //     description: "Complete travel guide with expenses",
    //     details: {
    //       Location: "Manali",
    //       Budget: "Low",
    //       Transport: "Bus",
    //     },
    //     comments: [
    //       {
    //         id: "1",
    //         user: "TravelBug",
    //         avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=tb",
    //         text: "Manali looks amazing!",
    //         timestamp: "29-12-2025_08:00:00",
    //         likes: 60,
    //         replies: [],
    //       },
    //     ],
    //   },

    //   {
    //     id: "v4",
    //     channelId: "food@004",
    //     uploader: "Street Food India",
    //     thumbnail: "https://picsum.photos/seed/v4/1280/720",
    //     channelPicture: "https://i.pravatar.cc/150?u=food4",
    //     title: "World's Spiciest Chaat Challenge 🔥",
    //     channelName: "Street Food India",
    //     videoUrl: "",
    //     views: 5400000,
    //     likes: 420000,
    //     dislikes: 5200,
    //     subscriber: 3200000,
    //     postedAt: "15-12-2025_16:40:00",
    //     duration: "14:10",
    //     category: "Food",
    //     tags: ["streetfood", "spicy", "chaat", "india"],
    //     description: "Extreme spicy street food challenge",
    //     details: {
    //       Dish: "Chaat",
    //       SpiceLevel: "Extreme",
    //     },
    //     comments: [
    //       {
    //         id: "1",
    //         user: "SpiceLover",
    //         avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sl",
    //         text: "My mouth is burning just watching 😅",
    //         timestamp: "16-12-2025_10:00:00",
    //         likes: 150,
    //         replies: [],
    //       },
    //     ],
    //   },

    //   {
    //     id: "v5",
    //     channelId: "fitness@005",
    //     uploader: "Fit With Aman",
    //     thumbnail: "https://picsum.photos/seed/v5/1280/720",
    //     channelPicture: "https://i.pravatar.cc/150?u=fit5",
    //     title: "15 Min Home Workout (No Equipment)",
    //     channelName: "Fit With Aman",
    //     videoUrl: "",
    //     views: 3100000,
    //     likes: 260000,
    //     dislikes: 3100,
    //     subscriber: 1800000,
    //     postedAt: "01-01-2026_06:00:00",
    //     duration: "15:00",
    //     category: "Fitness",
    //     tags: ["workout", "home", "fitness", "beginner", "comedy"],
    //     description: "Daily workout for beginners",
    //     details: {
    //       Equipment: "None",
    //       Level: "Beginner",
    //     },
    //     comments: [],
    //   },

    //   {
    //     id: "v6",
    //     channelId: "music@006",
    //     uploader: "Lofi Studio",
    //     thumbnail: "https://picsum.photos/seed/v6/1280/720",
    //     channelPicture: "https://i.pravatar.cc/150?u=lofi6",
    //     title: "Lofi Beats to Study & Relax",
    //     channelName: "Lofi Studio",
    //     videoUrl: "",
    //     views: 8200000,
    //     likes: 760000,
    //     dislikes: 4000,
    //     subscriber: 5200000,
    //     postedAt: "01-10-2025_00:00:00",
    //     duration: "LIVE",
    //     category: "Music",
    //     tags: ["lofi", "study", "chill"],
    //     description: "24/7 lofi stream",
    //     details: {
    //       Genre: "Lofi",
    //       Mood: "Relax",
    //     },
    //     comments: [],
    //   },

    //   {
    //     id: "v7",
    //     channelId: "gaming@007",
    //     uploader: "Pro Gamer X",
    //     thumbnail: "https://picsum.photos/seed/v7/1280/720",
    //     channelPicture: "https://i.pravatar.cc/150?u=game7",
    //     title: "GTA 6 Gameplay First Look",
    //     channelName: "Pro Gamer X",
    //     videoUrl: "",
    //     views: 12000000,
    //     likes: 950000,
    //     dislikes: 18000,
    //     subscriber: 7800000,
    //     postedAt: "05-01-2026_18:00:00",
    //     duration: "32:40",
    //     category: "Gaming",
    //     tags: ["gta6", "gaming", "openworld", "comedy"],
    //     description: "First gameplay reveal",
    //     details: {
    //       Game: "GTA 6",
    //       Platform: "PS5",
    //     },
    //     comments: [],
    //   },

    //   {
    //     id: "v8",
    //     channelId: "news@008",
    //     uploader: "Daily News",
    //     thumbnail: "https://picsum.photos/seed/v8/1280/720",
    //     channelPicture: "https://i.pravatar.cc/150?u=news8",
    //     title: "Top Headlines Today",
    //     channelName: "Daily News",
    //     videoUrl: "",
    //     views: 450000,
    //     likes: 12000,
    //     dislikes: 900,
    //     subscriber: 620000,
    //     postedAt: "03-01-2026_08:00:00",
    //     duration: "10:00",
    //     category: "News",
    //     tags: ["news", "current", "headlines"],
    //     description: "Daily news updates",
    //     details: {
    //       Region: "India",
    //       Language: "English",
    //     },
    //     comments: [],
    //   },

    //   {
    //     id: "v9",
    //     channelId: "education@009",
    //     uploader: "Math Simplified",
    //     thumbnail: "https://picsum.photos/seed/v9/1280/720",
    //     channelPicture: "https://i.pravatar.cc/150?u=math9",
    //     title: "Trigonometry in One Shot",
    //     channelName: "Math Simplified",
    //     videoUrl: "",
    //     views: 670000,
    //     likes: 54000,
    //     dislikes: 400,
    //     subscriber: 390000,
    //     postedAt: "20-12-2025_09:00:00",
    //     duration: "55:00",
    //     category: "Education",
    //     tags: ["math", "trigonometry", "exam"],
    //     description: "Complete chapter explained",
    //     details: {
    //       Subject: "Math",
    //       Level: "High School",
    //     },
    //     comments: [],
    //   },

    //   {
    //     id: "v10",
    //     channelId: "comedy@010",
    //     uploader: "Laugh Factory",
    //     thumbnail: "https://picsum.photos/seed/v10/1280/720",
    //     channelPicture: "https://i.pravatar.cc/150?u=comedy10",
    //     title: "When Developers Debug at 3AM 😂",
    //     channelName: "Laugh Factory",
    //     videoUrl: "",
    //     views: 2400000,
    //     likes: 310000,
    //     dislikes: 900,
    //     subscriber: 2100000,
    //     postedAt: "04-01-2026_22:00:00",
    //     duration: "6:45",
    //     category: "Comedy",
    //     tags: ["programming", "funny", "developer", "comedy"],
    //     description: "Every developer can relate",
    //     details: {
    //       Genre: "Comedy",
    //       Type: "Skits",
    //     },
    //     comments: [],
    //   },
    // ],
    items: [],
    filterItems: {
      category: [],
      search: [],
    },
    selectedItem: {},
    selectedItemComment: [],
    nextCursor: null,
  },
  reducers: {
    addCategory: (state, action) => {
      state.filterItems.category = [
        ...state.filterItems.category,
        action.payload.data,
      ];
    },
    addSearch: (state, action) => {
      state.filterItems.search = [
        ...state.filterItems.search,
        action.payload.data,
      ];
    },
    setItems: (state, action) => {
      state.items = action.payload.posts;
      state.nextCursor = action.payload.nextCursor;
    },
    addItems: (state, action) => {
      state.items = [...state.items, ...action.payload.posts];
      state.nextCursor = action.payload.nextCursor;
    },
    setSelectedItem: (state, action) => {
      state.selectedItem = action.payload.selectedItem;
    },
    setSelectedItemComment: (state, action) => {
      state.selectedItemComment = action.payload.selectedItemComment;
    },
    addItemComment: (state, action) => {
      const { newComment } = action.payload;
      const flatten = (nodes) => {
        return nodes.reduce((acc, node) => {
          const { replies, ...rest } = node;
          return acc.concat(rest, flatten(replies || []));
        }, []);
      };
      const flatList = [...flatten(state.selectedItemComment), newComment];
      const root = [];
      const map = {};
      flatList.forEach((c) => {
        map[c._id] = { ...c, replies: [] };
      });
      flatList.forEach((c) => {
        if (c.parent_id) {
          if (map[c.parent_id]) {
            map[c.parent_id].replies.unshift(map[c._id]);
          }
        } else {
          root.unshift(map[c._id]);
        }
      });

      state.selectedItemComment = root;
    },
    deleteItemComment: (state, action) => {
      const { commentIdToDelete } = action.payload;
      const removeRecursive = (comments, id) => {
        const index = comments.findIndex((c) => c._id === id);
        if (index !== -1) {
          comments.splice(index, 1);
          return true;
        }
        for (let comment of comments) {
          if (comment.replies && comment.replies.length > 0) {
            const found = removeRecursive(comment.replies, id);
            if (found) return true;
          }
        }
        return false;
      };
      removeRecursive(state.selectedItemComment, commentIdToDelete);
    },
    updateItemComment: (state, action) => {
      const { commentId, updatedText } = action.payload;

      const updateRecursive = (comments) => {
        for (let comment of comments) {
          if (comment._id === commentId) {
            comment.commentText = updatedText;
            return true;
          }
          if (comment.replies && comment.replies.length > 0) {
            const found = updateRecursive(comment.replies);
            if (found) return true;
          }
        }
        return false;
      };

      updateRecursive(state.selectedItemComment);
    },
  },
});
export const {
  addCategory,
  addSearch,
  setItems,
  addItems,
  setSelectedItem,
  setSelectedItemComment,
  addItemComment,
  deleteItemComment,
  updateItemComment,
} = videoSlice.actions;
export default videoSlice.reducer;
