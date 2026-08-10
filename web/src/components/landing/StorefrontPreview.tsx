import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  featured?: boolean;
  tag?: string;
  available?: boolean;
}

export interface Category {
  id: string;
  name: string;
  emoji: string;
}

export interface StorefrontPreviewProps {
  storeName: string;
  storeTagline: string;
  coverGradient: string;
  logoEmoji: string;
  logoColor: string;
  accentColor: string;
  accentText: string;
  categories: Category[];
  products: Product[];
  currency?: string;
}

function formatPrice(price: number, currency = "₦"): string {
  return `${currency}${price.toLocaleString()}`;
}

export function StorefrontPreview({
  storeName,
  storeTagline,
  coverGradient,
  logoEmoji,
  logoColor,
  accentColor,
  accentText,
  categories,
  products,
  currency = "₦",
}: StorefrontPreviewProps) {
  const [activeCategory, setActiveCategory] = useState<string>("featured");
  const [cart, setCart] = useState<Record<string, number>>({});

  const featured = products.filter((p) => p.featured);
  const filtered =
    activeCategory === "featured"
      ? featured
      : products.filter((p) => p.category === activeCategory);

  function addToCart(id: string) {
    setCart((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  }

  const cartCount = Object.values(cart).reduce((a, b) => a + b, 0);
  const cartTotal = Object.entries(cart).reduce((sum, [id, qty]) => {
    const p = products.find((x) => x.id === id);
    return sum + (p?.price ?? 0) * qty;
  }, 0);

  const allTabs: Category[] = [
    { id: "featured", name: "Featured", emoji: "⭐" },
    ...categories,
  ];

  return (
    <section className="py-16 bg-muted/20">
      <div className="container mx-auto px-4 md:px-6 max-w-6xl">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <div className="inline-flex rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-semibold text-primary mb-4">
            Live Storefront Demo
          </div>
          <h2 className="text-2xl md:text-3xl font-bold mb-3">
            See how your menu looks to customers
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-sm leading-relaxed">
            Customers browse your full menu, add items, and pay — all from their phone. No app download required.
          </p>
        </motion.div>

        {/* Phone mockup wrapper */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="flex justify-center"
        >
          <div
            className="relative w-full max-w-sm rounded-[2.5rem] border-[6px] border-foreground/10 shadow-2xl overflow-hidden"
            style={{ background: "#f7f8f9" }}
          >
            {/* Store cover */}
            <div
              className="relative h-36 flex flex-col justify-end px-4 pb-3"
              style={{ background: coverGradient }}
            >
              {/* Cart indicator */}
              {cartCount > 0 && (
                <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-white/90 backdrop-blur rounded-full px-3 py-1 shadow">
                  <span className="text-xs font-bold text-foreground">
                    🛒 {cartCount}
                  </span>
                  <span className="text-xs font-semibold text-primary">
                    {formatPrice(cartTotal, currency)}
                  </span>
                </div>
              )}

              {/* Store logo + name */}
              <div className="flex items-center gap-3">
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shadow-lg border-2 border-white/30"
                  style={{ background: logoColor }}
                >
                  {logoEmoji}
                </div>
                <div>
                  <h3 className="text-white font-bold text-base leading-tight drop-shadow">
                    {storeName}
                  </h3>
                  <p className="text-white/70 text-[10px] leading-tight mt-0.5">
                    {storeTagline}
                  </p>
                </div>
              </div>
            </div>

            {/* Store meta */}
            <div className="flex items-center gap-3 px-4 py-2 bg-white border-b border-border text-[10px] text-muted-foreground">
              <span className="flex items-center gap-1">⭐ 4.8</span>
              <span>•</span>
              <span className="flex items-center gap-1">🕐 20–35 min</span>
              <span>•</span>
              <span className="flex items-center gap-1">🛵 Free delivery</span>
            </div>

            {/* Category tabs */}
            <div
              className="flex gap-2 px-3 py-2.5 overflow-x-auto bg-white border-b border-border"
              style={{ scrollbarWidth: "none" }}
            >
              {allTabs.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`flex-shrink-0 flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-semibold transition-all duration-200 ${
                    activeCategory === cat.id
                      ? `text-white shadow`
                      : "bg-muted text-muted-foreground hover:bg-muted/70"
                  }`}
                  style={
                    activeCategory === cat.id
                      ? { background: accentColor }
                      : {}
                  }
                >
                  <span>{cat.emoji}</span>
                  {cat.name}
                </button>
              ))}
            </div>

            {/* Product list */}
            <div
              className="overflow-y-auto"
              style={{ maxHeight: 480, background: "#f7f8f9" }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeCategory}
                  initial={{ opacity: 0, x: 8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -8 }}
                  transition={{ duration: 0.2 }}
                  className="p-3 space-y-2.5"
                >
                  {filtered.length === 0 && (
                    <p className="text-center text-xs text-muted-foreground py-8">
                      No items in this category yet.
                    </p>
                  )}
                  {filtered.map((product) => {
                    const qty = cart[product.id] || 0;
                    return (
                      <div
                        key={product.id}
                        className="bg-white rounded-2xl border border-border overflow-hidden shadow-sm"
                      >
                        <div className="flex gap-3 p-3">
                          {/* Product image */}
                          <div className="relative w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
                            <img
                              src={product.image}
                              alt={product.name}
                              className="w-full h-full object-cover"
                              loading="lazy"
                            />
                            {product.tag && (
                              <div
                                className="absolute top-1 left-1 px-1.5 py-0.5 rounded text-[8px] font-bold text-white"
                                style={{ background: accentColor }}
                              >
                                {product.tag}
                              </div>
                            )}
                          </div>

                          {/* Product info */}
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-bold text-foreground leading-tight truncate">
                              {product.name}
                            </p>
                            <p className="text-[10px] text-muted-foreground leading-snug mt-0.5 line-clamp-2">
                              {product.description}
                            </p>
                            <div className="flex items-center justify-between mt-2">
                              <span
                                className="text-sm font-bold"
                                style={{ color: accentColor }}
                              >
                                {formatPrice(product.price, currency)}
                              </span>

                              {/* Quantity control */}
                              {qty === 0 ? (
                                <button
                                  onClick={() => addToCart(product.id)}
                                  className="text-[10px] font-semibold text-white px-3 py-1 rounded-full transition-all duration-150 hover:opacity-90 active:scale-95"
                                  style={{ background: accentColor }}
                                >
                                  + Add
                                </button>
                              ) : (
                                <div className="flex items-center gap-1.5">
                                  <button
                                    onClick={() =>
                                      setCart((prev) => ({
                                        ...prev,
                                        [product.id]: Math.max(
                                          0,
                                          (prev[product.id] || 0) - 1
                                        ),
                                      }))
                                    }
                                    className="w-5 h-5 rounded-full text-white text-xs font-bold flex items-center justify-center"
                                    style={{ background: accentColor }}
                                  >
                                    −
                                  </button>
                                  <span className="text-xs font-bold text-foreground w-4 text-center">
                                    {qty}
                                  </span>
                                  <button
                                    onClick={() => addToCart(product.id)}
                                    className="w-5 h-5 rounded-full text-white text-xs font-bold flex items-center justify-center"
                                    style={{ background: accentColor }}
                                  >
                                    +
                                  </button>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Bottom action bar */}
            {cartCount > 0 && (
              <div className="px-3 py-3 bg-white border-t border-border">
                <button
                  className="w-full py-3 rounded-2xl text-sm font-bold text-white shadow-lg transition-all hover:opacity-90 active:scale-95"
                  style={{ background: accentColor }}
                >
                  View Order · {formatPrice(cartTotal, currency)}
                </button>
              </div>
            )}
          </div>
        </motion.div>

        {/* Supporting stats */}
        <div className="grid grid-cols-3 gap-4 mt-10 max-w-lg mx-auto text-center">
          {[
            { value: `${products.length}+`, label: "Menu Items" },
            { value: `${categories.length}`, label: "Categories" },
            { value: featured.length.toString(), label: "Featured" },
          ].map((stat) => (
            <div key={stat.label} className="rounded-xl bg-card border border-border p-4">
              <p
                className="text-xl font-extrabold"
                style={{ color: accentColor }}
              >
                {stat.value}
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
