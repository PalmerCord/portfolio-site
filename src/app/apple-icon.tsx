import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleTouchIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 180,
          height: 180,
          borderRadius: 40,
          background: "linear-gradient(145deg, #0f1e30, #0b1623)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Teal glow top-left */}
        <div
          style={{
            position: "absolute",
            top: -30,
            left: -30,
            width: 120,
            height: 120,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(0,190,168,0.28) 0%, transparent 70%)",
            display: "flex",
          }}
        />
        {/* Blue glow bottom-right */}
        <div
          style={{
            position: "absolute",
            bottom: -20,
            right: -20,
            width: 90,
            height: 90,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(99,130,255,0.15) 0%, transparent 70%)",
            display: "flex",
          }}
        />
        {/* CP monogram */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 72,
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
