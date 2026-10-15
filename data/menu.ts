import type { PhotoKey } from "./photos";

export type DietTag = "vegan" | "vegetarian" | "gluten-free" | "chef-special";
export type CategoryId = "antipasti" | "pasta" | "secondi" | "tasting" | "dolci" | "cocktails" | "wine";

export type MenuItem = {
  id: string;
  name: string;
  category: CategoryId;
  description: string;
  price: number;
  /** Shown instead of a single price, e.g. glass and bottle. */
  priceNote?: string;
  tags: DietTag[];
  allergens: string[];
  pairing?: string;
  photo?: PhotoKey;
  tastingNotes?: string;
  origin?: string;
};

export type Category = { id: CategoryId; label: string; note: string };

export const currency = new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP", maximumFractionDigits: 0 });

export const dietLabels: Record<DietTag, string> = {
  vegan: "Vegan",
  vegetarian: "Vegetarian",
  "gluten-free": "Gluten-free",
  "chef-special": "Chef's special",
};

export const categories: Category[] = [
  { id: "antipasti", label: "Antipasti", note: "To begin." },
  { id: "pasta", label: "Pasta", note: "Cut to order. Half portions of any pasta on request." },
  { id: "secondi", label: "Secondi", note: "Cooked over charcoal." },
  { id: "tasting", label: "Il percorso", note: "The tasting menu. Served to the whole table." },
  { id: "dolci", label: "Dolci", note: "Made in the afternoon." },
  { id: "cocktails", label: "Cocktails", note: "Bitter Italian aperitivi, stirred and clear." },
  { id: "wine", label: "Wine", note: "A selection from the cellar. The full list is at the table." },
];

export const menu: MenuItem[] = [
  // Antipasti
  {
    id: "uovo",
    name: "Slow-cooked hen's egg",
    category: "antipasti",
    description: "Parmigiano Reggiano fonduta aged 36 months, toasted hazelnut, black truffle.",
    price: 24,
    tags: ["vegetarian", "gluten-free"],
    allergens: ["Egg", "Milk", "Nuts"],
    pairing: "Franciacorta Dosaggio Zero, Ca' del Bosco",
    photo: "egg",
    tastingNotes: "The yolk breaks into the fonduta and becomes the sauce. Nutty, savoury, a little earthy from the truffle.",
    origin: "Eggs from Burford Brown hens, Oxfordshire",
  },
  {
    id: "capesante",
    name: "Crudo of Orkney scallop",
    category: "antipasti",
    description: "Blood orange, Taggiasca olive, fennel pollen, Ligurian oil.",
    price: 26,
    tags: ["gluten-free"],
    allergens: ["Molluscs"],
    pairing: "Etna Bianco, Benanti Pietra Marina",
    tastingNotes: "Sweet, cold and clean, with bitterness from the orange and salt from the olive.",
    origin: "Hand-dived in Orkney",
  },
  {
    id: "vitello",
    name: "Vitello tonnato",
    category: "antipasti",
    description: "Rose veal, a sauce of line-caught tuna and capers, crisp caper leaves.",
    price: 22,
    tags: ["gluten-free"],
    allergens: ["Fish", "Egg"],
    pairing: "Barbaresco, Produttori del Barbaresco",
    tastingNotes: "A Piedmontese classic: cool, rich and gently sharp.",
  },

  // Pasta
  {
    id: "tagliolini",
    name: "Tagliolini, white truffle from Alba",
    category: "pasta",
    description: "Forty-yolk tagliolini, cultured butter, Parmigiano, truffle shaved at the table.",
    price: 68,
    tags: ["vegetarian", "chef-special"],
    allergens: ["Egg", "Gluten", "Milk"],
    pairing: "Barolo, Bartolo Mascarello",
    photo: "hero",
    tastingNotes: "Fine as thread, glossy with butter. The truffle is the whole point, so everything else stays quiet. October to December only.",
    origin: "Truffles from the Langhe, delivered twice a week",
  },
  {
    id: "cacio",
    name: "Tonnarelli cacio e pepe",
    category: "pasta",
    description: "Pecorino Romano DOP, Tellicherry and Sarawak pepper, toasted and cracked.",
    price: 28,
    tags: ["vegetarian"],
    allergens: ["Egg", "Gluten", "Milk"],
    pairing: "Verdicchio Riserva, Bucci Villa Bucci",
    photo: "cacio",
    tastingNotes: "Three ingredients, finished at the pass so the sauce stays silken. Salty, sharp, warm with pepper.",
    origin: "Pecorino aged by the Brunelli family, Lazio",
  },
  {
    id: "pappardelle",
    name: "Pappardelle, ragù of hare",
    category: "pasta",
    description: "Wide ribbons, wild hare braised for nine hours with juniper and Barolo Chinato.",
    price: 36,
    tags: ["chef-special"],
    allergens: ["Egg", "Gluten", "Milk", "Celery", "Sulphites"],
    pairing: "Brunello di Montalcino, Biondi-Santi",
    photo: "pappardelle",
    tastingNotes: "Deep and gamey, with a bittersweet edge from the Chinato. The ribbons are cut a finger wide to carry it.",
    origin: "Hare from estates in the Scottish Borders",
  },
  {
    id: "ravioli",
    name: "Ravioli of sheep's ricotta",
    category: "pasta",
    description: "Amalfi lemon, brown butter, crisp sage, aged Parmigiano.",
    price: 32,
    tags: ["vegetarian"],
    allergens: ["Egg", "Gluten", "Milk"],
    pairing: "Franciacorta Dosaggio Zero, Ca' del Bosco",
    photo: "ravioli",
    tastingNotes: "Delicate and bright. The lemon keeps the butter light, and the sage adds a savoury crunch.",
    origin: "Ricotta from Rosary Goat Dairy, Wiltshire",
  },
  {
    id: "gamberi",
    name: "Spaghettoni, red prawns of Mazara",
    category: "pasta",
    description: "Prawn-head bisque, datterini tomato, Calabrian chilli, lemon zest.",
    price: 46,
    tags: ["chef-special"],
    allergens: ["Crustaceans", "Gluten", "Sulphites"],
    pairing: "Etna Bianco, Benanti Pietra Marina",
    photo: "gamberi",
    tastingNotes: "Intensely sweet prawn, a sauce the colour of coral, a slow warmth of chilli.",
    origin: "Gambero rosso from Mazara del Vallo, Sicily",
  },
  {
    id: "vongole",
    name: "Linguine alle vongole",
    category: "pasta",
    description: "Palourde clams, Vermentino, garlic, parsley, a little chilli.",
    price: 38,
    tags: [],
    allergens: ["Molluscs", "Gluten", "Sulphites"],
    pairing: "Etna Bianco, Benanti Pietra Marina",
    photo: "vongole",
    tastingNotes: "The clams open in the pan and their liquor becomes the sauce. Saline, fresh and clean.",
    origin: "Clams from Poole Harbour",
  },
  {
    id: "funghi",
    name: "Tagliatelle, wild ceps",
    category: "pasta",
    description: "Porcini sautéed in brown butter, thyme, a splash of Marsala, Parmigiano.",
    price: 34,
    tags: ["vegetarian"],
    allergens: ["Egg", "Gluten", "Milk", "Sulphites"],
    pairing: "Barbaresco, Produttori del Barbaresco",
    photo: "funghi",
    tastingNotes: "Earthy, savoury and autumnal, with sweetness from the Marsala.",
  },
  {
    id: "bigoli",
    name: "Bigoli, white ragù",
    category: "pasta",
    description: "Thick Venetian strands, a ragù of veal and pork without tomato, rosemary, lemon.",
    price: 32,
    tags: [],
    allergens: ["Gluten", "Milk", "Celery", "Sulphites"],
    pairing: "Brunello di Montalcino, Biondi-Santi",
    photo: "ragu",
    tastingNotes: "Comforting and savoury, lifted by rosemary and a little lemon.",
  },

  // Secondi
  {
    id: "trota",
    name: "Sea trout, beurre blanc",
    category: "secondi",
    description: "Cornish sea trout, beurre blanc with Franciacorta, monk's beard.",
    price: 48,
    tags: ["gluten-free"],
    allergens: ["Fish", "Milk", "Sulphites"],
    pairing: "Franciacorta Dosaggio Zero, Ca' del Bosco",
    photo: "seaTrout",
    tastingNotes: "Barely set, with crisp skin from the charcoal and a sharp, buttery sauce.",
    origin: "Line-caught off Newlyn",
  },
  {
    id: "costata",
    name: "Aged sirloin on the bone",
    category: "secondi",
    description: "Sixty days on the bone, charcoal-grilled, salsa verde, roasted bone marrow.",
    price: 62,
    tags: ["gluten-free"],
    allergens: ["Fish", "Mustard"],
    pairing: "Barolo, Bartolo Mascarello",
    tastingNotes: "Deep, mineral and charred. The salsa verde cuts it with anchovy and caper.",
    origin: "Dexter beef from the Lake District",
  },

  // Tasting
  {
    id: "percorso",
    name: "Il percorso",
    category: "tasting",
    description: "Seven courses chosen by Chef Lorenzo Vitale each morning, four of them pasta.",
    price: 145,
    tags: ["chef-special"],
    allergens: [],
    pairing: "Wine pairing £120, cellar pairing £240",
    photo: "chefPlating",
    tastingNotes: "Priced per person. Around three hours. Please tell us about allergies when you reserve.",
  },
  {
    id: "percorso-verde",
    name: "Il percorso, dall'orto",
    category: "tasting",
    description: "The same seven courses, entirely vegetarian, built around the garden and the forest.",
    price: 125,
    tags: ["vegetarian", "chef-special"],
    allergens: [],
    pairing: "Wine pairing £120",
    photo: "funghi",
    tastingNotes: "Priced per person. Can be made vegan with a day's notice.",
  },

  // Dolci
  {
    id: "tiramisu",
    name: "Tiramisù",
    category: "dolci",
    description: "Savoiardi soaked in espresso and Marsala, mascarpone, Valrhona cocoa.",
    price: 16,
    tags: ["vegetarian"],
    allergens: ["Egg", "Gluten", "Milk", "Sulphites"],
    pairing: "Vin Santo, Avignonesi",
    photo: "tiramisu",
    tastingNotes: "Light as a cloud, not too sweet, with a bitter finish.",
  },
  {
    id: "lampone",
    name: "Raspberry and pistachio torta",
    category: "dolci",
    description: "Bronte pistachio sponge, Scottish raspberries, Chantilly with Marsala.",
    price: 18,
    tags: ["vegetarian"],
    allergens: ["Egg", "Gluten", "Milk", "Nuts"],
    pairing: "Moscato d'Asti, Vietti",
    photo: "raspberry",
    tastingNotes: "Tart fruit, buttery nut, soft cream.",
  },
  {
    id: "gianduja",
    name: "Gianduja, olive oil, sea salt",
    category: "dolci",
    description: "Piedmont hazelnut and dark chocolate cream, Ligurian oil, flaked salt.",
    price: 18,
    tags: ["vegetarian", "gluten-free"],
    allergens: ["Milk", "Nuts"],
    pairing: "Barolo Chinato, Cocchi",
    photo: "chocolate",
    tastingNotes: "Rich and grown-up. The oil and salt make it taste less sweet and more chocolatey.",
  },

  // Cocktails
  {
    id: "negroni-bianco",
    name: "Negroni bianco",
    category: "cocktails",
    description: "Gin, Italicus bergamot, white vermouth, gentian, lemon oil.",
    price: 19,
    tags: ["vegan", "gluten-free"],
    allergens: ["Sulphites"],
    photo: "negroni",
    tastingNotes: "Bitter, floral and very dry.",
  },
  {
    id: "filo-spritz",
    name: "Filo spritz",
    category: "cocktails",
    description: "Blood orange aperitivo, Franciacorta, soda, an orange twist.",
    price: 18,
    tags: ["vegan", "gluten-free", "chef-special"],
    allergens: ["Sulphites"],
    photo: "spritz",
    tastingNotes: "Bright, bittersweet and fine-bubbled.",
  },
  {
    id: "rosmarino",
    name: "Rosemary and fig",
    category: "cocktails",
    description: "Aged grappa, fig leaf, rosemary smoke, a single large ice cube.",
    price: 20,
    tags: ["vegan", "gluten-free"],
    allergens: [],
    photo: "smoked",
    tastingNotes: "Herbal and smoky, with a sweet green note from the fig leaf.",
  },
  {
    id: "zero",
    name: "Bergamot and tonic (alcohol-free)",
    category: "cocktails",
    description: "Bergamot cordial, chinotto, tonic water.",
    price: 12,
    tags: ["vegan", "gluten-free"],
    allergens: [],
    tastingNotes: "Citrus and bitter, like a grown-up chinotto.",
  },

  // Wine
  {
    id: "franciacorta",
    name: "Franciacorta Dosaggio Zero, Ca' del Bosco",
    category: "wine",
    description: "Lombardy. Bone-dry sparkling, with brioche and green apple.",
    price: 22,
    priceNote: "£22 a glass, £110 a bottle",
    tags: ["vegan", "gluten-free"],
    allergens: ["Sulphites"],
    photo: "wineToast",
  },
  {
    id: "etna-bianco",
    name: "Etna Bianco, Benanti Pietra Marina",
    category: "wine",
    description: "Sicily. Carricante from the volcano: citrus, flint and sea salt.",
    price: 24,
    priceNote: "£24 a glass, £120 a bottle",
    tags: ["vegan", "gluten-free"],
    allergens: ["Sulphites"],
  },
  {
    id: "verdicchio",
    name: "Verdicchio Riserva, Bucci Villa Bucci",
    category: "wine",
    description: "Marche. Textured, almond, chamomile and a long mineral finish.",
    price: 19,
    priceNote: "£19 a glass, £95 a bottle",
    tags: ["vegan", "gluten-free"],
    allergens: ["Sulphites"],
  },
  {
    id: "barbaresco",
    name: "Barbaresco, Produttori del Barbaresco",
    category: "wine",
    description: "Piedmont. Nebbiolo with rose, red cherry and fine tannin.",
    price: 21,
    priceNote: "£21 a glass, £105 a bottle",
    tags: ["vegan", "gluten-free"],
    allergens: ["Sulphites"],
  },
  {
    id: "brunello",
    name: "Brunello di Montalcino, Biondi-Santi",
    category: "wine",
    description: "Tuscany. Sangiovese of great poise: sour cherry, leather and tobacco.",
    price: 380,
    priceNote: "£380 a bottle",
    tags: ["vegan", "gluten-free"],
    allergens: ["Sulphites"],
    photo: "wineBottles",
  },
  {
    id: "barolo",
    name: "Barolo, Bartolo Mascarello",
    category: "wine",
    description: "Piedmont. Traditional Nebbiolo: tar, roses, dried cherry, immense length.",
    price: 420,
    priceNote: "£420 a bottle",
    tags: ["vegan", "gluten-free"],
    allergens: ["Sulphites"],
    photo: "pour",
  },
];

/** The sommelier's four standing pairings. */
export const pairings: { dishId: string; wineId: string; why: string }[] = [
  {
    dishId: "tagliolini",
    wineId: "barolo",
    why: "Nebbiolo and white truffle grow in the same hills of the Langhe. The wine's notes of tar and roses meet the truffle's perfume, and its acidity cuts the butter.",
  },
  {
    dishId: "pappardelle",
    wineId: "brunello",
    why: "Sangiovese's sour cherry brightens the dark, gamey ragù, and its firm tannin is softened by the richness of the hare.",
  },
  {
    dishId: "gamberi",
    wineId: "etna-bianco",
    why: "A volcanic white with a saline edge for prawns from the same island. It has the acidity to match the tomato and the restraint to let the prawn lead.",
  },
  {
    dishId: "ravioli",
    wineId: "franciacorta",
    why: "Fine bubbles and zero dosage lift brown butter the way lemon does, and the wine's brioche notes echo the toasted sage.",
  },
];

/** The four signatures on the home page, with a tasting profile from 1 to 5. */
export const signatures: { dishId: string; profile: { richness: number; salinity: number; acidity: number } }[] = [
  { dishId: "cacio", profile: { richness: 4, salinity: 5, acidity: 1 } },
  { dishId: "pappardelle", profile: { richness: 5, salinity: 3, acidity: 2 } },
  { dishId: "gamberi", profile: { richness: 3, salinity: 4, acidity: 3 } },
  { dishId: "ravioli", profile: { richness: 3, salinity: 2, acidity: 4 } },
];

export const getItem = (id: string) => {
  const item = menu.find((m) => m.id === id);
  if (!item) throw new Error(`Unknown menu item: ${id}`);
  return item;
};
