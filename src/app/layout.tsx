import Providers from "@/components/providers";
import ProgressBar from "@/components/progressbar";
import "@/app/globals.css";

export const metadata = {
  title: "Pratham Oza — Portfolio",
  description: "Creative Developer Portfolio",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <title>Pratham Oza — Portfolio</title>
        <meta name="description" content="Creative Developer Portfolio" />
        <link rel="icon" href="/favicon.ico" type="image/x-icon" sizes="any" />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/dheereshag/coloured-icons@master/app/ci.min.css"
        />
      </head>
      <body>
        <ProgressBar />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
