import "./App.css"
import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useSpring, useInView } from 'framer-motion';
const {BASE_URL} = import.meta.env; 
const Message = ({ text, side, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-10% 0px -10% 0px" });

  const isLeft = side === 'left';

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: isLeft ? -50 : 50, scale: 0.9 }}
      animate={isInView ? { opacity: 1, x: 0, scale: 1 } : { opacity: 0, x: isLeft ? -50 : 50, scale: 0.9 }}
      transition={{ 
        type: "spring", 
        stiffness: 100, 
        damping: 15,
        delay: 0.1 
      }}
      className={`flex w-full mb-10 ${isLeft ? 'justify-start' : 'justify-end'} items-end`}
    >
      {side === "left" &&               <img className="aspect-square max-w-15 max-h-15 object-cover rounded-full" src={BASE_URL + '/justin.jpg'} />
}
      <div 
        className={`max-w-[70%] min-w-[80px] p-4 rounded-2xl shadow-md ${
          isLeft 
            ? 'bg-white text-slate-800 rounded-bl-none border border-gray-100 ml-4' 
            : 'bg-[#E54666] text-white rounded-br-none mr-4'
        }`}
      >
        <p className={`text-sm font-medium mb-1 opacity-80 ${isLeft ? "text-left" : "text-right"}`}>
          {isLeft ? 'Tino' : 'Kitkat'}
        </p>
        <p className={`text-lg leading-relaxed ${isLeft ? "text-left" : "text-right"}`}>
          {text}
        </p>
      </div>
{side === "right" &&               <img className="aspect-square max-w-15 max-h-15 object-cover rounded-full" src={BASE_URL + '/kate.jpg'} />
}
    </motion.div>
  );
};

function Chat() {

    const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Mock data representing the chat thread
  const chatMessages = [
    { text: "👋", side: "right" },
    { text: "Hellooo", side: "left" },
    { text: "Kamusta?", side: "left" },
    { text: "magandang umaga justin!", side: "right" },
    { text: "you know how to speak tagalog?", side: "right" },
    { text: "Pwede haha konti lang", side: "left" },
    { text: "Maaga ka nang gumising ha?", side: "left" },
  ];


return (
    <div className="min-h-[175vh] bg-white font-sans selection:bg-[#E54666]">
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-2 bg-[#E54666] origin-left z-50"
        style={{ scaleX }}
      />

      {/* Chat Container */}
      <main className="max-w-3xl mx-auto px-6 pb-40">
<div className="min-h-[80vh] flex justify-center items-center">
              <div className="font-bold text-2xl">
            <h1 className="start leading-[80px] text-[#c9184a]">One year ago, through a twist of fate, their destinies intertwined...</h1> 
          </div>
</div>
        <div className="flex flex-col">
          {chatMessages.map((msg, index) => (
            <Message 
              key={index} 
              text={msg.text} 
              side={msg.side} 
              index={index} 
            />
          ))}
        </div>

      </main>

      {/* Background Decor */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-50 rounded-full blur-3xl opacity-50" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-50 rounded-full blur-3xl opacity-50" />
      </div>
    </div>
  );
}

export default Chat