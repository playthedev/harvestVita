import type en from './en';

const fr: typeof en = {
  nav: {
    about: 'À propos',
    products: 'Produits',
    quality: 'Qualité',
    contact: 'Contact',
    enquire: 'Renseignements',
    shop: 'Boutique',
    myAccount: 'Mon compte',
    signIn: 'Se connecter',
    cart: 'Panier',
    toggleMenu: 'Basculer le menu',
    language: 'Langue',
  },
  footer: {
    tagline: 'Une alimentation honnête. Une transformation réfléchie.',
    taglineLine2: 'De la ferme à la maison.',
    byAmoohaa: 'Par Amoohaa Farms',
    followUs: 'Suivez-nous',
    products: 'Produits',
    company: 'Entreprise',
    contact: 'Contact',
    legal: 'Mentions légales',
    ourStory: 'Notre histoire',
    qualityStandards: 'Normes de qualité',
    allProducts: 'Tous les produits',
    termsConditions: 'Conditions générales',
    privacyPolicy: 'Politique de confidentialité',
    returnsPolicy: 'Politique de retour et remboursement',
    address: 'Amoohaa Farms, Inde',
    rights: 'Tous droits réservés.',
  },
  home: {
    hero: {
      eyebrow: 'Par Amoohaa Farms',
      estFromSoil: 'Depuis la terre',
      titleLine1: 'La bonté',
      titleLine2: 'de la nature,',
      titleLine3: 'préservée.',
      subtitle:
        'Des ingrédients purs et nourrissants — fruits et légumes déshydratés, huiles pressées à froid, farines ancestrales et épices entières. De la ferme à votre table.',
      exploreRange: 'Découvrir la gamme',
      ourStory: 'Notre histoire',
      stats: {
        categories: 'Catégories',
        cleanLabel: 'Étiquette propre',
        additives: 'Additifs',
      },
      scrollJourney: 'Découvrez le parcours',
      marquee: [
        'Poudres déshydratées', 'Légumes en flocons', 'Huiles pressées à froid',
        'Farine khapali', 'Épices entières', 'Poudres d\'épices', 'Farines mélangées',
        'Étiquette propre', 'De la ferme à la maison', 'Sans additifs',
      ],
    },
    story: {
      label: 'Notre histoire',
      heading: 'Née de la conviction que l\'alimentation quotidienne doit être pure, nourrissante et honnête.',
      paragraph1:
        "HarvestVita incarne l'engagement d'Amoohaa Farms envers une vie naturelle et saine. Chaque produit est choisi dans un but simple : préserver la bonté de la nature tout en facilitant son usage au quotidien.",
      paragraph2:
        'Des fruits et légumes déshydratés aux huiles pressées à froid, en passant par la farine khapali et les épices entières — la marque reflète un équilibre entre tradition et praticité.',
      imageCaption: 'Amoohaa Farms — Inde',
      quote:
        'Une alimentation honnête, une transformation réfléchie et des ingrédients qui portent la richesse de la ferme au cœur du foyer.',
      readFullStory: 'Lire notre histoire',
      pillarsLabel: 'Les quatre piliers',
      pillarsRange: '01 — 04',
      pillars: [
        { num: '01', title: 'Pure par nature', desc: "Aucun additif, aucun conservateur artificiel. Chaque ingrédient est exactement ce que l'étiquette indique." },
        { num: '02', title: 'Ancrée à la ferme', desc: "Approvisionnement direct auprès de fermes de confiance. Des chaînes plus courtes pour des produits plus frais et plus nutritifs." },
        { num: '03', title: 'Transformation réfléchie', desc: "Déshydratation douce, pression à froid, mouture à la pierre — pour préserver la nutrition et la saveur authentique." },
        { num: '04', title: 'Praticité moderne', desc: "Prêts à l'emploi pour la cuisine de tous les jours. Aucun compromis entre santé et simplicité." },
      ],
    },
    journey: {
      label: 'Le parcours',
      progressLabel: 'Graine → Récolte → Pressage → Conditionnement',
      scrollToAdvance: 'Faites défiler pour avancer',
      frames: [
        {
          eyebrow: 'Étape 01 — Origine',
          title: 'Tout commence par une seule graine.',
          body: "Chaque produit que nous fabriquons commence à Amoohaa Farms — des graines sélectionnées, un sol sain et la patience d'une saison.",
        },
        {
          eyebrow: 'Étape 02 — Récolte',
          title: 'Cueillis à la main, mûris au soleil, pleinement formés.',
          body: "Céréales ancestrales, épices parfumées et produits frais des champs sont récoltés à leur apogée — sans jamais précipiter pour la durée de conservation.",
        },
        {
          eyebrow: 'Étape 03 — Pressage',
          title: 'Pressé à froid, extrait lentement.',
          body: "L'extraction au ghani de bois en dessous de 50°C préserve chaque huile essentielle, antioxydant et arôme — sans chaleur, sans solvants.",
        },
        {
          eyebrow: 'Étape 04 — Votre table',
          title: 'Scellé pur. Prêt à nourrir.',
          body: "Farines moulues à la pierre, poudres d'épices d'origine unique et huiles pures — conditionnées directement de la ferme à votre cuisine.",
        },
      ],
    },
    products: {
      eyebrow: 'Produits phares',
      headingLine1: 'Best-sellers,',
      headingItalic: 'fraîchement',
      headingHighlight: 'sélectionnés.',
      subtitle: "L'essentiel à étiquette propre et à ingrédient unique — ce que nos cuisines utilisent le plus.",
      addToCart: 'Ajouter au panier',
      added: 'Ajouté',
      inCartAddMore: 'Dans le panier · Ajouter encore',
      bulkNote: '{count}+ produits répartis en six catégories. Vente en gros et B2B disponibles.',
      shopAll: 'Voir tous les produits',
    },
    why: {
      eyebrow: 'Pourquoi HarvestVita',
      headingLine1: "La qualité n'est pas une promesse.",
      headingHighlight: "C'est notre standard.",
      sixReasons: 'Six raisons',
      sixReasonsDesc: "Ce ne sont pas des arguments marketing. Ce sont les filtres que chaque lot traverse avant de vous parvenir.",
      reasons: [
        { num: '01', head: 'Aucun additif caché', body: "Chaque étiquette indique exactement ce qu'elle contient. Pas de charges, pas d'agents anti-agglomérants, pas de conservateurs artificiels." },
        { num: '02', head: 'Approvisionnement direct des fermes', body: "Nous nous approvisionnons directement auprès de producteurs de confiance. Moins d'intermédiaires, des ingrédients plus frais et traçables." },
        { num: '03', head: 'Transformation douce', body: "Pression à froid, déshydratation à basse température et mouture à la pierre préservent la nutrition d'origine." },
        { num: '04', head: 'Emballage honnête', body: "Emballages alimentaires protégeant de la lumière. Scellés pour une fraîcheur maximale sans intervention artificielle." },
        { num: '05', head: 'Traçabilité par lot', body: "Chaque sachet porte un code de lot reliant à la ferme, à la récolte et au jour de fabrication." },
        { num: '06', head: 'Méthodes traditionnelles', body: "Mouture à la pierre, pression à froid au ghani de bois, séchage au soleil — des techniques éprouvées, bien exécutées." },
      ],
    },
    cta: {
      eyebrow: 'Commencez ici',
      title: 'Apportez la pureté de la ferme à votre table.',
      buttonLabel: 'Écrivez-nous',
    },
  },
};

export default fr;
