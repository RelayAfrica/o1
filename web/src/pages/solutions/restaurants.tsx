// Populated with authentic Nigerian dish photography and custom pricing
import { SolutionTemplate } from "../solution-template";
import { StorefrontPreview, type Category, type Product } from "@/components/landing/StorefrontPreview";

const categories: Category[] = [
  { id: "starters", name: "Starters", emoji: "🥗" },
  { id: "soups", name: "Soups", emoji: "🍲" },
  { id: "rice", name: "Rice Dishes", emoji: "🍚" },
  { id: "grills", name: "Grills & Protein", emoji: "🍖" },
  { id: "seafood", name: "Seafood", emoji: "🦐" },
  { id: "burgers", name: "Burgers", emoji: "🍔" },
  { id: "sides", name: "Sides", emoji: "🍟" },
  { id: "drinks", name: "Drinks", emoji: "🥤" },
  { id: "desserts", name: "Desserts", emoji: "🍮" },
];

const products: Product[] = [
  // ── Starters ────────────────────────────────────────────────────────────────
  {
    id: "spring-roll",
    name: "Crispy Spring Rolls (4 pcs)",
    description: "Golden fried rolls filled with seasoned vegetables and minced chicken, served with sweet chilli dip.",
    price: 2500,
    image: "https://images.pexels.com/photos/8178762/pexels-photo-8178762.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    category: "starters",
    tag: "Popular",
  },
  {
    id: "suya-bites",
    name: "Suya Bites",
    description: "Tender strips of spiced beef skewers with yaji seasoning, sliced onions and tomatoes on the side.",
    price: 3500,
    image: "https://www.chilipeppermadness.com/wp-content/uploads/2025/09/Suya-Recipe-SQ-300x300.jpg",
    category: "starters",
    featured: true,
    tag: "Chef's Special",
  },
  {
    id: "pepper-soup",
    name: "Nigerian Pepper Soup",
    description: "A light, fiery broth with catfish and an aromatic blend of uziza, uda and calabash nutmeg. A true classic.",
    price: 3800,
    image: "https://deyumjollof.com/wp-content/uploads/2025/10/Nigerian-Catfish-peppersoup-warri-version.jpg",
    category: "starters",
    featured: true,
    tag: "Best Seller",
  },
  {
    id: "kilishi-chips",
    name: "Kilishi Chips",
    description: "Thin, jerky-style beef crisps seasoned with ground groundnut, ginger and pepper blend.",
    price: 2000,
    image: "https://images-na.ssl-images-amazon.com/images/I/91FWFvc92iL.jpg",
    category: "starters",
  },

  // ── Soups & Swallows ─────────────────────────────────────────────────────────
  {
    id: "egusi-soup",
    name: "Egusi Soup & Eba",
    description: "Rich ground melon seed soup slow-cooked with assorted meat, stockfish and leafy vegetables. Served with smooth eba.",
    price: 4500,
    image: "https://p7.hiclipart.com/preview/817/1021/244/undhiyu-nigerian-cuisine-eba-efo-riro-egusi-soup-kitchen-thumbnail.jpg",
    category: "soups",
    featured: true,
    tag: "Customer Fav",
  },
  {
    id: "banga-soup",
    name: "Banga Soup & Starch",
    description: "Delta-style palm nut soup with a bold, spiced banga concentrate. Paired with smooth cassava starch.",
    price: 4800,
    image: "https://www.africanrecipes.com.ng/wp-content/uploads/2025/08/banga-soup-niger-delta.png.webp",
    category: "soups",
  },
  {
    id: "ofe-onugbu",
    name: "Ofe Onugbu & Fufu",
    description: "Igbo bitter leaf soup cooked with palm oil, cocoyam thickener, assorted meats and dried fish.",
    price: 4200,
    image: "https://lowcarbafrica.com/wp-content/uploads/2024/05/Bitter-Leaf-Soup-IG-1-360x360.jpg",
    category: "soups",
  },
  {
    id: "edikang-ikong",
    name: "Edikang Ikong & Pounded Yam",
    description: "Calabar's finest vegetable soup with waterleaf, ugwu, assorted meat and periwinkles.",
    price: 5200,
    image: "https://media-cdn.tripadvisor.com/media/photo-o/1c/cd/9e/d4/edikang-ikong-vegetable.jpg",
    category: "soups",
  },

  // ── Rice Dishes ──────────────────────────────────────────────────────────────
  {
    id: "jollof-rice",
    name: "Party Jollof Rice",
    description: "Smoky, rich tomato rice slow-cooked over firewood in true Nigerian party style. Served with coleslaw.",
    price: 3800,
    image: "https://immaculateruemu.com/wp-content/uploads/2021/10/IMG_5154-e1636794901980-300x300.jpeg.webp",
    category: "rice",
    featured: true,
    tag: "🔥 Trending",
  },
  {
    id: "ofada-rice",
    name: "Ofada Rice & Ayamase Stew",
    description: "Locally grown ofada rice paired with the iconic green pepper stew loaded with assorted offal.",
    price: 4200,
    image: "https://www.thepretendchef.com/wp-content/uploads/2018/11/green-ofada-stew-Ayamase-4-1.jpg",
    category: "rice",
    featured: true,
    tag: "Chef's Special",
  },
  {
    id: "fried-rice",
    name: "Nigerian Fried Rice",
    description: "Colourful long-grain rice stir-fried with vegetables, liver, and seasoning. Classic accompaniment.",
    price: 3500,
    image: "https://thumbs.dreamstime.com/b/nigerian-jollof-rice-fried-plantains-digital-428146835.jpg",
    category: "rice",
  },
  {
    id: "coconut-rice",
    name: "Coconut Rice & Fried Plantain",
    description: "Fragrant rice cooked in coconut milk with king prawns, served alongside crispy sweet plantain.",
    price: 4500,
    image: "https://www.theroastedroot.net/wp-content/uploads/2015/02/cuban_shrimp_bowls_with_coconut_rice_mango_salsa_and_fried_plantains.jpg",
    category: "rice",
  },

  // ── Grills & Protein ─────────────────────────────────────────────────────────
  {
    id: "asun",
    name: "Asun (Peppered Goat Meat)",
    description: "Smoked goat meat chopped and tossed in a spicy Scotch bonnet pepper sauce. A Yoruba delicacy.",
    price: 5500,
    image: "https://i.pinimg.com/originals/2f/f0/85/2ff0855c642630b88358b06f48ac43da.jpg",
    category: "grills",
    featured: true,
    tag: "Best Seller",
  },
  {
    id: "grilled-chicken",
    name: "Whole Grilled Chicken",
    description: "Marinated overnight in our signature blend of spices, slow-grilled until tender and juicy.",
    price: 8500,
    image: "https://thumbs.dreamstime.com/b/barbecued-food-grill-chicken-wings-barbecued-food-ho-chi-minh-city-vietnam-grill-chicken-wings-grilled-popular-snack-114976025.jpg",
    category: "grills",
  },
  {
    id: "pork-ribs",
    name: "BBQ Pork Ribs",
    description: "Fall-off-the-bone ribs glazed with smoky house BBQ sauce, served with coleslaw and corn.",
    price: 9000,
    image: "https://static.vecteezy.com/system/resources/thumbnails/060/653/782/small/crispy-roast-pork-skin-closeup-outdoor-setting-foodgraphy-bright-background-copyspace-free-photo.jpeg",
    category: "grills",
  },
  {
    id: "suya-platter",
    name: "Mixed Suya Platter",
    description: "An assortment of beef, chicken and ram suya on skewers with sliced onions and tomatoes.",
    price: 6500,
    image: "https://nkechiajaeroh.com/wp-content/uploads/2020/06/Main-photo-4-Nigerian-Chicken-Suya.jpg",
    category: "grills",
    featured: true,
    tag: "New Arrival",
  },

  // ── Seafood ──────────────────────────────────────────────────────────────────
  {
    id: "grilled-tilapia",
    name: "Whole Grilled Tilapia",
    description: "Fresh tilapia spiced with herb marinade and grilled to perfection. Served with jollof rice or eba.",
    price: 6500,
    image: "https://ladyleeshome.com/wp-content/uploads/2022/10/grilled-whole-tilapia-7.jpg",
    category: "seafood",
    featured: true,
    tag: "Chef's Special",
  },
  {
    id: "prawn-stir",
    name: "Peppered King Prawns",
    description: "Juicy king prawns sautéed in a spicy tomato and pepper sauce with fresh herbs.",
    price: 7500,
    image: "http://fiveeurofood.com/wp-content/uploads/2011/04/IMG_0532-1024x682.jpg",
    category: "seafood",
  },
  {
    id: "seafood-stew",
    name: "Mixed Seafood Stew",
    description: "A medley of prawns, calamari, crab claws and fish in a rich tomato-based Creole sauce.",
    price: 8500,
    image: "https://www.wickedspatula.com/wp-content/uploads/2016/12/Mixed-Seafood-Stew-4-780x1170.jpg",
    category: "seafood",
  },

  // ── Burgers ──────────────────────────────────────────────────────────────────
  {
    id: "beef-burger",
    name: "Classic Smash Burger",
    description: "Double smash patty, American cheese, caramelised onions, pickles and house sauce in a brioche bun.",
    price: 4800,
    image: "https://thehealthyfood.org/wp-content/uploads/2026/03/Classic-Smash-Burgers-Double-Patty-with-Crispy-Edges-Special-Sauce-Recipe-1.webp",
    category: "burgers",
  },
  {
    id: "spicy-chicken-burger",
    name: "Spicy Crispy Chicken Burger",
    description: "Crispy buttermilk-fried chicken fillet with sriracha slaw, pickled jalapeño and garlic mayo.",
    price: 4500,
    image: "https://sometimesyouneedtocook.com/wp-content/uploads/2014/11/iPhone-235-700x700.jpg",
    category: "burgers",
  },
  {
    id: "suya-burger",
    name: "Suya Fusion Burger",
    description: "Nigerian-inspired suya beef patty with yaji aioli, tomato, onion rings and scotch bonnet relish.",
    price: 5200,
    image: "https://m.media-amazon.com/images/I/51u8HlAi6kL.jpg",
    category: "burgers",
    tag: "House Special",
  },

  // ── Sides ────────────────────────────────────────────────────────────────────
  {
    id: "plantain",
    name: "Fried Sweet Plantain (Dodo)",
    description: "Ripe plantain slices fried golden and crispy on the outside, soft and sweet inside.",
    price: 1500,
    image: "https://preview.redd.it/nigerian-sweet-fried-plantain-dodo-v0-d22c3vkx09v81.jpg?width=640&crop=smart&auto=webp&s=565acac93cd3d606655cb384ae60e33c52bc31b4",
    category: "sides",
  },
  {
    id: "coleslaw",
    name: "Creamy Coleslaw",
    description: "Fresh cabbage and carrot in a lightly sweetened mayonnaise dressing.",
    price: 1200,
    image: "https://d1yfn1dfres2va.cloudfront.net/009/bf/f8/bff8e3ea47ec652ce5385a77b00f2d0b_640m.jpg",
    category: "sides",
  },
  {
    id: "moi-moi",
    name: "Moi Moi",
    description: "Steamed bean pudding seasoned with peppers, onions and a boiled egg inside.",
    price: 1800,
    image: "https://i.pinimg.com/originals/d4/06/b6/d406b6cb5409f4846cae24af8c80a5ef.jpg",
    category: "sides",
  },
  {
    id: "fries",
    name: "Seasoned Potato Fries",
    description: "Crispy oven-seasoned fries dusted with our house spice blend.",
    price: 1500,
    image: "https://thumbs.dreamstime.com/b/sweet-potato-fries-serving-delicious-deep-fried-32537740.jpg",
    category: "sides",
  },

  // ── Drinks ───────────────────────────────────────────────────────────────────
  {
    id: "zobo",
    name: "Zobo (Hibiscus) Drink",
    description: "Chilled hibiscus flower drink infused with ginger, cloves and pineapple. Naturally refreshing.",
    price: 1500,
    image: "https://foodpluswords.com/wp-content/uploads/2022/05/nigerian-zobo-drink-5576-1024x683.jpg",
    category: "drinks",
    featured: true,
    tag: "Local Fav",
  },
  {
    id: "kunu",
    name: "Kunu Zaki",
    description: "Traditional millet and spiced grain drink, lightly sweetened and served chilled.",
    price: 1200,
    image: "https://blog.9jakitchen.com/wp-content/uploads/2026/02/How-to-Make-Kunun-Zaki.png",
    category: "drinks",
  },
  {
    id: "chapman",
    name: "Chapman Cocktail",
    description: "Nigeria's favourite mocktail — Fanta, Sprite, Angostura bitters, cucumber and grenadine over ice.",
    price: 2000,
    image: "https://www.immaculateruemu.com/wp-content/uploads/2022/01/IMG_9661-scaled.jpg",
    category: "drinks",
  },
  {
    id: "malt-drink",
    name: "Chilled Malt (Supermalt)",
    description: "Non-alcoholic malt beverage, rich and smooth. Served ice cold.",
    price: 1000,
    image: "https://rileystropicalfood.co.uk/cdn/shop/products/RILEY_STROPICALFOOD-2023-01-05T103823.771.png?v=1672916023&width=1445",
    category: "drinks",
  },

  // ── Desserts ─────────────────────────────────────────────────────────────────
  {
    id: "puff-puff",
    name: "Puff Puff & Chocolate Dip",
    description: "Light, airy fried dough balls dusted with powdered sugar and served with warm chocolate sauce.",
    price: 2000,
    image: "https://keeshaskitchen.com/wp-content/uploads/2022/11/Puff-Puffs-Delicious-African-Deep-Fried-Dough-4.jpg",
    category: "desserts",
    featured: true,
    tag: "Sweet Treat",
  },
  {
    id: "chin-chin",
    name: "Spiced Chin Chin Platter",
    description: "Crunchy Nigerian fried snack in a variety of flavours — coconut, chocolate and vanilla.",
    price: 1500,
    image: "https://www.africanrecipes.com.ng/wp-content/uploads/2025/08/fried-chin-chin-snack-tray.png.webp",
    category: "desserts",
  },
  {
    id: "ice-cream",
    name: "House Ice Cream (3 Scoops)",
    description: "Fresh-churned ice cream in your choice of vanilla bean, mango sorbet or dark chocolate.",
    price: 2500,
    image: "https://i.pinimg.com/originals/d7/b7/37/d7b7374279121b50d8459fa2492ff047.jpg",
    category: "desserts",
  },
];

export default function RestaurantsPage() {
  return (
    <SolutionTemplate
      industry="Restaurants"
      tagline="Faster tables, happier diners, bigger bills."
      description="Relay gives restaurants a digital-first dining experience — from waitlist management to tableside ordering and payment. No printed menus, no wasted covers, no chaotic handoffs."
      heroStat="28%"
      heroStatLabel="average increase in table turnover reported by restaurants using Relay"
      accentColor="primary"
      challenges={[
        {
          title: "Waitlist chaos at peak hours",
          body: "Front-of-house staff spend half their shift managing walk-in expectations while a physical queue forms at the entrance.",
        },
        {
          title: "Slow order handoffs",
          body: "Paper tickets and verbal handoffs between front-of-house and kitchen create errors, delays, and unhappy customers.",
        },
        {
          title: "Limited upsell opportunities",
          body: "Static printed menus don't highlight specials, modifiers, or pair-well suggestions that drive average order value.",
        },
      ]}
      features={[
        { icon: "📲", title: "NFC Tap to Join Waitlist", body: "Guests scan or tap to add themselves to the waitlist and receive a WhatsApp message when their table is ready." },
        { icon: "🍽️", title: "Digital Menu with Images", body: "Rich menus with photos, allergen info, and modifier options — updated instantly from your dashboard." },
        { icon: "🧾", title: "Tableside Ordering", body: "Guests browse and order from their phone. Orders go straight to the kitchen display — no runner needed." },
        { icon: "💳", title: "Contactless Payments", body: "Split bills, pay by card or bank transfer, and receive e-receipts via WhatsApp — all without calling a waiter." },
        { icon: "🪑", title: "Table Status Dashboard", body: "See every table's status — waiting, seated, ordering, or settled — from one live screen at the host stand." },
        { icon: "📣", title: "Customer Campaigns", body: "Send birthday offers, re-engagement messages, or weekly specials to customers who've dined before." },
      ]}
      quote="We used to lose covers because guests got tired of waiting without any updates. Now they stay because they know exactly when their table is ready."
      quoteAuthor="General Manager"
      quoteCompany="Ember & Vine Restaurant"
      storefrontPreview={
        <StorefrontPreview
          storeName="Ember & Vine"
          storeTagline="Contemporary Nigerian Cuisine · Victoria Island"
          coverGradient="linear-gradient(135deg, #b45309 0%, #92400e 50%, #78350f 100%)"
          logoEmoji="🍽️"
          logoColor="#b45309"
          accentColor="#b45309"
          accentText="white"
          categories={categories}
          products={products}
        />
      }
    />
  );
}
