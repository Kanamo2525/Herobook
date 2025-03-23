import { Html, Head, Body, Container, Section, Text, Heading } from "@react-email/components"

export function CahierEmail({ exercices, metriques }) {
  return (
    <Html>
      <Head />
      <Body style={main}>
        <Container>
          <Heading style={heading}>Votre Cahier d'Exercices Personnalisé</Heading>

          <Section style={metriquesSection}>
            <Heading as="h2" style={subHeading}>
              Métriques
            </Heading>
            <Text>Nombre total d'exercices : {metriques.totalExercices}</Text>
            <Text>Nombre de thématiques : {metriques.nombreThematiques}</Text>
            <Text>Durée totale : {metriques.dureeTotale} minutes</Text>
            <Text>Niveaux couverts : {metriques.niveauxCouverts.join(", ")}</Text>
          </Section>

          <Section>
            <Heading as="h2" style={subHeading}>
              Vos Exercices
            </Heading>
            {exercices.map((exercice, index) => (
              <Section key={exercice.id} style={exerciceSection}>
                <Heading as="h3" style={exerciceTitle}>
                  {exercice.nom}
                </Heading>
                <Text style={exerciceMetadata}>
                  Catégorie : {exercice.categorie} | Durée : {exercice.duree} min | Niveau : {exercice.niveau}
                </Text>
                <Text>{exercice.description}</Text>
                <Heading as="h4" style={instructionsHeading}>
                  Instructions :
                </Heading>
                <ol>
                  {exercice.instructions.map((instruction, i) => (
                    <li key={i} style={instructionItem}>
                      {instruction}
                    </li>
                  ))}
                </ol>
                <Text style={conclusion}>{exercice.conclusion}</Text>
              </Section>
            ))}
          </Section>
        </Container>
      </Body>
    </Html>
  )
}

const main = {
  backgroundColor: "#f6f9fc",
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
}

const heading = {
  fontSize: "32px",
  lineHeight: "1.3",
  fontWeight: "700",
  color: "#1a1a1a",
}

const subHeading = {
  fontSize: "22px",
  lineHeight: "1.3",
  fontWeight: "600",
  color: "#2a2a2a",
}

const metriquesSection = {
  padding: "20px",
  backgroundColor: "#ffffff",
  borderRadius: "5px",
  marginBottom: "20px",
}

const exerciceSection = {
  padding: "20px",
  backgroundColor: "#ffffff",
  borderRadius: "5px",
  marginBottom: "20px",
}

const exerciceTitle = {
  fontSize: "20px",
  fontWeight: "600",
  color: "#2a2a2a",
}

const exerciceMetadata = {
  fontSize: "14px",
  color: "#666666",
}

const instructionsHeading = {
  fontSize: "16px",
  fontWeight: "600",
  color: "#2a2a2a",
}

const instructionItem = {
  marginBottom: "10px",
}

const conclusion = {
  fontStyle: "italic",
  color: "#666666",
}

