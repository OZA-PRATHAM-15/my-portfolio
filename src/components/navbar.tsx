"use client";
import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  IconButton,
  Drawer,
  Divider,
  useMediaQuery,
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { useTheme } from "@mui/material/styles";

const NAV_ITEMS = [
  { label: "Home", href: "#home" },
  { label: "About Me", href: "#about" },
  { label: "Experience", href: "#experience" },
  {label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [active, setActive] = useState("");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [currentMessage, setCurrentMessage] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY;
      for (let i = 0; i < NAV_ITEMS.length; i++) {
        const section = document.querySelector(NAV_ITEMS[i].href);
        if (section) {
          const top = section.getBoundingClientRect().top + window.scrollY;
          if (scrollY >= top - 80) {
            setActive(NAV_ITEMS[i].href);
          }
        }
      }
    };
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleClick = (href: string) => {
    setActive(href);
    setDrawerOpen(false);
    const section = document.querySelector(href);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning, Folks!";
    if (hour < 18) return "Good Afternoon, Folks!";
    return "Good Evening, Folks!";
  };
  
  const messages = ["Why are you here?", getGreeting(), "What's your purpose to visit?", "Do you like my portfolio?", "Feel free to explore!", "Have a great day!"];
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessage((prev) => (prev + 1) % messages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [messages.length]);
  
  
  return isMobile ? (
    <>
      <Box
        sx={{
          position: "fixed",
          top: 0,
          right: 0,
          left: 0,
          zIndex: 1300,
          bgcolor: "background.paper",
          px: 2,
          py: 1.2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={messages[currentMessage]}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
          >
            <Typography
              sx={{
                fontSize: 14,
                fontWeight: 600,
                color: "#555",
                fontFamily: `"Inter", "Poppins", sans-serif`,
              }}
            >
              {messages[currentMessage]}
            </Typography>
          </motion.div>
        </AnimatePresence>
          
        <IconButton
          onClick={() => setDrawerOpen(!drawerOpen)}
          sx={{
            color: "#1976d2",
            transition: "transform 0.3s ease",
            transform: drawerOpen ? "rotate(90deg)" : "none",
          }}
        >
          {drawerOpen ? <CloseIcon /> : <MenuIcon />}
        </IconButton>
      </Box>

      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        ModalProps={{ keepMounted: true }}
        slotProps={{
          paper: {
            sx: {
              width: "40vw",
              height: "100vh",
              bgcolor: "background.default",
              p: 2,
              pt: 10,
              zIndex: 1400,
            },
          },
        }}
      >
        {NAV_ITEMS.map((item, index) => (
          <Box key={item.href} onClick={() => handleClick(item.href)}>
            <Typography
              sx={{
                py: 1,
                px: 2,
                fontSize: 16,
                fontWeight: 600,
                color: active === item.href ? "#1976d2" : "#181818",
                cursor: "pointer",
              }}
            >
              {item.label}
            </Typography>
            {index !== NAV_ITEMS.length - 1 && <Divider sx={{ my: 0.5, borderColor: "rgba(0,0,0,0.1)" }} />}
          </Box>
        ))}
      </Drawer>
    </>
  ) : (
    <Box
      sx={{
        position: "sticky",
        top: 0,
        zIndex: 1300,
        bgcolor: "background.paper",
        pr: { xs: 3, md: 18 },
        py: { xs: 1.5, md: 2 },
        height: { xs: 60, md: 70 },
        display: "flex",
        width: "100%",
        borderRadius: "0 0 10px 8px",
        alignItems: "center",
        justifyContent: "space-between",
        px: { xs: 2, md: 6 }, 
        boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
        fontFamily: `"Inter", "Poppins", sans-serif`,
      }}
    >
        <>
        <AnimatePresence mode="wait">
          <motion.div
            key={messages[currentMessage]}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
          >
            <Typography
              sx={{
                fontSize: { xs: 14, sm: 15, md: 16 },
                fontWeight: 700,
                color: "#555",
                fontFamily: `"Inter", "Poppins", sans-serif`,
              }}
            >
              {messages[currentMessage]}
            </Typography>
          </motion.div>
        </AnimatePresence>
          <Box
            sx={{
              display: "flex",
              gap: { xs: 2, sm: 4, md: 5 },
            }}
          >
            {NAV_ITEMS.map((item) => (
              <Box
                key={item.href}
                onClick={() => handleClick(item.href)}
                sx={{
                  position: "relative",
                  cursor: "pointer",
                  "&:after": {
                    content: '""',
                    position: "absolute",
                    bottom: -4,
                    left: "50%",
                    width: "100%",
                    height: "2px",
                    backgroundColor: "#1976d2",
                    transform:
                      active === item.href
                        ? "translateX(-50%) scaleX(1)"
                        : "translateX(-50%) scaleX(0)",
                    transformOrigin: "center",
                    transition: "transform 0.3s ease",
                  },
                  "&:hover:after": {
                    transform: "translateX(-50%) scaleX(1)",
                  },
                }}
              >
                <Typography
                  sx={{
                    fontSize: { xs: 14, sm: 15, md: 16 },
                    fontWeight: 600,
                    color: active === item.href ? "#1976d2" : "#181818",
                    transition: "color 0.3s",
                  }}
                >
                  {item.label}
                </Typography>
              </Box>
            ))}
          </Box>
        </>
      </Box>
    );
}
