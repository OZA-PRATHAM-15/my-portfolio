"use client";

import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Stack,
  CircularProgress,
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";

type Difficulty = "easy" | "medium" | "hard";

interface Question {
  id: number;
  question: string;
  options: string[];
  answer: number;
  difficulty: Difficulty;
}

const dummyQuestions: Question[] = [
  {
    id: 1,
    question: "What is 2 + 2?",
    options: ["3", "4", "5", "22"],
    answer: 1,
    difficulty: "easy",
  },
  {
    id: 2,
    question: "What is the capital of France?",
    options: ["Madrid", "Berlin", "Paris", "Rome"],
    answer: 2,
    difficulty: "medium",
  },
  {
    id: 3,
    question: "What is the time complexity of binary search?",
    options: ["O(n)", "O(log n)", "O(n log n)", "O(1)"],
    answer: 1,
    difficulty: "hard",
  },
];

const encouragements = [
  "You're doing awesome! Keep going 💪",
  "Every step is a step forward!",
  "Don’t overthink—go with your gut!",
  "You’ve got this! Just stay focused.",
  "Halfway there! Keep up the pace.",
  "Trust your instincts. They’re sharp!",
  "Last one! Finish strong!",
];

export default function Questions({
  name = "User",
  avatarId = "",
  categoryId = "",
}: {
  name?: string;
  avatarId?: string;
  categoryId?: string;
}) {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState(15);
  const [showNext, setShowNext] = useState(false);
  const [history, setHistory] = useState<Question[]>([]);
  const [animKey, setAnimKey] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<number[]>(
    []
  );

  const current = dummyQuestions[questionIndex];

  const handleNext = () => {
    const isCorrect = selected === current.answer;
    setHistory((prev) => [...prev, current]);

    const currentDiff = current.difficulty;
    const next = (() => {
      if (isCorrect) {
        if (currentDiff === "easy")
          return dummyQuestions.find((q) => q.difficulty === "medium" && !history.includes(q));
        if (currentDiff === "medium")
          return dummyQuestions.find((q) => q.difficulty === "hard" && !history.includes(q));
      } else {
        if (currentDiff === "hard")
          return dummyQuestions.find((q) => q.difficulty === "medium" && !history.includes(q));
        if (currentDiff === "medium")
          return dummyQuestions.find((q) => q.difficulty === "easy" && !history.includes(q));
      }
      return null;
    })();

  useEffect(() => {
    if (selected === null) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          handleNext();
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [selected, handleNext]);

  useEffect(() => {
    setTimeLeft(15);
    setSelected(null);
    setShowNext(false);
    setAnimKey((k) => k + 1);
  }, [questionIndex]);


    if (next) {
      const nextIndex = dummyQuestions.findIndex((q) => q.id === next.id);
      setQuestionIndex(nextIndex);
    } else {
      alert("🎉 Quiz Finished! We'll show final results soon.");
    }
  };

  const handleCheckboxChange = (idx: number) => {
    setSelectedOptions((prev) =>
      prev.includes(idx)
        ? prev.filter((i) => i !== idx)
        : [...prev, idx]
    );
  };

  return (
    <Box
      minHeight="65vh"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      px={10}
      position="relative"
    >
      <Box display="flex" alignItems="center" gap={2} position="absolute" top={1} left={150}>
        <Typography fontWeight="bold">All the Best {name}</Typography>
      </Box>

      {selected == null && (
        <Box position="absolute" top={0} right={-30} textAlign="center">
          <Box position="relative" display="inline-flex">
            <CircularProgress
              variant="determinate"
              value={(timeLeft / 15) * 100}
              size={55}
              sx={{ color: "#1976d2" }}
            />
            <Box
              position="absolute"
              top={2}
              left={0}
              bottom={0}
              right={0}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Typography variant="subtitle1" color="textSecondary">
                {timeLeft}s
              </Typography>
            </Box>
          </Box>
        </Box>
      )}

      <AnimatePresence mode="wait">
        <motion.div
          key={animKey}
          initial={{ x: 200, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -100, opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Box textAlign="left" mb={3} top={40} left={-80} position="relative">
            <Typography variant="h6" color="primary" mt={1}>
              {current.question}
            </Typography>
          </Box>

          <Stack spacing={2} direction="column" alignItems="flex-start" width="100%" top={30} left={-20} position="relative">
            {current.options.map((opt, idx) => (
              <Box
                key={idx}
                display="flex"
                alignItems="center"
                gap={2}
                width="100%"
                px={2}
                py={1.5}
                sx={{
                  border: selectedOptions.includes(idx)
                    ? "2px solid #1976d2"
                    : "2px solid #ccc",
                  borderRadius: 2,
                  cursor: "pointer",
                  background: selectedOptions.includes(idx)
                    ? "rgba(25, 118, 210, 0.08)"
                    : "#fafafa",
                  transition: "border 0.2s, background 0.2s",
                  fontWeight: selectedOptions.includes(idx) ? 600 : 400,
                  boxShadow: selectedOptions.includes(idx)
                    ? "0 2px 8px rgba(25,118,210,0.08)"
                    : "none",
                  "&:hover": {
                    border: "2px solid #1976d2",
                  },
                }}
                onClick={() => handleCheckboxChange(idx)}
              >
                <Typography
                  variant="body1"
                  color="text.secondary"
                  minWidth={24}
                  fontWeight={600}
                >
                  {idx + 1}.
                </Typography>
                <Typography variant="body1">{opt}</Typography>
              </Box>
            ))}
          </Stack>

          <Box textAlign="center" my={5} left={190} top={10} position="relative">
            <Typography
              variant="body2"
              color="warning.main"
              sx={{
                cursor: selected === null ? "not-allowed" : "pointer",
                opacity: selected === null ? 0.5 : 1,
                transition: "color 0.2s",
                fontWeight: 600,
                userSelect: "none",
                display: "inline-block",
              }}
              onClick={() => {
                if (selected === null) return;
                setSelected(null);
                setShowNext(false);
                setTimeLeft(15);
              }}
            >
              Clear Response
            </Typography>
          </Box>

          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mt={3}
            px={1}
            gap={10}
          >
            <Typography fontStyle="italic" color="textSecondary" left={-29} bottom={-30} position="relative">
              {encouragements[questionIndex]}
            </Typography>
            </Box>
            <Box display="flex" gap={2} left={350} position="relative">
            <Button
              variant="contained"
              onClick={handleNext}
              disabled={!showNext}
            >
              Next
            </Button>
            </Box>  

        </motion.div>
      </AnimatePresence>
    </Box>
  );
}
