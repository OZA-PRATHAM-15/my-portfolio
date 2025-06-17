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
        bgcolor: "background.default",
        color: "text.primary",
        px: 2,
      }}
    >
      <div suppressHydrationWarning>
        <Navbar />
      </div>
      <div suppressHydrationWarning>
        <Box sx={{ mt: { xs: 2, sm: 1, md: 1 } }}>
          <HeroSection />
        </Box>
        <div suppressHydrationWarning>
          <Box sx={{ mt: { xs: 12, sm: 14, md: 25 } }}>
            <IntroSection />
          </Box>
        </div>
        <div suppressHydrationWarning>
          <Box sx={{ mt: { xs: 16, sm: 14, md: 10 } }}>
            <SkillSection />
          </Box>
        </div>
        <div suppressHydrationWarning>
          <Box sx={{ mt: { xs: 16, sm: 14, md: 5 } }}>
            <ExperienceSection />
          </Box>
        </div>
        <div suppressHydrationWarning>
          <Box sx={{ mt: { xs: 10, sm: 14, md: 5 }, mb: 2 }}>
            <ProjectSection />
          </Box>
        </div>
        <div suppressHydrationWarning>
          <Box sx={{ mt: { xs: 10, sm: 14, md: 10 }, mb: 12 }}>
          <HonorableMentionsSection />
          </Box>
        </div>
        <div suppressHydrationWarning>
          <Box sx={{ mb: 10, mt: { xs: 10, sm: 14, md: 10 } }}>
            <ContactMeSection />
          </Box>
        </div>
      </div>
    </Box>
  );
}