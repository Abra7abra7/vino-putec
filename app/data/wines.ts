export interface Wine {
  id: string;
  name: string;
  year: string;
  region: string;
  description: string;
  longDescription?: string;
  price: string;
  numericPrice: number;
  rating: number;
  image: string;
  stock: number;
  category: string;
  tasting?: {
    appearance?: string;
    aroma?: string;
    flavor?: string;
    finish?: string;
  };
  pairings?: string[];
  awards?: {
    year: string;
    award: string;
  }[];
}

export const wines: Wine[] = [
  {
    id: "reserve-cabernet",
    name: "Putec Reserve Cabernet",
    year: "2019",
    region: "Ribera del Duero, Spain",
    description: "A masterpiece of complexity and elegance, featuring rich dark fruits, subtle oak, and a silky finish that lingers.",
    longDescription: "Our Reserve Cabernet is the culmination of decades of winemaking expertise. Handcrafted from grapes grown in our most prestigious vineyard plots, this wine embodies the perfect balance of power and finesse. The extended aging in French oak barrels imparts a luxurious complexity that continues to evolve in the bottle.",
    price: "€145",
    numericPrice: 145,
    rating: 5,
    image: "/images/vino/red.png",
    stock: 24,
    category: "red",
    tasting: {
      appearance: "Deep ruby with garnet highlights",
      aroma: "Black currant, cedar, tobacco, and hints of vanilla",
      flavor: "Full-bodied with layers of dark fruit, chocolate, and spice",
      finish: "Long and elegant with perfectly integrated tannins"
    },
    pairings: ["Aged ribeye steak", "Lamb rack with rosemary", "Dark chocolate desserts"],
    awards: [
      { year: "2022", award: "Decanter World Wine Awards - Gold Medal" },
      { year: "2023", award: "International Wine Challenge - 95 Points" }
    ]
  },
  {
    id: "grand-cru",
    name: "Grand Cru Tempranillo",
    year: "2018",
    region: "Ribera del Duero, Spain",
    description: "Our flagship wine, expressing the pure essence of Spanish terroir with remarkable depth and character.",
    longDescription: "The Grand Cru Tempranillo represents the pinnacle of our winemaking philosophy. Produced only in exceptional vintages, this limited-production wine is crafted from our oldest Tempranillo vines, some dating back over 80 years. Each bottle is numbered, reflecting its exclusivity and collectible status among wine connoisseurs worldwide.",
    price: "€180",
    numericPrice: 180,
    rating: 5,
    image: "/images/vino/red2.png",
    stock: 18,
    category: "red",
    tasting: {
      appearance: "Intense, deep purple with slow-forming legs",
      aroma: "Complex bouquet of black cherry, plum, leather, and truffle",
      flavor: "Powerful yet refined, with perfect balance of fruit, acidity, and oak",
      finish: "Exceptionally long with velvety tannins and mineral notes"
    },
    pairings: ["Suckling pig", "Beef Wellington", "Manchego cheese"],
    awards: [
      { year: "2021", award: "Robert Parker - 97 Points" },
      { year: "2022", award: "Wine Spectator Top 100 - #12" }
    ]
  },
  {
    id: "limited-merlot",
    name: "Limited Edition Merlot",
    year: "2020",
    region: "Ribera del Duero, Spain",
    description: "A rare blend showcasing exceptional balance between fruit and structure, with only 1,000 bottles produced.",
    longDescription: "Our Limited Edition Merlot breaks tradition in Ribera del Duero, where Tempranillo typically reigns supreme. This experimental wine demonstrates our commitment to innovation while honoring classic winemaking techniques. The result is a uniquely Spanish expression of Merlot that surprises and delights with its distinctive character.",
    price: "€120",
    numericPrice: 120,
    rating: 4,
    image: "/images/vino/rose.png",
    stock: 32,
    category: "red",
    tasting: {
      appearance: "Bright ruby red with violet reflections",
      aroma: "Red berries, plum, subtle herbs, and mocha",
      flavor: "Medium to full-bodied with silky texture and bright fruit",
      finish: "Clean and persistent with balanced acidity"
    },
    pairings: ["Roasted duck", "Mushroom risotto", "Soft cheeses"],
    awards: [
      { year: "2022", award: "Mundus Vini - Gold Medal" },
      { year: "2023", award: "Concours Mondial de Bruxelles - Silver Medal" }
    ]
  },
  {
    id: "crianza",
    name: "Putec Crianza",
    year: "2021",
    region: "Ribera del Duero, Spain",
    description: "An approachable yet sophisticated wine that perfectly balances fruit and oak, ideal for everyday enjoyment.",
    longDescription: "Our Crianza represents the heart and soul of Putec Winery. Aged for 12 months in a combination of American and French oak barrels, this wine offers exceptional quality and value. It embodies the authentic character of Ribera del Duero while remaining accessible to both newcomers and seasoned wine enthusiasts.",
    price: "€35",
    numericPrice: 35,
    rating: 4,
    image: "/images/vino/rose.png",
    stock: 120,
    category: "red",
    tasting: {
      appearance: "Medium ruby red",
      aroma: "Red fruits, vanilla, and subtle spice",
      flavor: "Medium-bodied with balanced tannins and fresh acidity",
      finish: "Pleasant and lingering with hints of toast"
    },
    pairings: ["Tapas", "Paella", "Grilled vegetables"],
    awards: [
      { year: "2022", award: "Guía Peñín - 91 Points" }
    ]
  },
  {
    id: "vintage-collection",
    name: "Vintage Collection",
    year: "2015",
    region: "Ribera del Duero, Spain",
    description: "A meticulously preserved vintage showcasing the exceptional aging potential of our finest Tempranillo grapes.",
    longDescription: "The Vintage Collection represents our commitment to creating wines of remarkable longevity. Released only after extended cellar aging, this wine demonstrates how the finest Ribera del Duero wines evolve and gain complexity over time. Each bottle offers a glimpse into the past while promising continued development for years to come.",
    price: "€210",
    numericPrice: 210,
    rating: 5,
    image: "/images/vino/rose2.png",
    stock: 15,
    category: "limited",
    tasting: {
      appearance: "Deep garnet with brick edges",
      aroma: "Dried fruits, leather, tobacco, and forest floor",
      flavor: "Complex tertiary flavors with perfectly resolved tannins",
      finish: "Extraordinary length with waves of evolving flavors"
    },
    pairings: ["Game meats", "Truffle dishes", "Aged cheeses"],
    awards: [
      { year: "2020", award: "Wine Enthusiast - 96 Points" },
      { year: "2021", award: "Decanter - Wine of the Year Finalist" }
    ]
  },
  {
    id: "estate-reserve",
    name: "Estate Reserve",
    year: "2017",
    region: "Ribera del Duero, Spain",
    description: "A single-vineyard masterpiece that captures the unique terroir of our historic estate vineyards.",
    longDescription: "The Estate Reserve is produced exclusively from our original vineyard plots, planted by the Putec family in the early 20th century. These old vines, growing in limestone-rich soils at high elevation, produce wines of extraordinary concentration and complexity. Each vintage tells the story of a specific growing season through the lens of this exceptional terroir.",
    price: "€165",
    numericPrice: 165,
    rating: 5,
    image: "/images/vino/white.png",
    stock: 22,
    category: "limited",
    tasting: {
      appearance: "Opaque purple-black",
      aroma: "Blackberry, cassis, graphite, and exotic spices",
      flavor: "Intensely concentrated with remarkable purity of fruit",
      finish: "Powerful yet refined with perfectly integrated oak"
    },
    pairings: ["Prime rib", "Venison", "Dark chocolate"],
    awards: [
      { year: "2021", award: "James Suckling - 96 Points" },
      { year: "2022", award: "Wine Advocate - 95+ Points" }
    ]
  }
];
