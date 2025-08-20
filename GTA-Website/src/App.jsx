import React, { useState } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import "remixicon/fonts/remixicon.css"

function App() {
  const [showContent,setShowContent] = useState(false)
  useGSAP(()=>{
    const tl = gsap.timeline();

    tl.to(".vi-mask-group",{
      rotate:20,
      ease:"Power4.easeInOut",
      transformOrigin: "50% 50%",
      duration : 2
    }).to(".vi-mask-group",{
      scale:10,
      delay:-1.8,
      ease:"Expo.easeInOut",
      opacity:0,
      transformOrigin: "50% 50%",
      duration : 2,
      onUpdate: function(){
        if(this.progress() >=0.9){
          document.querySelector(".svg").remove();
          setShowContent(true);
          this.kill()
        }
      }
    })
  })

  useGSAP(()=>{
    if(!showContent) return

    gsap.to(".main",{
      scale:1,
      rotate:0,
      duration:2,
      delay:-1,
      ease:"Expo.easeInOut"
    })

    gsap.to(".sky",{
      scale:1.4,
      rotate:0,
      duration:2,
      delay:-0.8,
      ease:"Expo.easeInOut"
    })

    gsap.to(".bg",{
      scale:1.2,
      rotate:0,
      duration:2,
      delay:-0.8,
      ease:"Expo.easeInOut"
    })

    gsap.to(".character",{
      scale:0.8,
      x:"-50%",
      bottom:"-40%",
      rotate:0,
      duration:2,
      delay:-0.8,
      ease:"Expo.easeInOut"
    })

    gsap.to(".text",{
      scale:1,
      rotate:0,
      duration:2,
      delay:-0.8,
      ease:"Expo.easeInOut"
    })

    const main = document.querySelector('.main');
    main?.addEventListener("mousemove",(e)=>{
      const xMove = (e.clientX / window.innerWidth - 0.3)*30;
      console.log(xMove)
      gsap.to(".main .text",{
        x:`${xMove*0.3}%`
      })
      gsap.to(".sky",{
        x:`${xMove}%`
      })
      gsap.to(".bg",{
        x:`${xMove*0.5}%`
      })
    })
  },[showContent])
  return (
    <>
      <div className="svg flex items-center justify-center fixed top-0 left-0 z-[100] w-full h-screen overflow-hidden bg-[#000]">
        <svg viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice">
          <defs>
            <mask id="viMask">
              <rect width="100%" height="100%" fill="black" />
              <g className="vi-mask-group">
                <text
                  x="50%"
                  y="50%"
                  fontSize="250"
                  textAnchor="middle"
                  fill="white"
                  dominantBaseline="middle"
                  fontFamily="Arial Black"
                >
                  VI
                </text>
              </g>
            </mask>
          </defs>
          <image
            href="./bg.png"
            width="100%"
            height="100%"
            preserveAspectRatio="xMidYMid slice"
            mask="url(#viMask)"
          />
        </svg>
      </div>
      {showContent && (
        <div className="main w-full rotate-[-15deg] scale-[1.7]">
          <div className="landing overflow-hidden relative w-full h-screen bg-black">
            <div className="navbar absolute top-0 left-0 z-[10] w-full px-10 py-10 ">
              <div className="logo flex gap-6">
                <div className="lines flex flex-col gap-2">
                  <div className="line w-12 h-1 bg-white"></div>
                  <div className="line w-9 h-1 bg-white"></div>
                  <div className="line w-6 h-1 bg-white"></div>
                </div>
                <h3 className="text-white -mt-[8px] leading-none text-4xl">Rockstar</h3>
              </div>
            </div>
            <div className="imagesDiv overflow-hidden w-full h-screen relative">
              <img className="w-full sky h-full object-cover absolute top-0 left-0 scale-[2.4] rotate-[-20deg]" src="./sky.png" alt="" />
              <img className="w-full bg h-full object-cover absolute top-0 left-0 scale-[1.8] rotate-[-5deg]" src="./bg.png" alt="" />
              <div className="text text-white leading-none flex flex-col gap-3 top-15 left-1/3 absolute scale-[1.4] rotate-[-10deg]">
                <h1 className="text-[11rem] -ml-35">grand</h1>
                <h1 className="text-[11rem] ml-20">theft</h1>
                <h1 className="text-[11rem] -ml-35">auto</h1>
              </div>
              <img src="./girlbg.png" alt="" className="absolute character -bottom-[165%] left-1/2 -translate-x-1/2 scale-[2.5] rotate-[-20deg]"/>
            </div>
            <div className="btmbar text-white absolute bottom-0 left-0 w-full px-10 py-10 bg-gradient-to-t from-black to-transparent">
              <div className="flex gap-4 items-center">
                <i className="text-3xl ri-arrow-down-line"></i>
                <h3 className="text-xl font-[Helvetica_Now_Display]">Scroll Down</h3>
              </div>
              <img className="absolute h-[60px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" src="./ps5.png" alt="" />
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default App
