"use client";

import { Toaster } from "react-hot-toast";

export default function ToastProvider() {
  return (
    <Toaster
      position="bottom-center"
      toastOptions={{
        style: {
          background: "#191920",
          color: "#f4f4f6",
          border: "1px solid #24242c",
          fontSize: "14px",
        },
        success: { iconTheme: { primary: "#ccff00", secondary: "#0a0a0c" } },
      }}
    />
  );
}
