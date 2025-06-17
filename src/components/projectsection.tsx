"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  Box,
  Typography,
  Button,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import { GitHub } from "@mui/icons-material";
import Masonry from "@mui/lab/Masonry";
import { motion } from "framer-motion";

const projectData = [
  {
    title: "Smart Inventory Management",
    image:
      "https://firebasestorage.googleapis.com/v0/b/carbuyingapp-4883c.appspot.com/o/Screenshot%202025-06-07%20114453.png?alt=media&token=4d49a00e-3ab6-4491-b891-24f9b014bfdb",
    liveLink: "https://smart-inventory-management-nu.vercel.app/",
    githubLink: "https://github.com/user/nftsite",
    variant: "landscape",
    tech: ["NextJS", "Typescript", "NeonDB", "NextAuth"],
    description:[
      "A web application for managing inventory with real-time updates, AI-Bot integration, and advanced analytics.",
    ]
  },
  {
    title: "Car Buying App",
    image:
      "https://firebasestorage.googleapis.com/v0/b/carbuyingapp-4883c.appspot.com/o/post%20(1).png?alt=media&token=6eba8c3f-3313-4fc0-85b2-21a8dae12663",
    liveLink: "NA",
    githubLink: "https://github.com/OZA-PRATHAM-15/Autorizz-Carbuying-App",
    variant: "portrait",
    tech: ["Flutter", "Dart", "Firebase"],
    description: [
      "A mobile application for buying cars with basic Analytics.",
    ]
  },
  {
    title: "CarPooling App",
    image:
      "https://firebasestorage.googleapis.com/v0/b/carbuyingapp-4883c.appspot.com/o/Music%20App%20Instagram%20Post1.jpg?alt=media&token=c56c8dcb-9022-40e2-8092-000364a0c2f5",
    liveLink: "NA",
    githubLink: "https://github.com/pratham-mody/Formula-C",
    variant: "portrait",
    tech: ["Flutter", "Firebase", "Dart", "Google Maps API"],
    description: [
      "A mobile application for carpooling with real-time car finding algorithm and ride matching.",
    ]
  },
  {
    title: "Car Dealership Website",
    image:
      "https://firebasestorage.googleapis.com/v0/b/carbuyingapp-4883c.appspot.com/o/Screenshot%202025-06-08%20124614.png?alt=media&token=f2d5087c-6433-4860-a8d4-d64ca1cd2306",
    liveLink: "NA",
    githubLink: "https://github.com/user/ecommerce",
    variant: "landscape",
    tech: ["ReactJS", "NodeJS", "MongoDB", "Express"],
    description: [
      "A full-stack web application for car dealership with AI-Bot integration, real-time chats, advanced analytics, and user-friendly interface.",
    ]
  },

  {
    title: "Student Performance Predictor",
    image:
      "https://firebasestorage.googleapis.com/v0/b/carbuyingapp-4883c.appspot.com/o/Screenshot%202025-06-15%20173831.png?alt=media&token=337489f5-9785-4b58-8f12-2f18f05bc77b",
    liveLink: "NA",
    githubLink: "https://github.com/OZA-PRATHAM-15/Predicting-Student-Performance-Using-Machine-Learning",
    variant: "landscape",
    tech: ["Python", "Flask", "Machine Learning", "Jupyter Notebook"],
    description: [
      "A machine learning project that predicts student performance based on various factors.",
    ]
  },

  {
    title:"Ecommerce-Frontend",
    image:"https://firebasestorage.googleapis.com/v0/b/carbuyingapp-4883c.appspot.com/o/ss.jpg?alt=media&token=7830a82b-1ccd-4c9a-bce4-bd41d203ed43",
    liveLink: "https://nextjs-ecommerce-frontend.netlify.app/",
    githubLink: "https://github.com/OZA-PRATHAM-15/Ecommerce-Frontend",
    variant: "landscape",
    tech: ["NextJS", "TailwindCSS","Docker"],
    description: [
      "A frontend application for an e-commerce platform for enhancing user experience.",
    ]
  }
];

export default function ProjectSection(): React.ReactElement {
  const isMobileOrTabletPortrait = useMediaQuery("(max-width: 1000px)");
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const intervalRef = useRef<number | null>(null); 
  const [activeIndex, setActiveIndex] = useState(0);
  const [overlayVisible, setOverlayVisible] = useState<number | null>(null);
  const [isPaused, setIsPaused] = useState(false); 
  const directionRef = useRef(1); 
  const currentIndexRef = useRef(activeIndex);

  const slidesPerView = 3;
  const stepsPossible = Math.max(1, projectData.length - slidesPerView + 1);

  const startAutoScroll = useCallback(() => {
    if (!scrollContainerRef.current) return;
    const container = scrollContainerRef.current;
    const cardWidth = 440 + 32;

    intervalRef.current = window.setInterval(() => {
      if (
        currentIndexRef.current + directionRef.current >= stepsPossible
      ) {
        directionRef.current = -1;
      } else if (currentIndexRef.current + directionRef.current < 0) {
        directionRef.current = 1;
      }
      currentIndexRef.current += directionRef.current;
      container.scrollTo({
        left: currentIndexRef.current * cardWidth,
        behavior: "smooth",
      });
      setActiveIndex(currentIndexRef.current % projectData.length);
    }, 2000);
  }, [stepsPossible, projectData.length]);

  useEffect(() => {
    currentIndexRef.current = activeIndex;
    if (isPaused) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }
    startAutoScroll();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPaused, startAutoScroll, activeIndex]);

  return (
    <Box sx={{ px: { xs: 2, md: 10 }, py: 8 }}>
      <Typography
        variant="h4"
        mb={4}
        textAlign="center"
        color="black"
        sx={{ fontFamily: '"Poppins", sans-serif' }}
      >
        Project Showcase
      </Typography>

      {!isMobileOrTabletPortrait ? (
        <>
          <Box
            ref={scrollContainerRef}
            sx={{
              display: "flex",
              overflowX: "auto",
              scrollSnapType: "x mandatory",
              WebkitOverflowScrolling: "touch",
              gap: 1.4,
              px: 2,
              py: 2,
              minWidth: "calc(400px * 3)",
              scrollbarWidth: "none",
              "&::-webkit-scrollbar": { display: "none" },
            }}
          >
            {projectData.map((project, index) => (
              <Box
                key={index}
                onMouseEnter={() => setIsPaused(true)} 
                onMouseLeave={() => setIsPaused(false)} 
                sx={{
                  scrollSnapAlign: "start",
                  flex: "0 0 auto",
                  overflow: "hidden",
                  position: "relative",
                  cursor: "pointer",
                  display: "flex",
                  flexDirection: "column",
                width: {
                  xs: "280px",
                  sm: "300px",
                  md: "350px",
                  lg: "440px",   
                },
                  maxHeight: "1000px",
                  border: "2px solid transparent",
                  backgroundImage: "linear-gradient(#fff, #fff), linear-gradient(45deg, #000000, #444444)",
                  backgroundOrigin: "border-box",
                  backgroundClip: "content-box, border-box",
                  boxShadow: "0px 4px 20px rgba(0,0,0,0.1)",
                  transition: "transform 0.4s ease, box-shadow 0.4s ease",
                  ":hover": {
                    transform: "scale(1.01)",
                    boxShadow: "0px 8px 30px rgba(0,0,0,0.2)",
                  },
                }}
              >
                <Box
                  component="img"
                  src={project.image}
                  alt={project.title}
                  sx={{
                    width: "100%",
                    height: "100%",
                    maxHeight: "220px",    
                    objectFit: "cover",
                    display: "block",
                  }}
                />
                <Box
                  sx={{
                    p: 1.5,
                    flexGrow: 1.5,
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Typography variant="h6" fontWeight={600} mb={1.5}>
                    {project.title}
                  </Typography>

                  <Typography variant="body2" mb={3} sx={{ textAlign: "justify" }}>
                    {project.description?.map((desc, i) => (
                      <span key={i}>
                        {desc}
                        {i < project.description.length - 1 && <br />}
                      </span>
                    ))}
                  </Typography>
                
                  <Box
                    sx={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: 1,
                      mb: 3,
                    }}
                  >
                    {project.tech?.map((tech, i) => (
                      <Box
                        key={i}
                        sx={{
                          px: 1.2,
                          py: 0.7,
                          fontSize: "0.80rem",
                          border: "1px solid #000",
                          borderRadius: "9999px",
                          bgcolor: "#f9f9f9",
                        }}
                      >
                        {tech}
                      </Box>
                    ))}
                  </Box>
                  
                  <Box
                    sx={{
                      mt: "auto",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    {project.liveLink !== "NA" ? (
                      <Button
                        href={project.liveLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        variant="contained"
                      >
                        Visit
                      </Button>
                    ) : (
                      <Typography variant="caption" sx={{ fontStyle: "italic", mb: 0 }}>
                        {"No live demo – Take things in your own hands and check out the code!"}
                      </Typography>
                    )}
                    <IconButton
                      href={project.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <GitHub />
                    </IconButton>
                  </Box>
                </Box>
              </Box>
            ))}
          </Box>

            <Box
              mt={4}
              display="flex"
              justifyContent="center"
              alignItems="center"
              gap={2}
            >
              {Array.from({ length: stepsPossible }).map((_, idx) => (
                <motion.div
                  key={idx}
                  animate={{
                    width: activeIndex === idx ? 20 : 8,
                    backgroundColor: activeIndex === idx ? "#3B82F6" : "#ccc",
                  }}
                  transition={{ duration: 0.3 }}
                  style={{
                    height: 8,
                    borderRadius: 4,
                  }}
                ></motion.div>
              ))}
            </Box>
        </>
      ) : (
      <Masonry
          columns={2}
          spacing={1}
          sx={{
            px: 0,
            width: "100%",
            maxWidth: "900px",
            margin: "0 auto",
          }}
        >
        {projectData.map((project, index) => (
          <Box
            key={index}
            sx={{
              position: "relative",
              borderRadius: "10px",
              width: "100%",
              maxWidth: "1000px",
              overflow: "hidden",
              boxSizing: "border-box",
              border: '2px solid rgba(255,255,255,0.1)',
              backgroundImage: 'linear-gradient(to bottom right, #1a1a1a, #2e2e2e)',
              cursor: 'pointer',
             ...(index === projectData.length - 1 && {
              gridColumn: 'span 2',
            }),
            }}
            onClick={() => setOverlayVisible(overlayVisible === index ? null : index)}
          >
            <Box
              component="img"
              src={project.image}
              alt={project.title}
              sx={{
                width:{
                  xs: project.variant === "landscape" ? "190px" : "180px", 
                  sm: project.variant === "landscape" ? "370px" : "375px",
                },
                display: "flex",
                borderRadius: "10px",
                height: {
                  xs: project.variant === "landscape" ? "165px" : "400px", 
                  sm: project.variant === "landscape" ? "200px" : "390px",
                },
              }}
            />
            <Box
              className="overlay"
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                width: {
                  xs: "100%",
                  sm: "600%",
                },
                maxWidth: "370px",
                height: "100%",
                bgcolor: "rgba(0,0,0,0.4)",
                backdropFilter: "blur(6px)",
                opacity: overlayVisible === index ? 1 : 0,
                pointerEvents: overlayVisible === index ? 'auto' : 'none',
                transform: overlayVisible === index ? 'translateX(0)' : 'translateX(-20px)',
                transition: 'opacity 0.3s ease, transform 0.3s ease',
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                color: "white",
                p: 1,
              }}
            >
              <Typography variant="subtitle2" mb={1.5} textAlign="center">
                {project.title}
              </Typography>
            
              {project.liveLink !== "NA" && (
                <Button
                  href={project.liveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="contained"
                  size="small"
                  sx={{ mb: 0, px: 0, py: 0, fontSize: "0.75rem" }}
                  onClick={(e) => e.stopPropagation()}
                >
                  Visit
                </Button>
              )}

              <IconButton
                href={project.githubLink}
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  color: "white",
                  fontSize: "1.1rem",
                  '& svg': {
                    fontSize: '1.5em',
                  }
                }}
                onClick={(e) => e.stopPropagation()}
              >
                <GitHub />
              </IconButton>
            </Box>
          </Box>
        ))}
      </Masonry>
      )}
    </Box>
  );
}
