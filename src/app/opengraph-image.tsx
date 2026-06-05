import { ImageResponse } from "next/og";
import { readFileSync } from "fs";
import { join } from "path";

export const runtime = "nodejs";
export const alt = "Agentic-SDLC.org — Home of the Agentic SDLC Playbook";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const robotData = readFileSync(join(process.cwd(), "public/assets/robot.png"));
  const robotBase64 = `data:image/png;base64,${robotData.toString("base64")}`;

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
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={robotBase64}
          width={160}
          height={160}
          style={{ marginBottom: "36px" }}
        />

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

        <div
          style={{
            width: "60px",
            height: "3px",
            backgroundColor: "#c8f0ee",
            marginBottom: "24px",
          }}
        />

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
