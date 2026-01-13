/* eslint-disable no-unused-vars */
//This in format I should receive data
const channelInDetail = {
  _id: "6965c2ec57d2c6d462b11246",
  channelName: "My Bhajans",
  channelHandler: "@mybhajans",
  channelBanner: "uploads/channelBanner-1768276716432-86600919.jpg",
  channelPicture: "uploads/channelPicture-1768276716440-349155737.jpeg",
  description: "This Channel includes my best and favourite bhajans",
  subscribers: 1,
  createdAt: "2026-01-13T03:58:36.613Z",
  isOwner: true,
  isSubscribed: false,
  user: {
    firstname: "Harish",
    middlename: "",
    lastname: "Nigam",
  },
  totalPosts: [
    {
      count: 1,
    },
  ],
  videos: {
    posts: [
      {
        _id: "6965ca2257d2c6d462b11309",
        user_id: "6960d28a82a6ab7721238ad1",
        channel_id: "6965c2ec57d2c6d462b11246",
        title: "फुलवा के डोरी | माँ के बाजे पैजनिया",
        type: "video",
        category: "music",
        tags: ["bhajans", "durga", "mata", "female", "Alka Chandrakar"],
        thumbnail:
          "https://res.cloudinary.com/db8okew0k/image/upload/v1767603039/Screenshot_2026-01-05_141533_xm3mqp.png",
        videoURL:
          "https://res.cloudinary.com/db8okew0k/video/upload/v1767854470/main_jjuzwq.mov",
        likes: 1,
        dislikes: 0,
        views: 0,
        postedAt: "13-01-2026_09:59:22",
        duration: "00:00:21",
        description: "",
        details: {
          Song: "Fulva Ke Dori",
          Singer: "Alka Chandrakar",
          Director: "Mohan Sundrani",
        },
        createdAt: "2026-01-13T04:29:22.091Z",
        updatedAt: "2026-01-13T04:35:55.980Z",
        __v: 0,
      },
    ],
    nextCursor: null,
  },
  shorts: {
    posts: [],
    nextCursor: null,
  },
  live: {
    posts: [],
    nextCursor: null,
  },
  podcasts: {
    posts: [],
    nextCursor: null,
  },
  playlists: {
    posts: [],
    nextCursor: null,
  },
  communityPosts: {
    posts: [],
    nextCursor: null,
  },
  nextCursor: null,
  posts: [],
};
const PlayerDetails = {
  _id: "6965ca2257d2c6d462b11309",
  user_id: {
    _id: "6960d28a82a6ab7721238ad1",
    firstname: "Harish",
    lastname: "Nigam",
  },
  channel_id: {
    _id: "6965c2ec57d2c6d462b11246",
    channelName: "My Bhajans",
    channelHandler: "@mybhajans",
    channelPicture: "uploads/channelPicture-1768276716440-349155737.jpeg",
    subscribers: 1,
    isSubscribed: false,
  },
  title: "फुलवा के डोरी | माँ के बाजे पैजनिया",
  type: "video",
  category: "music",
  tags: ["bhajans", "durga", "mata", "female", "Alka Chandrakar"],
  thumbnail:
    "https://res.cloudinary.com/db8okew0k/image/upload/v1767603039/Screenshot_2026-01-05_141533_xm3mqp.png",
  videoURL:
    "https://res.cloudinary.com/db8okew0k/video/upload/v1767854470/main_jjuzwq.mov",
  likes: 1,
  views: 0,
  postedAt: "13-01-2026_09:59:22",
  duration: "00:00:21",
  description:
    "फुलवा के डोरी | माँ के बाजे पैजनिया | Best Bhakti Video Song Collection What's App Only - 7049323232",
  details: {
    Song: "Fulva Ke Dori",
    Singer: "Alka Chandrakar",
    Director: "Mohan Sundrani",
  },
  isliked: false,
  isDisLiked: false,
};
const PlayerComment = {
  _id: "6965cb2f57d2c6d462b1135e",
  post_id: "6965ca2257d2c6d462b11309",
  user_id: {
    _id: "6960eac9c10f771db018e025",
    firstname: "Sumeet",
    lastname: "Nigam",
    email: "sumeetnigam18@gmail.com",
  },
  parent_id: null,
  commentText: "Nice one",
  likes: 0,
  dislikes: 0,
  postedAt: "13-01-2026_10:03:51",
  createdAt: "2026-01-13T04:33:51.137Z",
  updatedAt: "2026-01-13T04:33:51.137Z",
  __v: 0,
  replies: [
    {
      _id: "6965cb4957d2c6d462b11376",
      post_id: "6965ca2257d2c6d462b11309",
      user_id: {
        _id: "6960d28a82a6ab7721238ad1",
        firstname: "Harish",
        lastname: "Nigam",
        email: "harishnigam18@gmail.com",
      },
      parent_id: "6965cb2f57d2c6d462b1135e",
      commentText: "Thanks",
      likes: 0,
      dislikes: 0,
      postedAt: "13-01-2026_10:04:17",
      createdAt: "2026-01-13T04:34:17.448Z",
      updatedAt: "2026-01-13T04:34:17.448Z",
      __v: 0,
      replies: [
        {
          _id: "6965cb6257d2c6d462b1138e",
          post_id: "6965ca2257d2c6d462b11309",
          user_id: {
            _id: "6960eac9c10f771db018e025",
            firstname: "Sumeet",
            lastname: "Nigam",
            email: "sumeetnigam18@gmail.com",
          },
          parent_id: "6965cb4957d2c6d462b11376",
          commentText: "Keep it up",
          likes: 0,
          dislikes: 0,
          postedAt: "13-01-2026_10:04:42",
          createdAt: "2026-01-13T04:34:42.097Z",
          updatedAt: "2026-01-13T04:34:42.097Z",
          __v: 0,
          replies: [
            {
              _id: "6965cb7e57d2c6d462b113a6",
              post_id: "6965ca2257d2c6d462b11309",
              user_id: {
                _id: "6960d28a82a6ab7721238ad1",
                firstname: "Harish",
                lastname: "Nigam",
                email: "harishnigam18@gmail.com",
              },
              parent_id: "6965cb6257d2c6d462b1138e",
              commentText: "yaa sure",
              likes: 0,
              dislikes: 0,
              postedAt: "13-01-2026_10:05:10",
              createdAt: "2026-01-13T04:35:10.365Z",
              updatedAt: "2026-01-13T04:35:10.365Z",
              __v: 0,
              replies: [],
            },
          ],
        },
      ],
    },
  ],
};
const channelView = [
  {
    _id: "6965c2ec57d2c6d462b11246",
    channelName: "My Bhajans",
    channelHandler: "@mybhajans",
    channelBanner: "uploads/channelBanner-1768276716432-86600919.jpg",
    channelPicture: "uploads/channelPicture-1768276716440-349155737.jpeg",
    subscribers: 1,
    posts: 1,
  },
  {
    _id: "6965c34757d2c6d462b11252",
    channelName: "Harish Nigam Gyan",
    channelHandler: "@harishnigam_gyan_18",
    channelBanner: "uploads/channelBanner-1768276807648-211155113.png",
    channelPicture: "uploads/channelPicture-1768276807714-176942379.jpeg",
    subscribers: 0,
    posts: 0,
  },
];
