"use client";

import { Box, Typography } from "@mui/material";
import Image from "next/image";
import { motion } from "framer-motion";

const highlights = [

  {
    title: "Multicon Paper Presentation",
    caption: "🏆 Presented a paper on 'Smart Inventory Management' at Multicon 2025!",
    image: "https://firebasestorage.googleapis.com/v0/b/carbuyingapp-4883c.appspot.com/o/BE%20Certificate%20_Part163_page-0001.jpg?alt=media&token=51b2f2d4-e662-41db-ae1e-3aa4b64a6cc9"
  },

  {
    title: "AWS - Getting started with DevOps",
    caption: "🏆 Completed AWS - Getting started with DevOps course!",
    image: "https://firebasestorage.googleapis.com/v0/b/carbuyingapp-4883c.appspot.com/o/AWS_Devops_page-0001.jpg?alt=media&token=5836cc1a-a002-4788-a5fa-cde341b1b422",
  },

  {
    title: "CodeChef 50 days of code",
    caption: "🏆 Completed 50 days of coding challenges on CodeChef!",
    image: "https://firebasestorage.googleapis.com/v0/b/carbuyingapp-4883c.appspot.com/o/1715317033135.jpeg?alt=media&token=d1f6dbd4-2481-4496-aef1-91c022d3fb83",
  },


  {
    title:"Particpated in Flipkart Grid 2024",
    caption: "🏆 Participated in Flipkart Grid 2024!",
  },

  {
    title: "Github Wrap-up 2024",
    caption: "🏆 Achieved 100+ commits in 2024 on GitHub!",
    image:"https://firebasestorage.googleapis.com/v0/b/carbuyingapp-4883c.appspot.com/o/git-wrapped-OZA-PRATHAM-15.png?alt=media&token=8ac667f5-273b-4c22-8990-88d506a4c8f2"
  },

  {
    title: "Google GenAi Hackathon",
    caption: "🏆 Participated in Google GenAi Hackathon 2024!",
  },

  {
    title: "Ace-Hacks Hackathon",
    caption: "🏆 Top 10 teams at Ace-Hacks Hackathon 2023!",
    image: "https://firebasestorage.googleapis.com/v0/b/carbuyingapp-4883c.appspot.com/o/Participant%20Certificate-84_page-0001.jpg?alt=media&token=fac1bc15-7d87-4586-9d8a-2c1896ce6ef9",
  },

  {
    title:"Inhouse Coding Competition",
    caption: "🏆 Participated in various Inhouse Coding Competition at TCET!",
    image:"https://firebasestorage.googleapis.com/v0/b/carbuyingapp-4883c.appspot.com/o/55247630-efee-407d-9760-bc39de724967_page-0001.jpg?alt=media&token=4bb47875-81c2-42c9-a8e2-453566f8bf28"
  }

];

export default function HonorableMentionsSection() {
  return (
    <Box sx={{ px: { xs: 2, md: 16 }, py: 12 }}>
      <Typography
        variant="h4"
        fontWeight={700}
        mb={5}
        textAlign="center"
        fontFamily="'Inter', sans-serif"
      >
        Honorable Mentions 🏅
      </Typography>

<Box
  sx={{
    columnCount: {
      xs: 2,
      sm: 2,
      md: 4,
    },
    columnGap: 1.5,
  }}
>
  {highlights.map((item, idx) => (
    <motion.div
      key={idx}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.25 }}
      style={{
        borderRadius: 16,
        background: "#fff",
        boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
        display: "inline-block", // Important for masonry
        width: "100%",
        marginBottom: 16,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", p: 2 }}>
        <Image
          src="https://firebasestorage.googleapis.com/v0/b/carbuyingapp-4883c.appspot.com/o/Image%20profile.jpg?alt=media&token=30db5a14-cbc3-488e-8133-df5d10cfb78f"
          alt="Pratham Oza"
          width={32}
          height={32}
          style={{
            borderRadius: "50%",
            objectFit: "cover",
            marginRight: 12,
          }}
        />
        <Box>
          <Typography variant="subtitle2" fontWeight={600}>
            Pratham Oza
          </Typography>
          <Typography variant="caption" color="text.secondary">
            @pratham_oza
          </Typography>
        </Box>
      </Box>

      <Box sx={{ px: 2, pb: item.image ? 1 : 2 }}>
        <Typography variant="body1" sx={{ fontSize: "0.95rem" }}>
          <strong>{item.title}</strong>
          <br />
          {item.caption}
        </Typography>
      </Box>

      {item.image && (
        <Image
          src={item.image}
          alt={item.title}
          width={500}
          height={item.image.includes("page") ? 600 : 300}
          style={{
            width: "90%",
            height: "auto",
            borderRadius: 8,
            objectFit: "cover",
            marginTop: 8,
            marginLeft: 12,
            marginBottom: 20,
          }}
        />
      )}
    </motion.div>
  ))}
</Box>
    </Box>
  );
}
