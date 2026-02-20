import { useState, useMemo } from "react";
import MenuCard from "@/components/MenuCard";
import { motion } from "framer-motion";
import { useMenuData } from "@/hooks/useMenuData";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft } from "lucide-react";

const INITIAL_LOAD = 6;
const LOAD_MORE_COUNT = 6;

const Index = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState(INITIAL_LOAD);
  const { menuItems, categories, loading, error } = useMenuData();

  // Categories without "All"
  const categoryList = useMemo(
    () => categories.filter((c) => c !== "All"),
    [categories]
  );

  const filteredItems = useMemo(() => {
    if (!activeCategory) return [];
    return menuItems.filter((item) => item.category === activeCategory);
  }, [activeCategory, menuItems]);

  const handleCategoryClick = (category: string) => {
    setActiveCategory(category);
    setVisibleCount(INITIAL_LOAD);
  };

  const handleBackToCategories = () => {
    setActiveCategory(null);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="flex-1"
    >
      {/* Hero Heading */}
      <section className="max-w-7xl mx-auto px-6 pt-16 pb-8 text-center">
        <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-light text-foreground mb-6 tracking-tight">
          Clean Food You Will Love To Eat
        </h1>

        {/* Blurb placeholder - replace with Meaghan's copy */}
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
          &nbsp;
        </p>
      </section>

      {!activeCategory ? (
        /* Category Landing View */
        <section className="max-w-7xl mx-auto px-6 pb-16">
          {loading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[...Array(6)].map((_, i) => (
                <Skeleton key={i} className="h-24 w-full rounded-xl" />
              ))}
            </div>
          )}
          {error && (
            <p className="text-center text-red-500 py-20 text-lg">
              Error: {error}
            </p>
          )}
          {!loading && !error && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {categoryList.map((category, index) => {
                const count = menuItems.filter(
                  (item) => item.category === category
                ).length;
                return (
                  <motion.button
                    key={category}
                    onClick={() => handleCategoryClick(category)}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.35,
                      delay: index * 0.06,
                      ease: "easeOut",
                    }}
                    className="group relative overflow-hidden rounded-xl bg-card border border-border p-8 text-left transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer"
                  >
                    <h2 className="font-heading text-3xl md:text-4xl font-light text-card-foreground mb-2">
                      {category}
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      {count} {count === 1 ? "item" : "items"}
                    </p>
                  </motion.button>
                );
              })}
            </div>
          )}
        </section>
      ) : (
        /* Filtered Items View */
        <section className="max-w-7xl mx-auto px-6 pb-16">
          <div className="mb-8">
            <button
              onClick={handleBackToCategories}
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors duration-200 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm font-medium">All Categories</span>
            </button>
            <h2 className="font-heading text-4xl md:text-5xl font-light text-foreground mt-4">
              {activeCategory}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.slice(0, visibleCount).map((item, index) => (
              <MenuCard
                key={item.id}
                id={item.id}
                slug={item.slug}
                name={item.name}
                category={item.category}
                image={item.image}
                isNew={item.isNew}
                index={index}
              />
            ))}
          </div>
          {visibleCount < filteredItems.length && (
            <div className="flex justify-center mt-10">
              <button
                onClick={() => setVisibleCount((prev) => prev + LOAD_MORE_COUNT)}
                className="px-8 py-3 rounded-full border border-border text-sm font-medium text-foreground hover:bg-secondary transition-colors duration-200 cursor-pointer"
              >
                Show more ({filteredItems.length - visibleCount} remaining)
              </button>
            </div>
          )}
          {filteredItems.length === 0 && (
            <p className="text-center text-muted-foreground py-20 text-lg">
              No items found in this category.
            </p>
          )}
        </section>
      )}
    </motion.div>
  );
};

export default Index;
