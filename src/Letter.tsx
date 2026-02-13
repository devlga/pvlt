import React from "react";
import Icons from "./components/Icons/Icons";
import { motion } from "motion/react";
import "./App.css";
import useMusicStore from "./components/MusicPlayer/store/useMusicStore";
import MusicPlayer from "./components/MusicPlayer/MusicPlayer";

function Letter() {
  return (
    <>
      <div className="start selection:bg-[#c9184a] selection:text-[#ffccd5] min-w-screen min-h-screen text-[#c9184a] bg-[#ffccd5] flex justify-center pb-40">
        <div>
          <div className="font-bold text-2xl">
            <h1 className="start leading-[128px] text-[#c9184a]">
              Dear <span className="start text-[#333]">Kate</span>,{" "}
            </h1>
          </div>
          <p className="start text-xl leading-[56px] mb-4 max-w-[60ch] text-[#c9184a]">
            This past year with you has been one of the best years in my entire
            life. And the only thing that has really changed is that you came
            into my life.{" "}
          </p>
          <p className="start text-xl leading-[50px] mb-4 max-w-[60ch] text-[#c9184a]">
            Every day that I wake up, I know that I have something and more
            importantly someone to look forward to. Someone who is patient,
            kind, and always there through thick and thin. Someone that I want
            to strive to give the entire world to if I could.
          </p>
          <p className="start text-xl leading-[56px] mb-4 max-w-[60ch] text-[#c9184a]">
            I know recently you struggle with feeling beautiful. You feel like
            your skin isn't as good as it needs to be. You look in the mirror
            and aren't happy with what you see as imperfections. You joke and
            tell me that I should support you in wanting to change, and I
            honestly do if it makes you happy. In my eyes though, I don't see an
            ugly girl with all those imperfections you can think of. What I see
            is the most beautiful girl in the world. The girl I want to spend
            the rest of my life with. The person I'd choose no matter the circumstances.{" "}
          </p>
                    <p className="start text-xl leading-[56px] mb-6 max-w-[60ch] text-[#c9184a]">
To put it in the words of one of my favorite poets :
          </p>
                              <p className="start text-xl leading-[56px] mb-6 max-w-[60ch] text-[#333]">
            <span className="text-[#c9184a]">"</span>In all the world, there is no heart for me like yours. In all the world, there is no love for you like mine<span className="text-[#c9184a]">"</span>
          </p>
                              <p className="start text-xl leading-[56px] mb-6 max-w-[60ch] text-[#c9184a]">
Valentine's Day is made specifically to celebrate the type of person that you are in my life. Someone who will give the world for you as you would give to them. So I guess that leaves me with one last question.
          </p>
                              <p className="start text-xl leading-[56px] mb-6 max-w-[60ch] text-[#c9184a]">
Will you be my Valentine?
          </p>
          <div className="font-bold text-2xl">
            <h2 className="start leading-[56px] text-[#c9184a]">
              Love,{" "}
            </h2>
                        <h2 className="start leading-[56px] text-[#333]">
              Justin{" "}
            </h2>
          </div>
        </div>
      </div>
    </>
  );
}

export default Letter;
