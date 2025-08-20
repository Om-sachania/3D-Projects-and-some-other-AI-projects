import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/all'
import React, { useRef } from 'react'

const GsapBoxAniamtion = () => {
    // GSAP.to METHOD
    // useGSAP(()=>{
    //     gsap.to("#blue-box",{
    //         x:500,
    //         repeat:-1,
    //         yoyo:true,
    //         rotation:360,
    //         duration:2,
    //         ease:"elastic"
    //     })
    // },[])

    // GSAP.fromTo METHOD
    // useGSAP(()=>{
    //     gsap.fromTo("#blue-box",{
    //         x:0,
    //         borderRadius:'0%',
    //         rotation:0
    //     },{
    //         x:800,
    //         repeat:-1,
    //         yoyo:true,
    //         rotation:360,
    //         duration:2,
    //         delay:2,
    //         borderRadius:'100%',
    //         // ease:"elastic"
    //     })
    // },[])

    // GSAP TIMELINE

    // const tl = gsap.timeline({repeat:-1,repeatDelay:1,yoyo:true});

    // useGSAP(()=>{
    //     tl.to("#blue-box",{
    //         x:400,
    //         rotation:360,
    //         borderRadius:'100%',
    //         duration:2,
    //         ease:"back.inOut"
    //     })

    //     tl.to("#blue-box",{
    //         x:800,
    //         rotation:720,
    //         borderRadius:"0%",
    //         ease:"back.inOut",
    //         duration:2
    //     })
    // },[])

    // GSAP STAGGER 

    // useGSAP(()=>{
    //     gsap.to(".blue-box",{
    //         y:250,
    //         // duration:2,
    //         rotation:360,
    //         repeat:-1,
    //         yoyo:true,
    //         borderRadius:'100%',
    //         // stagger:0.5
    //         stagger:{
    //             amount:1.5,
    //             ease:'circ.inOut',
    //             from:'center'
    //         }
    //     })
    // },[])

    // SCROLL TRIGGER GSAP

    
    gsap.registerPlugin(ScrollTrigger);

    const scrollRef = useRef();

    useGSAP(()=>{
        const boxes = gsap.utils.toArray(scrollRef.current.children);

        boxes.forEach((box)=>{
            gsap.to(box,{
                x:800,
                rotation:360,
                borderRadius:'100%',
                scale:0.5,
                scrollTrigger:{
                    trigger:box,
                    start:'bottom bottom',
                    end:'top 10%',
                    scrub:true
                }
            })
        })
    },[])
  return (
    <>
        {/* <div className='h-screen w-full flex gap-5 items-center justify-center'>
            <div className='h-30 w-30 bg-blue-100 blue-box'></div>
            <div className='h-30 w-30 bg-blue-200 blue-box'></div>
            <div className='h-30 w-30 bg-blue-300 blue-box'></div>
            <div className='h-30 w-30 bg-blue-400 blue-box'></div>
            <div className='h-30 w-30 bg-blue-500 blue-box'></div>
            <div className='h-30 w-30 bg-blue-600 blue-box'></div>
            <div className='h-30 w-30 bg-blue-700 blue-box'></div>
        </div> */}
        {/* <button className='border-2 p-3 cursor-pointer' onClick={()=>{
            if(tl.paused()){
                tl.play();
            }else{
                tl.pause();
            }
        }}>Play/Pause</button> */}

        {/* GSAP SCROLL TRIGGER */}
        <div className='h-full w-full bg-amber-200'>
            <h1>Hello</h1>
            <p className='mt-5'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Debitis expedita perspiciatis recusandae ipsam reiciendis corrupti, consequatur laboriosam odit ratione repudiandae quam possimus quia animi aperiam! Quae reprehenderit ratione consequatur? Repellendus.</p>
            <p className='mt-5'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quisquam repellat, quia natus at quidem nesciunt, quas distinctio similique ad doloremque aliquid aliquam ipsam dolores iure odit? Dolorem consequuntur distinctio cupiditate, numquam dolor ullam doloremque rerum voluptates totam, ipsa quasi nobis earum nesciunt explicabo sit error eos dolores possimus. Distinctio ex sint quos consequuntur modi delectus unde sapiente ea ut reprehenderit et, quidem minus eum quis maiores dolores cum, eaque dolorem alias sequi a nemo ipsum incidunt ullam. Iusto, ducimus perferendis!</p>
            <div className='h-screen flex justify-center items-center'>See Scroll Animation Below</div>
            <div className='h-screen w-full flex flex-col gap-8' ref={scrollRef}>
                <div className='h-50 w-50 bg-red-500'></div>
                <div className='h-50 w-50 bg-green-500'></div>
            </div>
            <div className='h-screen w-full'>
            </div>
        </div>
    </>
  )
}

export default GsapBoxAniamtion