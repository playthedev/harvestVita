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
  about: {
    hero: {
      eyebrow: 'Notre histoire',
      title: 'Une alimentation honnête, ancrée dans la ferme.',
      subtitle:
        "HarvestVita incarne l'engagement d'Amoohaa Farms envers une vie naturelle et saine — fondé sur la conviction que l'alimentation quotidienne doit être pure, nourrissante et authentique.",
      stats: [
        { k: '6', l: 'Catégories' },
        { k: '100%', l: 'Étiquette propre' },
        { k: '0', l: 'Additifs' },
      ],
    },
    storySection: {
      decorativeWord: 'Histoire',
      label: 'La marque',
      heading:
        "HarvestVita est née d'un constat simple : la vie moderne a rendu plus difficile l'accès à une alimentation vraie au quotidien.",
      paragraph1:
        "La praticité se faisait autrefois au détriment de la nutrition. Les solutions préemballées ont apporté additifs, conservateurs et un éloignement progressif de ce que devrait être l'alimentation. Nous avons voulu changer cela — créer un garde-manger où chaque ingrédient serait aussi honnête que la terre qui l'a vu naître.",
      paragraph2:
        "Des fruits et légumes déshydratés, en poudre ou en flocons, aux huiles pressées à froid, à la farine khapali, aux poudres d'épices originales et aux épices entières, chaque produit est choisi dans un but simple : préserver la bonté de la nature tout en facilitant son usage au quotidien. La marque reflète un équilibre entre tradition et praticité — des essentiels à étiquette propre qui s'intègrent naturellement à la cuisine de tous les jours et à une alimentation consciente.",
      paragraph3:
        "Chez HarvestVita, la qualité n'est pas une promesse mais une norme. Chaque produit est élaboré avec une attention particulière à la pureté, au goût et à la valeur naturelle, pour que nos clients puissent avoir confiance en ce qu'ils ramènent chez eux pour leur famille.",
      quote:
        "En tant que membre d'Amoohaa Farms, HarvestVita incarne une alimentation honnête, une transformation réfléchie et des ingrédients qui portent la richesse de la ferme au cœur du foyer.",
      quoteAttribution: 'La promesse HarvestVita',
      imageAlt: 'Champs au coucher du soleil',
      imageCaption: 'Depuis notre ferme — Inde',
      facts: [
        { k: 'Pressé', l: 'à froid' },
        { k: 'Moulu', l: 'à la pierre' },
        { k: 'Séché', l: 'au soleil' },
      ],
    },
    timeline: {
      label: 'Parcours',
      headingLine1: 'De la ferme',
      headingHighlight: 'à la marque.',
      subtitle: "Un bref parcours à travers les étapes qui ont façonné le comment — et le pourquoi — de HarvestVita aujourd'hui.",
      milestones: [
        {
          year: 'Origine',
          title: 'Amoohaa Farms',
          desc: "Une initiative agricole fondée sur l'agriculture éthique, la transparence et le respect de la terre.",
        },
        {
          year: 'Idée',
          title: 'Un garde-manger pur',
          desc: "Une prise de conscience grandissante que les cuisines modernes perdaient la bonté des ingrédients traditionnels et véritables.",
        },
        {
          year: 'Lancement',
          title: 'HarvestVita',
          desc: "Une marque à étiquette propre conçue pour redonner à la table de tous les jours des essentiels authentiques et peu transformés.",
        },
        {
          year: "Aujourd'hui",
          title: 'Six catégories. Une seule norme.',
          desc: "Poudres, flocons, huiles, farines, épices entières et poudres d'épices — tous élaborés avec le même soin sans compromis.",
        },
      ],
    },
    valuesSection: {
      label: 'Nos valeurs',
      headingLine1: 'Quatre valeurs',
      headingHighlight: 'guident chaque décision.',
      subtitle:
        "Ce ne sont pas de simples mots marketing. Ce sont les filtres que nous appliquons à chaque étape — approvisionnement, transformation, conditionnement et expédition — de tout produit portant le nom HarvestVita.",
      values: [
        {
          title: 'Pureté',
          desc: "Ce qui est sur l'étiquette est ce qu'il y a dans le paquet. Toujours.",
        },
        {
          title: 'Tradition',
          desc: 'Des méthodes ancestrales — mouture à la pierre, pression à froid, séchage au soleil — exécutées dans les règles.',
        },
        {
          title: 'Praticité',
          desc: "Prêts pour les cuisines modernes, sans sacrifier ce qui rend l'alimentation honnête.",
        },
        {
          title: 'Traçabilité',
          desc: "De la ferme où il a poussé jusqu'au paquet sur votre étagère.",
        },
      ],
    },
    cta: {
      eyebrow: 'Découvrir',
      title: 'Découvrez ce que HarvestVita a à offrir.',
      buttonLabel: 'Voir les produits',
    },
  },
  quality: {
    hero: {
      eyebrow: 'Notre standard',
      title: "La qualité n'est pas une promesse. C'est notre standard.",
      subtitle:
        "Chaque produit HarvestVita est élaboré avec une attention particulière à la pureté, au goût et à la valeur naturelle — pour que nos clients puissent avoir confiance en ce qu'ils ramènent chez eux pour leur famille.",
      stats: [
        { k: '5', l: 'Étapes' },
        { k: '6', l: 'Normes' },
      ],
    },
    standardsSection: {
      decorativeWord: 'STANDARD',
      label: 'Six normes',
      headingLine1: 'Ce que signifie vraiment',
      headingHighlight: 'une étiquette propre.',
      subtitle: "Ce ne sont pas des certifications accrochées au mur. Ce sont les règles concrètes qui façonnent chaque lot, chaque paquet, chaque envoi.",
      standards: [
        { label: 'Étiquette propre', detail: "Chaque produit liste uniquement ce qu'il contient. Aucune charge cachée, aucun additif non déclaré." },
        { label: 'Sans conservateurs artificiels', detail: 'Conservation naturelle grâce à la déshydratation, à la pression à froid et à un conditionnement adapté.' },
        { label: 'Transformation minimale', detail: 'Des méthodes douces qui préservent le profil nutritionnel original de chaque ingrédient.' },
        { label: 'Traçabilité par lot', detail: "Chaque lot est suivi de la ferme jusqu'au conditionnement, pour que vous sachiez toujours ce que vous achetez." },
        { label: 'Sans colorants ajoutés', detail: "La couleur des produits HarvestVita provient uniquement de l'ingrédient lui-même." },
        { label: 'Sans agents anti-agglomérants', detail: 'Nos poudres et farines sont pures — conservez-les correctement et elles le restent naturellement.' },
      ],
    },
    processSection: {
      decorativeWord: 'Processus',
      label: 'Processus',
      headingLine1: 'Cinq étapes,',
      headingHighlight: 'de la ferme au paquet.',
      subtitle: 'Chaque étape est réfléchie. Chaque étape est consignée. Chaque étape protège la bonté de ce qui arrive dans votre cuisine.',
      stepOfLabel: 'Étape {num} sur 05',
      process: [
        {
          num: '01',
          title: 'Approvisionnement',
          desc: 'Des relations directes avec des fermes qui partagent nos normes. La santé du sol, des pratiques éthiques et la disponibilité saisonnière façonnent chaque récolte.',
        },
        {
          num: '02',
          title: 'Inspection',
          desc: "Tri manuel et inspection visuelle à la réception. Tout ce qui ne répond pas aux exigences est refusé, sans exception.",
        },
        {
          num: '03',
          title: 'Transformation',
          desc: 'Pression à froid, déshydratation à basse température et mouture à la pierre — des méthodes choisies pour préserver la nutrition, non pour maximiser le rendement.',
        },
        {
          num: '04',
          title: 'Conditionnement',
          desc: "Emballage alimentaire, protecteur contre la lumière. Scellé pour la fraîcheur, avec un espace de tête minimal pour prolonger naturellement la durée de conservation.",
        },
        {
          num: '05',
          title: 'Traçabilité',
          desc: 'Des codes de lot qui relient chaque paquet à la ferme, à la récolte et au jour de fabrication.',
        },
      ],
    },
    stats: [
      { value: '100%', label: 'Ingrédients naturels' },
      { value: '6+', label: 'Catégories de produits' },
      { value: '0', label: 'Additifs artificiels' },
      { value: '∞', label: 'Engagement envers la pureté' },
    ],
    cta: {
      eyebrow: 'Des questions ?',
      title: "Parlons de l'approvisionnement et de la qualité.",
      buttonLabel: 'Contactez-nous',
    },
  },
  products: {
    list: {
      eyebrow: 'La gamme complète',
      titleLine1: 'Essentiels de garde-manger,',
      titleHighlight: 'fabriqués en toute transparence.',
      subtitle:
        "Poudres à ingrédient unique, huiles pressées lentement, farines ancestrales moulues à la pierre et épices fraîchement moulues. Chaque produit à étiquette propre, traçable jusqu'à l'origine.",
      stats: {
        products: 'Produits',
        categories: 'Catégories',
        additives: 'Additifs',
      },
      filterLabel: 'Filtrer ·',
      categories: [
        { value: 'All', label: 'Tout' },
        { value: 'Dehydrated Powders', label: 'Poudres déshydratées' },
        { value: 'Vegetable Flakes', label: 'Légumes en flocons' },
        { value: 'Cold-Pressed Oils', label: 'Huiles pressées à froid' },
        { value: 'Heritage Flours', label: 'Farines ancestrales' },
        { value: 'Whole Spices', label: 'Épices entières' },
        { value: 'Spice Powders', label: 'Poudres d\'épices' },
      ],
      itemCount: '{count} article{plural}',
      viewCart: 'Voir le panier ({count})',
      addToCart: 'Ajouter au panier',
      added: 'Ajouté',
      inCartAddMore: 'Dans le panier · Ajouter encore',
      perUnit: '/ {unit}',
      bulkNote: 'Emballages personnalisés et quantités en gros disponibles pour les partenaires B2B.',
      talkToSales: "Contacter l'équipe commerciale",
    },
    category: {
      categoryEyebrow: 'Catégorie {num}',
      skuLabel: 'Références',
      standardsLabel: 'Normes',
      aboutLabel: 'À propos de cette catégorie',
      categoryBadge: 'Catégorie {num} — HarvestVita',
      whatMakesIt: 'Ce qui la distingue',
      inThisRange: 'Dans cette gamme',
      availableProducts: 'Produits disponibles',
      availableProductsDesc: 'Toutes les variantes sont disponibles au détail, en gros et en emballage personnalisé sur demande.',
      howToUseLabel: 'Comment utiliser',
      fromKitchenLine1: 'De la cuisine',
      fromKitchenHighlight: 'à la création.',
      howToUseDesc: "Polyvalent, facile à intégrer et conçu pour s'adapter à votre façon de cuisiner.",
      continueExploring: 'Poursuivre la découverte',
      otherCategories: 'Autres catégories',
      viewAll: 'Voir tout',
      ctaEyebrow: 'Commander ou se renseigner',
      ctaTitle: 'Apportez cette gamme dans votre cuisine.',
      ctaButton: 'Contactez-nous',
    },
    item: {
      breadcrumbHome: 'Accueil',
      breadcrumbShop: 'Boutique',
      trustBadges: {
        pure: 'Pur',
        additives: 'Additifs',
        shelfLife: 'Durée de conservation',
      },
      perUnit: 'par {unit}',
      inclusiveOfTaxes: 'Taxes incluses',
      addToCart: 'Ajouter au panier · ₹{price}',
      addedToCart: 'Ajouté au panier',
      alreadyInCart: '{count} déjà dans le panier · Voir le panier',
      wishlistAdd: 'Ajouter aux favoris',
      wishlistRemove: 'Retirer des favoris',
      whatMakesIt: 'Ce qui le distingue',
      howToUseLabel: 'Comment utiliser',
      fromPantryLine1: 'Du garde-manger',
      fromPantryHighlight: "à l'assiette.",
      howToUseDesc: "Polyvalent, facile à intégrer et conçu pour votre façon de cuisiner.",
      readFullCategoryGuide: 'Lire le guide complet de la catégorie',
      youMayAlsoLike: 'Vous aimerez aussi',
      moreFromRange: 'Plus de cette gamme',
      viewAll: 'Voir tout',
    },
  },
};

export default fr;
