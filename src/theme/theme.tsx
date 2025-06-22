import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2", 
    },
    secondary: {
      main: "#ffffff",
    },
    background: {
      default: "linear-gradient(to bottom,rgb(221, 231, 235),rgb(255, 255, 255))",
      paper: "linear-gradient(to bottom,rgb(255, 255, 255),rgb(255, 255, 255))",
    },
    text: {
      primary: "#181818",
      secondary: "#1976d2",
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Arial", sans-serif',
    h1: { fontWeight: 700 },
    h2: { fontWeight: 600 },
    h3: { fontWeight: 600 },
    h4: { fontWeight: 500 },
    h5: { fontWeight: 500 },
    h6: { fontWeight: 500 },
  },
});

export default theme;
