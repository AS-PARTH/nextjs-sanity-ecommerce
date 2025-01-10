"use client";
import Navbar from "@/src/components/Navbar";
import Script from "next/script";
import React, { useEffect } from "react";
import "../style/globals.css";

declare global {
  interface Window {
    CE2: any;
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    const isEditingSession = () => {
      // Check if the URL contains "/edit" indicating we're in the Crazy Egg editor
      return window.location.href.includes("/edit");
    };

    // Function to ensure Crazy Egg script is ready and variant changes are applied
    const checkVariantReady = () => {
      if (window.CE2 && typeof window.CE2 === "object") {
        console.log("Crazy Egg variant applied");
        // Remove the hidden class when the variant is applied (if not in editing mode)
        if (!isEditingSession()) {
          document.getElementById("ab-content")?.classList.remove("hidden");
        }
      } else {
        setTimeout(checkVariantReady, 50); // Retry every 50ms if Crazy Egg is not ready
      }
    };

    if (!isEditingSession()) {
      // For non-editing sessions, initially hide the content
      const abContent = document.getElementById("ab-content");
      if (abContent) {
        abContent.classList.add("hidden");
      }
      checkVariantReady(); // Start checking Crazy Egg variant immediately
    } else {
      // If editing mode is detected, immediately show the content
      console.log("Crazy Egg editor detected; content is visible");
      document.getElementById("ab-content")?.classList.remove("hidden");
    }
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
        {/* A/B Testing Content */}
        <main id="ab-content" className="hidden">
          {children}
        </main>
      </body>
    </html>
  );
}
