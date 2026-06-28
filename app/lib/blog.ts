export type BlogPost = {
  slug: string;
  num: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  date: string; // ISO yyyy-mm-dd
  readTime: number; // minutes
  image: string;
  body: string[];
};

export const posts: BlogPost[] = [
  {
    slug: 'why-low-temperature-drying-matters',
    num: '01',
    title: 'Why Low-Temperature Drying Matters',
    excerpt:
      'High heat is fast and cheap — and it quietly destroys the very nutrients you bought the food for. Here is why we dry slow and cool.',
    category: 'Processing',
    author: 'HarvestVita Kitchen',
    date: '2026-05-12',
    readTime: 5,
    image: 'https://images.unsplash.com/photo-1540914124281-342587941389?w=1200&q=80',
    body: [
      'Dehydration is one of the oldest ways to preserve food, but not all drying is equal. The temperature at which produce is dried decides how much of its original nutrition, colour, and flavour survives the process.',
      'Many heat-sensitive vitamins — vitamin C, several B vitamins, and a range of antioxidants — begin to break down well below boiling point. Push the temperature up to dry faster and you trade nutrition for speed.',
      'At HarvestVita we dry at controlled, low temperatures. It takes longer and yields less per batch, but the powders and flakes that come out still carry the pigment, aroma, and micronutrients of the produce they came from.',
      'The simplest test is colour. A beetroot powder that is deep crimson, not dull brown, tells you the pigment — and the betalains alongside it — made it through intact.',
    ],
  },
  {
    slug: 'reading-a-clean-label',
    num: '02',
    title: 'How to Actually Read a Clean Label',
    excerpt:
      'A short ingredient list is a good sign, but the words matter more than the count. A quick guide to spotting fillers and hidden additives.',
    category: 'Nutrition',
    author: 'HarvestVita Kitchen',
    date: '2026-04-28',
    readTime: 6,
    image: 'https://images.unsplash.com/photo-1543353071-873f17a7a088?w=1200&q=80',
    body: [
      'The phrase "clean label" gets used loosely. At its core it means one thing: you can read every ingredient and recognise it as food.',
      'Start by counting ingredients, then read each one. A single-ingredient spinach powder should list exactly that — spinach. If you see anti-caking agents, maltodextrin, or "natural flavour", ask why they are there.',
      'Anti-caking agents keep powders free-flowing, but they are filler. Maltodextrin bulks up volume cheaply and spikes blood sugar. "Natural flavour" is a legal catch-all that can hide dozens of undisclosed compounds.',
      'Our rule is plain: if a product is made of one thing, the label says one thing. No fillers, no flow agents, no synthetic colour.',
    ],
  },
  {
    slug: 'cold-pressed-vs-refined-oils',
    num: '03',
    title: 'Cold-Pressed vs Refined Oils',
    excerpt:
      'Refining strips colour, aroma, and most of the good fats along with the impurities. Here is what cold-pressing keeps that refining throws away.',
    category: 'Ingredients',
    author: 'HarvestVita Kitchen',
    date: '2026-04-09',
    readTime: 7,
    image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=1200&q=80',
    body: [
      'Cold-pressing extracts oil by mechanical pressure alone, with no added heat and no chemical solvents. What you get is closer to the seed or nut it came from.',
      'Refined oils go through high heat, bleaching, and deodorising. The result is a neutral, shelf-stable oil — but the process also removes natural antioxidants, vitamin E, and the aroma that tells you what you are cooking with.',
      'Cold-pressed oils have a lower smoke point and a shorter shelf life. That is the trade-off for keeping the nutrition intact, and it is why they are best stored cool and used within a few months.',
      'For finishing, dressing, and low-to-medium heat cooking, cold-pressed is the honest choice. Match the oil to the job rather than buying one bottle for everything.',
    ],
  },
  {
    slug: 'rehydrating-vegetable-flakes',
    num: '04',
    title: 'Getting the Most from Vegetable Flakes',
    excerpt:
      'Dried flakes are not a compromise — used right, they bring back the texture and taste of fresh produce. A few simple techniques.',
    category: 'Kitchen',
    author: 'HarvestVita Kitchen',
    date: '2026-03-22',
    readTime: 4,
    image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=1200&q=80',
    body: [
      'Slow-dried flakes keep their cell structure, which means they rehydrate into something close to the original vegetable rather than turning to mush.',
      'For soups and curries, add flakes directly — they soak up the cooking liquid and finish in the pot. For salads or quick dishes, soak them in warm water for ten to fifteen minutes first.',
      'A little planning goes a long way: rehydrate the night before in the fridge for the firmest texture, and save the soaking water — it carries flavour and nutrients back into the dish.',
      'Flakes earn their place in any kitchen that wants farm-fresh quality without the perishability. Keep a few jars on the shelf and fresh produce becomes optional, not essential.',
    ],
  },
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return posts.find((p) => p.slug === slug);
}
