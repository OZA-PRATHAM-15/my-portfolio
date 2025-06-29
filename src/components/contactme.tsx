"use client";
import React, { useState, useEffect } from "react";
import styles from "../theme/flipping-card.module.css";
import {
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  useMediaQuery,
  CircularProgress,
} from "@mui/material";
import { LinkedIn, Email, PictureAsPdf } from "@mui/icons-material";
import { Plane } from "lucide-react";
import toast from "react-hot-toast";

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
  const [flipFront, setFlipFront] = useState(true);
  const [rotation, setRotation] = useState(0);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const resumeUrl = process.env.NEXT_PUBLIC_RESUME_URL;

useEffect(() => {
  const interval = setInterval(() => {
    setRotation((prev) => prev + 180);
    setTimeout(() => {
      setFlipFront((prev) => !prev);
      setIndex((prev) => (prev + 1) % prompts.length);
    }, 1000);
  }, 3000);

  return () => clearInterval(interval);
}, []);


  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!formData.name || !formData.email || !formData.message) return;

  setLoading(true);

  try {
    const response = await fetch("https://formspree.io/f/xovwngqb", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: formData.name,
        email: formData.email,
        message: formData.message,
      }),
    });

    const result = await response.json();
    if (result.ok || response.status === 200) {
      setSubmitted(true);
      setFormData({ name: "", email: "", message: "" });
      toast.success("Message sent successfully!");
    } else {
      toast.error("Failed to send message. Try again later.");
    }
    } catch (err) {
      console.error("Formspree error:", err);
      toast.error("An error occurred. Please try again.");
    }

  setLoading(false);
};


  return (
    <Box
      sx={{
        minHeight: "100dvh",
        px: { xs: 2, md: 5, lg: 1 },
        py: 1 ,
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        gap: 5,
        alignItems: "center",
        justifyContent: "center",
        fontFamily: `"Poppins", sans-serif`,
      }}
    >
      <Box className={styles.cardWrapper} sx={{ width: isMobile ? "100%" : "45%" }}>
        <div
          className={styles.card}
          style={{ transform: `rotateY(${rotation}deg)` }}
        >
          <div className={styles.face}>
            {flipFront ? prompts[index] : prompts[(index + 1) % prompts.length]}
          </div>
          <div className={`${styles.face} ${styles.back}`}>
            {flipFront ? prompts[(index + 1) % prompts.length] : prompts[index]}
          </div>
        </div>
      </Box>

      <Box sx={{ width: isMobile ? "100%" : "45%", display: "flex", flexDirection: "column", gap: 1 }}>
        <Typography variant="h5" fontWeight={400} sx={{ fontFamily: "'Poppins', sans-serif" }}>
          Connect With Me
        </Typography>

      <Box display="flex" gap={2} marginBottom={2} flexWrap="wrap">
        <IconButton
          href="https://mail.google.com/mail/?view=cm&fs=1&to=pratham.oza10@gmail.com"
          target="_blank"
          rel="noopener noreferrer"
          sx={{
            backgroundColor: "#fff",
            color: "#D44638",
            borderRadius: "30%",
            mt: 3,
            border: "2px solid #D44638",
            padding: 1,
            "&:hover": {
              backgroundColor: "#fbeae9",
            },
          }}
        >
          <Email fontSize="small" />
        </IconButton>
        
        <IconButton
          href="https://www.linkedin.com/in/pratham-oza15"
          target="_blank"
          rel="noopener noreferrer"
          sx={{
            backgroundColor: "#fff",
            color: "#0077B5",
            borderRadius: "30%",
            mt: 3,
            border: "2px solid #0077B5",
            padding: 1,
            "&:hover": {
              backgroundColor: "#e6f4f9",
            },
          }}
        >
          <LinkedIn fontSize="small" />
        </IconButton>
        
        {resumeUrl && (
          <IconButton
            href={resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            download
            sx={{
              backgroundColor: "#fff",
              color: "#333",
              borderRadius: "30%",
              mt: 3,
              border: "2px solid #333",
              padding: 1,
              "&:hover": {
                backgroundColor: "#f0f0f0",
              },
            }}
          >
            <PictureAsPdf fontSize="small" />
          </IconButton>
        )}
      </Box>

        <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField
            label="Your Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            fullWidth
          />
          <TextField
            label="Your Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
            fullWidth
          />
          <TextField
            label="Your Message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            multiline
            rows={4}
            required
            fullWidth
          />
          <Button
            type="submit"
            variant="contained"
            endIcon={loading ? <CircularProgress size={20} color="inherit" /> : <Plane size={18} />}
            sx={{
              borderRadius: "12px",
              fontWeight: 600,
              alignSelf: "flex-end",
              background: "#000",
              ":hover": { background: "#333" },
            }}
            disabled={!formData.name || !formData.email || !formData.message || loading || submitted}
          >
            {submitted ? "Sent!" : "Send Message"}
          </Button>
        </Box>
      </Box>
  </Box>
  );
}
