export type ProductCategory = {
  slug: string;
  num: string;
  title: string;
  short: string;
  desc: string;
  longDesc: string[];
  features: string[];
  items: string[];
  uses: string[];
  geometry: 'icosahedron' | 'dodecahedron' | 'torus-knot' | 'octahedron';
  color: string;
  accent: string;
};

export const products: ProductCategory[] = [
  {
    slug: 'dehydrated-powders',
    num: '01',
    title: 'Dehydrated Fruit & Vegetable Powders',
    short: 'Concentrated nutrition in a versatile powder form.',
    desc: 'Concentrated nutrition in a versatile powder form. Beetroot, spinach, tomato, amla, and more — perfect for smoothies, cooking, and baking without losing natural colour or flavour.',
    longDesc: [
      'Our dehydrated fruit and vegetable powders are made through a low-temperature drying process that retains the natural pigments, micronutrients, and authentic taste of the source produce.',
      'Each powder is single-ingredient — no fillers, no anti-caking agents, no synthetic colours. You get exactly what the label promises, in a form that\'s easy to scoop, measure, and blend into your daily cooking.',
      'Used by home cooks, bakers, smoothie makers, and food formulators who want clean nutrition without sacrificing convenience.',
    ],
    features: [
      'Low-temperature dehydration preserves nutrients',
      'No fillers, no anti-caking agents',
      '12-month shelf life unopened',
      'Made from single-origin produce',
    ],
    items: ['Beetroot Powder', 'Spinach Powder', 'Tomato Powder', 'Amla Powder', 'Carrot Powder', 'Drumstick Powder'],
    uses: ['Smoothies & juices', 'Natural food colouring', 'Baking & batter', 'Soups & curries', 'Health supplements'],
    geometry: 'icosahedron',
    color: '#C9A84C',
    accent: '#4A2545',
  },
  {
    slug: 'vegetable-flakes',
    num: '02',
    title: 'Vegetable & Fruit Flakes',
    short: 'Air-dried at controlled temperatures to lock in nutrition.',
    desc: 'Air-dried and dehydrated at controlled temperatures to lock in nutrition and colour. Ready to rehydrate or use directly in soups, curries, and snacks.',
    longDesc: [
      'Flakes give you the body and bite of fresh vegetables in a shelf-stable form. Our slow-drying process keeps the cell structure intact, so rehydration brings back the texture, not just the flavour.',
      'Perfect for backpackers, instant meal makers, and busy kitchens that want farm-fresh quality without the perishability.',
    ],
    features: [
      'Controlled-temperature drying',
      'Rehydrates in minutes',
      'No sulphites or preservatives',
      'Long shelf life',
    ],
    items: ['Onion Flakes', 'Garlic Flakes', 'Carrot Flakes', 'Capsicum Flakes', 'Tomato Flakes', 'Curry Leaf Flakes'],
    uses: ['Instant soups', 'Ready-to-eat meals', 'Seasoning blends', 'Trail food', 'Quick curries'],
    geometry: 'octahedron',
    color: '#2D4A2D',
    accent: '#2D4A2D',
  },
  {
    slug: 'cold-pressed-oils',
    num: '03',
    title: 'Cold-Pressed Edible Oils',
    short: 'Extracted without heat to preserve every essential nutrient.',
    desc: 'Extracted without heat to preserve every essential fatty acid, antioxidant, and natural aroma. No refining, no chemicals — just pure oil as nature intended.',
    longDesc: [
      'Cold-pressing means our oils are extracted at temperatures below 50°C. No solvents, no bleaching, no deodorising. The natural flavour, colour, and nutritional profile of the seed or nut comes through completely.',
      'You\'ll notice the difference — richer aroma, deeper colour, and the way the oil behaves in the pan tells the story of how it was made.',
    ],
    features: [
      'Wooden ghani / cold press extraction',
      'No refining, no chemicals',
      'Unfiltered nutrients intact',
      'Glass bottle packaging',
    ],
    items: ['Groundnut Oil', 'Sesame (Til) Oil', 'Coconut Oil', 'Mustard Oil', 'Sunflower Oil', 'Safflower Oil'],
    uses: ['Daily cooking', 'Salad dressings', 'Massage & skincare', 'Tadka & seasoning', 'Baking'],
    geometry: 'torus-knot',
    color: '#C9A84C',
    accent: '#C9A84C',
  },
  {
    slug: 'heritage-flours',
    num: '04',
    title: 'Heritage Flours',
    short: 'Stone-ground from traditional grain varieties.',
    desc: 'Stone-ground from traditional grain varieties. Khapali atta — India\'s ancient emmer wheat — delivers richer gluten structure, more fibre, and a deeper, nuttier taste.',
    longDesc: [
      'Khapali (emmer) wheat is one of the oldest cultivated grains in the world. Higher in protein and fibre than modern wheat, it produces soft, pliable rotis with a naturally nutty flavour.',
      'We stone-grind in small batches to keep the bran, germ, and endosperm intact — the way flour has been made for thousands of years.',
    ],
    features: [
      'Stone-ground in small batches',
      'Whole-grain — bran & germ intact',
      'No bleaching or additives',
      'Traditional grain varieties',
    ],
    items: ['Khapali Atta', 'Multigrain Flour', 'Ragi Flour', 'Jowar Flour', 'Bajra Flour', 'Blended Atta'],
    uses: ['Rotis & parathas', 'Bread & baking', 'Porridge & dosa', 'Healthy snacks'],
    geometry: 'dodecahedron',
    color: '#4A2545',
    accent: '#4A2545',
  },
  {
    slug: 'whole-spices',
    num: '05',
    title: 'Whole Spices',
    short: 'Hand-sorted, sun-dried whole spices from growing regions.',
    desc: 'Hand-sorted, sun-dried whole spices sourced directly from growing regions. Free from fumigants and artificial colours, they bring the full depth of aroma to your kitchen.',
    longDesc: [
      'Whole spices retain their essential oils for far longer than their ground counterparts. Toast them, grind them fresh, or use them whole — the aroma is incomparable.',
      'We source directly from growers, hand-sort for quality, and pack without fumigation or artificial colour enhancement.',
    ],
    features: [
      'Sourced directly from growers',
      'Hand-sorted for quality',
      'No fumigants, no artificial colour',
      'Sun-dried traditionally',
    ],
    items: ['Cumin Seeds', 'Coriander Seeds', 'Black Pepper', 'Green Cardamom', 'Cloves', 'Cinnamon', 'Bay Leaves', 'Star Anise'],
    uses: ['Tempering (tadka)', 'Spice blends', 'Pickling', 'Tea & chai', 'Slow cooking'],
    geometry: 'icosahedron',
    color: '#2D4A2D',
    accent: '#2D4A2D',
  },
  {
    slug: 'spice-powders',
    num: '06',
    title: 'Spice Powders & Blends',
    short: 'Ground fresh in small batches. Authentic flavour, no fillers.',
    desc: 'Ground fresh in small batches. Single-origin spice powders and expertly balanced blends that deliver authentic flavour without any fillers or anti-caking agents.',
    longDesc: [
      'Pre-ground spices lose potency fast — that\'s why we grind in small, frequent batches and pack immediately. Our single-origin powders give you pure flavour, and our blends are built from family recipes refined over generations.',
      'No fillers like rice flour. No anti-caking agents. No artificial colour enhancers. Just the spice, ground correctly.',
    ],
    features: [
      'Small-batch grinding',
      'Single-origin & blended options',
      'No fillers or additives',
      'Sealed for freshness',
    ],
    items: ['Coriander Powder', 'Red Chilli Powder', 'Turmeric Powder', 'Garam Masala', 'Chai Masala', 'Sambar Powder', 'Rasam Powder', 'Pav Bhaji Masala'],
    uses: ['Everyday cooking', 'Marinades', 'Spice rubs', 'Chai & beverages', 'Pickles & chutneys'],
    geometry: 'torus-knot',
    color: '#C9A84C',
    accent: '#C9A84C',
  },
];

export const getProductBySlug = (slug: string) =>
  products.find((p) => p.slug === slug);
