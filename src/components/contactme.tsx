"use client";

import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import { motion } from "framer-motion";
import { LinkedIn, Email, FileDownload, EmojiEmotions } from "@mui/icons-material";
import SendIcon from "@mui/icons-material/Send";

const prompts = [
  "Want to start a project?",
  "Need some help in tech??",
  "Want to hire me??",
  "Ask for a referral? (Even I need one!)",
  "Just a casual Hello??",
  "Want to suggest a change in portfolio??",
];

export default function ContactMeSection() {
  const [index, setIndex] = useState(0);
  const [flip, setFlip] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");

  useEffect(() => {
    const interval = setInterval(() => {
      setFlip(true);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % prompts.length);
        setFlip(false);
      }, 300);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        px: { xs: 2, md: 10 },
        py: 10,
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        gap: 6,
        alignItems: "center",
        justifyContent: "center",
        fontFamily: `"Poppins", sans-serif`,
        background: "#f5f5f5",
      }}
    >
      {/* Flipping Card Section */}
      <Box sx={{ width: isMobile ? "100%" : "45%", perspective: "1000px" }}>
        <motion.div
          animate={{ rotateY: flip ? 180 : 0 }}
          transition={{ duration: 0.6 }}
          style={{
            width: "100%",
            minHeight: "280px",
            borderRadius: "16px",
            background: "#fff",
            boxShadow: "0px 10px 30px rgba(0,0,0,0.1)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            transformStyle: "preserve-3d",
            fontFamily: `'Playfair Display', serif`,
            fontSize: "2rem",
            padding: "2rem",
          }}
        >
          <span>{prompts[index]}</span>
        </motion.div>
      </Box>

      {/* Form + Social Icons */}
      <Box sx={{ width: isMobile ? "100%" : "45%", display: "flex", flexDirection: "column", gap: 3 }}>
        <Box>
          <Typography variant="h5" fontWeight={600} sx={{ fontFamily: "'Poppins', sans-serif", mb: 1 }}>
            Connect With Me
          </Typography>
          <Box display="flex" gap={2}>
            <IconButton href="mailto:ozapratham15@gmail.com" target="_blank" sx={{ color: "#000" }}>
              <Email />
            </IconButton>
            <IconButton href="https://www.linkedin.com/in/pratham-oza15" target="_blank" sx={{ color: "#0077b5" }}>
              <LinkedIn />
            </IconButton>
            <IconButton href="/Pratham_Resume.pdf" download sx={{ color: "#222" }}>
              <FileDownload />
            </IconButton>
            <IconButton sx={{ color: "#ff9800" }}>
              <EmojiEmotions />
            </IconButton>
          </Box>
        </Box>

        <Box
          component="form"
          action="mailto:ozapratham15@gmail.com"
          method="POST"
          encType="text/plain"
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            mt: 2,
          }}
        >
          <TextField label="Your Name" name="name" variant="outlined" required fullWidth InputProps={{ sx: { borderRadius: "12px" } }} />
          <TextField label="Your Email" name="email" type="email" variant="outlined" required fullWidth InputProps={{ sx: { borderRadius: "12px" } }} />
          <TextField label="Your Message" name="message" multiline rows={4} variant="outlined" required fullWidth InputProps={{ sx: { borderRadius: "12px" } }} />
          <Button
            type="submit"
            variant="contained"
            endIcon={<SendIcon />}
            sx={{
              borderRadius: "12px",
              fontWeight: 600,
              alignSelf: "flex-end",
              background: "#000",
              ":hover": { background: "#333" },
            }}
          >
            Send Message
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
