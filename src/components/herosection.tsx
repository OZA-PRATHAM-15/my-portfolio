"use client";

import { Box, Typography, MenuItem, Select, Button,IconButton, Modal } from "@mui/material";
import { useEffect, useState } from "react";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import CloseIcon from "@mui/icons-material/Close";

const typeValues = [
  "a Developer",
  "a Tech Enthusiast",
  "a Software Engineer",
  "a Backend Developer",
];

const codeSnippets = {
  SQL: (value: string) => [
    '<span style="color:#569CD6">CREATE FUNCTION</span> get_engineer_joke() <span style="color:#569CD6">RETURNS</span> TEXT <span style="color:#569CD6">AS</span> $$',
    '<span style="color:#C586C0">BEGIN</span>',
    '  <span style="color:#DCDCAA">RETURN</span> <span style="color:#CE9178">\"Why did the engineer quit his job? Too many SQLs!\"</span>;',
    '<span style="color:#C586C0">END</span>;',
    '<span style="color:#569CD6">SELECT</span> * <span style="color:#569CD6">FROM</span> engineers <span style="color:#569CD6">WHERE</span> role = "' + value + '";',
  ],
  Python: (value: string) => [
    '<span style="color:#569CD6">def</span> get_engineer_joke():',
    '    <span style="color:#569CD6">return</span> <span style="color:#CE9178">"Why did the Python dev laugh? Because he saw a try without except!"</span>',
    '',
    '<span style="color:#569CD6">def</span> filter_by_role(role):',
    '    <span style="color:#569CD6">return</span> [e <span style="color:#569CD6">for</span> e <span style="color:#569CD6">in</span> engineers <span style="color:#569CD6">if</span> e.role == "' + value + '"]',
  ],
  JavaScript: (value: string) => [
    '<span style="color:#569CD6">function</span> getEngineerJoke() {',
    '  <span style="color:#569CD6">return</span> <span style="color:#CE9178">"Why don’t JS devs like SQL? Because they can’t handle JOINs!"</span>;',
    '}',
    '',
    '<span style="color:#569CD6">const</span> result = engineers.filter(e => e.role === "' + value + '");',
  ],
};

type LangType = keyof typeof codeSnippets;

export default function HeroSection() {
  const [displayText, setDisplayText] = useState("");
  const [index, setIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [lang, setLang] = useState<LangType>("SQL");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const currentValue = typeValues[index];
    const speed = isDeleting ? 30 : 80;

    const timeout = setTimeout(() => {
      if (!isDeleting && charIndex < currentValue.length) {
        setDisplayText(currentValue.slice(0, charIndex + 1));
        setCharIndex((prev) => prev + 1);
      } else if (isDeleting && charIndex > 0) {
        setDisplayText(currentValue.slice(0, charIndex - 1));
        setCharIndex((prev) => prev - 1);
      } else {
        if (!isDeleting) {
          setTimeout(() => setIsDeleting(true), 1000);
        } else {
          setIsDeleting(false);
          setIndex((prev) => (prev + 1) % typeValues.length);
        }
      }
    }, speed);

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, index]);

  const codeLines = codeSnippets[lang](displayText);

  return (
    <Box
      sx={{
        pt: { xs: 12, sm: 14, md: 18 },
        px: { xs: 3, sm: 6, md: 10 },
        pb: 6,
        display: "flex",
        flexDirection: { xs: "row", sm: "row", md: "row" },
        gap: { xs: 1, sm: 8, md: 4 },
        alignItems: "flex-start",
        justifyContent: "flex-start",
        flexWrap: "wrap",
      }}
    >
      <Box>
        <Typography
          variant="h3"
          sx={{
            fontWeight: 800,
            fontFamily: `"Inter", "Poppins", sans-serif`,
            fontSize: { xs: "1.2rem", sm: "2.5rem", md: "3rem" },
            background: "linear-gradient(to right, #0f0f0f, #2c2c2c)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Hi Techies,
        </Typography>
        
        <Typography
          variant="h3"
          sx={{
            fontWeight: 800,
            fontFamily: `"Inter", "Poppins", sans-serif`,
            fontSize: { xs: "1.5rem", sm: "2.5rem", md: "3rem" },
            display: "flex",
            alignItems: "center",
            gap: 1,
            mt: 1,
          }}
        >
          <Box
            component="span"
            sx={{
              background: "linear-gradient(to right, #0f0f0f, #2c2c2c)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            I&apos;m Pratham
          </Box>
          <Box
            component="span"
            sx={{
              background: "linear-gradient(to right, #1976d2, #0d47a1)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Oza
          </Box>
        </Typography>
          
        <Box sx={{ mt: 4, display: "flex", alignItems: "center", gap: 2 }}>

          <Button
            variant="outlined"
            onClick={() => setOpen(true)}
            sx={{
              borderColor: "#1976d2",
              color: "#000",
              fontWeight: 800,
              borderWidth: "3px",
              mt: 3,
              borderRadius: "10px",
              textTransform: "none",
              "&:hover": { backgroundColor: "#1976d2", color: "#fff" },
            }}
          >
            Interesting Questions
          </Button>
          
          <IconButton
            href="https://github.com/OZA-PRATHAM-15"
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              backgroundColor: "#fff",
              color: "#333",
              mt: 3,
              borderRadius: "30%",
              border: "2px solid #333",
              padding: 1,
              "&:hover": {
                backgroundColor: "#f0f0f0",
              },
            }}
          >
            <GitHubIcon fontSize="medium" />
          </IconButton>
          
          <IconButton
            href="https://linkedin.com/in/pratham-oza15"
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
            <LinkedInIcon fontSize="medium" />
          </IconButton>
        </Box>
      </Box>
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box
          sx={{
            background: "#fff",
            borderRadius: 8,
            p: 6,
            maxWidth: 500,
            mx: "auto",
            mt: "20vh",
            boxShadow: 24,
            textAlign: "center",
            position: "relative",
          }}
        >
           <IconButton
            onClick={() => setOpen(false)}
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
              color: "#333",
            }}
          >
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" fontStyle="italic" mb={1}>
            Developer will develop this in next update... [Classic Excuse] 😅
          </Typography>
        
          <Button
            href="https://mail.google.com/mail/?view=cm&fs=1&to=pratham.oza10@gmail.com"
            startIcon={<MailOutlineIcon />}
            target="_blank"
            sx={{
              backgroundColor: "#1976d2",
              color: "#fff",
              fontWeight: 600,
              mt: 2,
              "&:hover": { backgroundColor: "#0d47a1" },
            }}
          >
            Suggest via Mail
          </Button>
        </Box>
      </Modal>

      <Box
        sx={{
          backgroundColor: "#1e1e1e",
          borderRadius: "10px",
          width: { xs: "100%", sm: "420px", md: "700px" },
          boxShadow: "0 8px 20px rgba(0,0,0,0.3)",
          ml: { xs: 1, sm: 0, md: 60, lg: 20 },
          mt: { xs: 7, sm: 0, md: 0 },
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            px: 2,
            py: 1,
            backgroundColor: "#2d2d2d",
          }}
        >
          <Box sx={{ display: "flex", gap: 1 }}>
            <Box sx={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: "#ff5f56" }} />
            <Box sx={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: "#ffbd2e" }} />
            <Box sx={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: "#27c93f" }} />
          </Box>
          <Select
            variant="standard"
            value={lang}
            onChange={(e) => setLang(e.target.value as LangType)}
            sx={{
              color: "#fff",
              fontSize: "0.9rem",
              fontFamily: "Courier New, monospace",
              backgroundColor: "#333",
              borderRadius: 1,
              px: 1.5,
              '&::before': { borderBottom: 'none' },
              '&::after': { borderBottom: 'none' },
            }}
            disableUnderline
          >
            {Object.keys(codeSnippets).map((lang) => (
              <MenuItem key={lang} value={lang} sx={{ color: "#111" }}>
                {lang}
              </MenuItem>
            ))}
          </Select>
        </Box>
        <Box
          sx={{
            fontFamily: "Courier New, monospace",
            fontSize: { xs: "0.85rem", sm: "1rem" },
            color: "#d4d4d4",
            px: 3,
            py: 4,
            whiteSpace: "pre-wrap",
            wordBreak: "break-word",
            borderBottom: "1px solid #444",
            height: "220px",
          }}
        >
          {codeLines.map((line: string, i: number) => (
            <div key={i}>
              <span style={{ color: "#666" }}>{i + 1}&nbsp;&nbsp;</span>
              <span dangerouslySetInnerHTML={{ __html: line }} />
            </div>
          ))}
          <span className="blinking-cursor">|</span>
        </Box>
      </Box>

      <style jsx>{`
        .blinking-cursor {
          animation: blink 1s step-start infinite;
        }
        @keyframes blink {
          50% {
            opacity: 0;
          }
        }
      `}</style>
    </Box>
  );
}
