import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import React from 'react'
import { rightImg, watchImg } from '../utils'
import VideoCarousel from './VideoCarousel'

const Highlights = () => {
    useGSAP(()=>{
        gsap.to("#title",{opacity:1,y:0});
        gsap.to(".link",{opacity:1,y:0,duration:1,stagger:0.25});
    },[])
  return (
    <section id='highlights' className='w-screen overflow-hidden h-full sm:py-32 py-20 sm:px-10 px-5 bg-gray-950' style={{backgroundColor:'#101010'}}>
        <div className='screen-max-width'>
            <div className='mb-12 w-full md:flex items-end justify-between'>
                <h1 id='title' className='section-heading'>Get the highlights</h1>
                <div className='flex flex-wrap gap-5 items-end'>
                    <p className='link'>
                        Watch the film
                        <img src={watchImg} alt="watch" className='ml-2'/>
                    </p>
                    <p className='link'>
                        Watch the film
                        <img src={rightImg} alt="right" className='ml-2'/>
                    </p>
                </div>
            </div>
            <VideoCarousel/>
        </div>
    </section>
  )
}

export default Highlights