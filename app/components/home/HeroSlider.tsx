"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

const slides = [
  {
    id: 1,
    type: "video",
    title: "PNL",
    subtitle: "Le Monde ou Rien",
    description: "NOUVEAU CLIP",
    content: {
      url: "umF1kfVujhM",
      type: "youtube"
    },
    thumbnail: "https://www.radiofrance.fr/s3/cruiser-production-eu3/2019/04/aa9551af-8fe1-47f0-8e88-2ebc60f44bb0/640x340_870x489_pnl-clip.jpg",
  },
  {
    id: 2,
    type: "image",
    title: "UNDERGROUND FESTIVAL",
    subtitle: "ÉDITION 2025",
    description: "4-5-6 JUILLET",
    content: "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bXVzaWMlMjBmZXN0aXZhbHxlbnwwfHwwfHx8MA%3D%3D",
    thumbnail: "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bXVzaWMlMjBmZXN0aXZhbHxlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    id: 3,
    type: "video",
    title: "FREEZE CORLEONE",
    subtitle: "Designer",
    description: "DERNIER SINGLE",
    content: {
      url: "uM0dQd9VUW4",
      type: "youtube"
    },
    thumbnail: "https://medias.spotern.com/wanted/w640/62/62617-1628511198.jpg",
  },
  {
    id: 4,
    type: "image",
    title: "Kamaleo",
    subtitle: "Rejoins le roadster",
    description: "Publishing",
    content: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPbrRn_DNA0UfW4vTaHJ0LXSI8ybtA3Z8qTQ&s",
    thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPbrRn_DNA0UfW4vTaHJ0LXSI8ybtA3Z8qTQ&s",
  },
  {
    id: 5,
    type: "image",
    title: "Nephi 019 - Mia",
    subtitle: "Nouvelle EP",
    content: "https://i.ytimg.com/vi/NsAH66HWgSQ/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLBTpmc1VVb94KEnOOC8TZDs-CoX2A",
    thumbnail: "https://i.ytimg.com/vi/NsAH66HWgSQ/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLBTpmc1VVb94KEnOOC8TZDs-CoX2A",
  }

 ];

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    setLoaded(true);
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 30000);
    return () => clearInterval(timer);
  }, []);

  if (!loaded) return null;

  const MainContent = () => {
    const slide = slides[currentSlide];

    if (slide.type === "image") {
      return (
        <Image
          src={slide.content as string}
          alt={slide.title}
          fill
          priority
          className="object-cover"
        />
      );
    }

    const videoContent = slide.content as { url: string; type: string };
    if (videoContent.type === "youtube") {
      return (
        <div className="absolute h-full w-full">
          <iframe
            src={`https://www.youtube.com/embed/${videoContent.url}?autoplay=1&controls=0&showinfo=0&rel=0&modestbranding=1&mute=1&loop=1&playlist=${videoContent.url}&enablejsapi=1`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            className="absolute h-[200%] w-[200%] -translate-x-1/4 -translate-y-1/4"
            style={{ border: "none" }}
          />
        </div>
      );
    }

    return (
      <video
        ref={videoRef}
        src={videoContent.url}
        autoPlay
        loop
        muted
        playsInline
        className="h-full w-full scale-150 object-cover"
      />
    );
  };

  return (
    <section className="relative h-screen overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0"
        >
          <MainContent />

          {/* Text Overlay */}
          <div className="absolute inset-0 flex items-center bg-gradient-to-r from-black/60 via-black/30 to-transparent">
            <div className="container mx-auto px-4 md:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-xl"
              >
                <div className="mb-4 inline-flex rounded-full bg-white/10 px-4 py-1 backdrop-blur-sm">
                  <span className="text-sm font-medium text-white">
                    {slides[currentSlide].description}
                  </span>
                </div>

                <h1 className="text-6xl font-bold text-white md:text-7xl lg:text-8xl">
                  {slides[currentSlide].title}
                </h1>
                <h2 className="mt-2 text-4xl font-medium text-white/80 md:text-5xl lg:text-6xl">
                  {slides[currentSlide].subtitle}
                </h2>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="mt-8"
                >
                  <Link
                    href="#"
                    className="group inline-flex items-center gap-2 text-lg text-white"
                  >
                    <span className="border-b-2 border-red-500 pb-1">
                      Découvrir
                    </span>
                    <ChevronRight className="transition-transform group-hover:translate-x-1" />
                  </Link>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Thumbnails */}
      <div className="absolute bottom-8 right-8 z-20 hidden gap-4 md:flex">
        {[...slides.filter((s) => s.id !== slides[currentSlide].id)].map(
          (slide, index) => (
            <motion.div
              key={slide.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 * index }}
              onClick={() =>
                setCurrentSlide(slides.findIndex((s) => s.id === slide.id))
              }
              className="group relative h-32 w-56 cursor-pointer overflow-hidden rounded-lg"
            >
              <Image
                src={slide.thumbnail}
                alt={slide.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/50 transition-opacity group-hover:opacity-30" />
              <div className="absolute bottom-0 p-4">
                <div className="text-sm font-medium text-red-500">
                  {slide.description}
                </div>
                <div className="text-base font-bold text-white">
                  {slide.title}
                </div>
              </div>
            </motion.div>
          )
        )}
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 h-1 w-full">
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 30, ease: "linear" }}
          key={currentSlide}
          className="h-full origin-left bg-red-600"
        />
      </div>
    </section>
  );
}
