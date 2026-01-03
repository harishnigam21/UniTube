import { useEffect, useRef, useState } from "react";
import dummy from "../../assets/videos/dummy.MOV";
import { FaPlay } from "react-icons/fa";
import { FaPause } from "react-icons/fa";
import {
  FaVolumeDown,
  FaVolumeMute,
  FaVolumeOff,
  FaVolumeUp,
} from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";
import { AiOutlineFullscreenExit, AiOutlineFullscreen } from "react-icons/ai";
import { useOutletContext } from "react-router-dom";

export default function Video() {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(0.5);
  const [volumeIcon, setVolumeIcon] = useState(true);
  const [beforeMute, setBeforeMute] = useState(volume);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const { setSidebarToggle } = useOutletContext();
  // Toggle Play/Pause
  const togglePlay = () => {
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };
  const tempField = [
    { icon: "", name: "Like", number: "", work: "" },
    { icon: "", name: "Dislike", number: "", work: "" },
    { icon: "", name: "Share", number: "", work: "" },
    { icon: "", name: "Save", number: "", work: "" },
    { icon: "", name: "Download", number: "", work: "" },
  ];
  useEffect(() => {
    setSidebarToggle((prev) => ({ ...prev, type: "type2", status: false }));
  }, []);
  useEffect(() => {
    if (progress == 100) {
      setIsPlaying(false);
    }
  }, [progress]);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () =>
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  // Called when the video file is first loaded
  const handleLoadedMetadata = () => {
    setDuration(videoRef.current.duration);
  };
  // Update progress bar as video plays
  const handleTimeUpdate = () => {
    const currentProgress =
      (videoRef.current.currentTime / videoRef.current.duration) * 100;
    setProgress(currentProgress);
    setCurrentTime(videoRef.current.currentTime);
  };

  const formatTime = (timeInSeconds) => {
    if (isNaN(timeInSeconds)) return "0:00";
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    const paddedSeconds = seconds < 10 ? `0${seconds}` : seconds;
    if (hours > 0) {
      const paddedMinutes = minutes < 10 ? `0${minutes}` : minutes;
      return `${hours}:${paddedMinutes}:${paddedSeconds}`;
    }
    return `${minutes}:${paddedSeconds}`;
  };
  const toggleFullscreen = () => {
    const container = containerRef.current;
    if (!document.fullscreenElement) {
      if (container.requestFullscreen) {
        container.requestFullscreen();
      } else if (container.webkitRequestFullscreen) {
        container.webkitRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };
  return (
    <section
      className="w-full overflow-scroll text-text flex flex-col gap-4"
      onMouseOver={() =>
        setSidebarToggle((prev) => ({ ...prev, status: false }))
      }
    >
      <article
        className="relative group w-full max-h-[80vh] aspect-video overflow-hidden"
        ref={containerRef}
      >
        <video
          ref={videoRef}
          src={dummy}
          onLoadedMetadata={handleLoadedMetadata}
          onTimeUpdate={handleTimeUpdate}
          onClick={togglePlay} // Click video to play/pause
          className="w-full h-full cursor-pointer"
        />

        {/* CUSTOM CONTROLS OVERLAY */}
        <article className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-bgprimary text-text to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity">
          {/* Progress Bar */}
          <article className="w-full h-1 bg-zinc-600 mb-4 cursor-pointer relative">
            <div
              className="absolute top-0 left-0 h-full bg-red-600"
              style={{ width: `${progress}%` }}
            />
          </article>

          <article className="flex items-center justify-between">
            <article className="flex items-center gap-8">
              <button onClick={togglePlay} className="text-2xl">
                {isPlaying ? (
                  <FaPause className="text-xl text-text" />
                ) : (
                  <FaPlay className="text-xl text-text" />
                )}
              </button>
              <div className="group/volume flex gap-2 items-center text-text rounded-full hover:bg-border p-1.5">
                <div
                  className="relative flex items-center transition-all text-xl icon"
                  onClick={() => {
                    setVolume((prev) => {
                      if (prev == 0) {
                        setVolumeIcon(true);
                        return beforeMute;
                      } else {
                        setVolumeIcon(false);
                        setBeforeMute(prev);
                        return 0;
                      }
                    });
                  }}
                  onMouseOver={() => {}}
                >
                  {volume <= 0 && !volumeIcon ? (
                    <FaVolumeMute />
                  ) : volume <= 0 ? (
                    <FaVolumeOff />
                  ) : volume > 0 && volume < 0.3 ? (
                    <FaVolumeDown />
                  ) : (
                    <FaVolumeUp />
                  )}
                </div>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={volume}
                  onChange={(e) => {
                    const v = e.target.value;
                    setVolume(v);
                    videoRef.current.volume = v;
                  }}
                  className="w-0 h-0.5 accent-white icon opacity-0 group-hover/volume:w-20 group-hover/volume:opacity-100 transition-all"
                />
              </div>
              <div className="flex gap-2 items-center">
                <span>{formatTime(currentTime)}</span>
                <span>/</span>
                <span>{formatTime(duration)}</span>
              </div>
            </article>
            <article className="flex items-center gap-8">
              <div className="icon flex items-center">
                <IoSettingsOutline className="text-xl" />
              </div>
              <div
                className="icon flex items-center"
                onClick={toggleFullscreen}
              >
                {isFullscreen ? (
                  <AiOutlineFullscreenExit />
                ) : (
                  <AiOutlineFullscreen />
                )}
              </div>
            </article>
          </article>
        </article>
      </article>
      {/* THE ACTUAL VIDEO */}

      <article className="grid grid-cols-2 gap-4">
        <article className="flex flex-col gap-4 justify-center">
          <strong className="text-xl">
            Om Mangalam Omkar Mangalam | ॐ मंगलम ओमकार मंगलम | Hemant Chauhan
          </strong>
          <article className="flex justify-between">
            <div className="flex items-center gap-4 justify-between">
              <img
                src="https://yt3.ggpht.com/ytc/AIdro_lyXxJEuIidm_CxZWox1PLz_tnAIA9JWpz4ZnOpNqng8yo=s88-c-k-c0x00ffffff-no-rj"
                alt="refresh"
                className="w-10 h-10 aspect-square rounded-full object-center object-cover"
              />
              <div className="flex flex-col justify-center">
                <p>Gujarati Bhakti Sagar</p>
                <small className="text-txlight">713K subscribers</small>
              </div>
              <button className="rounded-full bg-text text-black py-1 px-4 font-medium">
                Subscribe
              </button>
            </div>
            <div></div>
          </article>
        </article>
      </article>
    </section>
  );
}
