import { useState } from "react";
import {
  IoCloudUpload,
  IoEnterSharp,
  IoCheckmarkCircleSharp,
} from "react-icons/io5";
import dummyUpload from "../../assets/images/dummy_upload.jpg";
import { useDispatch } from "react-redux";
import { updateChannel } from "../../store/Slices/userSlice";
import { useNavigate } from "react-router-dom";
export default function CreateChannel() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showInfo, setShowInfo] = useState({
    status: false,
    message: "",
    color: "white",
  });
  const [loader, setLoader] = useState(false);
  const [handlerAvailability, setHandlerAvailability] = useState(false);
  const [channelName, setChannelName] = useState("");
  const [channelHandler, setChannelHandler] = useState("");
  const [channelBanner, setChannelBanner] = useState(null);
  const [channelPicture, setChannelPicture] = useState(null);
  const [preview, setPreview] = useState({
    banner: dummyUpload,
    picture: dummyUpload,
  });
  const [channelDescription, setChannelDescription] = useState("");

  const showInfoFunc = (color, message) => {
    setShowInfo({ status: true, message, color });
    setTimeout(() => {
      setShowInfo({ status: false, message: "", color: "" });
    }, 4000);
  };
  const validateHandler = (name) => {
    const HANDLER_REGEX = /^@[a-z0-9._-]{3,30}$/;
    if (!name.startsWith("@")) {
      showInfoFunc("red", "Handler must start with @");
      return false;
    }
    // ... (other checks)
    if (!HANDLER_REGEX.test(name)) {
      showInfoFunc("red", "Invalid characters in handler");
      return false;
    }
    return true;
  };

  const validateData = () => {
    // 1. Channel Name
    if (!channelName || channelName.trim().length < 4) {
      showInfoFunc("red", "Channel name must be at least 4 characters");
      return false;
    }

    // 2. File Validation (Checking objects, not URLs)
    if (!channelPicture || !(channelPicture instanceof File)) {
      showInfoFunc("red", "Please select a valid Profile picture file");
      return false;
    }
    if (!channelBanner || !(channelBanner instanceof File)) {
      showInfoFunc("red", "Please select a valid Banner image file");
      return false;
    }

    // 3. Description
    if (channelDescription && channelDescription.length > 500) {
      showInfoFunc("red", "Description too long");
      return false;
    }

    // 4. Handler (Call the function and return its result)
    return validateHandler(channelHandler);
  };

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
      data.append("channelName", channelName);
      data.append("channelHandler", channelHandler);
      data.append("channelBanner", channelBanner);
      data.append("channelPicture", channelPicture);
      data.append("channelDescription", channelDescription);
      const url = `${import.meta.env.VITE_BACKEND_HOST}/create_channel`;
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
      if (response.ok) {
        dispatch(updateChannel({ id: responseData.data }));
        setHandlerAvailability(false);
        setChannelName("");
        setChannelHandler("");
        setChannelDescription("");
        setChannelBanner(null);
        setChannelPicture(null);
        setPreview({ banner: dummyUpload, picture: dummyUpload });
        setTimeout(() => {
          navigate("/channel/view");
        }, 4000);
      }
      showInfoFunc(response.ok ? "green" : "red", responseData.message);
    } catch (error) {
      console.log(error);
      showInfoFunc("red", error.message);
    } finally {
      URL.revokeObjectURL(preview.banner);
      URL.revokeObjectURL(preview.picture);
      setLoader(false);
    }
  };
  const checkhandlerAvailabilty = async (e) => {
    e.preventDefault();
    setLoader(true);
    if (!validateHandler(channelHandler)) {
      setLoader(false);
      return;
    }
    try {
      const url = `${
        import.meta.env.VITE_BACKEND_HOST
      }/validatehandler/${channelHandler}`;
      const token = window.localStorage.getItem("acTk");
      const response = await fetch(url, {
        method: "GET",
        headers: {
          authorization: `bearer ${token ? JSON.parse(token) : ""}`,
        },
        credentials: "include",
      });
      const responseData = await response.json();
      showInfoFunc(response.ok ? "green" : "red", responseData.message);
      setHandlerAvailability(responseData.status);
    } catch (error) {
      showInfoFunc("red", error.message);
    } finally {
      setLoader(false);
    }
  };
  return (
    <section className="text-text flex flex-col gap-4 p-2 md:p-4">
      <h1 className="text-2xl md:text-3xl text-center font-medium font-serif py-4 md:py-8">
        Create Channel
      </h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-8 w-full md:w-3/4 xl:w-1/2 self-center"
      >
        {/* 1st row */}
        <article className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* channel name */}
          <article className="whitespace-nowrap flex flex-col items-center w-full">
            <label
              htmlFor="cname"
              id="cnameLabel"
              className="bg-bgprimary ml-4 z-2 w-fit self-start after:content-['*'] after:text-red-600 after:ml-1"
            >
              Channel Name
            </label>
            <input
              type="text"
              name="cname"
              id="cname"
              value={channelName}
              className="border border-border rounded-md p-2 -mt-3 w-full"
              placeholder=""
              aria-required
              onChange={(e) => setChannelName(e.target.value)}
            />
          </article>
          {/* channel handler */}
          <article className="relative whitespace-nowrap flex flex-col items-center justify-center w-full">
            <label
              htmlFor="chandler"
              id="chandlerLabel"
              className="bg-bgprimary ml-4 z-2 w-fit self-start after:content-['*'] after:text-red-600 after:ml-1"
            >
              Channel Handler
            </label>
            <input
              type="text"
              name="chandler"
              id="chandler"
              value={channelHandler}
              className="border border-border rounded-md p-2 -mt-3 w-full"
              placeholder="@...."
              aria-required
              onChange={(e) => {
                setChannelHandler(e.target.value);
                setHandlerAvailability(false);
              }}
            />
            <div className="absolute right-2 mt-3">
              {handlerAvailability ? (
                <IoCheckmarkCircleSharp
                  title="available"
                  className="text-green-500 text-2xl icon"
                />
              ) : (
                <IoEnterSharp
                  title="check handler availability"
                  className="text-tertiary text-2xl icon"
                  onClick={checkhandlerAvailabilty}
                />
              )}
            </div>
          </article>
        </article>
        {/* 2nd row */}
        <article className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* channel picture */}
          <article className="flex w-full max-w-full gap-2 items-center">
            <div
              style={{ backgroundImage: `url(${preview.picture})` }}
              className={`border border-border w-full min-w-20 max-w-50 aspect-square rounded-full bg-cover bg-center opacity-10`}
            ></div>
            <div className="border border-border min-w-fit p-2 rounded-xl overflow-hidden">
              <label
                htmlFor="cpicture"
                id="cpictureLabel"
                className="bg-bgprimary ml-4 z-2 w-min self-start after:content-['*'] after:text-red-600 after:ml-1 flex items-center icon"
              >
                Channel Picture
                <div className="flex items-center px-2">
                  <IoCloudUpload className="text-4xl mt-1" />
                </div>
              </label>
              <input
                className="hidden"
                type="file"
                name="cpicture"
                id="cpicture"
                accept="image/png, image/jpeg, image/webp,image/jpg"
                onChange={(e) => {
                  setChannelPicture(e.target.files[0]);
                  setPreview((prev) => ({
                    ...prev,
                    picture: URL.createObjectURL(e.target.files[0]),
                  }));
                }}
              />
            </div>
          </article>
          {/* channel banner */}
          <article className="relative flex gap-2 items-center justify-center">
            <div
              className="border border-border w-full h-full min-h-50 rounded-md overflow-hidden bg-cover bg-center opacity-10"
              style={{ backgroundImage: `url(${preview.banner})` }}
            ></div>
            <div className="absolute bg-bgprimary border border-border min-w-fit p-2 rounded-xl overflow-hidden">
              <label
                htmlFor="cbanner"
                id="cbannerLabel"
                className="bg-bgprimary ml-4 z-2 w-min self-start after:content-['*'] after:text-red-600 after:ml-1 flex items-center icon"
              >
                Channel Banner
                <div className="flex items-center px-2">
                  <IoCloudUpload className="text-4xl mt-1" />
                </div>
              </label>
              <input
                className="hidden"
                type="file"
                name="cbanner"
                id="cbanner"
                accept="image/png, image/jpeg, image/webp,image/jpg"
                onChange={(e) => {
                  setChannelBanner(e.target.files[0]);
                  setPreview((prev) => ({
                    ...prev,
                    banner: URL.createObjectURL(e.target.files[0]),
                  }));
                }}
              />
            </div>
          </article>
        </article>
        {/* 3rd row */}
        {/* channel description */}
        <article className="whitespace-nowrap flex flex-col items-center w-full">
          <label
            htmlFor="cdescription"
            id="cdescriptionLabel"
            className="bg-bgprimary ml-4 z-2 w-fit self-start after:ml-1"
          >
            Channel Description
          </label>
          <textarea
            type="text"
            name="cdescription"
            id="cdescription"
            value={channelDescription}
            className="border border-border rounded-md p-2 -mt-3 w-full"
            placeholder="...."
            onChange={(e) => setChannelDescription(e.target.value)}
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
          <button className="font-medium py-2 px-6 rounded-md border border-border icon" onClick={()=>navigate('/')}>
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
  );
}
