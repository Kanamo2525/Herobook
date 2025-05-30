import { ImageResponse } from "next/og"

export const runtime = "edge"

export const contentType = "image/x-icon"

export default function Favicon() {
  return new ImageResponse(
    <div
      style={{
        fontSize: 12,
        background: "#eee2cc",
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#333",
        fontWeight: "500",
        fontFamily: "Georgia, serif",
        letterSpacing: "-0.03em",
      }}
    >
      KA
    </div>,
    {
      width: 16,
      height: 16,
    },
  )
}
