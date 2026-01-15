import { useEffect, useState } from "react";
import { IoCloudUpload, IoEnterSharp } from "react-icons/io5";
import { MdDelete } from "react-icons/md";

import { ImCross } from "react-icons/im";

import dummyUpload from "../../assets/images/dummy_upload.jpg";
import { useNavigate } from "react-router-dom";
export default function CreatePost() {
  const navigate = useNavigate();
  const [showInfo, setShowInfo] = useState({
    status: false,
    message: "",
    color: "white",
  });
  const [loader, setLoader] = useState(false);
  const [loading, setLoading] = useState(false);
  const [channel, setChannels] = useState([]);
  const [postInfo, setPostInfo] = useState({
    channel_id: null,
    title: "",
    type: "",
    category: "",
    tags: [],
    thumbnail: "",
    videoURL: "",
    description: "",
    details: {},
  });
  const [tag, setTag] = useState("");
  const [detail, setDetail] = useState({ key: "", value: "" });
  const typeAllowed = [
    "video",
    "Short",
    "playlist",
    "course",
    "live",
    "podcast",
  ];
  const [preview, setPreview] = useState({
    thumbnail: dummyUpload,
    video: dummyUpload,
  });

  const showInfoFunc = (color, message) => {
    setShowInfo({ status: true, message, color });
    setTimeout(() => {
      setShowInfo({ status: false, message: "", color: "" });
    }, 4000);
  };

  const validateData = () => {
    // Title
    if (!postInfo.title || postInfo.title.trim().length < 4) {
      showInfoFunc("red", "Post Title must be at least 4 characters");
      return false;
    }
    // Category
    if (!postInfo.category || postInfo.category.trim().length < 3) {
      showInfoFunc("red", "Post Category must be at least 3 characters");
      return false;
    }
    //type
    if (!typeAllowed.includes(postInfo.type)) {
      showInfoFunc("red", "Not valid type");
      return false;
    }
    //  File Validation (Checking objects, not URLs)
    if (!postInfo.thumbnail || !(postInfo.thumbnail instanceof File)) {
      showInfoFunc("red", "Please select a valid thumbnail file");
      return false;
    }
    if (!postInfo.videoURL || !(postInfo.videoURL instanceof File)) {
      showInfoFunc("red", "Please select a valid Video file");
      return false;
    }
    //  Description
    if (postInfo.description && postInfo.description.length > 500) {
      showInfoFunc("red", "Description too long");
      return false;
    }
    // tags
    if (!postInfo.tags || postInfo.tags.length == 0) {
      showInfoFunc("red", "Atleast one tag required");
      return false;
    }
    //details
    if (!postInfo.details || postInfo.details.length == 0) {
      showInfoFunc("red", "Atleast one detail required");
      return false;
    }
    return true;
  };
  useEffect(() => {
    const getChannels = async () => {
      setLoading(true);
      const url = `${import.meta.env.VITE_BACKEND_HOST}/my_channels`;
      const token = window.localStorage.getItem("acTk");
      try {
        const response = await fetch(url, {
          method: "GET",
          headers: {
            authorization: `bearer ${JSON.parse(token)}`,
            "content-type": "application/json",
          },
          credentials: "include",
        });
        const responseData = await response.json();
        if (response.ok) {
          setChannels(responseData.data);
          if (responseData.data.length == 0) {
            setTimeout(() => {
              navigate("/channel/create");
            }, 2000);
          }
          return;
        }
        alert(responseData.message);
        //TODO:handle for not response ok
      } catch (error) {
        console.log(error.message);
        //TODO:handle popup here for errors
      } finally {
        setLoading(false);
      }
    };
    getChannels();
  }, [navigate]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);
    // Only proceed if validateData returns TRUE
    if (!validateData()) {
      setLoader(false);
      return; // Stop the function here
    }
    console.log("validation completed..");
    try {
      const data = new FormData();
      data.append("channel_id", postInfo.channel_id);
      data.append("title", postInfo.title);
      data.append("type", postInfo.type);
      data.append("category", postInfo.category);
      data.append("tags", postInfo.tags);
      data.append("thumbnail", postInfo.thumbnail);
      data.append("videoURL", postInfo.videoURL);
      data.append("description", postInfo.description);
      data.append("details", JSON.stringify(postInfo.details));
      const url = `${import.meta.env.VITE_BACKEND_HOST}/create_post`;
      const token = window.localStorage.getItem("acTk");
      const response = await fetch(url, {
        method: "POST",
        headers: {
          authorization: `bearer ${token ? JSON.parse(token) : ""}`,
        },
        body: data,
        credentials: "include",
      });
      const responseData = await response.json();
      console.log(responseData.message);
      if (response.ok) {
        setPostInfo({
          channel_id: "",
          title: "",
          type: "",
          category: "",
          tags: [],
          thumbnail: "",
          videoURL: "",
          description: "",
          details: {},
        });
        setPreview({ thumbnail: dummyUpload, video: dummyUpload });
        setTimeout(() => {
          navigate("/post/view");
        }, 4000);
      }
      showInfoFunc(response.ok ? "green" : "red", responseData.message);
    } catch (error) {
      console.log(error);
      showInfoFunc("red", error.message);
    } finally {
      URL.revokeObjectURL(preview.thumbnail);
      URL.revokeObjectURL(preview.video);
      setLoader(false);
    }
  };

  return loading ? (
    <p className="text-center self-center justify-self-center text-red-500 font-bold font-serif">
      Loading...
    </p>
  ) : channel.length > 0 ? (
    <section className="text-text flex flex-col gap-4 p-8 md:p-4">
      <h1 className="text-2xl md:text-3xl text-center font-medium font-serif py-4 md:py-8">
        Create Post
      </h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-8 w-full md:w-3/4 xl:w-1/2 self-center"
      >
        {/* 1st row Title*/}
        <article className="whitespace-nowrap flex flex-col items-center w-full">
          <label
            htmlFor="title"
            id="titleLabel"
            className="bg-bgprimary ml-4 z-2 w-fit self-start after:content-['*'] after:text-red-600 after:ml-1"
          >
            Title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            value={postInfo.title}
            className="border border-border rounded-md p-2 -mt-3 w-full"
            placeholder=""
            aria-required
            onChange={(e) =>
              setPostInfo((prev) => ({ ...prev, title: e.target.value }))
            }
          />
        </article>
        {/* 2nd row type and category*/}
        <article className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* type and category+channel_id */}
          <article className="relative whitespace-nowrap flex flex-col justify-center w-full">
            <p
              id="postTypeLabel"
              className="bg-bgprimary ml-4 z-2 w-fit self-start after:content-['*'] after:text-red-600 after:ml-1"
            >
              Type
            </p>
            <div className="flex flex-wrap gap-3 border-border border -mt-3 rounded-md px-2 pt-5 pb-2">
              {typeAllowed.map((cat) => (
                <label
                  key={cat.toLowerCase()}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <input
                    type="radio"
                    name="postType"
                    value={cat.toLowerCase()}
                    required
                    onChange={(e) =>
                      setPostInfo((prev) => ({
                        ...prev,
                        type: e.target.value,
                      }))
                    }
                    className="w-4 h-4 accent-red-600"
                  />
                  <span className="capitalize">{cat}</span>
                </label>
              ))}
            </div>
          </article>
          <article className="flex flex-col gap-2">
            <article className="whitespace-nowrap flex flex-col items-center w-full">
              <label
                htmlFor="category"
                id="categoryLabel"
                className="bg-bgprimary ml-4 z-2 w-fit self-start after:content-['*'] after:text-red-600 after:ml-1"
              >
                Category
              </label>
              <input
                type="text"
                name="category"
                id="category"
                value={postInfo.category}
                className="border border-border rounded-md p-2 -mt-3 w-full"
                placeholder=""
                aria-required
                onChange={(e) =>
                  setPostInfo((prev) => ({
                    ...prev,
                    category: e.target.value,
                  }))
                }
              />
            </article>
            <article className="whitespace-nowrap flex flex-col items-center w-full">
              <label
                htmlFor="channelID"
                id="channelIDLabel"
                className="bg-bgprimary ml-4 z-2 w-fit self-start after:content-['*'] after:text-red-600 after:ml-1"
              >
                Handler
              </label>
              <select
                className="border border-border rounded-md w-full py-4 -mt-3 bg-bgprimary text-text"
                name="channelID"
                id="channelID"
                onClick={(e) =>
                  setPostInfo((prev) => ({
                    ...prev,
                    channel_id: e.target.value,
                  }))
                }
              >
                <option selected value="none">select</option>
                {channel.map((item, index) => (
                  <option
                    key={`channelHandler/option/${index}`}
                    value={item._id}
                    className=""
                  >
                    {item.channelHandler}
                  </option>
                ))}
              </select>
            </article>
          </article>
        </article>
        {/* 3rd Row thumbnail & video*/}
        <article className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Thumbnail */}
          <article className="relative flex gap-2 items-center justify-center">
            <div
              className="border border-border w-full h-full min-h-50 rounded-md overflow-hidden bg-cover bg-center opacity-10"
              style={{ backgroundImage: `url(${preview.thumbnail})` }}
            ></div>
            <div className="absolute bg-bgprimary border border-border min-w-fit p-2 rounded-xl overflow-hidden">
              <label
                htmlFor="postThumbnail"
                id="postThumbnailLabel"
                className="bg-bgprimary ml-4 z-2 w-min self-start after:content-['*'] after:text-red-600 after:ml-1 flex items-center icon"
              >
                Thumbnail
                <div className="flex items-center px-2">
                  <IoCloudUpload className="text-4xl mt-1" />
                </div>
              </label>
              <input
                className="hidden"
                type="file"
                name="postThumbnail"
                id="postThumbnail"
                accept="image/png, image/jpeg, image/webp,image/jpg"
                onChange={(e) => {
                  setPostInfo((prev) => ({
                    ...prev,
                    thumbnail: e.target.files[0],
                  }));
                  setPreview((prev) => ({
                    ...prev,
                    thumbnail: URL.createObjectURL(e.target.files[0]),
                  }));
                }}
              />
            </div>
          </article>
          {/* Video */}
          <article className="relative flex gap-2 items-center justify-center">
            <div
              className="border border-border w-full h-full min-h-50 rounded-md overflow-hidden bg-cover bg-center opacity-10"
              style={{ backgroundImage: `url(${preview.video})` }}
            ></div>
            <div className="absolute bg-bgprimary border border-border min-w-fit p-2 rounded-xl overflow-hidden">
              <label
                htmlFor="postVideo"
                id="postVideoLabel"
                className="bg-bgprimary ml-4 z-2 w-min self-start after:content-['*'] after:text-red-600 after:ml-1 flex items-center icon"
              >
                Video
                <div className="flex items-center px-2">
                  <IoCloudUpload className="text-4xl mt-1" />
                </div>
              </label>
              <input
                className="hidden"
                type="file"
                name="postVideo"
                id="postVideo"
                accept="video/mp4, video/wav, video/webm,video/mov"
                onChange={(e) => {
                  setPostInfo((prev) => ({
                    ...prev,
                    videoURL: e.target.files[0],
                  }));
                  setPreview((prev) => ({
                    ...prev,
                    video: URL.createObjectURL(e.target.files[0]),
                  }));
                }}
              />
            </div>
          </article>
        </article>
        {/* 4th row tags and details */}
        <article className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Tags */}
          <article className="whitespace-nowrap flex flex-col items-center w-full">
            <label
              htmlFor="tags"
              id="tagsLabel"
              className="bg-bgprimary ml-4 z-2 w-fit self-start after:content-['*'] after:text-red-600 after:ml-1"
            >
              Tag
            </label>
            <div className="relative flex items-center w-full">
              <input
                type="text"
                name="tags"
                id="tags"
                value={tag}
                className="border border-border rounded-md p-2 -mt-3 w-full"
                placeholder="..."
                aria-required
                onChange={(e) => setTag(e.target.value)}
              />
              <div
                className="absolute right-2 icon self-center mb-2.5"
                onClick={() => {
                  if (tag.length > 2 && !postInfo.tags.includes(tag)) {
                    setPostInfo((prev) => ({
                      ...prev,
                      tags: [...prev.tags, tag],
                    }));
                    setTag("");
                  } else {
                    showInfoFunc(
                      "red",
                      "Duplicate or Invalid tag, require minimum 3 character"
                    );
                  }
                }}
              >
                <IoEnterSharp className="text-3xl text-blue-500" />
              </div>
            </div>
            <div className="flex gap-2 flex-wrap pt-2 w-full">
              {postInfo.tags &&
                postInfo.tags.length > 0 &&
                postInfo.tags.map((tg, index) => (
                  <span
                    key={`post/create/listed/tags/${index}`}
                    className="flex gap-2 items-center justify-center border rounded-md border-border py-1 px-2 grow"
                  >
                    <span>{tg}</span>
                    <div
                      className="flex items-center icon"
                      onClick={() =>
                        setPostInfo((prev) => ({
                          ...prev,
                          tags: prev.tags.filter(
                            (item) => item.toLowerCase() != tg.toLowerCase()
                          ),
                        }))
                      }
                    >
                      <ImCross className="text-sm text-red-500 mt-1" />
                    </div>
                  </span>
                ))}
            </div>
          </article>
          {/* Details */}
          <article className="whitespace-nowrap flex flex-col items-center w-full">
            <p
              id="detailLabel"
              className="bg-bgprimary ml-4 z-2 w-fit self-start after:content-['*'] after:text-red-600 after:ml-1"
            >
              Details
            </p>
            <div className="w-full rounded-md pt-3 border border-border -mt-3 flex flex-nowrap">
              <input
                type="text"
                name="detailkey"
                id="detailkey"
                value={detail.key}
                className="border border-border rounded-md p-2 w-full h-fit -mt-3"
                placeholder="key"
                aria-required
                onChange={(e) =>
                  setDetail((prev) => ({ ...prev, key: e.target.value }))
                }
              />
              <strong className="align-middle -translate-y-1 scale-y-200">
                :
              </strong>
              <input
                type="text"
                name="detailvalue"
                id="detailvalue"
                value={detail.value}
                className="border border-border rounded-md p-2 w-full h-fit -mt-3"
                placeholder="value"
                aria-required
                onChange={(e) =>
                  setDetail((prev) => ({ ...prev, value: e.target.value }))
                }
              />
            </div>
            <button
              className="justify-self-start self-start border border-border rounded-md py-0.5 px-2 mt-2 bg-[#2b7fff] text-black font-medium icon"
              onClick={(e) => {
                e.preventDefault();
                const key = detail.key;
                const value = detail.value;
                const isDuplicate = postInfo.details[key];
                if (key.length > 1 && value.length > 1 && !isDuplicate) {
                  setPostInfo((prev) => ({
                    ...prev,
                    details: { ...prev.details, [key]: value },
                  }));
                  setDetail({ key: "", value: "" });
                } else {
                  showInfoFunc(
                    "red",
                    "No Duplicates and Both requires as (key,value) pair"
                  );
                }
              }}
            >
              Add
            </button>
            {Object.entries(postInfo.details).map(
              ([keyName, valueName], index) => (
                <div
                  key={`post/create/listed/details/${keyName}`}
                  className="self-start mt-2 flex flex-wrap gap-3 items-center"
                >
                  <span>{index + 1} :</span>
                  <span>{keyName} </span>
                  <span>- </span>
                  <span>{valueName} </span>
                  <div className="flex items-center icon">
                    <MdDelete
                      className="text-red-500 mt-1"
                      onClick={() => {
                        setPostInfo((prev) => {
                          const newDetails = { ...prev.details };
                          delete newDetails[keyName];
                          return {
                            ...prev,
                            details: newDetails,
                          };
                        });
                      }}
                    />
                  </div>
                </div>
              )
            )}
          </article>
        </article>
        {/*backend information handler */}
        {showInfo.status && (
          <p className={`text-center font-bold text-${showInfo.color}-500`}>
            {showInfo.message}
          </p>
        )}
        {/* submit& cancel button */}
        <div className="flex self-center gap-4">
          <button
            className="font-medium py-2 px-6 rounded-md border border-border icon"
            onClick={() => navigate("/")}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="flex items-center justify-center gap-2 font-medium py-2 px-6 rounded-md border border-border self-center shadow-[0.1px_0.1px_10px_0.1px_#222222_inset] icon"
          >
            <p>Submit</p>
            {loader && (
              <p className="w-5 aspect-square rounded-full border-2 border-l-bgprimary border-r-primary border-b-secondary border-t-bgprimary animate-[spin_0.3s_linear_infinite]"></p>
            )}
          </button>
        </div>
      </form>
    </section>
  ) : (
    <p className="text-center self-center justify-self-center text-red-500 font-bold font-serif">
      No channel found
    </p>
  );
}
