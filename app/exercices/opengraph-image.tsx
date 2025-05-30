import { ImageResponse } from "next/og"

export const runtime = "edge"

export const alt = "Catalogue d'exercices - Playbook Kristy"
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
        background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
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
          fontSize: "64px",
          fontWeight: "bold",
          marginBottom: "20px",
          textAlign: "center",
        }}
      >
        📚 Catalogue d'exercices
      </div>

      {/* Subtitle */}
      <div
        style={{
          fontSize: "32px",
          marginBottom: "40px",
          textAlign: "center",
          opacity: 0.9,
        }}
      >
        Explorez nos exercices de développement personnel
      </div>

      {/* Exercise categories */}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          width: "100%",
          gap: "30px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            borderRadius: "20px",
            padding: "30px 20px",
            flex: 1,
          }}
        >
          <div style={{ fontSize: "40px", marginBottom: "15px" }}>🌱</div>
          <div style={{ fontSize: "18px", textAlign: "center", fontWeight: "600" }}>Découvrir ses racines</div>
          <div style={{ fontSize: "14px", textAlign: "center", opacity: 0.8, marginTop: "5px" }}>
            5 exercices disponibles
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            borderRadius: "20px",
            padding: "30px 20px",
            flex: 1,
          }}
        >
          <div style={{ fontSize: "40px", marginBottom: "15px" }}>🔍</div>
          <div style={{ fontSize: "18px", textAlign: "center", fontWeight: "600" }}>Décoder</div>
          <div style={{ fontSize: "14px", textAlign: "center", opacity: 0.8, marginTop: "5px" }}>
            Livre 2 - Fin 2025
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            borderRadius: "20px",
            padding: "30px 20px",
            flex: 1,
          }}
        >
          <div style={{ fontSize: "40px", marginBottom: "15px" }}>✨</div>
          <div style={{ fontSize: "18px", textAlign: "center", fontWeight: "600" }}>Se transformer</div>
          <div style={{ fontSize: "14px", textAlign: "center", opacity: 0.8, marginTop: "5px" }}>Livre 3 - 2026</div>
        </div>
      </div>

      {/* Footer */}
      <div
        style={{
          marginTop: "40px",
          fontSize: "20px",
          opacity: 0.8,
          textAlign: "center",
        }}
      >
        playbook.kristy-blog.fr
      </div>
    </div>,
    {
      ...size,
    },
  )
}
