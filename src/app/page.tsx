"use client";

import ExperienceSection from "@/components/experiencesection";
import HeroSection from "@/components/herosection";
import IntroSection from "@/components/introsection";
import SkillSection from "@/components/skillsection";
import ProjectSection from "@/components/projectsection";
import { Box } from "@mui/material";
import dynamic from "next/dynamic";
import HonorableMentionsSection from "@/components/hm";
import ContactMeSection from "@/components/contactme";

const Navbar = dynamic(() => import("@/components/navbar"), { ssr: false });

export default function Home() {
  return (
      <Box
        sx={{
          minHeight: "100vh",
          width: "100%",
          bgcolor: "background.default",
          backgroundImage: (theme) => theme.palette.background.default,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
          color: "text.primary",
          px: 2,
        }}
      >
      <div suppressHydrationWarning>
        <Navbar />
      </div>
      <section id="home">
        <div suppressHydrationWarning>
          <Box sx={{ mt: { xs: 2, sm: 1, md: 1 } }}>
            <HeroSection />
          </Box>
        </div>
      </section>
      <section id="about">
        <div suppressHydrationWarning>
          <Box sx={{ mt: { xs: 12, sm: 14, md: 15 }, mb: 2 }}>
            <IntroSection />
          </Box>
        </div>
      </section>
      <section id="skills">
        <div suppressHydrationWarning>
          <Box sx={{ mt: { xs: 16, sm: 14, md: 15}, mb: 1 }}>
            <SkillSection />
          </Box>
        </div>
      </section>
      <section id="experience">
        <div suppressHydrationWarning>
          <Box sx={{ mt: { xs: 16, sm: 14, md: 5 } , mb: 2 }}>
            <ExperienceSection />
          </Box>
        </div>
      </section>
      <section id="projects">
        <div suppressHydrationWarning>
          <Box sx={{ mt: { xs: 10, sm: 14, md: 15 }, mb: 2 }}>
            <ProjectSection />
          </Box>
        </div>
      </section>
      <section id="honorable-mentions">
        <div suppressHydrationWarning>
          <Box sx={{ mt: { xs: 10, sm: 14, md: 10 }, mb: 12 }}>
          <HonorableMentionsSection />
          </Box>
        </div>
      </section>
      <section id="contact">
        <div suppressHydrationWarning>
          <Box sx={{ mt: { xs: 10, sm: 1, md: 1 },  }}>
            <ContactMeSection />
          </Box>
        </div>
      </section>
      </Box>
  );
}