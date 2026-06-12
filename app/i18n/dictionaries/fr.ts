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
  privacy: {
    eyebrow: 'Mentions légales',
    title: 'Politique de confidentialité',
    subtitle: 'Comment nous collectons, utilisons et protégeons vos informations personnelles.',
    lastUpdated: 'Dernière mise à jour : mai 2025',
    sections: [
      {
        title: '1. Introduction',
        body: `HarvestVita (une marque d'Amoohaa Farms) s'engage à protéger votre vie privée. Cette politique de confidentialité explique comment nous collectons, utilisons, divulguons et protégeons vos informations personnelles lorsque vous visitez notre site web ou achetez nos produits. En utilisant notre site web, vous consentez aux pratiques décrites dans cette politique.`,
      },
      {
        title: '2. Informations que nous collectons',
        body: `Nous collectons les informations que vous nous fournissez directement — telles que votre nom, votre adresse e-mail, votre numéro de téléphone et votre adresse de livraison lorsque vous passez une commande ou nous contactez. Nous pouvons également collecter automatiquement certaines informations techniques telles que votre adresse IP, le type de navigateur, les pages visitées et les URL de référence lors de votre navigation sur notre site web. Nous ne collectons pas les détails de carte de paiement ; toutes les transactions sont traitées en toute sécurité via le paiement à la livraison.`,
      },
      {
        title: '3. Comment nous utilisons vos informations',
        body: `Nous utilisons vos informations pour : traiter et exécuter vos commandes ; communiquer avec vous concernant vos achats, vos livraisons et tout problème éventuel ; vous envoyer des actualités sur les nouveaux produits ou offres (uniquement si vous y avez consenti) ; améliorer notre site web et nos services ; respecter les lois et réglementations applicables. Nous ne vendons, ne louons ni ne partageons vos informations personnelles avec des tiers à des fins de marketing pour leur propre compte.`,
      },
      {
        title: '4. Partage des informations',
        body: `Nous pouvons partager vos informations avec des prestataires de services tiers de confiance — tels que des partenaires de transport et de logistique — uniquement pour exécuter vos commandes. Ces partenaires sont soumis à des obligations de confidentialité. Nous pouvons également divulguer des informations si la loi, une décision de justice ou une autorité gouvernementale l'exige. En cas de transfert d'activité ou d'acquisition, vos informations pourront être transférées dans le cadre de cette transaction.`,
      },
      {
        title: '5. Cookies',
        body: `Notre site web peut utiliser des cookies — de petits fichiers texte stockés sur votre appareil — afin d'améliorer votre expérience de navigation, de mémoriser vos préférences et d'analyser le trafic du site. Vous pouvez contrôler ou désactiver les cookies via les paramètres de votre navigateur. La désactivation des cookies peut affecter certaines fonctionnalités du site web.`,
      },
      {
        title: '6. Conservation des données',
        body: `Nous conservons vos informations personnelles aussi longtemps que nécessaire pour atteindre les finalités décrites dans cette politique, respecter nos obligations légales, résoudre les litiges et faire appliquer nos accords. Les données de commande peuvent être conservées jusqu'à 7 ans conformément aux lois indiennes en matière de comptabilité.`,
      },
      {
        title: '7. Sécurité des données',
        body: `Nous prenons des mesures techniques et organisationnelles raisonnables pour protéger vos informations personnelles contre tout accès non autorisé, toute divulgation, altération ou destruction. Cependant, aucune méthode de transmission sur Internet n'est sécurisée à 100 % et nous ne pouvons garantir une sécurité absolue.`,
      },
      {
        title: '8. Vos droits',
        body: `Vous avez le droit d'accéder à vos informations personnelles détenues par nous, de les corriger ou d'en demander la suppression. Pour exercer ces droits, veuillez nous contacter à hello@harvestvita.in. Nous répondrons à votre demande dans un délai de 30 jours. Veuillez noter que certaines informations peuvent devoir être conservées pour des raisons légales ou opérationnelles.`,
      },
      {
        title: '9. Confidentialité des enfants',
        body: `Notre site web ne s'adresse pas aux enfants de moins de 13 ans. Nous ne collectons pas sciemment d'informations personnelles auprès d'enfants. Si vous pensez que nous avons collecté de telles informations par inadvertance, veuillez nous contacter immédiatement afin que nous puissions les supprimer.`,
      },
      {
        title: '10. Modifications de cette politique',
        body: `Nous pouvons mettre à jour cette politique de confidentialité de temps à autre. La version révisée sera publiée sur cette page avec une date de mise à jour. Nous vous encourageons à consulter régulièrement cette politique pour rester informé de la manière dont nous protégeons vos informations.`,
      },
      {
        title: '11. Nous contacter',
        body: `Si vous avez des questions ou des préoccupations concernant cette politique de confidentialité ou la manière dont vos données sont traitées, veuillez nous contacter à : hello@harvestvita.in | +91 99999 99999 | Amoohaa Farms, Inde.`,
      },
    ],
    footerLinks: {
      terms: 'Conditions générales →',
      returns: 'Politique de retour et remboursement →',
    },
  },
  terms: {
    eyebrow: 'Mentions légales',
    title: 'Conditions générales',
    subtitle: 'Veuillez lire attentivement ces conditions avant d\'utiliser notre site web ou de passer une commande.',
    lastUpdated: 'Dernière mise à jour : mai 2025',
    sections: [
      {
        title: '1. Acceptation des conditions',
        body: `En accédant au site web HarvestVita (harvestvita.in), en l'utilisant et en passant des commandes, vous acceptez d'être lié par ces conditions générales. Si vous n'acceptez pas une partie de ces conditions, veuillez ne pas utiliser notre site web ou nos services. Ces conditions s'appliquent à tous les visiteurs, utilisateurs et clients.`,
      },
      {
        title: '2. À propos de HarvestVita',
        body: `HarvestVita est une marque détenue et exploitée par Amoohaa Farms, spécialisée dans la vente de produits alimentaires naturels, notamment des fruits et légumes déshydratés, des huiles pressées à froid, des farines ancestrales, des épices entières et des poudres d'épices. Notre adresse enregistrée est Amoohaa Farms, Inde.`,
      },
      {
        title: '3. Produits et descriptions',
        body: `Nous faisons tous les efforts possibles pour décrire fidèlement nos produits, y compris les ingrédients, les poids et les informations d'utilisation. Cependant, l'emballage des produits peut légèrement différer des images présentées. Tous les produits sont des denrées alimentaires destinées à la consommation et doivent être conservés selon les instructions figurant sur l'emballage. HarvestVita se réserve le droit d'arrêter ou de modifier tout produit sans préavis.`,
      },
      {
        title: '4. Prix et paiements',
        body: `Tous les prix affichés sur le site web sont en roupies indiennes (INR) et incluent les taxes applicables, sauf indication contraire. Les prix peuvent être modifiés sans préavis. Actuellement, le paiement à la livraison (COD) est le mode de paiement accepté. Nous nous réservons le droit d'annuler une commande si le paiement ne peut être confirmé.`,
      },
      {
        title: '5. Passation et confirmation de commande',
        body: `Passer une commande sur notre site web constitue une offre d'achat. Une commande n'est confirmée que lorsque vous recevez un e-mail de confirmation de notre part. Nous nous réservons le droit de refuser ou d'annuler toute commande à notre discrétion — y compris dans les cas où le produit est en rupture de stock, où une erreur de prix s'est produite, ou si nous suspectons une activité frauduleuse.`,
      },
      {
        title: '6. Expédition et livraison',
        body: `Les commandes sont expédiées dans un délai de 2 à 3 jours ouvrables après confirmation. Les délais de livraison varient selon la localisation et sont estimatifs, non garantis. Le risque de perte et le titre de propriété des produits vous sont transférés à la livraison. HarvestVita n'est pas responsable des retards causés par les transporteurs, les conditions météorologiques ou d'autres circonstances hors de notre contrôle. Veuillez consulter notre politique de retour pour les envois endommagés ou perdus.`,
      },
      {
        title: '7. Utilisation du site web',
        body: `Vous acceptez d'utiliser ce site web uniquement à des fins légales. Vous ne devez pas reproduire, dupliquer, copier, vendre ou exploiter une quelconque partie du site web sans notre autorisation écrite expresse. Toute tentative d'accès non autorisé à une partie du site web ou à ses systèmes associés est interdite.`,
      },
      {
        title: '8. Propriété intellectuelle',
        body: `Tout le contenu de ce site web — y compris les textes, images, logos, photographies de produits et la conception — est la propriété intellectuelle de HarvestVita / Amoohaa Farms et est protégé par les lois applicables en matière de droits d'auteur. Toute utilisation non autorisée de ce contenu est strictement interdite.`,
      },
      {
        title: '9. Limitation de responsabilité',
        body: `HarvestVita ne pourra être tenu responsable de tout dommage indirect, accessoire, particulier ou consécutif découlant de votre utilisation du site web ou des produits. Notre responsabilité maximale ne dépassera pas le montant que vous avez payé pour le produit spécifique à l'origine de la réclamation. Nous ne garantissons pas que le site web sera ininterrompu ou sans erreur.`,
      },
      {
        title: '10. Droit applicable',
        body: `Ces conditions générales sont régies et interprétées conformément aux lois de l'Inde. Tout litige relèvera de la compétence exclusive des tribunaux situés en Inde.`,
      },
      {
        title: '11. Modifications des conditions',
        body: `HarvestVita se réserve le droit de mettre à jour ou de modifier ces conditions générales à tout moment et sans préavis. La poursuite de l'utilisation du site web après la publication de modifications constitue votre acceptation des conditions révisées. Nous vous recommandons de consulter régulièrement cette page.`,
      },
      {
        title: '12. Contact',
        body: `Pour toute question concernant ces conditions générales, veuillez nous écrire à hello@harvestvita.in ou nous appeler au +91 99999 99999.`,
      },
    ],
    footerLinks: {
      privacy: 'Politique de confidentialité →',
      returns: 'Politique de retour et remboursement →',
    },
  },
  returns: {
    eyebrow: 'Mentions légales',
    titleLine1: 'Politique de retour,',
    titleLine2: 'remboursement et annulation',
    subtitle: 'Nous nous portons garants de chaque produit. Voici comment nous gérons les retours, remboursements et annulations.',
    lastUpdated: 'Dernière mise à jour : mai 2025',
    summary: [
      { label: 'Annulations', value: 'Sous 24 h', note: 'Avant expédition uniquement' },
      { label: 'Délai de retour', value: '48 heures', note: 'À compter de la date de livraison' },
      { label: 'Délai de remboursement', value: '5 à 7 jours', note: 'Après réception du produit retourné' },
    ],
    sections: [
      {
        title: '1. Notre engagement',
        body: `Chez HarvestVita, nous sommes fiers de la qualité de chaque produit que nous expédions. Si quelque chose ne convient pas avec votre commande, nous voulons y remédier. Cette politique décrit les circonstances dans lesquelles les retours, remboursements et annulations sont acceptés, ainsi que la procédure pour chacun.`,
      },
      {
        title: '2. Politique d\'annulation',
        body: `Vous pouvez annuler votre commande dans les 24 heures suivant sa passation, à condition qu'elle n'ait pas encore été expédiée. Pour annuler, envoyez-nous un e-mail à hello@harvestvita.in ou appelez le +91 99999 99999 en indiquant les détails de votre commande. Si la commande a déjà été expédiée, l'annulation n'est pas possible et la procédure de retour s'appliquera à la place. Comme nous fonctionnons actuellement avec le paiement à la livraison, aucun paiement n'est prélevé au moment de la commande — il n'y a donc aucun montant à rembourser pour les annulations avant expédition.`,
      },
      {
        title: '3. Conditions d\'éligibilité au retour',
        body: `Nous acceptons les demandes de retour dans les cas suivants : (a) le produit livré est endommagé ou cassé ; (b) le produit livré est incorrect (article erroné ou quantité erronée) ; (c) le produit est proche de sa date d'expiration ou l'a déjà dépassée au moment de la livraison. Nous n'acceptons pas les retours pour : les produits qui ont été ouverts, utilisés ou altérés ; les produits dont le scellé a été rompu ; les produits retournés pour des raisons de goût ou de préférence personnelle ; les articles endommagés en raison d'un stockage inapproprié après livraison.`,
      },
      {
        title: '4. Comment effectuer une demande de retour',
        body: `Si vous souhaitez retourner un produit, veuillez nous contacter dans les 48 heures suivant la réception de la livraison à hello@harvestvita.in. Indiquez les détails de votre commande, une description du problème, ainsi que des photographies claires du produit et de son emballage. Notre équipe examinera votre demande et vous répondra dans un délai de 2 jours ouvrables. Une fois le retour approuvé, nous organiserons un enlèvement ou vous conseillerons sur la manière de nous renvoyer le produit. Ne retournez aucun article sans l'accord préalable de notre équipe.`,
      },
      {
        title: '5. Politique de remboursement',
        body: `Comme toutes les commandes sont actuellement réglées par paiement à la livraison, un remboursement ne sera émis que si un retour a été approuvé et que le produit nous est revenu dans son état d'origine, non ouvert. Les remboursements seront effectués par virement bancaire (NEFT/IMPS) sur les coordonnées bancaires que vous nous fournirez. Les remboursements seront initiés dans un délai de 5 à 7 jours ouvrables après réception du produit retourné. Les frais de livraison (le cas échéant) ne sont pas remboursables, sauf si le retour est dû à une erreur de notre part (article erroné ou endommagé).`,
      },
      {
        title: '6. Livraison endommagée ou altérée',
        body: `Si votre commande arrive avec des dommages visibles sur l'emballage extérieur, veuillez la photographier avant d'accepter la livraison et nous en informer immédiatement à hello@harvestvita.in. Si le produit à l'intérieur est endommagé ou si le scellé d'inviolabilité est rompu à l'arrivée, vous pouvez refuser la livraison et elle nous sera retournée. Une fois le problème signalé avec des preuves photographiques, nous vous renverrons le produit ou émettrons un remboursement intégral sans frais pour vous.`,
      },
      {
        title: '7. Articles non retournables',
        body: `Certaines catégories de produits ne peuvent être retournées en aucune circonstance : (a) les produits alimentaires ouverts ou partiellement consommés ; (b) les produits qui ont été mal stockés après la livraison ; (c) les produits retournés au-delà de 48 heures après la livraison sans accord préalable. HarvestVita se réserve le droit de rejeter les demandes de retour qui ne respectent pas les conditions énoncées dans cette politique.`,
      },
      {
        title: '8. Exceptions et discrétion',
        body: `HarvestVita se réserve le droit de faire des exceptions à cette politique, à sa seule discrétion, dans les cas de difficultés réelles ou de circonstances exceptionnelles. Ces exceptions sont accordées au cas par cas et ne constituent pas un précédent pour de futures demandes.`,
      },
      {
        title: '9. Contact pour les retours et remboursements',
        body: `Pour toute demande de retour, de remboursement ou d'annulation, contactez-nous : E-mail : hello@harvestvita.in | Téléphone : +91 99999 99999 (Lun-Sam, 10h-19h IST). Merci d'avoir votre numéro de commande et les détails du produit à portée de main lorsque vous nous contactez.`,
      },
    ],
    footerLinks: {
      terms: 'Conditions générales →',
      privacy: 'Politique de confidentialité →',
    },
  },
};

export default fr;
