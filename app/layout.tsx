import React from "react";
import "./globals.css"; // Optional: keep this if you have global styles/Tailwind

export const metadata = {
  title: "Our Memory Vault 💾",
  description: "A digital scrapbook for my girl",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}