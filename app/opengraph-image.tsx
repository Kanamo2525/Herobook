import { ImageResponse } from "next/og"

export const runtime = "edge"

export const alt = "Playbook Kristy - Le cahier d'exercices"
export const size = {
  width: 1200,
  height: 630,
}

export const contentType = "image/png"

export default function Image() {
  return new ImageResponse(
    <div
      style={{
        fontSize: 128,
        background: "linear-gradient(to bottom, #000000, #333333)",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        padding: "40px",
      }}
    >
      <div style={{ fontSize: "64px", fontWeight: "bold", marginBottom: "20px" }}>Playbook Kristy</div>
      <div style={{ fontSize: "48px", textAlign: "center", maxWidth: "80%" }}>
        Le cahier d'exercices pour votre développement personnel
      </div>
    </div>,
    {
      ...size,
    },
  )
}
