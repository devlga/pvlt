import React, { useEffect, useMemo } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useAnimationFrame,
} from "motion/react";
import useMusicStore from "./store/useMusicStore";
import Icons from "../Icons/Icons";
const {BASE_URL} = import.meta.env; 

const variants = {
  closed: {
    borderRadius: 10000000,
    cursor: "pointer",
    padding: 8,
  },
  open: {
    flex: 1,
    justifyContent: "space-between",
    borderRadius: 8,
    position: "fixed",
    bottom: 26,
    right: 24,
    width: 240,
    cursor: "auto",
    padding: 0,
  },
};

export default function MusicPlayer({ ...props }) {
  const {
    showMusicPlayer,
    init,
    cleanup,
    isShowingMusicPlayer,
    currentSong,
    duration,
    currentTime,
    isPlaying,
    play,
    pause,
    playNextSong,
    playLastSong
  } = useMusicStore();

  // 1. Create a motion value to track rotation (starts at 0)
  const rotate = useMotionValue(0);

  // 2. Use the animation frame loop to drive the rotation
  useAnimationFrame((time, delta) => {
    if (isPlaying) {
      // Calculate speed: 360 degrees in 5000ms (5 seconds)
      const speed = 360 / 7000; 
      // Add to the current rotation value
      rotate.set(rotate.get() + delta * speed);
    }
  });


  useEffect(() => {
    init();
    return () => {
      cleanup();
    };
  }, []);

  function onBackClick(){
    rotate.set(0),
    playLastSong()
  }

  function onForwardClick(){
    rotate.set(0);
    playNextSong()
  }

  const content = useMemo(() => {
    if (isShowingMusicPlayer) {
      return (
        <div className="flex flex-row flex-1 relative justify-between items-center">
          <div className="absolute h-full left-[-80px] aspect-square">
            <div className="absolute top-50% h-full w-full border border-white/30 scale-75 z-12 rounded-full" />
            <div className="absolute top-50% h-full w-full bg-white scale-25 z-10 rounded-full" />
            <div className="absolute top-50% h-full w-full bg-white scale-20 z-10 rounded-full inset-shadow-sm/35" />

            {/* 3. Apply the MotionValue to the style prop */}
            <motion.img
              style={{ rotate }} 
              src={BASE_URL + currentSong.imageSrc}
              className="inline-block h-full w-full scale-120 bg-gray-300 rounded-full shadow-sm"
            />
          </div>
          <div className="pl-15 pr-6 py-3 w-full text-gray-500">
            <div className="text-left mb-3">
              <p className="text-sm leading-[14px] mb-[2px]">{currentSong.artist}</p>
              <p className="font-bold leading-[16px] text-baseline text-black">
                {currentSong.title}
              </p>
            </div>
            <div className="w-full h-[6px] bg-gray-300 rounded-full mb-3 overflow-hidden">
              <motion.div
                transition={{ duration: 0.01 }}
                className="h-[6px] bg-[#c9184a]"
                animate={{ width: `${(currentTime / duration) * 100}%` }}
              />
            </div>
            <div className="flex flex-row justify-between items-center">
              <button onClick={onBackClick} className="cursor-pointer">
                <Icons.Rewind />
              </button>
              <button
                onClick={() => {
                  // Simply toggle play/pause; the useAnimationFrame hook handles the rest
                  isPlaying ? pause() : play();
                }}
                className="cursor-pointer text-[#c9184a]"
              >
                {isPlaying ? <Icons.Pause /> : <Icons.Play />}
              </button>
              <button onClick={onForwardClick} className="cursor-pointer">
                <Icons.Forward />
              </button>
            </div>
          </div>
        </div>
      );
    } else {
      return <Icons.Play />;
    }
  }, [
    isShowingMusicPlayer,
    currentSong,
    currentTime,
    duration,
    isPlaying,
    play,
    pause,
    onForwardClick,
    onBackClick,
    rotate, // Added rotate to dependencies
  ]);

  function onClick() {
    showMusicPlayer();
    if (!isShowingMusicPlayer) {
      play();
    }
  }

  return (
    <AnimatePresence mode="popLayout">
      <motion.button
        key={isShowingMusicPlayer ? "open" : "closed"}
        {...props}
        onClick={onClick}
        animate={isShowingMusicPlayer ? "open" : "closed"}
        variants={variants}
        transition={{ type: "spring", bounce: 0, duration: 0.4 }}
        className={`text-${
          isShowingMusicPlayer ? "gray-500" : "[#E54666]"
        } bg-white absolute z-5000 ${
          isShowingMusicPlayer ? "rounded-sm shadow-sm border border-gray-200" : "rounded-full p-2 "
        }`}
      >
        {content}
      </motion.button>
    </AnimatePresence>
  );
}