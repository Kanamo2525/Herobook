import {
  Lightbulb,
  Compass,
  TreesIcon as Tree,
  Heart,
  Map,
  Mountain,
  Shield,
  Network,
  Book,
  Cloud,
  Puzzle,
  Brain,
  ReplaceIcon as Transform,
  Target,
  Star,
  Zap,
  Anchor,
  Feather,
  Users,
  Mic,
  Sparkles,
  Moon,
  TimerIcon as Timeline,
} from "lucide-react"
import type React from "react"

export type Exercice = {
  id: string
  nom: string
  description: string
  categorie: string
  icone: React.ComponentType
  couleur: string
  duree: number
  niveau: "Débutant" | "Intermédiaire" | "Avancé"
  instructions: string[]
  conclusion: string
  image?: string
  pdfUrl?: string
}

export const categories = [
  "Les thématiques",
  "Prendre conscience",
  "Devenir un héro",
  "Découvrir ses racines",
  "Etre authentique",
  "S'orienter",
  "Franchir les obstacles",
  "Arrêter l'auto-sabotage",
  "Réseauter",
  "Raconter",
  "Rêver",
  "Decoder",
  "Changer d'état d'esprit",
  "Se transformer",
  "S'accomplir",
]

const iconeMap = {
  Lightbulb,
  Compass,
  Tree,
  Heart,
  Map,
  Mountain,
  Shield,
  Network,
  Book,
  Cloud,
  Puzzle,
  Brain,
  Transform,
  Target,
  Star,
  Zap,
  Anchor,
  Feather,
  Users,
  Mic,
  Sparkles,
  Moon,
  Timeline,
}

export const paletteCouleurs = [
  "#FF4A00",
  "#96BF48",
  "#E37400",
  "#FFE01B",
  "#F06A6A",
  "#FFCC22",
  "#6772E5",
  "#F22F46",
  "#2D8CFF",
  "#0061FF",
  "#00A1E0",
  "#D32D27",
  "#4CAF50",
  "#9C27B0",
  "#FF9800",
]

export const exercices: Exercice[] = [
  {
    id: "1001",
    nom: "Méditation sur l'Alignement (Cercle d'Or et Wu Wei)",
    description:
      "Révéler son authenticité en identifiant son « Pourquoi » et en cultivant l'action sans effort (Wu Wei).",
    categorie: "Etre authentique",
    icone: iconeMap.Anchor,
    couleur: paletteCouleurs[4],
    duree: 30,
    niveau: "Intermédiaire",
    instructions: [
      "Préparez un espace calme et adoptez une posture détendue.",
      "Tracez ou visualisez le Golden Circle (What, How, Why).",
      "Méditez quelques instants sur chaque cercle : Quelles sont mes activités (What), ma façon de faire (How), et ma raison profonde (Why) ?",
      "Pratiquez le Wu Wei : si vous ressentez une tension en cherchant votre « Pourquoi », respirez et laissez émerger vos motivations sans forcer.",
      "Notez vos éclairages : affinez les points importants et laissez le reste reposer si besoin.",
    ],
    conclusion:
      "Relisez régulièrement vos notes pour maintenir une cohérence entre ce que vous faites, comment vous le faites et, surtout, pourquoi vous le faites.",
  },
  {
    id: "1002",
    nom: "Créer sa boussole de vie (Ikigai + Pachamama)",
    description:
      "Allier la réflexion sur l'Ikigai (ce qui nous anime, ce dont le monde a besoin…) à une conscience écologique et communautaire (Pachamama).",
    categorie: "S'orienter",
    icone: iconeMap.Compass,
    couleur: paletteCouleurs[1],
    duree: 45,
    niveau: "Avancé",
    instructions: [
      "Listez vos valeurs environnementales (préservation, lutte contre le gaspillage, etc.).",
      "Faites le lien avec les 4 cercles de l'Ikigai : Ce que vous aimez, en quoi vous êtes doué, ce pour quoi on peut vous rémunérer, ce dont le monde a besoin.",
      "Pratiquez une brève visualisation : imaginez que vous dialoguez avec la Terre-Mère (Pachamama). Notez les actions ou choix qui en découlent.",
      "Dessinez un schéma avec 4 sections (vos valeurs écologiques, vos passions, vos compétences, vos projets d'action). Repérez les synergies évidentes.",
    ],
    conclusion:
      "Peu à peu, construisez une boussole qui oriente à la fois votre épanouissement personnel et votre contribution environnementale.",
  },
  {
    id: "1003",
    nom: "Transformer ses échecs en leçons (Growth Mindset + Kintsugi)",
    description:
      "Apprendre de ses expériences négatives en adoptant une mentalité de progrès et en valorisant ses « cicatrices », à l'instar du Kintsugi.",
    categorie: "Franchir les obstacles",
    icone: iconeMap.Transform,
    couleur: paletteCouleurs[6],
    duree: 40,
    niveau: "Intermédiaire",
    instructions: [
      "Identifiez un échec récent (pro ou perso) et décrivez la situation en quelques lignes.",
      "Recadrez-le en questionnant : Qu'ai-je appris ? Quelles compétences puis-je développer suite à cet événement ?",
      "Visualisez l'échec comme une céramique brisée et « réparez » mentalement chaque fissure en y associant un apprentissage (Kintsugi).",
      "Option créative : dessinez un bol fracturé, reliez les fissures en « or » avec vos leçons écrites.",
    ],
    conclusion:
      "En soulignant vos « cicatrices » plutôt qu'en les cachant, vous reconnaissez la valeur de l'erreur comme tremplin pour votre croissance.",
  },
  {
    id: "1004",
    nom: "Identifier et désamorcer l'auto-sabotage",
    description:
      "Repérer les schémas d'auto-sabotage (abandon, méfiance, perfectionnisme, etc.) et adopter une tactique de blocage adaptée.",
    categorie: "Arrêter l'auto-sabotage",
    icone: iconeMap.Shield,
    couleur: paletteCouleurs[7],
    duree: 35,
    niveau: "Avancé",
    instructions: [
      "Choisissez une situation récente où vous avez ressenti que vous vous auto-sabotiez. Décrivez le contexte et l'impact.",
      "Notez le schéma (abandon, impuissance, honte, peur de l'échec…) le plus susceptible d'expliquer ce comportement.",
      "Décryptez la « voix intérieure » ou l'archétype (Critique, Ombre, Enfant blessé, etc.). Personnifiez-le et dialoguez avec lui.",
      "Appliquez une tactique de blocage : recadrage cognitif, micro-action contraire à la peur, courte méditation ou rituel de libération (écrire puis brûler une peur).",
    ],
    conclusion:
      "En mettant un nom sur vos schémas et en leur opposant un plan d'action, vous remplacez la spirale négative par un cercle vertueux de progression.",
  },
  {
    id: "1005",
    nom: "Tisser son réseau de soutien (Cartographie des parties prenantes + Tribe)",
    description:
      "Élaborer une carte des personnes-clés pour votre projet, en fusionnant la théorie des parties prenantes et la notion de tribu.",
    categorie: "Réseauter",
    icone: iconeMap.Network,
    couleur: paletteCouleurs[8],
    duree: 50,
    niveau: "Intermédiaire",
    instructions: [
      "Définissez clairement le but de votre projet (pro ou perso).",
      "Énumérez les individus ou groupes qui peuvent influencer ou être influencés par ce projet (famille, mentors, collègues, partenaires).",
      "Organisez-les selon leur niveau d'importance et d'influence (modèle stakeholder) tout en valorisant l'esprit de tribu (solidarité, entraide).",
      "Repérez qui joue quel rôle : sponsor, mentor, expert, allié de longue date…",
      "Planifiez vos actions : prise de contact, rencontres, modalités d'échanges.",
    ],
    conclusion:
      "Vous obtenez une vision claire de votre « Tribe », et pouvez ainsi mobiliser plus efficacement un réseau solide et bienveillant.",
  },
  {
    id: "1006",
    nom: "Exercice de Contribution Communautaire (Give Forward)",
    description:
      "Instaurer un rituel de partage ou de soutien auprès de votre communauté, dans l'esprit d'altruisme et de réciprocité.",
    categorie: "Réseauter",
    icone: iconeMap.Users,
    couleur: paletteCouleurs[9],
    duree: 60,
    niveau: "Débutant",
    instructions: [
      "Identifiez une ressource que vous pouvez offrir : savoir-faire, temps, expertise ou simple entraide.",
      "Choisissez un groupe ou une personne susceptible de bénéficier de ce don (association, cercle d'amis, etc.).",
      "Mettez en place votre action : un atelier gratuit, une séance de mentorat, une aide ponctuelle…",
      "Faites le bilan : quelles ont été les répercussions positives ? Quel retour sur l'énergie dépensée ?",
    ],
    conclusion:
      "La contribution envers autrui n'est pas seulement un cadeau donné : c'est aussi un investissement dans la solidité et la vitalité de votre communauté.",
  },
  {
    id: "1007",
    nom: "Storytelling multiculturel (Arc narratif occidental + Traditions orales)",
    description:
      "Apprendre à transmettre un message fort en combinant la structure classique du récit (introduction, conflit, climax, résolution) et la dimension orale vivante (conteur africain/amérindien).",
    categorie: "Raconter",
    icone: iconeMap.Book,
    couleur: paletteCouleurs[10],
    duree: 55,
    niveau: "Avancé",
    instructions: [
      "Choisissez un événement ou un apprentissage marquant que vous souhaitez partager.",
      "Bâtissez un arc narratif : posez le décor, présentez le défi, menez jusqu'au point culminant, concluez avec la morale ou la leçon.",
      "Injectez des éléments de traditions orales : refrains, dialogues, interaction, symboles ou métaphores naturelles.",
      "Répétez à voix haute pour soigner l'intonation, la gestuelle et l'appel à la participation du public (même s'il est imaginaire).",
    ],
    conclusion:
      "Votre histoire gagne en authenticité, en impact et en universalité lorsque vous mariez la structure scénaristique à l'énergie narrative des conteurs traditionnels.",
  },
  {
    id: "1008",
    nom: "Incarner le Conteur Africain (Oralité et Sagesse Transmise)",
    description:
      "Expérimenter l'art du conteur (griot) pour transmettre une leçon de vie ou une valeur, en privilégiant l'oralité et la mise en scène.",
    categorie: "Raconter",
    icone: iconeMap.Mic,
    couleur: paletteCouleurs[11],
    duree: 45,
    niveau: "Intermédiaire",
    instructions: [
      "Sélectionnez une histoire (ou une anecdote) riche en enseignements.",
      "Visualisez-vous comme un conteur devant son public : variez la voix, la posture, introduisez des refrains ou questions pour faire participer.",
      "Faites émerger la morale ou la sagesse sous-jacente, en lien avec la culture orale : mise en avant de la nature, des esprits, ou de la solidarité du clan.",
      "Prenez des retours si possible (ou auto-enregistrez-vous) pour améliorer rythme et fluidité.",
    ],
    conclusion:
      "En incarnant la figure du conteur, vous ressentez la force communicative et l'empreinte culturelle que procure l'oralité.",
  },
  {
    id: "1009",
    nom: "Se reconnecter à ses rêves d'enfance",
    description:
      "Retrouver l'énergie et la spontanéité de l'enfance pour enrichir sa vie d'adulte, en revisitant ses aspirations initiales.",
    categorie: "Rêver",
    icone: iconeMap.Sparkles,
    couleur: paletteCouleurs[12],
    duree: 45,
    niveau: "Débutant",
    instructions: [
      "1. Phase d'écriture (10-15 minutes) :",
      "- Écrivez sur vos rêves d'enfance.",
      "- Répondez aux questions : Quels étaient mes rêves quand j'étais enfant ? Qu'est-ce qui me passionnait ? Y a-t-il des rêves que j'ai abandonnés en grandissant ? Pourquoi ? Comment ces rêves résonnent-ils avec ma vie actuelle ?",
      "2. Phase de visualisation :",
      "- Fermez les yeux et imaginez-vous enfant.",
      "- Visualisez-vous en train de jouer, de rêver, ou de parler de ce que vous voulez devenir plus tard.",
      "- Demandez à votre enfant intérieur : 'Qu'est-ce qui te rendait heureux ? Qu'est-ce que tu voulais vraiment ?'",
      "- Notez les réponses ou les images qui vous viennent après la méditation.",
      "3. Phase de réflexion :",
      "- Réfléchissez à comment vous pourriez intégrer ces rêves d'enfance dans votre vie actuelle.",
      "- Demandez-vous : Y a-t-il un rêve d'enfant que je pourrais raviver ? Comment puis-je honorer cet enfant intérieur dans ma vie quotidienne ?",
      "4. Établissez un mini-plan d'action avec des étapes simples (week-end, soirée libre, contacts à prendre).",
    ],
    conclusion:
      "En renouant avec l'enfant que vous étiez, vous ravivez une source d'enthousiasme et de créativité souvent oubliée à l'âge adulte. Relisez régulièrement vos notes et votre plan d'action pour maintenir cette connexion vivante.",
  },
  {
    id: "1010",
    nom: "Rituel onirique (inspiré des pratiques kanak/aborigènes)",
    description:
      "Créer un rituel pour honorer les rêves, se connecter à leur sagesse, et inviter des rêves porteurs de sens.",
    categorie: "Rêver",
    icone: iconeMap.Moon,
    couleur: paletteCouleurs[13],
    duree: 30,
    niveau: "Intermédiaire",
    instructions: [
      "1. Préparation du rituel :",
      "- Choisissez un moment calme, de préférence le soir avant de dormir.",
      "- Créez un espace sacré : allumez une bougie, utilisez de l'encens ou des plantes.",
      "- Si possible, placez-vous près de la nature (un jardin, une fenêtre ouverte) pour vous connecter aux éléments.",
      "2. Invocation des rêves :",
      "- Inspirez-vous des pratiques kanak et aborigènes pour invoquer les rêves.",
      "- Utilisez une phrase d'invocation comme : 'Je demande aux esprits de mes ancêtres et à la sagesse de la terre de me guider dans mes rêves. Que mes rêves m'apportent des messages clairs et bienveillants pour ma vie.'",
      "- Vous pouvez écrire cette invocation sur un morceau de papier et le placer sous votre oreiller.",
      "3. Offrande symbolique :",
      "- Faites une offrande simple : versez de l'eau sur la terre, déposez une fleur ou une feuille, ou allumez une bougie en signe de gratitude.",
      "4. Journal des rêves :",
      "- Au réveil, notez immédiatement vos rêves dans un journal.",
      "- Posez-vous ces questions pour l'interprétation : Quels éléments naturels ou symboles sont apparus ? Quelles émotions avez-vous ressenties ? Y a-t-il un message ou une guidance dans ce rêve ?",
    ],
    conclusion:
      "En pratiquant régulièrement ce rituel, vous développerez une connexion plus profonde avec vos rêves et la sagesse qu'ils contiennent, tout en honorant les traditions ancestrales.",
  },
  {
    id: "1011",
    nom: "Ligne du temps onirique (projection à 5, 10, 20 ans)",
    description:
      "Aider les lecteurs à visualiser et à projeter leurs rêves et aspirations sur le long terme, en créant une ligne du temps inspirante.",
    categorie: "Rêver",
    icone: iconeMap.Timeline,
    couleur: paletteCouleurs[14],
    duree: 60,
    niveau: "Avancé",
    image: "/images/ligne-temps-onirique.png",
    instructions: [
      "1. Préparation :",
      "- Prenez une grande feuille de papier ou utilisez un tableau pour dessiner une ligne du temps.",
      "- Divisez la ligne en trois sections : 5 ans, 10 ans, 20 ans.",
      "2. Projection des rêves :",
      "- Pour chaque période (5, 10, 20 ans), demandez-vous : Quels sont mes rêves pour cette période de ma vie ? Comment je veux me sentir ? Qu'est-ce que je veux accomplir ? Qui je veux être ?",
      "- Écrivez ou dessinez ces rêves sur la ligne du temps.",
      "- Inspirez-vous des traditions aborigènes en intégrant des éléments naturels ou symboliques (ex.: un arbre pour représenter la croissance, une rivière pour le flux de la vie).",
      "3. Connexion aux ancêtres et à la communauté :",
      "- Demandez-vous : Comment mes rêves peuvent-ils contribuer à ma communauté ou à ma famille ? Qu'est-ce que mes ancêtres m'inspirent pour l'avenir ?",
      "- Ajoutez ces réflexions à votre ligne du temps.",
      "4. Visualisation active :",
      "- Fermez les yeux et visualisez-vous dans 5, 10 et 20 ans, vivant ces rêves.",
      "- Imaginez les détails : où êtes-vous ? Qui est avec vous ? Qu'est-ce que vous faites ?",
      "- Notez les émotions et les sensations qui vous viennent pendant cette visualisation.",
      "5. Actions concrètes :",
      "- Identifiez une ou deux actions que vous pouvez faire dès maintenant pour vous rapprocher de ces rêves.",
      "- Exemple : Si votre rêve à 5 ans est de voyager, commencez à planifier un premier voyage ou à économiser pour cela.",
    ],
    conclusion:
      "Cette ligne du temps onirique vous offre une vision claire et inspirante de votre futur. Revisitez-la régulièrement pour ajuster vos objectifs et maintenir votre motivation à long terme.",
  },
  {
    id: "1012",
    nom: "Mon parcours du héros",
    description:
      "Utilisez le modèle du parcours du héros pour cartographier votre propre transformation personnelle et identifier les étapes clés de votre développement.",
    categorie: "Devenir un héro",
    icone: iconeMap.Star,
    couleur: paletteCouleurs[0],
    duree: 60,
    niveau: "Avancé",
    image: "/images/parcours-du-heros.jpg",
    pdfUrl: "https://drive.google.com/file/d/1Eae6vEWZYgT525XCyR854CyxydI235it/view?usp=sharing",
    instructions: [
      "Téléchargez et imprimez le diagramme du parcours du héros en utilisant le lien PDF fourni.",
      "Identifiez une transformation personnelle importante que vous avez vécue ou que vous souhaitez vivre.",
      "Parcourez chaque étape du voyage (1-12) et réfléchissez à comment elle s'applique à votre situation :",
      "Région du confort habituel : Décrivez votre situation de départ",
      "Point d'activation du déclencheur : Quel événement a initié le changement ?",
      "Plateau de résistance au changement : Quelles résistances avez-vous rencontrées ?",
      "Camp d'entraînement : Comment vous êtes-vous préparé(e) ?",
      "Accélérateur du leadership : Quels mentors ou guides avez-vous rencontrés ?",
      "Terrain d'expérimentation : Quelles premières expériences avez-vous tentées ?",
      "Espace de compréhension : Quelles prises de conscience avez-vous eues ?",
      "Aire d'amélioration : Comment avez-vous progressé ?",
      "Zone de nouvelles connaissances : Qu'avez-vous appris de nouveau ?",
      "Plateformes de transformation : Quel grand changement avez-vous opéré ?",
      "Place des démonstrations : Comment avez-vous mis en pratique vos acquis ?",
      "Espace des résultats et célébrations : Quels sont les fruits de votre transformation ?",
      "Utilisez les espaces de notes du diagramme pour documenter chaque étape de votre parcours.",
    ],
    conclusion:
      "En cartographiant votre parcours du héros, vous prenez conscience de la structure narrative de votre transformation et pouvez mieux anticiper les défis et opportunités des futures aventures de votre vie.",
  },
  {
    id: "1013",
    nom: "Ma boussole de vie (Ikigai + Cercle d'Or)",
    description:
      "Découvrez votre raison d'être en combinant l'approche japonaise de l'Ikigai avec le modèle du Cercle d'Or de Simon Sinek pour créer votre boussole de vie personnelle.",
    categorie: "Prendre conscience",
    icone: iconeMap.Compass,
    couleur: paletteCouleurs[1],
    duree: 75,
    niveau: "Intermédiaire",
    image: "/images/boussole-de-vie.jpg",
    pdfUrl: "https://drive.google.com/file/d/11_6DYW_ChLdrcgRsrHzo6j4YWnUMGdgi/view?usp=sharing",
    instructions: [
      "Téléchargez et imprimez le diagramme de la boussole de vie en utilisant le lien PDF fourni.",
      "Partie 1 - Votre Ikigai : Remplissez chaque section du diagramme de Venn :",
      "• Passion : Listez ce que vous aimez faire, vos centres d'intérêt, ce qui vous passionne",
      "• Profession : Notez ce en quoi vous excellez, vos talents et compétences naturelles",
      "• Vocation : Identifiez ce dont le monde a besoin et qui vous touche personnellement",
      "• Mission : Réfléchissez à ce pourquoi le monde pourrait vous rétribuer (financièrement ou autrement)",
      "• Ikigai (centre) : Synthétisez ce qui émerge à l'intersection de ces quatre domaines",
      "Partie 2 - Votre Cercle d'Or : Complétez les trois niveaux en partant du centre :",
      "• Pourquoi (centre) : Votre raison d'être, vos convictions profondes, vos valeurs fondamentales",
      "• Comment (milieu) : Votre façon unique d'agir, vos méthodes spécifiques, votre style personnel",
      "• Quoi (extérieur) : Vos réalisations concrètes, vos résultats tangibles, votre impact sur les autres",
      "Prenez le temps de faire des liens entre votre Ikigai et votre Cercle d'Or.",
      "Identifiez les cohérences et les éventuelles tensions entre ces deux approches.",
    ],
    conclusion:
      "Cette boussole de vie vous offre une vision claire et structurée de votre raison d'être. Gardez-la à portée de main pour vous guider dans vos décisions importantes et vérifier l'alignement de vos actions avec vos valeurs profondes.",
  },
  {
    id: "1014",
    nom: "Canevas de développement personnel A3 (Synthèse complète)",
    description:
      "Un outil de synthèse complet au format A3 qui combine plusieurs exercices de développement personnel en un seul canevas visuel. Parfait pour avoir une vue d'ensemble de votre parcours et créer votre feuille de route personnalisée.",
    categorie: "S'accomplir",
    icone: iconeMap.Target,
    couleur: paletteCouleurs[0],
    duree: 90,
    niveau: "Avancé",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Outils%20A3.jpg-yrZfCUqjy0J5X2PMoxrSzpGlgm0Cbz.jpeg",
    pdfUrl: "https://drive.google.com/file/d/1YLfEpamB72xLJJC5lDAjDszJC7hCFF9U/view?usp=sharing",
    instructions: [
      "Téléchargez et imprimez le canevas A3 en utilisant le lien PDF fourni (format A3 recommandé pour une meilleure lisibilité).",
      "Préparez un espace de travail calme avec suffisamment de place pour étaler le canevas.",
      "Munissez-vous de stylos de couleurs différentes pour distinguer les différentes sections.",
      "Section 1 - Vision et Valeurs : Définissez votre vision de vie et vos valeurs fondamentales.",
      "Section 2 - Ikigai : Explorez l'intersection entre ce que vous aimez, ce en quoi vous excellez, ce dont le monde a besoin et ce pourquoi vous pouvez être rémunéré.",
      "Section 3 - Objectifs temporels : Projetez-vous à 1 an, 5 ans et 10 ans avec des objectifs concrets.",
      "Section 4 - Ressources et soutiens : Identifiez vos forces, compétences et votre réseau de soutien.",
      "Section 5 - Obstacles et solutions : Anticipez les défis et préparez des stratégies pour les surmonter.",
      "Section 6 - Actions immédiates : Définissez 3 actions concrètes à mettre en place dans les 30 prochains jours.",
      "Prenez le temps de faire des liens entre les différentes sections du canevas.",
      "Une fois complété, affichez votre canevas dans un endroit visible pour vous y référer régulièrement.",
    ],
    conclusion:
      "Ce canevas A3 devient votre tableau de bord personnel pour le développement. Revisitez-le tous les 3 mois pour ajuster vos objectifs et célébrer vos progrès. C'est un outil vivant qui évolue avec vous.",
  },
  {
    id: "1015",
    nom: "Tisser votre histoire personnelle",
    description:
      "Explorez votre parcours de vie pour identifier les transitions majeures, transformer vos épreuves en sagesse et découvrir le fil conducteur de votre histoire personnelle.",
    categorie: "Découvrir ses racines",
    icone: iconeMap.Tree,
    couleur: paletteCouleurs[2],
    duree: 75,
    niveau: "Intermédiaire",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/racines%20exercice%201-kgHYiEBEGoDuLcbapJqvO5ubCVAk58.png",
    instructions: [
      "1. Cartographie des transitions :",
      "- Sur une feuille, tracez une ligne du temps de votre vie",
      "- Identifiez les 3-5 transitions majeures qui ont façonné votre parcours",
      "- Pour chacune, notez : Ce que vous avez dû laisser derrière vous, Ce que vous avez gagné ou découvert, La qualité intérieure qui s'est développée",
      "2. L'alchimie des épreuves :",
      "- Identifiez un défi significatif que vous avez surmonté",
      "- Répondez à ces questions : Quelle force cette épreuve a-t-elle révélée en vous ? Quelle compréhension nouvelle vous a-t-elle apportée ? Comment cette expérience vous sert-elle aujourd'hui ?",
      "3. Le fil conducteur :",
      "- Complétez ces phrases pour révéler le thème intégrateur de votre histoire :",
      "- 'Je suis quelqu'un qui a toujours...'",
      "- 'À travers toutes mes expériences, j'ai constamment...'",
      "- 'La contribution unique que je peux apporter est...'",
      "4. Synthèse :",
      "- Utilisez le diagramme fourni pour organiser vos découvertes",
      "- Reliez vos transitions, épreuves et thèmes intégrateurs dans une vision cohérente de votre parcours",
    ],
    conclusion:
      "Prenez le temps d'explorer ces exercices en profondeur. Ils vous aideront à reconnaître la cohérence cachée dans votre parcours et à puiser dans la sagesse de votre histoire pour éclairer votre chemin actuel. Votre histoire personnelle devient ainsi une boussole pour vos choix futurs.",
  },
  {
    id: "1016",
    nom: "Questions de réflexion personnelle pour votre journal",
    description:
      "Un voyage introspectif à travers la métaphore de l'arbre pour explorer vos racines profondes, vos branches de croissance et vos nouvelles aspirations. Cet exercice de journaling vous invite à une conversation intime avec votre essence.",
    categorie: "Découvrir ses racines",
    icone: iconeMap.Feather,
    couleur: paletteCouleurs[1],
    duree: 45,
    niveau: "Débutant",
    instructions: [
      "Préparez votre espace de journaling : trouvez un moment de calme, installez-vous confortablement avec votre journal ou carnet préféré.",
      "Centrez-vous quelques instants en respirant profondément et en vous connectant à votre intention d'explorer vos racines.",
      "Répondez spontanément à chaque question, en laissant votre intuition vous guider sans censure :",
      "• Si vos racines pouvaient parler, quelle sagesse vous transmettrait-elles aujourd'hui ?",
      "• Quelle branche de votre vie mérite plus de lumière et d'attention en ce moment ?",
      "• Quelles nouvelles feuilles commencent à émerger en vous – ces talents ou aspirations qui demandent à s'exprimer ?",
      "• Si vous pouviez ajouter une nouvelle branche majeure à votre arbre dans les cinq prochaines années, que serait-elle ?",
      "• Quelles tempêtes votre arbre a-t-il traversées, et comment ces expériences l'ont-elles renforcé ?",
      "Écrivez librement, sans vous préoccuper de la forme. Laissez les mots couler naturellement.",
      "Relisez vos réponses et notez les thèmes récurrents ou les insights qui émergent.",
    ],
    conclusion:
      "Ces questions révèlent souvent des vérités profondes sur votre parcours et vos aspirations. Gardez ces réflexions comme une boussole pour vos choix futurs et revisitez-les régulièrement pour observer votre évolution.",
  },
  {
    id: "1017",
    nom: "Guide d'entretien familial",
    description:
      "Créez des ponts intergénérationnels précieux en menant des conversations profondes avec vos proches. Cet exercice transforme les échanges familiaux en moments de découverte mutuelle et de transmission de sagesse.",
    categorie: "Découvrir ses racines",
    icone: iconeMap.Users,
    couleur: paletteCouleurs[3],
    duree: 90,
    niveau: "Intermédiaire",
    instructions: [
      "Choisissez un proche avec qui vous souhaitez approfondir votre connexion (parent, grand-parent, frère, sœur, mentor familial).",
      "Planifiez un moment privilégié : proposez un rendez-vous dans un cadre calme et intime, sans distractions.",
      "Préparez l'atmosphère : expliquez votre démarche et votre désir de mieux comprendre l'histoire familiale et les valeurs transmises.",
      "Posez ces questions avec bienveillance et curiosité authentique :",
      "• 'Quel a été l'un des moments décisifs de ta vie, et comment a-t-il influencé la personne que tu es devenue ?'",
      "• 'Quelles valeurs espères-tu m'avoir transmises, consciemment ou non ?'",
      "• 'Quelle tradition familiale te tient particulièrement à cœur, et pourquoi ?'",
      "• 'Y a-t-il une sagesse que tu as acquise avec l'âge que tu aurais aimé connaître plus tôt ?'",
      "• 'Comment notre famille a-t-elle surmonté ses plus grands défis ?'",
      "Écoutez activement, posez des questions de suivi et montrez votre gratitude pour ce partage.",
      "Si possible, enregistrez la conversation (avec permission) ou prenez des notes après l'échange.",
      "Partagez également vos propres réflexions pour créer un véritable dialogue.",
    ],
    conclusion:
      "Ces conversations sont des trésors qui enrichissent non seulement votre compréhension de vous-même, mais créent aussi des liens familiaux plus profonds. Elles constituent un héritage précieux pour les générations futures et révèlent souvent des patterns familiaux éclairants.",
  },
  {
    id: "1018",
    nom: "Inventaire de votre patrimoine culturel",
    description:
      "Cartographiez la richesse de votre héritage culturel pour mieux comprendre les influences qui vous ont façonné. Cet exercice vous aide à identifier consciemment ce que vous souhaitez honorer, préserver ou transformer dans votre identité culturelle.",
    categorie: "Découvrir ses racines",
    icone: iconeMap.Map,
    couleur: paletteCouleurs[5],
    duree: 60,
    niveau: "Intermédiaire",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Patrimoine%20culturel.jpg-ynM2plvdoNX4F5MiQQuD3HBfchVuJX.jpeg",
    pdfUrl: "https://drive.google.com/file/d/1YaHq4DamjG9BL5UhIUl05kCg6FfWClLe/view?usp=sharing",
    instructions: [
      "Préparez votre espace de travail avec une grande feuille de papier ou utilisez un tableau numérique.",
      "Créez quatre colonnes avec ces intitulés :",
      "• Traditions et célébrations significatives",
      "• Arts et expressions culturelles qui me touchent",
      "• Valeurs culturelles que je souhaite préserver",
      "• Aspects culturels que je choisis de transformer",
      "Réfléchissez aux différentes influences culturelles de votre vie : famille d'origine, région, pays, communautés d'appartenance, voyages, rencontres marquantes.",
      "Remplissez chaque colonne en explorant :",
      "- Les traditions : fêtes, rituels, coutumes familiales ou communautaires qui vous marquent",
      "- Les arts : musiques, danses, littératures, cuisines, artisanats qui résonnent en vous",
      "- Les valeurs : principes, croyances, modes de vie que vous jugez précieux",
      "- Les transformations : aspects que vous souhaitez faire évoluer ou adapter à votre époque",
      "Pour chaque élément, notez pourquoi il vous semble important et comment il influence votre vie actuelle.",
      "Identifiez les connexions entre les différentes colonnes et les tensions éventuelles.",
      "Réfléchissez à la manière dont vous pouvez honorer votre héritage tout en restant authentique à qui vous êtes aujourd'hui.",
    ],
    conclusion:
      "Cet inventaire révèle la richesse multiculturelle de votre identité et vous donne les clés pour choisir consciemment ce que vous souhaitez transmettre. Il vous aide à naviguer entre respect des traditions et évolution personnelle, créant votre propre synthèse culturelle unique.",
  },
]

export function ajouterExercice(nouvelExercice: Exercice) {
  exercices.push(nouvelExercice)
}

const nouveauxExercices: Exercice[] = [] // Declare the variable

function genererExercices(nombre: number): Exercice[] {
  const exercices: Exercice[] = [...nouveauxExercices]
  const iconeCles = Object.keys(iconeMap)

  while (exercices.length < nombre) {
    const iconeCle = iconeCles[Math.floor(Math.random() * iconeCles.length)]
    const categorie = categories[Math.floor(Math.random() * (categories.length - 1)) + 1] // Exclure 'Tout'
    const couleur = paletteCouleurs[Math.floor(Math.random() * paletteCouleurs.length)]
    const niveau = ["Débutant", "Intermédiaire", "Avancé"][Math.floor(Math.random() * 3)] as Exercice["niveau"]

    exercices.push({
      id: `${exercices.length + 1}`,
      nom: `Exercice de ${categorie}`,
      description: `Cet exercice de développement personnel vous aide à ${categorie.toLowerCase()}. Il est conçu pour renforcer votre croissance personnelle et votre bien-être émotionnel. Adapté aux personnes de niveau ${niveau.toLowerCase()}, il offre une opportunité unique d'introspection et de progression.`,
      categorie,
      icone: iconeMap[iconeCle],
      couleur,
      duree: Math.floor(Math.random() * 30) + 10, // Durée entre 10 et 40 minutes
      niveau,
      instructions: [
        "Lisez attentivement la description de l'exercice",
        "Suivez les étapes proposées",
        "Prenez le temps de réfléchir à chaque point",
        "Notez vos réflexions et vos ressentis",
      ],
      conclusion:
        "Prenez un moment pour réfléchir à ce que vous avez appris et comment vous pouvez l'appliquer dans votre vie quotidienne.",
    })
  }

  return exercices
}

export const exercicesGenerated = genererExercices(1000)
console.log("Nombre d'exercices générés :", exercicesGenerated.length)
