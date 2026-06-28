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

export type Product = {
  id: string;
  name: string;
  category: string;
  categorySlug: string;
  price: number;
  unit: string;
  image: string;
  short: string;
  badge?: string;
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
    accent: '#161616',
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
    color: '#4A2545',
    accent: '#4A2545',
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
    color: '#161616',
    accent: '#161616',
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
    color: '#4A2545',
    accent: '#4A2545',
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

export const allProducts: Product[] = [
  // Dehydrated Powders
  { id: 'dp-01', name: 'Beetroot Powder', category: 'Dehydrated Powders', categorySlug: 'dehydrated-powders', price: 199, unit: '100g', image: 'https://images.unsplash.com/photo-1540914124281-342587941389?w=600&q=80', short: 'Vibrant, nutrient-dense beetroot in powder form.', badge: 'Bestseller' },
  { id: 'dp-02', name: 'Spinach Powder', category: 'Dehydrated Powders', categorySlug: 'dehydrated-powders', price: 179, unit: '100g', image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=600&q=80', short: 'Pure spinach — iron and folate preserved.' },
  { id: 'dp-03', name: 'Tomato Powder', category: 'Dehydrated Powders', categorySlug: 'dehydrated-powders', price: 159, unit: '100g', image: 'https://images.unsplash.com/photo-1558818498-28c1e002b655?w=600&q=80', short: 'Concentrated tomato flavour for curries and soups.' },
  { id: 'dp-04', name: 'Amla Powder', category: 'Dehydrated Powders', categorySlug: 'dehydrated-powders', price: 229, unit: '100g', image: 'https://images.unsplash.com/photo-1609840114035-3c981b782dfe?w=600&q=80', short: 'Indian gooseberry — vitamin C powerhouse.', badge: 'New' },
  { id: 'dp-05', name: 'Carrot Powder', category: 'Dehydrated Powders', categorySlug: 'dehydrated-powders', price: 149, unit: '100g', image: 'https://images.unsplash.com/photo-1445282768818-728615cc910a?w=600&q=80', short: 'Sweet, beta-carotene rich carrot powder.' },
  { id: 'dp-06', name: 'Drumstick Powder', category: 'Dehydrated Powders', categorySlug: 'dehydrated-powders', price: 249, unit: '100g', image: 'https://images.unsplash.com/photo-1540914124281-342587941389?w=600&q=80', short: 'Moringa leaf powder — dense in minerals.' },
  // Vegetable Flakes
  { id: 'vf-01', name: 'Onion Flakes', category: 'Vegetable Flakes', categorySlug: 'vegetable-flakes', price: 129, unit: '150g', image: 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=600&q=80', short: 'Crisp dehydrated onion, ready to use.' },
  { id: 'vf-02', name: 'Garlic Flakes', category: 'Vegetable Flakes', categorySlug: 'vegetable-flakes', price: 149, unit: '100g', image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=600&q=80', short: 'Intense garlic flavour without the prep.', badge: 'Bestseller' },
  { id: 'vf-03', name: 'Capsicum Flakes', category: 'Vegetable Flakes', categorySlug: 'vegetable-flakes', price: 139, unit: '100g', image: 'https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=600&q=80', short: 'Red and green capsicum, air-dried to perfection.' },
  { id: 'vf-04', name: 'Tomato Flakes', category: 'Vegetable Flakes', categorySlug: 'vegetable-flakes', price: 129, unit: '100g', image: 'https://images.unsplash.com/photo-1558818498-28c1e002b655?w=600&q=80', short: 'Sun-ripened tomato in convenient flake form.' },
  // Cold-Pressed Oils
  { id: 'co-01', name: 'Groundnut Oil', category: 'Cold-Pressed Oils', categorySlug: 'cold-pressed-oils', price: 349, unit: '500ml', image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=600&q=80', short: 'Rich, nutty cold-pressed groundnut oil.', badge: 'Bestseller' },
  { id: 'co-02', name: 'Sesame (Til) Oil', category: 'Cold-Pressed Oils', categorySlug: 'cold-pressed-oils', price: 399, unit: '500ml', image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=600&q=80', short: 'Deep amber sesame oil with full aroma.' },
  { id: 'co-03', name: 'Coconut Oil', category: 'Cold-Pressed Oils', categorySlug: 'cold-pressed-oils', price: 449, unit: '500ml', image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=600&q=80', short: 'Virgin coconut oil, cold-pressed in small batches.', badge: 'New' },
  { id: 'co-04', name: 'Mustard Oil', category: 'Cold-Pressed Oils', categorySlug: 'cold-pressed-oils', price: 299, unit: '500ml', image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=600&q=80', short: 'Pungent, flavourful kachchi ghani mustard oil.' },
  // Heritage Flours
  { id: 'hf-01', name: 'Khapali Atta', category: 'Heritage Flours', categorySlug: 'heritage-flours', price: 189, unit: '1kg', image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&q=80', short: 'Ancient emmer wheat, stone-ground whole.', badge: 'Bestseller' },
  { id: 'hf-02', name: 'Ragi Flour', category: 'Heritage Flours', categorySlug: 'heritage-flours', price: 149, unit: '1kg', image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&q=80', short: 'Finger millet flour, rich in calcium.' },
  { id: 'hf-03', name: 'Jowar Flour', category: 'Heritage Flours', categorySlug: 'heritage-flours', price: 139, unit: '1kg', image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&q=80', short: 'Gluten-free sorghum flour, light and nutritious.' },
  { id: 'hf-04', name: 'Multigrain Flour', category: 'Heritage Flours', categorySlug: 'heritage-flours', price: 219, unit: '1kg', image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&q=80', short: 'Blend of six ancient grains for daily rotis.', badge: 'New' },
  // Whole Spices
  { id: 'ws-01', name: 'Cumin Seeds', category: 'Whole Spices', categorySlug: 'whole-spices', price: 99, unit: '100g', image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=600&q=80', short: 'Hand-sorted jeera with intense aroma.' },
  { id: 'ws-02', name: 'Black Pepper', category: 'Whole Spices', categorySlug: 'whole-spices', price: 149, unit: '100g', image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=600&q=80', short: 'Bold, pungent Malabar black pepper.', badge: 'Bestseller' },
  { id: 'ws-03', name: 'Green Cardamom', category: 'Whole Spices', categorySlug: 'whole-spices', price: 299, unit: '50g', image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=600&q=80', short: 'Fragrant Kerala elaichi, plump and oily.' },
  { id: 'ws-04', name: 'Cloves', category: 'Whole Spices', categorySlug: 'whole-spices', price: 199, unit: '50g', image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=600&q=80', short: 'Rich, oily cloves sourced from the Western Ghats.' },
  // Spice Powders
  { id: 'sp-01', name: 'Turmeric Powder', category: 'Spice Powders', categorySlug: 'spice-powders', price: 119, unit: '100g', image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=600&q=80', short: 'High-curcumin Erode haldi, freshly ground.', badge: 'Bestseller' },
  { id: 'sp-02', name: 'Red Chilli Powder', category: 'Spice Powders', categorySlug: 'spice-powders', price: 129, unit: '100g', image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=600&q=80', short: 'Vibrant, bold Byadagi chilli powder.' },
  { id: 'sp-03', name: 'Garam Masala', category: 'Spice Powders', categorySlug: 'spice-powders', price: 179, unit: '100g', image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=600&q=80', short: 'Balanced blend — family recipe, no fillers.', badge: 'New' },
  { id: 'sp-04', name: 'Chai Masala', category: 'Spice Powders', categorySlug: 'spice-powders', price: 149, unit: '50g', image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=600&q=80', short: 'Warming blend for the perfect cup of chai.' },
];

export const getProductById = (id: string) =>
  allProducts.find((p) => p.id === id);
