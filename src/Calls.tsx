import React from 'react'
import Icons from './components/Icons/Icons'
import { motion } from "motion/react"
import "./App.css"
import useMusicStore from './components/MusicPlayer/store/useMusicStore'
import MusicPlayer from './components/MusicPlayer/MusicPlayer'



function Calls() {

  return (
<>
    <div className="start selection:bg-[#c9184a] selection:text-[#ffccd5] min-w-screen min-h-screen text-[#c9184a] bg-[#ffccd5] flex justify-center items-center">
        <div>
          <div className="font-bold text-2xl">
            <h1 className="start leading-[128px] text-[#c9184a]">It wasn't long before they fell in love...</h1> 
          </div>
        </div>
      </div>
        <div className="start selection:bg-[#c9184a] selection:text-[#ffccd5] min-w-screen min-h-screen text-[#c9184a] bg-white flex justify-center items-center">
        <div>
          <div className="font-bold text-2xl">
            <h1 className="start leading-[128px] text-[#c9184a]">Here are some of their highlights... </h1> 
          </div>
        </div>
      </div> 
</>
  )
}

export default Calls;