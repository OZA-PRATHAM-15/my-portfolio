import {useState } from "react";
import {
  Typography,
  Button,
  IconButton,
  Box,
  Stack,
  Paper,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SendIcon from "@mui/icons-material/Send";
import EmojiObjectsIcon from "@mui/icons-material/EmojiObjects";
import { AnimatePresence, motion } from "framer-motion";
import Registration from "./registration";

export default function Quiz({ closeAction }: { closeAction: () => void }) {
  const [step, setStep] = useState(0);
  const [honest, setHonest] = useState(false);
  const [cheat, setCheat] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [showFinalMessage, setShowFinalMessage] = useState(false);
  const [showRegistration, setShowRegistration] = useState(false);

  const messages = [
    "⚠️ Heads up! This probably won't boost your IQ, but it'll definitely confuse you in hilarious ways. Proceed with caution... or curiosity.",
    "💡 Test your lightning reflexes, flex your brainpower, or hey— just wildly guess like a true genius in disguise. No pressure, only chaotic fun guaranteed.",
    "🎭 Ready for some nonsense? Enter your name, pick an avatar, and bring your A-game (or memes)."
  ];

  const instructions = [
    "1️. Enter your real (or fake but classy) name. Keep it clean, no creepy stuff!",
    "2️. Choose an avatar to represent your chaotic energy.",
    "3️. You’ll face 7 random questions to test your knowledge (or luck).",
    "4️. Timer's ticking — faster answers, better leaderboard bragging rights!",
    "5️. Score 5 or more? Confetti party 🥳 Less than 5? Sad rain awaits 🌧️",
    "6️. Be honest... or click 'I will cheat' and enjoy this side-eye 👀"
  ];

  return (
    <Paper
      elevation={6}
      sx={{
        p: { xs: 3, sm: 4 },
        minHeight: { xs: 350, sm: 450, md: 500 },
        width: { xs: "90%", sm: "80%", md: "40%" },
        mx: "auto",
        textAlign: "center",
        borderRadius: 3,
        position: "relative",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        bgcolor: "#f5f5f5",
      }}
    >
      <IconButton
        onClick={closeAction}
        sx={{
          position: "absolute",
          top: 10,
          right: 10,
          color: "#333",
        }}
      >
        <CloseIcon />
      </IconButton>

      {!showRegistration && (
        <Stack direction="row" spacing={1} justifyContent="center" alignItems="center" sx={{ mb: 2 }}>
          <EmojiObjectsIcon color="primary" />
          <Typography variant="h6" fontWeight="bold">
      Ready for some nonsense?
          </Typography>
        </Stack>
      )}

      <Box
        sx={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          px: 1,
        }}
      >
        <AnimatePresence mode="wait">
           {showRegistration ? (
            <Registration
              onRegisterAction={(userId) => {
                console.log("Quiz user created:", userId);
              }}
            />
          ) : !showFinalMessage ? (
            step < 3 ? (
              <motion.div
                key={step}
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -100, opacity: 0 }}
                 transition={{ duration: 0.3 }} 
               >
                 <Typography variant="h6" sx={{ fontSize: { xs: "1rem", sm: "1.2rem" } }}>
                   {messages[step]}
                 </Typography>
               </motion.div>
             ) : (
               <motion.div
                 key="instructions"
                 initial={{ x: 100, opacity: 0 }}
                 animate={{ x: 0, opacity: 1 }}
                 exit={{ x: -100, opacity: 0 }}
                 transition={{ duration: 0.3 }}
                 style={{ width: "100%" }}
               >
                 {instructions.map((rule, i) => (
                   <Typography
                     key={i}
                     sx={{ textAlign: "left", mb: 1, fontSize: { xs: "0.9rem", sm: "1rem" } }}
                   >
                     {rule}
                   </Typography>
                 ))}

                 <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start", mt: 2 }}>
                   <FormControlLabel
                     control={
                       <Checkbox
                         checked={cheat}
                         onChange={() => {
                           setCheat(!cheat);
                           setHonest(false);
                         }}
                       />
                     }
                     label="I will cheat 😈"
                   />
                   {cheat && (
                     <Typography variant="caption" sx={{ color: "#888", fontStyle: "italic", ml: 4 }}>
                       👀 Be honest... The leaderboard knows all!
                     </Typography>
                   )}

                   <FormControlLabel
                     control={
                       <Checkbox
                         checked={honest}
                         onChange={() => {
                           setHonest(!honest);
                           setCheat(false);
                         }}
                       />
                     }
                     label="I will be honest 🙌"
                   />
                 </Box>
               </motion.div>
             )
           ) : (
             <motion.div
               key="finalMessage"
               initial={{ scale: 0.8, opacity: 0 }}
               animate={{ scale: 1, opacity: 1 }}
               exit={{ scale: 0.8, opacity: 0 }}
               transition={{ duration: 0.4 }}
               style={{ width: "100%" }}
             >
               <Typography variant="h6" sx={{ mb: 2 }}>
                 😅 Developer is Googling quiz questions... Please enjoy the awkward silence!
               </Typography>
               <Button variant="contained" onClick={closeAction}>
                 Close
               </Button>
             </motion.div>
           )}
         </AnimatePresence>
      </Box>

     {!showFinalMessage && !showRegistration && (
        <Box sx={{ display: "flex", justifyContent: "center", gap: 1, mb: 2 }}>
          {messages.map((_, i) => (
            <Box
              key={i}
              sx={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                backgroundColor: step === i ? "#1976d2" : "#ccc",
              }}
            />
          ))}
          {step === 3 && (
            <Box sx={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: "#1976d2" }} />
          )}
        </Box>
      )}

      {!showFinalMessage && !showRegistration && (
        <Box sx={{ display: "flex", justifyContent: step < 3 ? "space-between" : "center", mt: 2 }}>
          {step < 3 && (
            <>
              <Button
                variant="outlined"
                startIcon={<ArrowBackIcon />}
                onClick={() => setStep((prev) => Math.max(prev - 1, 0))}
                sx={{
                  borderColor: "#1976d2",
                  color: "#000",
                  bgcolor: "#fff",
                  "&:hover": { bgcolor: "#e3f2fd" },
                  visibility: step === 0 ? "hidden" : "visible",
                }}
              >
                Previous
              </Button>

              <Button
                variant="contained"
                endIcon={<SendIcon />}
                onClick={() => setStep((prev) => Math.min(prev + 1, 3))}
              >
                {step === 2 ? "Proceed" : "Next"}
              </Button>
            </>
          )}

          {step === 3 && (
            <Button
              variant="contained"
              endIcon={<SendIcon />}
              disabled={!honest}
              onClick={() => setShowRegistration(true)}
            >
              Confirm
            </Button>
          )}
        </Box>
      )}
    </Paper>
  );
}
