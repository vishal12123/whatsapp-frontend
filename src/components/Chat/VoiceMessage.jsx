import { useStateProvider } from "@/context/StateContext";
import React, { useEffect, useRef, useState } from "react";
import WaveSurfer from "wavesurfer.js";
import Avatar from "../common/Avatar";
import { FaPlay, FaStop } from "react-icons/fa";
import { calculateTime } from "@/utils/CalculateTime";
import MessageStatus from "../common/MessageStatus";
import { HOST } from "@/utils/ApiRoutes";

function VoiceMessage({ message }) {
  const [{ currentChatUser, userInfo }] = useStateProvider();
  const audioMessage = useRef(null);
  const waveformRef = useRef(null);
  const waveform = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentPlaybackTime, setCurrentPlaybackTime] = useState(0);
  const [totalDuration, setTotalDuration] = useState(0);

  useEffect(() => {
    if (waveform.current === null) {
      waveform.current = WaveSurfer.create({
        container: waveformRef.current,
        waveColor: "#ccc",
        progressColor: "#4a9eff",
        cursorColor: "#7ae3c3",
        barWidth: 2,
        height: 30,
        responsive: true,
      });

      waveform.current.on("finish", () => {
        setIsPlaying(false);
      });
    }

    return () => {
      if (waveform.current) {
        waveform.current.destroy();
        waveform.current.unAll(); // Remove all event listeners
      }
    };
  }, []);

  useEffect(() => {
    const audioURL = `${HOST}/${message.message}`;
    audioMessage.current = new Audio(audioURL);
    waveform.current.load(audioURL);
    waveform.current.on("ready", () => {
      setTotalDuration(waveform.current.getDuration());
    });

    return () => {
      audioMessage.current.pause(); // Pause audio when component unmounts
    };
  }, [message.message]);

  useEffect(() => {
    const updatePlaybackTime = () => {
      setCurrentPlaybackTime(audioMessage.current.currentTime);
    };

    if (audioMessage.current) {
      audioMessage.current.addEventListener("timeupdate", updatePlaybackTime);
    }

    return () => {
      if (audioMessage.current) {
        audioMessage.current.removeEventListener(
          "timeupdate",
          updatePlaybackTime
        );
      }
    };
  }, []);

  const formatTime = (time) => {
    if (isNaN(time)) return "00:00";

    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);

    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  const handlePlayAudio = () => {
    waveform.current.stop();
    waveform.current.play();
    audioMessage.current.play();
    setIsPlaying(true);
  };

  const handlePauseAudio = () => {
    waveform.current.stop();
    audioMessage.current.pause();
    setIsPlaying(false);
  };

  return (
    <div
      className={`flex items-center gap-5 text-white px-4 pr-2 py-4 text-sm rounded-md ${
        message.senderId === currentChatUser.id
          ? "bg-incoming-background"
          : "bg-outgoing-background"
      }`}
    >
      <div>
        <Avatar type="lg" image={currentChatUser?.profilePicture} />
      </div>
      <div className="cursor-pointer text-xl">
        {!isPlaying ? (
          <FaPlay onClick={handlePlayAudio} />
        ) : (
          <FaStop onClick={handlePauseAudio} />
        )}
      </div>
      <div className="relative">
        <div className="w-60" ref={waveformRef} />
        <div className="text-bubble-meta text-[11px] pt-1 flex justify-between absolute bottom-[-22px] w-full">
          <span>
            {formatTime(isPlaying ? currentPlaybackTime : totalDuration)}
          </span>

          <div className="flex gap-1">
            <span>{calculateTime(message.createdAt)}</span>
            {message.senderId === userInfo.id && (
              <MessageStatus messageStatus={message.messageStatus} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default VoiceMessage;
