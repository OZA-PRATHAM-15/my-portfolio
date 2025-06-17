"use client";

import {
  Box,
  Typography,
  ToggleButtonGroup,
  ToggleButton,
  Paper,
  Card,
  Stack,
} from "@mui/material";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const skillData = {
  Frontend: [
    { name: "NextJs", iconClass: "ci ci-nextjs ci-3x" },
    { name: "ReactJs", iconClass: "ci ci-react ci-3x" },
    { name: "React Native", iconClass: "ci ci-reactnative ci-3x" },
    { name: "Flutter", iconClass: "ci ci-flutter ci-3x" },
    { name: "HTML", iconClass: "ci ci-html ci-3x" },
    { name: "CSS", iconClass: "ci ci-css ci-3x" },
    { name: "Bootstrap", iconClass: "ci ci-bootstrap ci-3x" },
    { name: "Material UI", iconClass: "ci ci-materialui ci-3x" },
  ],
  Backend: [
    { name: "Node.js", iconClass: "ci ci-nodejs ci-3x" },
    { name: "PHP", iconClass: "ci ci-php ci-3x" },
    { name: "Flask", iconClass: "ci ci-flask ci-3x" },
    { name:"NestJS", iconClass: "ci ci-nestjs ci-3x" },
    { name: "MongoDB", iconClass: "ci ci-mongodb ci-3x" },
    { name: "MySQL", iconClass: "ci ci-mysql ci-3x" },
    { name: "PostgreSQL", iconClass: "ci ci-postgresql ci-3x" },
    
  ],
  Tools: [
    { name: "Docker", iconClass: "ci ci-docker ci-3x" },
    { name: "Firebase", iconClass: "ci ci-firebase ci-3x" },
    { name: "Git/GitHub", iconClass: "ci ci-github ci-3x" },
    { name: "Postman", iconClass: "ci ci-postman ci-3x" },
    { name: "VS Code", iconClass: "ci ci-vscode ci-3x" },

  ],
  Languages: [
    { name: "JavaScript", iconClass: "ci ci-javascript ci-3x" },
    { name: "TypeScript", iconClass: "ci ci-typescript ci-3x" },
    { name: "Python", iconClass: "ci ci-python ci-3x" },
    { name: "Dart", iconClass: "ci ci-dart ci-3x" },
    { name: "Java", iconClass: "ci ci-java ci-3x" },
  ],
};

type SkillCategory = keyof typeof skillData;

export default function SkillSection() {
  const [category, setCategory] = useState<SkillCategory>("Frontend");
  const [direction, setDirection] = useState(1);

  const handleChange = (
    _: React.MouseEvent<HTMLElement>,
    newCategory: SkillCategory | null
  ) => {
    if (!newCategory) return;
    setDirection(
      Object.keys(skillData).indexOf(newCategory) >
        Object.keys(skillData).indexOf(category)
        ? 1
        : -1
    );
    setCategory(newCategory);
  };

  return (
    <Box
      sx={{
        px: { xs: 3, md: 10 },
        py: { xs: 0, md: 8 },
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Typography variant="h4" sx={{ fontWeight: 800, color: "#1976d2", mb: 4 }}>
        Tech Stack
      </Typography>

      <Paper
        elevation={3}
        sx={{
          borderRadius: 4,
          p: 1.5,
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          mb: 6,
          bgcolor: "white",
          maxWidth: { xs: "120%", sm: "auto" },
          overflowX: "auto",
          whiteSpace: "nowrap",   
        }}
      >
        <ToggleButtonGroup
          value={category}
          exclusive
          onChange={handleChange}
          sx={{ border: "none", flexWrap: "nowrap" }}
        >
          {Object.keys(skillData).map((cat, i, arr) => (
            <ToggleButton
              key={cat}
              value={cat}
              sx={{
                px: { xs: 2, sm: 3, md: 4 },
                py: { xs: 1, sm: 1.2, md: 1.5 },
                fontSize: { xs: "0.8rem", sm: "0.9rem", md: "1rem" },
                fontWeight: 700,
                color: "#000",
                bgcolor: "#fff",
                "&.Mui-selected": {
                  color: "#fff",
                  backgroundImage: "linear-gradient(to right, #2196f3, #21cbf3)",
                },
                "&.Mui-selected:hover": {
                  backgroundImage: "linear-gradient(to right, #1e88e5, #1de9b6)",
                },
                border: "none",
                borderRadius: 0,
                borderRight: i !== arr.length - 1 ? "1px solid #1976d2" : "none",
                borderTopLeftRadius: i === 0 ? 16 : 0,
                borderBottomLeftRadius: i === 0 ? 16 : 0,
                borderTopRightRadius: i === arr.length - 1 ? 16 : 0,
                borderBottomRightRadius: i === arr.length - 1 ? 16 : 0,
                textTransform: "none",
              }}
            >
              {cat}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </Paper>

      <AnimatePresence mode="wait">
        <motion.div
          key={category}
          initial={{ x: 100 * direction, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -100 * direction, opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card
            elevation={0}
            sx={{
              p: 3,
              bgcolor: "background.default",
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: { xs: 4, md: 4, },
              maxWidth: 800,
              minHeight: { xs: 400, md: 320 },
              mx: "auto",
            }}
          >
            {skillData[category].map((item) => (
              <Stack
                key={item.name}
                spacing={2}
                sx={{ width: { xs: "25%", sm: 100, md: 120 }, textAlign: "center", alignItems: "center" }}
              >
                <Box
                  sx={{
                    background: "#fff",
                    p: 4,
                    borderRadius: "50%",
                    width: 80,
                    height: 80,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: 2,
                    transition: "transform 0.3s",
                    ":hover": { transform: "scale(1.1)" },         
                  }}
                >
                  <i className={item.iconClass}></i>
                </Box>
                <Typography sx={{ fontWeight: 700 }}>{item.name}</Typography>
              </Stack>
            ))}
          </Card>
        </motion.div>
      </AnimatePresence>
    </Box>
  );
}
