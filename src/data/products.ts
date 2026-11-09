export type ArtKey = "c" | "b" | "m" | "u" | "r" | "k";

export type Product = {
  id: string;
  name: string;
  art: ArtKey;
  price: number; // rupees per piece
  description: string;
  ingredients: string;
  tip: string;
  size: string;
  shelfLife: string;
};

// Edit this file to change the menu. Later it can be replaced by a database query.
export const products: Product[] = [
  { id: "croissant", name: "Butter croissant", art: "c", price: 70, description: "Flaky, laminated and still warm at heart.", ingredients: "Wheat flour, butter, milk, sugar, yeast, salt", tip: "Warm for 3 minutes at 160 °C.", size: "1 piece · box of 4", shelfLife: "Best within 24 hours" },
  { id: "sourdough", name: "Sourdough loaf", art: "b", price: 240, description: "A crackly crust and a soft, tangy crumb from a 48-hour ferment.", ingredients: "Wheat flour, water, sourdough starter, salt", tip: "Slice and toast, or keep wrapped.", size: "600 g loaf", shelfLife: "2 days" },
  { id: "curd", name: "Set curd", art: "m", price: 85, description: "Thick, mild curd set overnight and packed fresh.", ingredients: "Full-cream milk, live cultures", tip: "Keep chilled and eat within 3 days.", size: "500 g", shelfLife: "3 days, refrigerated" },
  { id: "cupcake", name: "Berry cupcake", art: "u", price: 110, description: "Eggless vanilla sponge with fresh berry frosting.", ingredients: "Flour, milk, sugar, butter, berries, vanilla", tip: "Serve at room temperature.", size: "1 piece · box of 4", shelfLife: "2 days, refrigerated" },
  { id: "paneer", name: "Paneer butter masala", art: "r", price: 260, description: "A ready meal: heat for three minutes and eat.", ingredients: "Paneer, tomato, butter, cream, spices", tip: "Heat for 3 minutes, stir once.", size: "300 g serving", shelfLife: "2 days, refrigerated" },
  { id: "cookies", name: "Millet cookies", art: "k", price: 150, description: "Crisp edges, nutty and not too sweet. Vegan.", ingredients: "Ragi, jowar, jaggery, coconut oil", tip: "Lovely with chai, store airtight.", size: "200 g box", shelfLife: "10 days" },
];

export const getProduct = (id: string) => products.find((p) => p.id === id);
