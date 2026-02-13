import React, { useEffect, useLayoutEffect } from "react";
import Icons from "./components/Icons/Icons";
import { motion } from "motion/react";
import "./App.css";
import useMusicStore from "./components/MusicPlayer/store/useMusicStore";
import MusicPlayer from "./components/MusicPlayer/MusicPlayer";
const {BASE_URL} = import.meta.env; 


function Intro() {
  const showMusicPlayer = useMusicStore((state) => state.showMusicPlayer);
  const isShowingMusicPlayer = useMusicStore(
    (state) => state.isShowingMusicPlayer,
  );

  useLayoutEffect(() => {
          window.scrollTo(0, 0)
    new Image().src  = BASE_URL + "/justin.jpg"
    new Image().src = BASE_URL + "/kate.jpg"
  }, [])


   useEffect(() => {
    if (!isShowingMusicPlayer) {
      // Store the original overflow style to restore it later
      const originalStyle = window.getComputedStyle(document.body).overflow;
      // Set body and html overflow to 'hidden'
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden'; // For consistency across browsers

      // Cleanup function to restore the original style
      return () => {
        document.body.style.overflow = originalStyle;
        document.documentElement.style.overflow = originalStyle;
      };
    }
  }, [isShowingMusicPlayer])

  return (
    <div className="start relative selection:bg-[#c9184a] selection:text-[#ffccd5] min-w-screen min-h-screen text-[#c9184a] bg-[#ffccd5] flex justify-center items-center">
      <div>
        <div className="font-bold text-2xl">
          <div>
            <h1 className="start leading-[80px] inline-block">
              It all started when one American boy{" "}
            </h1>{" "}
            <img
              className="w-15 h-15 ml-4 rounded-full inline-block object-cover outline outline-3 outline-white"
              src={BASE_URL + "/justin.jpg"}
              fetchPriority="high"
            />
            <br />
            <h1 className="start leading-[80px] inline-block">
              {" "}
              met one Filipina girl
            </h1>
            <img
              className="w-15 h-15 mx-4 rounded-full inline-block object-cover outline outline-3 outline-white"
              src={BASE_URL + "/kate.jpg"}
                            fetchPriority="high"

            />
            <h1 className="start leading-[80px] inline-block">...</h1>
          </div>
        </div>
        <div
          className={`flex items-center gap-2 mt-10 ${isShowingMusicPlayer ? "text-transparent" : ""} select-none`}
        >
          Press{" "}
          <div className="inline-block min-w-[40px] min-h-[40px]">
            <MusicPlayer />
          </div>{" "}
          to begin.
        </div>
      </div>
      {isShowingMusicPlayer && <ScrollIndicator />}
    </div>
  );
}

function ScrollIndicator(){
  return <div className="w-10 h-15 rounded-[20px] border border-3 border[#c9184a] absolute bottom-10 left-[calc(50%-20px)] after:absolute after:w-[10px] after:h-[10px] after:rounded-[50%] after:top-[10px] after:left-[calc(50%-5px)] after:bg-[#c9184a] animateScroll ">

  </div>
}

export default Intro;
