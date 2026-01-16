import { useEffect, useState } from "react";
import { IoCloudUpload, IoEnterSharp } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { ImCross } from "react-icons/im";
import { useOutletContext } from "react-router-dom";
import useApi from "../../hooks/Api";
import { useDispatch } from "react-redux";
import { updateSelectedChannelItem } from "../../store/Slices/channelSlice";
export default function UpdatePost({ setShowUpdate, vid, setShowOption }) {
  const dispatch = useDispatch();
  const { setSidebarToggle } = useOutletContext();
  const { loading, sendRequest } = useApi();
  const [showInfo, setShowInfo] = useState({
    status: false,
    message: "",
    color: "white",
  });
  const [postInfo, setPostInfo] = useState({
    channel_id: vid.channel_id,
    category: vid.category,
    tags: Array.isArray(vid.tags) ? vid.tags : [],
    thumbnail: vid.thumbnail,
    description: vid.description,
    details:
      typeof vid.details === "object" &&
      vid.details !== null &&
      !Array.isArray(vid.details)
        ? vid.details
        : {},
  });
  const [preview, setPreview] = useState({
    thumbnail: vid.thumbnail,
  });
  const [previewUrl, setPreviewUrl] = useState("");
  useEffect(() => {
    if (!preview.thumbnail) {
      setPreviewUrl("");
      return;
    }
    if (preview.thumbnail instanceof File) {
      const objectUrl = URL.createObjectURL(preview.thumbnail);
      setPreviewUrl(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    }
    setPreviewUrl(`${import.meta.env.VITE_BACKEND_HOST}/${preview.thumbnail}`);
  }, [preview.thumbnail]);
  const [tag, setTag] = useState("");
  const [detail, setDetail] = useState({ key: "", value: "" });

  const showInfoFunc = (color, message) => {
    setShowInfo({ status: true, message, color });
    setTimeout(() => {
      setShowInfo({ status: false, message: "", color: "" });
    }, 4000);
  };

  const validateData = () => {
    // 1. Identify "dirty" fields (fields that changed from original 'vid')
    const changedFields = Object.keys(postInfo).filter((key) => {
      if (key === "details" || key === "tags") {
        return JSON.stringify(postInfo[key]) !== JSON.stringify(vid[key]);
      }
      return postInfo[key] !== vid[key];
    });

    // 2. Handle the "No Changes" scenario
    if (changedFields.length === 0) {
      showInfoFunc("red", "No changes detected to update.");
      return false;
    }

    // 3. Validate changed fields
    for (const field of changedFields) {
      const value = postInfo[field];

      if (field === "category" && (!value || value.trim() === "")) {
        showInfoFunc("red", "Please select a valid category.");
        return false;
      }

      if (field === "tags") {
        const tagArray = Array.isArray(value)
          ? value
          : value.split(",").filter(Boolean);
        if (tagArray.length === 0) {
          showInfoFunc("red", "At least one tag is required.");
          return false;
        }
      }

      if (field === "thumbnail" && value instanceof File) {
        if (value.size > 5 * 1024 * 1024) {
          showInfoFunc("red", "Thumbnail must be under 5MB.");
          return false;
        }
      }
    }

    return true; // Passed validation
  };
  useEffect(() => {
    setSidebarToggle((prev) => ({ ...prev, type: "type2", status: false }));
  }, [setSidebarToggle]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Only proceed if validateData returns TRUE
    if (!validateData()) {
      return; // Stop the function here
    }
    console.log("validation completed..");
    const data = new FormData();
    data.append("channel_id", postInfo.channel_id);
    // List of fields to check
    const fields = ["category", "tags", "thumbnail", "description", "details"];
    fields.forEach((field) => {
      const currentValue = postInfo[field];
      const originalValue = vid[field];
      const isChanged =
        field === "details" || field === "tags"
          ? JSON.stringify(currentValue) !== JSON.stringify(originalValue)
          : currentValue !== originalValue;
      if (isChanged) {
        // Special handling for specific types
        if (field === "details") {
          data.append(field, JSON.stringify(currentValue));
        } else if (field === "tags" && Array.isArray(currentValue)) {
          // If your backend expects a comma-separated string from FormData
          data.append(field, currentValue.join(","));
        } else {
          data.append(field, currentValue);
        }
      }
    });
    await sendRequest(`post/${vid._id}`, "PATCH", data)
      .then((result) => {
        const data = result?.data;
        showInfoFunc(result.success ? "green" : "red", data.message);
        if (result && result.success) {
          setShowUpdate(false);
          dispatch(updateSelectedChannelItem({ data: data.data }));
          setShowOption(false);
        }
      })
      .finally(() => {
        URL.revokeObjectURL(preview.thumbnail);
      });
  };

  return (
    <section className="fixed overflow-scroll noscrollbar bg-bgprimary z-100 top-0 w-full h-full text-text flex flex-col justify-center gap-4 p-8 md:p-4">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-8 w-full md:w-3/4 xl:w-1/2 self-center"
      >
        {/* 1st row category,tag,details,thumbnail*/}
        <article className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* row category,tag,details */}
          <article className="flex flex-col gap-2">
            {/* category */}
            <article className="whitespace-nowrap flex flex-col items-center w-full">
              <label
                htmlFor="category"
                id="categoryLabel"
                className="bg-bgprimary ml-4 z-2 w-fit self-start after:ml-1"
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
                onChange={(e) =>
                  setPostInfo((prev) => ({
                    ...prev,
                    category: e.target.value,
                  }))
                }
              />
            </article>
            {/* Tags */}
            <article className="whitespace-nowrap flex flex-col items-center w-full">
              <label
                htmlFor="tags"
                id="tagsLabel"
                className="bg-bgprimary ml-4 z-2 w-fit self-start after:ml-1"
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
                className="bg-bgprimary ml-4 z-2 w-fit self-start after:ml-1"
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
          {/* thumbnail */}
          <article className="relative flex gap-2 items-center justify-center">
            <div
              className="relative border border-border w-full h-full min-h-50 rounded-md overflow-hidden bg-cover bg-center"
              style={{
                backgroundImage: previewUrl ? `url(${previewUrl})` : "none",
                backgroundColor: "#1a1a1a",
              }}
            >
              <ImCross
                className="icon absolute top-1 right-1 text-2xl text-red-500"
                onClick={() => {
                  setPostInfo((prev) => ({
                    ...prev,
                    thumbnail: vid.thumbnail,
                  }));
                  setPreview((prev) => ({ ...prev, thumbnail: vid.thumbnail }));
                }}
              />
            </div>
            <div className="absolute bg-bgprimary border border-border min-w-fit p-2 rounded-xl overflow-hidden">
              <label
                htmlFor="postThumbnail"
                id="postThumbnailLabel"
                className="bg-bgprimary ml-4 z-2 w-min self-start after:ml-1 flex items-center icon"
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
                accept="image/png, image/jpeg, image/webp,image/jpg,image/avif"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    setPostInfo((prev) => ({
                      ...prev,
                      thumbnail: file,
                    }));
                    setPreview({
                      thumbnail: file,
                    });
                  }
                }}
              />
            </div>
          </article>
        </article>
        {/* 2nd Row Description */}
        <article className="whitespace-nowrap flex flex-col items-center w-full">
          <label
            htmlFor="pdescription"
            id="pdescriptionLabel"
            className="bg-bgprimary ml-4 z-2 w-fit self-start after:ml-1"
          >
            Post Description
          </label>
          <textarea
            type="text"
            name="pdescription"
            id="pdescription"
            value={postInfo.description}
            className="border border-border rounded-md p-2 -mt-3 w-full"
            placeholder="...."
            onChange={(e) =>
              setPostInfo((prev) => ({ ...prev, description: e.target.value }))
            }
          />
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
            onClick={() => setShowUpdate(false)}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="flex items-center justify-center gap-2 font-medium py-2 px-6 rounded-md border border-border self-center shadow-[0.1px_0.1px_10px_0.1px_#222222_inset] icon"
          >
            <p>Update</p>
            {loading && (
              <p className="w-5 aspect-square rounded-full border-2 border-l-bgprimary border-r-primary border-b-secondary border-t-bgprimary animate-[spin_0.3s_linear_infinite]"></p>
            )}
          </button>
        </div>
      </form>
    </section>
  );
}
