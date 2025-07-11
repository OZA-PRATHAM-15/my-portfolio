import Providers from "@/components/providers";

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
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
