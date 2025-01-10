"use client"
import Navbar from "@/src/components/Navbar";
import Script from "next/script";
import React, { useEffect } from "react";
import "../style/globals.css";

declare global {
  interface Window {
    CE2: any;
  }
}

// export const metadata = {
//   title: "Next.js",
//   description: "Generated by Next.js",
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    // Function to ensure Crazy Egg script is ready and variant changes are applied
    const checkVariantReady = () => {
      if (window.CE2 && typeof window.CE2 === "object") {
        document.documentElement.style.visibility = "visible"; // Show the content
        console.log("Crazy Egg variant applied");
      } else {
        setTimeout(checkVariantReady, 50); // Retry every 50ms
      }
    };

    // Initially hide the content
    document.documentElement.style.visibility = "hidden";

    checkVariantReady(); // Start checking for variant readiness
  }, []);

  return (
    <html lang="en">
      <head>
        <Script
          src="//script.crazyegg.com/pages/scripts/0127/8659.js"
          strategy="afterInteractive"
          onLoad={() => console.log("Crazy Egg script loaded")}
        />
      </head>
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
