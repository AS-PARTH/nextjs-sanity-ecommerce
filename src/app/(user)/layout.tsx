"use client"
import Navbar from "@/src/components/Navbar";
import React, { useEffect } from "react";
import "../style/globals.css";

declare global {
  interface Window {
    CE2?: any;
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
    // Function to load Crazy Egg script dynamically
    const loadCrazyEggScript = () => {
      const script = document.createElement('script');
      script.src = "//script.crazyegg.com/pages/scripts/0127/8659.js";
      script.async = true;
      document.head.appendChild(script);

      script.onload = () => {
        console.log("Crazy Egg script loaded.");
        checkCrazyEggVariant();
      };
    };

    // Function to check if Crazy Egg variant is applied
    const checkCrazyEggVariant = () => {
      if (window.CE2 && typeof window.CE2 === "object") {
        // Wait for the iframe to be available in the DOM
        const iframe = document.querySelector('iframe[id="test-editor-frame"]') as HTMLIFrameElement;
        
        if (iframe) {
          // Ensure the iframe's content is visible
          iframe.style.visibility = "visible";

          const iframeDocument = iframe.contentDocument || iframe.contentWindow?.document;
          if (iframeDocument) {
            const abContent = iframeDocument.getElementById("ab-content");
            if (abContent) {
              abContent.style.display = "block"; // Show content once the variant is applied
              console.log("Crazy Egg variant applied, content is now visible.");
            }
          }
        }
      } else {
        // Retry every 50ms until the variant is applied
        setTimeout(checkCrazyEggVariant, 50);
      }
    };

    loadCrazyEggScript(); // Load the script immediately

  }, []);

  return (
    <html lang="en">
      <head>
        {/* Crazy Egg script is loaded dynamically in useEffect */}
      </head>
      <body>
        <main id="ab-content" style={{ display: "none" }}>
          <Navbar />
          {children}
        </main>
        {/* The iframe is dynamically injected and not hardcoded here */}
      </body>
    </html>
  );
}
