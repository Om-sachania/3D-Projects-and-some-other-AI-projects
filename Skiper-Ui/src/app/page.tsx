"use client";
import ShareButton from "@/components/ui/share-button";
import WrapButton from "@/components/ui/wrap-button";
import {
  Camera,
  Facebook,
  Github,
  GlassWater,
  Instagram,
  Youtube,
} from "lucide-react";
import React from "react";
import FlipLink from "../components/ui/text-effect-flipper";
import { TextScroll } from "../components/ui/text-scroll";
import ThemeToggleButton from '../components/ui/theme-toggle-button'

const page = () => {
  const shareLinks = [
    {
      icon: Facebook,
      href: "https://www.facebook.com/",
      label: "Facebook",
    },
    {
      icon: Instagram,
      href: "https://www.instagram.com/",
      label: "Instagram",
    },
    {
      icon: Youtube,
      href: "https://www.youtube.com/",
      label: "Youtube",
    },
  ];
  return (
    <>
      {/* <div>
        <WrapButton href="https://sendbird.com/ai-agent">
          <Camera className="animate-spin" />
          Explore Now
        </WrapButton>
        <ShareButton links={shareLinks}>Share</ShareButton>
      </div> */}
      {/* FLIP TEXT COMPONENT :
      <div>
        <FlipLink href="https://github.com/">Github</FlipLink>
        <FlipLink href="https://github.com/">Youtube</FlipLink>
        <FlipLink href="https://github.com/">Instagram</FlipLink>
      </div> */}

      {/* TEXT SCROLL COMPONENT : */}
      {/* <div className="h-screen"> 
      </div>
      <div className="h-screen border-t-2 flex items-center">
        <TextScroll text="UI Skipper" default_velocity={3} className="text-5xl font-bold"></TextScroll>
      </div>
      <div className="h-screen border-t-2">
      </div> */}

      {/* TOGGLE ANIMATION */}
      <div>
      <ThemeToggleButton variant="gif" url="https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExbDI0OXJrMHVkajQ3d2xhM2Zla2k0YTVpczd3aGppdGIyeDYycnFudSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/7TJXK0wFlYVeJYk3yH/giphy.gif"/>
      </div>
    </>
  );
};

export default page;
