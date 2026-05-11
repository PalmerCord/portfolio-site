import { ImageResponse } from "next/og";

export const alt = "Cord Palmer – Full Stack Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          padding: "80px 88px",
          background: "#0b1623",
          position: "relative",
          overflow: "hidden",
          fontFamily: "Inter, sans-serif",
        }}
      >
        {/* Teal glow — top left */}
        <div
          style={{
            position: "absolute",
            top: -160,
            left: -160,
            width: 640,
            height: 640,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(0,190,168,0.22) 0%, transparent 65%)",
            display: "flex",
          }}
        />
        {/* Blue/violet glow — top right */}
        <div
          style={{
            position: "absolute",
            top: -100,
            right: -60,
            width: 520,
            height: 520,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(99,130,255,0.16) 0%, transparent 65%)",
            display: "flex",
          }}
        />
        {/* Subtle bottom-right glow */}
        <div
          style={{
            position: "absolute",
            bottom: -120,
            right: 60,
            width: 380,
            height: 380,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(0,190,168,0.10) 0%, transparent 70%)",
            display: "flex",
          }}
        />

        {/* Thin top accent line */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 3,
            background:
              "linear-gradient(90deg, #00bea8 0%, rgba(99,130,255,0.8) 50%, transparent 100%)",
            display: "flex",
          }}
        />

        {/* Kicker row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            marginBottom: 28,
          }}
        >
          <div
            style={{
              width: 36,
              height: 2,
              background: "#00bea8",
              borderRadius: 2,
              display: "flex",
            }}
          />
          <span
            style={{
              color: "#00bea8",
              fontSize: 15,
              fontWeight: 600,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
            }}
          >
            Full Stack Engineer · Product Builder
          </span>
        </div>

        {/* Name */}
        <div
          style={{
            fontSize: 104,
            fontWeight: 700,
            color: "#eef2f6",
            letterSpacing: "-0.04em",
            lineHeight: 0.95,
            marginBottom: 28,
            display: "flex",
          }}
        >
          Cord Palmer
        </div>

        {/* Description */}
        <div
          style={{
            fontSize: 22,
            fontWeight: 400,
            color: "#7a96ae",
            lineHeight: 1.55,
            maxWidth: 680,
            marginBottom: 52,
            display: "flex",
          }}
        >
          Building high-performance products and premium digital experiences
          with a focus on motion, conversion, and real-world production work.
        </div>

        {/* Pills */}
        <div style={{ display: "flex", gap: 12 }}>
          <div
            style={{
              background: "rgba(0,190,168,0.09)",
              border: "1px solid rgba(0,190,168,0.28)",
              borderRadius: 100,
              padding: "9px 22px",
              fontSize: 15,
              fontWeight: 600,
              color: "#7dcfca",
              display: "flex",
            }}
          >
            150+ sites shipped
          </div>
          <div
            style={{
              background: "rgba(0,190,168,0.09)",
              border: "1px solid rgba(0,190,168,0.28)",
              borderRadius: 100,
              padding: "9px 22px",
              fontSize: 15,
              fontWeight: 600,
              color: "#7dcfca",
              display: "flex",
            }}
          >
            Live portfolio archive
          </div>
          <div
            style={{
              background: "rgba(0,190,168,0.09)",
              border: "1px solid rgba(0,190,168,0.28)",
              borderRadius: 100,
              padding: "9px 22px",
              fontSize: 15,
              fontWeight: 600,
              color: "#7dcfca",
              display: "flex",
            }}
          >
            Ecommerce &amp; regulated industries
          </div>
        </div>

        {/* Bottom-right: URL */}
        <div
          style={{
            position: "absolute",
            bottom: 52,
            right: 88,
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          <div
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: "#00bea8",
              display: "flex",
            }}
          />
          <span
            style={{
              color: "#3d5f72",
              fontSize: 17,
              fontWeight: 600,
              letterSpacing: "0.04em",
            }}
          >
            cordpalmer.com
          </span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
