"use client";
import { ThemeProvider, CssBaseline} from "@mui/material";
import theme from "@/theme/theme";
import "../app/globals.css";
import ProgressBar from "@/components/progressbar";
import { ReactNode } from "react";
import { Toaster } from "react-hot-toast";

export default function RootLayout({ children }: { children: ReactNode }) {

  return (
    <html lang="en">
      <body>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/dheereshagrwal/coloured-icons@master/src/app/ci.min.css"
        />

        <ThemeProvider theme={theme}>
          <CssBaseline />
          <ProgressBar />
          <Toaster position="bottom-right" reverseOrder={false} />
          <div suppressHydrationWarning>
          {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
