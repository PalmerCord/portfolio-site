import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: 8,
          background: "linear-gradient(145deg, #0f1e30, #0b1623)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Subtle teal glow top-left */}
        <div
          style={{
            position: "absolute",
            top: -6,
            left: -6,
            width: 20,
            height: 20,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(0,190,168,0.35) 0%, transparent 70%)",
            display: "flex",
          }}
        />
        {/* CP monogram */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 13,
            fontWeight: 700,
            color: "#00bea8",
            letterSpacing: "-0.04em",
            lineHeight: 1,
            fontFamily: "sans-serif",
          }}
        >
          CP
        </div>
      </div>
    ),
    { ...size }
  );
}
