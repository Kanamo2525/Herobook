import { ImageResponse } from "next/og"

export const runtime = "edge"

export const size = {
  width: 180,
  height: 180,
}

export const contentType = "image/png"

export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        fontSize: 100,
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
        borderRadius: "22%",
      }}
    >
      KA
    </div>,
    {
      ...size,
    },
  )
}
