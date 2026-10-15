import type { PhotoKey } from "./photos";

export const site = {
  name: "Filo",
  descriptor: "Atelier di pasta, Mayfair",
  tagline: "Every strand cut by hand, an hour before you sit down.",
  description:
    "Filo is a pasta atelier on Mount Street, Mayfair. Pasta is rolled and cut by hand in the window throughout the day and served within the hour, alongside a cellar of Italian wine.",
  /** The live address, without a trailing slash. Set by the GitHub Pages workflow; the fallback is a placeholder. */
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://filo.example",
  address: { street: "18 Mount Street", city: "London W1K 2RN", lat: 51.5098, lng: -0.1503 },
  phone: "+44 20 7946 0188",
  email: "tavola@filo.example",
  timeZone: "Europe/London",
  chef: "Lorenzo Vitale",
  sommelier: "Giulia Ferri",
  socials: [
    { label: "Instagram", href: "https://instagram.com" },
    { label: "Journal", href: "https://substack.com" },
  ],
} as const;

/** Kitchen hours by weekday (0 = Sunday), local "HH:MM". */
export const openingHours: Record<number, { open: string; close: string } | null> = {
  0: null,
  1: null,
  2: { open: "18:00", close: "23:00" },
  3: { open: "18:00", close: "23:00" },
  4: { open: "12:30", close: "23:00" },
  5: { open: "12:30", close: "23:30" },
  6: { open: "12:30", close: "23:30" },
};

export const hoursSummary = [
  { days: "Tuesday and Wednesday", time: "Dinner, 18:00 to 23:00" },
  { days: "Thursday", time: "12:30 to 23:00" },
  { days: "Friday and Saturday", time: "12:30 to 23:30" },
  { days: "Sunday and Monday", time: "Closed" },
];

export const philosophy = [
  {
    title: "The window",
    body: "Our pasta table faces Mount Street. From noon until the last sitting, two cooks roll and cut by hand in full view. Nothing is made the day before.",
  },
  {
    title: "The flour",
    body: "Stone-milled grano duro from a single farm near Altamura, and yolks from hens raised on maize and marigold, which is where the colour comes from.",
  },
  {
    title: "The hour",
    body: "Fresh pasta changes by the minute. We cut each portion to order and cook it within the hour, so it reaches you supple, never dry.",
  },
];

/** Order matters: the gallery grid places items by position (tall, wide, two squares, panorama). */
export const gallery: { photo: PhotoKey; alt: string; caption: string }[] = [
  { photo: "darkRoom", alt: "The dining room at night under low pendant lights", caption: "The dining room, after nine" },
  { photo: "candleTable", alt: "Candlelit table set with glassware and a plated dish", caption: "The chef's table, eight seats" },
  { photo: "chefPlating", alt: "Chef plating beneath copper heat lamps", caption: "The pass" },
  { photo: "bar", alt: "The bar with backlit shelves", caption: "The bar, from five" },
  { photo: "wineBottles", alt: "A row of wine bottles in the cellar", caption: "The cellar, 600 Italian labels" },
];
