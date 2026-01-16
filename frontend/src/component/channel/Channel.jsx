import { useEffect } from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useOutletContext, useParams } from "react-router-dom";
import {
  setSelectedChannel,
  updateSelectedChannelSubscribe,
} from "../../store/Slices/channelSlice";
import { BsDot } from "react-icons/bs";
import { formatDateTime, getDaysBetween } from "../../utils/getDate";
import Video from "../repetative/Video";
import useApi from "../../hooks/Api";
import Loading from "../other/Loading";

export default function Channel() {
  const { loading, sendRequest } = useApi();
  const { setSidebarToggle } = useOutletContext();
  const [fieldSelected, setFieldSelected] = useState("home");
  const fieldListed = ["home", "video", "short", "live", "podcast", "playlist"];
  const [showDescription, setShowDescription] = useState(false);
  const params = useParams();
  const dispatch = useDispatch();
  const selectedChannel = useSelector((store) => store.channels.selectedItems);

  useEffect(() => {
    sendRequest(`channel/${params.handler}`, "GET").then((result) => {
      const data = result?.data;
      if (result && result.success) {
        dispatch(setSelectedChannel({ items: data?.data }));
      }
    });
  }, [dispatch, params.handler, sendRequest]);
  useEffect(() => {
    setSidebarToggle((prev) => ({ ...prev, type: "type2", status: false }));
  }, [setSidebarToggle]);
  const handleSubscribe = async () => {
    await sendRequest(`new_subscriber/${selectedChannel._id}`, "PATCH").then(
      (result) => {
        if (result && result.success) {
          dispatch(updateSelectedChannelSubscribe());
        }
      }
    );
  };
  return loading ? (
    <div className="w-screen h-screen flex justify-center items-center">
      <Loading />
    </div>
  ) : selectedChannel ? (
    <section className="flex flex-col gap-8 p-4 text-text">
      {/* banner */}
      <img
        src={`${import.meta.env.VITE_BACKEND_HOST}/${
          selectedChannel.channelBanner
        }`}
        className="w-full h-30 md:h-50 rounded-xl object-center object-cover"
        alt="channel banner"
      />
      {/* channel details */}
      <article className="block clear-both space-x-4 ">
        <img
          src={`${import.meta.env.VITE_BACKEND_HOST}/${
            selectedChannel.channelPicture
          }`}
          className="object-center float-left object-cover rounded-full w-25 h-25 sm:w-40 sm:h-40 self-center aspect-square"
          alt="channel picture"
        />
        <article className="">
          <div className="flex gap-1 text-xl md:text-3xl font-bold font-serif flex-wrap">
            <span>
              {selectedChannel.user.firstname.charAt(0).toUpperCase() +
                selectedChannel.user.firstname.slice(1).toLowerCase()}
            </span>
            <span>
              {selectedChannel.user.middlename.charAt(0).toUpperCase() +
                selectedChannel.user.middlename.slice(1).toLowerCase()}
            </span>
            <span>
              {selectedChannel.user.lastname.charAt(0).toUpperCase() +
                selectedChannel.user.lastname.slice(1).toLowerCase()}
            </span>
          </div>
          <div className="flex flex-wrap text-txlight items-center">
            <span className="flex font-medium text-text whitespace-nowrap basis-full md:basis-0">
              {selectedChannel.channelHandler}
            </span>
            <div className="flex flex-nowrap items-center">
              <BsDot className="mt-1" />
              <span className="font-medium whitespace-nowrap">
                {selectedChannel.subscribers}{" "}
                {selectedChannel.subscribers > 1 ? "subscribers" : "subscriber"}
              </span>
            </div>
            <div className="flex flex-nowrap items-center">
              <BsDot className="mt-1" />
              <span className="font-medium whitespace-nowrap">
                {selectedChannel.totalPosts.length == 0
                  ? 0
                  : selectedChannel.totalPosts[0].count}{" "}
                posts
              </span>
            </div>
          </div>
          <div className="text-txlight">
            <span>{selectedChannel.description.slice(0, 28)}</span>
            <span>
              {showDescription && selectedChannel.description.slice(28)}
            </span>
            <span
              className="font-medium text-text icon"
              onClick={() => setShowDescription((prev) => !prev)}
            >
              {selectedChannel.description.length > 28 && !showDescription
                ? "...more"
                : "...show less"}
            </span>
          </div>
          {selectedChannel.isOwner ? (
            <div className="flex flex-col">
              <p className="text-txlight">
                You created this channel{" "}
                <span className="text-text">
                  {getDaysBetween(formatDateTime(selectedChannel.createdAt))}
                </span>
              </p>
            </div>
          ) : (
            <button
              className="py-1 px-3 w-fit my-4 rounded-full text-bgprimary bg-text font-medium grow icon"
              onClick={handleSubscribe}
            >
              {selectedChannel.isSubscribed ? "unSubscribe" : "Subscribe"}
            </button>
          )}
        </article>
      </article>
      {/* channel posts */}
      <article className="flex flex-col gap-4">
        <article className="flex gap-8 overflow-x-auto noscrollbar w-full border-b border-b-border pb-1">
          {fieldListed.map((item, index) => (
            <strong
              key={`channel/posts/fields/${index}`}
              className={`${
                fieldSelected == item
                  ? "text-text border-b border-b-text"
                  : "text-txlight border-none"
              } icon pb-1.5`}
              onClick={() => setFieldSelected(item)}
            >
              {item.charAt(0).toUpperCase() + item.slice(1).toLowerCase()}
            </strong>
          ))}
        </article>
        <article className="relative">
          {fieldSelected == "home" ? (
            <article className="flex flex-col">
              {fieldListed.map((item, index) => (
                <article
                  key={`channel/posts/fields/express/${index}`}
                  className="flex flex-col"
                >
                  {selectedChannel[item] &&
                    selectedChannel[item].posts.length > 0 && (
                      <article className="flex flex-col gap-4">
                        <strong>{item.toUpperCase()}</strong>
                        <article className="w-full grid grid-cols-1 min-[480px]:grid-cols-2 sm:grid-cols-2 lg:grid-cols-3">
                          {selectedChannel[item].posts.map((item) => (
                            <Video
                              key={`channel/posts/fields/items/${item._id}`}
                              vid={item}
                              type={"channel"}
                            />
                          ))}
                        </article>
                      </article>
                    )}
                </article>
              ))}
              {selectedChannel.totalPosts.length == 0 && (
                <p className="text-center text-red-500 absolute self-center justify-self-center">
                  Nothing to show here
                </p>
              )}
            </article>
          ) : selectedChannel[fieldSelected] &&
            selectedChannel[fieldSelected].posts.length > 0 &&
            selectedChannel._id ? (
            <article className="flex flex-col">
              <article className="w-full grid grid-cols-1 min-[480px]:grid-cols-2 sm:grid-cols-2 lg:grid-cols-3">
                {selectedChannel[fieldSelected].posts.map((item) => (
                  <Video
                    key={`channel/posts/fields/items/inthereSelection/${item._id}`}
                    vid={item}
                    type={"channel"}
                  />
                ))}
              </article>
              {!selectedChannel[fieldSelected].nextCursor && (
                //TODO:Add functionality to load more by fetching API
                <button className="self-center justify-self-center bg-primary rounded-xl text-text py-1 px-3 icon">
                  Load More
                </button>
              )}
            </article>
          ) : (
            <p className="text-center text-red-500">Not Found !</p>
          )}
        </article>
      </article>
    </section>
  ) : (
    <p className="text-center text-xl text-red-500 font-bold font-serif md:text-2xl py-8">
      No Channel Found
    </p>
  );
}
//TODO:Channel Update remaining,create-delete-read completed
