"use client";
import { useEffect, useState } from "react";
import {
  Typography,
  TextField,
  Button,
  Box,
  Avatar,
  Stack,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  FormHelperText,
  LinearProgress,
} from "@mui/material";
import { motion } from "framer-motion";
import Questions from "./questions";

interface AvatarType {
  id: string;
  url: string;
}

interface CategoryType {
  id: string;
  name: string;
}

interface QuizUserResponse {
  success: boolean;
  data?: { id: string };
}

const funnyLoadingMessages = [
  "Doing last-minute prep... or just panicking 😬",
  "Summoning avatars from the meme realm...",
  "Picking the toughest quiz questions... then replacing them with easier ones 😎",
  "Connecting to the quiz universe... one bit at a time.",
  "Brewing some brain juice 🧠💭",
];

export default function Registration({
  onRegisterAction,
}: {
  onRegisterAction: (userId: string) => void;
}) {
  const [name, setName] = useState<string>("");
  const [avatarId, setAvatarId] = useState<string | null>(null);
  const [categoryId, setCategoryId] = useState<string | null>(null);
  const [avatars, setAvatars] = useState<AvatarType[]>([]);
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [initialLoading, setInitialLoading] = useState(true);
  const [funnyIndex, setFunnyIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const avatarRes = await fetch("/api/graphql", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            query: `query { getAllAvatars { id url } }`,
          }),
        });
        const avatarData = await avatarRes.json();
        setAvatars(avatarData.data.getAllAvatars || []);

        const categoryRes = await fetch("/api/graphql", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            query: `query { getAllCategories { id name } }`,
          }),
        });
        const categoryData = await categoryRes.json();
        setCategories(categoryData.data.getAllCategories || []);

        setInitialLoading(false);
        setProgress(100);
      } catch (err) {
        console.error("Fetching failed", err);
        setInitialLoading(false);
        setProgress(100);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (!initialLoading) return;

    const interval = setInterval(() => {
      setFunnyIndex(
        (prev) => (prev + 1) % funnyLoadingMessages.length
      );
    }, 2500);

    const progressInterval = setInterval(() => {
      setProgress((prev) => (prev < 90 ? prev + 10 : prev));
    }, 400);

    return () => {
      clearInterval(interval);
      clearInterval(progressInterval);
    };
  }, [initialLoading]);

  const validateName = (name: string): boolean => {
    const blacklist = [/admin/i, /god/i, /devil/i, /hacker/i];
    return (
      name.length >= 2 &&
      name.length <= 20 &&
      !blacklist.some((rx) => rx.test(name))
    );
  };

  const handleSubmit = async () => {
    if (!validateName(name) || !avatarId || !categoryId) return;

    setLoading(true);

    try {
      const res = await fetch("/api/quiz-users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          avatar_id: avatarId,
          category_id: categoryId,
        }),
      });

      const result: QuizUserResponse = await res.json();

      if (result.success && result.data?.id) {
        onRegisterAction(result.data.id);

        setTimeout(() => {
          setLoading(false);
          setShowQuiz(true);
        }, 1000);
      } else {
        setError("Something went wrong. Please try again.");
        setLoading(false);
      }
    } catch (err) {
      console.error("Error creating quiz user:", err);
      setError("Failed to connect to server");
      setLoading(false);
    }
  };

  if (showQuiz) {
    return (
      <Questions
        name={name}
        avatarId={avatarId!}
        categoryId={categoryId!}
      />
    );
  }

  if (initialLoading) {
    return (
      <Box
        sx={{
          height: 400,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          px: 3,
          py: 15,
        }}
      >
        <LinearProgress
          variant="determinate"
          value={progress}
          sx={{
            width: "100%",
            maxWidth: 400,
            height: 8,
            borderRadius: 2,
            mt: 5,
            mb: 3,
            backgroundColor: "#e0e0e0",
            "& .MuiLinearProgress-bar": {
              backgroundColor: "#1976d2",
            },
          }}
        />
        <Typography
          variant="body1"
          fontWeight="bold"
          textAlign="center"
        >
          {funnyLoadingMessages[funnyIndex]}
        </Typography>
      </Box>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.4 }}
    >
      <Typography
        variant="h5"
        fontWeight="bold"
        mb={2}
        textAlign="center"
      >
        Registration
      </Typography>

      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle1" mb={2}>
          Choose Your Avatar
        </Typography>
        <Stack direction="row" spacing={2} flexWrap="wrap">
          {avatars.map((av) => (
            <Avatar
              key={av.id}
              src={av.url}
              onClick={() => setAvatarId(av.id)}
              sx={{
                width: 70,
                height: 70,
                border:
                  avatarId === av.id
                    ? "3px solid #1976d2"
                    : "2px solid transparent",
                cursor: "pointer",
                transition: "0.3s",
              }}
            />
          ))}
        </Stack>
      </Box>

      <TextField
        fullWidth
        label="Name"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
          setError(null);
        }}
        error={name.length > 0 && !validateName(name)}
        helperText={
          name.length === 1
            ? "Name too short. Give us something real!"
            : name.length > 20
            ? "Woah, that’s too long! Keep it under 20 characters."
            : /admin|god|devil|hacker/i.test(name)
            ? "Why you wanna be cool huh? Use something else 😒"
            : " "
        }
        sx={{ mb: 3 }}
      />

      <FormControl fullWidth sx={{ mb: 3 }}>
        <InputLabel>Select Category</InputLabel>
        <Select
          value={categoryId || ""}
          label="Select Category"
          onChange={(e) =>
            setCategoryId(e.target.value as string)
          }
          MenuProps={{
            PaperProps: {
              sx: {
                mt: 1,
                bgcolor: "white",
                maxHeight: 110,
                zIndex: 1500,
              },
            },
          }}
        >
          {categories.map((cat) => (
            <MenuItem key={cat.id} value={cat.id}>
              {cat.name}
            </MenuItem>
          ))}
        </Select>
        <FormHelperText>Select your quiz topic</FormHelperText>
      </FormControl>

      <Box textAlign="center">
        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={
            !validateName(name) ||
            !avatarId ||
            !categoryId ||
            loading
          }
        >
          {loading ? "Starting..." : "Start Quiz"}
        </Button>
        {error && (
          <Typography color="error" mt={2}>
            {error}
          </Typography>
        )}
      </Box>
    </motion.div>
  );
}
