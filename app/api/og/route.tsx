import { ImageResponse } from "next/og";

export const runtime = "nodejs";
export const dynamic = "force-static";

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#F6F2FF",
          fontSize: "64px",
          fontWeight: 700,
          color: "#7C3AED",
        }}
      >
        친구 케미 궁합
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
