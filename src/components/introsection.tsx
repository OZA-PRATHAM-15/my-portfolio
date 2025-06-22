"use client";

import { Box, Typography, LinearProgress, Card, Divider, Tooltip } from "@mui/material";
import { motion } from "framer-motion";
import Image from "next/image";

export default function IntroSection() {
  return (
    <Box
      component={motion.section}
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        alignItems: "center",
        justifyContent: "center",
        px: { xs: 5, sm: 6, md: 15 },
        py: { xs: 15, sm: 7, md: 7 },
        bgcolor: "background.default",
        gap: { xs: 8, md: 24 },
        mt: { xs: 10, md: 16 },
      }}
    >

      <Box sx={{ textAlign: "center", position: "relative" }}>
        <Card
          elevation={3}
          sx={{
            p: 2,
            borderRadius: "20px",
            transform: "rotate(1deg)",
            bgcolor: "white",
            width: { xs: "100%", md: 340 },
            maxHeight: 460,
            overflow: "hidden",
            position: "relative",
            "&:hover .hoverText": {
              opacity: 1,
              transform: "translateY(0)"
            }
          }}
        >
          <Box sx={{ position: "relative" }}>
            <Image
              src="https://firebasestorage.googleapis.com/v0/b/carbuyingapp-4883c.appspot.com/o/Image%20profile.jpg?alt=media&token=30db5a14-cbc3-488e-8133-df5d10cfb78f"
              alt="Pratham"
              width={300}
              height={420}
              style={{ borderRadius: "12px", objectFit: "cover", width: "100%" }}
            />
            <Typography
              className="hoverText"
              sx={{
                position: "absolute",
                bottom: 10,
                left: 0,
                right: 0,
                textAlign: "center",
                color: "#fff",
                fontWeight: 600,
                opacity: 0,
                transform: "translateY(20px)",
                transition: "all 0.4s ease"
              }}
            >
              Do I look good?
            </Typography>
          </Box>
        </Card>
      </Box>

      <Box sx={{ width: { xs: "100%", md: "55%" } }}>
        <Typography
          variant="h4"
          sx={{ fontWeight: 1000, color: "#1976d2", mb: 7, fontSize: { xs: "1.9rem", sm: "2rem", md: "2.5rem" } }}
        >
          Who am I?
        </Typography>

        <Typography sx={{ fontWeight: 600, mb: 1, fontSize: "1.1rem", textAlign: "justify" }}>
          I’m Pratham Oza, a university graduate passionate about building efficient systems and creative interfaces.
        </Typography>

        <Typography sx={{ mb: 3, textAlign: "justify", fontSize: "1rem" }}>
          I&apos;m someone who thrives on curiosity, loves problem-solving, and enjoys sharing what I learn. Outside of code, you’ll catch me exploring new tech ideas or cracking the next dry joke.
        </Typography>

        <Box sx={{ display: "flex", gap: 3, flexDirection: { xs: "row", sm: "row" }, flexWrap: "nowrap", alignItems: "flex-start" }}>
            <Box sx={{ flex: 1, minWidth: { xs: "120px", sm: "200px" } }}>
            <Typography fontWeight={700} sx={{ mb: 2, fontSize: "1.1rem", color: "#1976d2" }}>Strengths</Typography>
            <Typography fontWeight={600}>Adaptability</Typography>
            <LinearProgress variant="determinate" value={90} sx={{ mb: 1, borderRadius: 5, height: 6 }} />
            <Typography fontWeight={600}>Confidence</Typography>
            <LinearProgress variant="determinate" value={90} sx={{ mb: 1, borderRadius: 5, height: 6 }} />
            <Typography fontWeight={600}>Funny</Typography>
            <LinearProgress variant="determinate" value={90} sx={{ mb: 1, borderRadius: 5, height: 6 }} />
          </Box>

          <Divider
            orientation="vertical"
            flexItem
            sx={{
              width: "4px",
              borderRadius: 2,
              background: "linear-gradient(to bottom, #1976d2, #42a5f5)",
              alignSelf: "stretch"
            }}
          />
         <Box sx={{ flex: 1, minWidth: { xs: "120px", sm: "200px" } }}>
            <Typography fontWeight={700} sx={{ mb: 2, fontSize: "1.1rem", color: "#1976d2" }}>Weaknesses</Typography>
              <Tooltip title="Just kidding... or am I? 😉" arrow>
                <Typography
                  fontWeight={600}
                  sx={{
                    fontStyle: "italic",
                    textDecoration: "line-through",
                    display: "inline-block",
                    cursor: "help",
                  }}
                >
                  Sly Liar
                </Typography>
              </Tooltip>
            <LinearProgress
              variant="determinate"
              value={10}
              sx={{
                mb: 1,
                borderRadius: 5,
                height: 6,
                backgroundColor: "#f0f0f0",
                "& .MuiLinearProgress-bar": {
                  background: "linear-gradient(to right, #ef5350, #ffca28)",
                },
              }}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
