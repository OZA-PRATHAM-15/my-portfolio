"use client";
import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Paper,
  Link,
  Backdrop,
  Modal,
  IconButton,
} from "@mui/material";
import CookieIcon from "@mui/icons-material/Cookie";
import CloseIcon from "@mui/icons-material/Close";

export default function Cookie() {
  const [showModal, setShowModal] = useState(false);
  const [showTerms, setShowTerms] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookieConsent");
    if (!consent) setShowModal(true);
  }, []);

  const getVisitorIP = async (): Promise<string> => {
  try {
    const res = await fetch("https://api64.ipify.org?format=json");
    const data = await res.json();
    return data.ip;
  } catch {
    return "";
  }
};

const handleConsent = async (accepted: boolean) => {
  localStorage.setItem("cookieConsent", accepted ? "ACCEPTED" : "REJECTED");
  setShowModal(false);

  const consent = accepted ? "ACCEPTED" : "REJECTED";
  const userAgent = navigator.userAgent;

  const ip = consent === "ACCEPTED" ? await getVisitorIP() : "";

  try {
    await fetch("/api/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `
          mutation {
            logVisitor(ip: "${ip}", consent: "${consent}", user_agent: "${userAgent}")
          }
        `,
      }),
    });
  } catch (error) {
    console.error("Failed to log visitor:", error);
  }
};


  if (!showModal) return null;

  return (
    <>
      <Backdrop open={true} sx={{ zIndex: 1300 }} />

      <Paper
        elevation={4}
        sx={{
          position: "fixed",
          bottom: 16,
          right: 16,
          p: 3,
          maxWidth: { xs: 330, sm: 400, md: 500 },
          display: "flex",
          alignItems: "flex-start",
          gap: 1,
          zIndex: 1400,
          borderRadius: 2,
          bgcolor: "white",
        }}
      >
        <CookieIcon fontSize="medium" color="primary" sx={{ mt: 0.2, mr: 1 }} />

        <Box flex={1}>
          <Typography variant="subtitle1" fontWeight="bold">
            We bake cookies
          </Typography>
          <Typography variant="body2" sx={{ mt: 0.5 }}>
            Please accept our cookies so we can track your awesome visit and pretend we&apos;re popular.
          </Typography>

          <Typography variant="caption" sx={{ mt: 1, display: "block" }}>
            <Link
              component="button"
              underline="hover"
              onClick={() => setShowTerms(true)}
            >
              Terms & Conditions
            </Link>
          </Typography>
        </Box>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 1, mt: 2 }}>
          <Button variant="contained" size="small" onClick={() => handleConsent(true)}>
            Accept
          </Button>
          <Button variant="outlined" size="small" onClick={() => handleConsent(false)}>
            Decline
          </Button>
        </Box>
      </Paper>

      <Modal open={showTerms} onClose={() => setShowTerms(false)}>
        <Paper
          elevation={6}
          sx={{
            position: "fixed",
            top: { xs: "40%", sm: "50%", md: "50%" },
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: { xs: 300, sm: 500, md: 600 },
            bgcolor: "white",
            borderRadius: 2,
            p: 4,
            outline: "none",
            zIndex: 1500,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <Typography variant="h6" fontWeight="bold" flex={1}>
              Our Totally Serious Terms 🍪
            </Typography>
            <IconButton
              onClick={() => setShowTerms(false)}
              sx={{
                position: "absolute",
                top: 8,
                right: 8,
              }}
            >
              <CloseIcon />
            </IconButton>
          </Box>

          <Typography variant="body2" sx={{ mb: 2,  }}>
            Yes, we bake cookies. Not the delicious kind though — these are digital cookies.
          </Typography>

          <Typography variant="body2" sx={{ mb: 2 }}>
            Pratham uses them to track how many cool people visit this portfolio, inflate his self-esteem,
            and pretend this site is more popular than it is.
          </Typography>

          <Typography variant="body2" sx={{ mb: 2 }}>
            These cookies only track harmless stuff like page visits, time spent, and clicks. No creepy spying — promise.
          </Typography>

          <Typography variant="body2">
            If you&apos;re okay with that, smash &quot;Accept&quot;. If not, hit &quot;Decline&quot; and Pratham will cry a little.
          </Typography>
        </Paper>
      </Modal>
    </>
  );
}
