import { ImageResponse } from "next/og"

export const runtime = "edge"

export const alt = "Playbook Kristy - Cahier d'exercices de développement personnel"
export const size = {
  width: 1200,
  height: 630,
}

export const contentType = "image/png"

export default function Image() {
  return new ImageResponse(
    <div
      style={{
        fontSize: 48,
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        padding: "60px",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      {/* Header */}
      <div
        style={{
          fontSize: "72px",
          fontWeight: "bold",
          marginBottom: "30px",
          textAlign: "center",
          background: "linear-gradient(90deg, #ffffff 0%, #f0f0f0 100%)",
          backgroundClip: "text",
          color: "transparent",
        }}
      >
        Playbook Kristy
      </div>

      {/* Subtitle */}
      <div
        style={{
          fontSize: "36px",
          marginBottom: "40px",
          textAlign: "center",
          opacity: 0.9,
        }}
      >
        Cahier d'exercices de développement personnel
      </div>

      {/* Features */}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          width: "100%",
          marginBottom: "30px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            flex: 1,
            padding: "0 20px",
          }}
        >
          <div style={{ fontSize: "48px", marginBottom: "10px" }}>🌱</div>
          <div style={{ fontSize: "20px", textAlign: "center" }}>Découvrir ses racines</div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            flex: 1,
            padding: "0 20px",
          }}
        >
          <div style={{ fontSize: "48px", marginBottom: "10px" }}>🧠</div>
          <div style={{ fontSize: "20px", textAlign: "center" }}>Changer d'état d'esprit</div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            flex: 1,
            padding: "0 20px",
          }}
        >
          <div style={{ fontSize: "48px", marginBottom: "10px" }}>✨</div>
          <div style={{ fontSize: "20px", textAlign: "center" }}>Se transformer</div>
        </div>
      </div>

      {/* Stats */}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          gap: "60px",
          marginTop: "20px",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: "32px", fontWeight: "bold" }}>13+</div>
          <div style={{ fontSize: "18px", opacity: 0.8 }}>Exercices</div>
        </div>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: "32px", fontWeight: "bold" }}>4</div>
          <div style={{ fontSize: "18px", opacity: 0.8 }}>Thématiques</div>
        </div>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: "32px", fontWeight: "bold" }}>100%</div>
          <div style={{ fontSize: "18px", opacity: 0.8 }}>Gratuit</div>
        </div>
      </div>
    </div>,
    {
      ...size,
    },
  )
}
