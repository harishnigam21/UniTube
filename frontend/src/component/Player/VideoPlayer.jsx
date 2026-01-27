/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useRef, useState } from "react";
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
export default function VideoPlayer({ url }) {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  //states manges the progress,volume,duration and others
  const [hasPlayed, setHasPlayed] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(0.5);
  const [volumeIcon, setVolumeIcon] = useState(true);
  const [beforeMute, setBeforeMute] = useState(volume);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  //setting back to initial state when video finished
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

  // formatting video time because video provide use it in seconds
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
  // Toggle Play/Pause
  const togglePlay = () => {
    if (!hasPlayed) {
      // Reset everything for the first time
      videoRef.current.currentTime = 0;
      setHasPlayed(true);
      // Start playing immediately
      videoRef.current.play();
      setIsPlaying(true);
      return; // Exit here so we don't hit the other logic
    }
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };
  //toggle video to fullscreen and vice versa
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
    <article
      className="relative group w-full md:min-h-[80vh] min-h-fit aspect-video overflow-hidden bg-black"
      ref={containerRef}
    >
      <video
        ref={videoRef}
        src={`${import.meta.env.VITE_BACKEND_HOST}/${url}${!hasPlayed ? "#t=5" : ""}`}
        onLoadedMetadata={handleLoadedMetadata}
        onTimeUpdate={handleTimeUpdate}
        onClick={togglePlay} // Click video to play/pause
        className="w-full h-full cursor-pointer"
      />

      {/* CUSTOM CONTROLS OVERLAY */}
      <article className="absolute bottom-0 left-0 right-0 text-white p-4 opacity-0 group-hover:opacity-100 transition-opacity">
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
                <FaPause className="text-xl" />
              ) : (
                <FaPlay className="text-xl" />
              )}
            </button>
            <div className="group/volume flex gap-2 items-center rounded-full hover:bg-border p-1.5">
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
            <div className="icon flex items-center" onClick={toggleFullscreen}>
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
  );
}
