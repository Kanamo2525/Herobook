import { ImageResponse } from "next/og"

export const runtime = "edge"

export const alt = "Mon Cahier d'exercices - Playbook Kristy"
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
        background: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
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
        📖 Mon Cahier d'exercices
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
        Créez votre cahier personnalisé
      </div>

      {/* Features */}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          width: "100%",
          gap: "40px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: "rgba(255, 255, 255, 0.15)",
            borderRadius: "20px",
            padding: "30px 20px",
            flex: 1,
          }}
        >
          <div style={{ fontSize: "48px", marginBottom: "15px" }}>✅</div>
          <div style={{ fontSize: "20px", textAlign: "center", fontWeight: "600" }}>Sélectionnez vos exercices</div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: "rgba(255, 255, 255, 0.15)",
            borderRadius: "20px",
            padding: "30px 20px",
            flex: 1,
          }}
        >
          <div style={{ fontSize: "48px", marginBottom: "15px" }}>📄</div>
          <div style={{ fontSize: "20px", textAlign: "center", fontWeight: "600" }}>Générez votre PDF</div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: "rgba(255, 255, 255, 0.15)",
            borderRadius: "20px",
            padding: "30px 20px",
            flex: 1,
          }}
        >
          <div style={{ fontSize: "48px", marginBottom: "15px" }}>📧</div>
          <div style={{ fontSize: "20px", textAlign: "center", fontWeight: "600" }}>Recevez par email</div>
        </div>
      </div>

      {/* Call to action */}
      <div
        style={{
          marginTop: "40px",
          fontSize: "24px",
          textAlign: "center",
          backgroundColor: "rgba(255, 255, 255, 0.2)",
          borderRadius: "15px",
          padding: "15px 30px",
        }}
      >
        Commencez votre développement personnel dès maintenant !
      </div>
    </div>,
    {
      ...size,
    },
  )
}
