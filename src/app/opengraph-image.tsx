import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Agentic-SDLC.org — Home of the Agentic SDLC Playbook";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const robotUrl = new URL("/assets/robot.png", process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000"
  ).toString();

  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          backgroundColor: "#111111",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "Georgia, serif",
        }}
      >
        {/* Robot head */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={robotUrl}
          width={160}
          height={160}
          style={{ marginBottom: "36px" }}
        />

        {/* Site name */}
        <div
          style={{
            fontSize: "72px",
            fontWeight: 400,
            color: "#ffffff",
            letterSpacing: "0.08em",
            marginBottom: "20px",
          }}
        >
          Agentic-SDLC.org
        </div>

        {/* Accent line */}
        <div
          style={{
            width: "60px",
            height: "3px",
            backgroundColor: "#c8f0ee",
            marginBottom: "24px",
          }}
        />

        {/* Tagline */}
        <div
          style={{
            fontSize: "28px",
            color: "rgba(255,255,255,0.55)",
            letterSpacing: "0.04em",
            fontStyle: "italic",
          }}
        >
          Home of the Agentic SDLC Playbook
        </div>
      </div>
    ),
    { ...size }
  );
}
