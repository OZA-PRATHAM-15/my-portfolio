"use client";

import { useState } from "react";
import { Box, ToggleButton, ToggleButtonGroup, Typography, Card, CardContent, Stack, Chip } from "@mui/material";
import { motion } from "framer-motion";

const sections = ["Education", "Experience"] as const;
type SectionType = (typeof sections)[number];

type ExperienceItem = {
  duration: string;
  title: string;
  Domain?: string;
  subtitle: string;
  description: string[];
  tech?: string[];
};

type DataType = Record<SectionType, ExperienceItem[]>;

const dummyData: DataType = {
  Education: [
    {
      duration: "2020 – 2025",
      title: "Bachelor's Degree",
      Domain: "Computer Engineering",
      subtitle: "Thakur College of Engineering and Technology, Mumbai",
      description: [
        "CGPI: 8.67/10",
        "Gained strong foundation in computer science principles.",
      ]
    },
    {
      duration: "2019 – 2021",
      title: "High School",
      Domain: "PCM",
      subtitle: "Thakur Vidya Mandir High School & Jr College, Mumbai",
      description: [
        "Scored 90% in HSC.",
        "Subjects focused on Physics, Chemistry, and Mathematics."
      ]
    },
    {
      duration: "2018 – 2019",
      title: "Secondary School",
      Domain: "SSC",
      subtitle: "Sardar Vallbhbhai Patel Vidyalaya, Thane",
      description: [
        "Scored 85% in SSC.",
        "Gained strong foundation in mathematics and science."
      ]
    }
  ],
  Experience: [
    {
      duration: "Jan 2025 – present",
      title: "Backend Developer Intern",
      subtitle: "Ghar!T · Remote",
      description: [
        "Developing scalable REST APIs using NestJs and Typescript.",
        "Integrated AWS S3 for Image storage and retrieval.",
        "Collaborating with frontend team using Next.js and Google Matrix API for geolocation-based services."
      ],
      tech: ["NestJs", "Typescript", "Aws S3", "MikroORM", "NextsJs", "Google Matrix API"]
    },
    {
      duration: "Mar 2024 – Apr 2024",
      title: "Full Stack Developer Intern",
      subtitle: "Coding Raja Technologies · Remote",
      description: [
        "Designed and built a resume builder web application independently using the MERN stack",
        "Implemented responsive design, improving mobile usability."
      ],
      tech: ["ReactJs", "Node.js", "MongoDB", "Docker"]
    },
    {
      duration: "Dec 2022 – Jan 2023",
      title: "Trainee- Python",
      subtitle: "IIT Bombay · Remote",
      description: [
        "Completed certified training in Python, data structures, and algorithms.",
        "Successfully executed multiple assignments and projects during the program."
      ],
      tech: ["Python", "DSA", "Problem-solving"]
    }

  ]
};

export default function ExperienceSection(): React.ReactElement {
  const [selected, setSelected] = useState<SectionType>("Education");

  const renderCard = (item: ExperienceItem, index: number, isLast: boolean): React.ReactElement => (
    <Box key={item.title + index} position="relative" pl={5}>
      <Box
        sx={{
          position: "absolute",
          left: 10,
          top: 8,
          width: 14,
          height: 14,
          borderRadius: "50%",
          background: "linear-gradient(135deg, #6EE7B7 0%, #3B82F6 100%)",
          border: "3px solid white",
          zIndex: 2
        }}
      />

      {!isLast && (
        <Box
          sx={{
            position: "absolute",
            left: 16,
            top: 22,
            bottom: -50,
            width: 2,
            backgroundColor: "#ccc",
            zIndex: 1,
            borderRadius: 100
          }}
        />
      )}
      <motion.div
        key={index}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        whileHover={{
          scale: 1.03,
          zIndex: 10,
          boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.2)",
          borderRadius: "18px",
        }}
        transition={{
          duration: 0.4,
          ease: "easeOut",
          delay: index * 0.1,
          borderRadius: isLast ? "18px" : "0px",
        }}
      >

        <Box
          sx={{
            borderRadius: "18px",
            border: "2px solid transparent",
            backgroundImage:
              "linear-gradient(white, white), linear-gradient(135deg, #3B82F6, #06B6D4)",
            backgroundOrigin: "border-box",
            backgroundClip: "padding-box, border-box",
            overflow: "hidden",
          }}
        >
          <Card
            elevation={3}
            sx={{
              backgroundColor: "transparent", 
              borderRadius: "18px",
              height: "100%",
              boxShadow: "none" 
            }}
          >
            <CardContent>
              <Typography variant="body2" color="text.secondary" sx={{ float: "right" }}>{item.duration}</Typography>
              <Typography variant="h6">{item.title}</Typography>
              {item.Domain && (
                <Typography variant="subtitle2" color="text.primary" gutterBottom>
                  {item.Domain}
                </Typography>
              )}
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                {item.subtitle}
              </Typography>
              <ul>
                {item.description.map((point: string, i: number) => (
                   <li key={`desc-${i}`}>
                    <Typography variant="body2">
                      {point}
                    </Typography>
                  </li>
                ))}
              </ul>
              {item.tech && (
                <Box mt={2} display="flex" gap={1} flexWrap="wrap">
                  {item.tech.map((tag: string) => (
                    <Chip
                      key={tag}
                      label={tag}
                      size="small"
                      sx={{
                        color: "black",
                        border: "1px solid",
                        borderColor: "linear-gradient(135deg, #3B82F6 0%, #06B6D4 100%)",
                        background: "transparent",
                      }}
                    />
                  ))}
                </Box>
              )}
            </CardContent>
          </Card>
        </Box>
      </motion.div>
    </Box>
  );

  return (
    <Box sx={{ px: { xs: 2, md: 10 }, py: 6 }}>
      <ToggleButtonGroup
        value={selected}
        exclusive
        onChange={(_, value: SectionType | null) => value && setSelected(value)}
        sx={{ mb: 4, justifyContent: "center", display: { xs: "flex", md: "none" } }}
      >
        {sections.map((section) => (
          <ToggleButton key={section} value={section}>
            {section}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>

      <Box display={{ xs: "none", md: "flex" }} gap={8}>
        {sections.map((section) => (
          <Box key={section} flex={1}>
            <Typography variant="h4" mb={3} color="black">{section}</Typography>
            <Stack spacing={4}>
              {dummyData[section].map((item, index) =>
                renderCard(item, index, index === dummyData[section].length - 1)
              )}
            </Stack>
          </Box>
        ))}
      </Box>

      <Box display={{ xs: "block", md: "none" }}>
        <Stack spacing={4}>
          {dummyData[selected].map((item, index) =>
            renderCard(item, index, index === dummyData[selected].length - 1)
          )}
        </Stack>
      </Box>
    </Box>
  );
}