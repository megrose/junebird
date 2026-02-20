import { useState, useEffect } from "react";
import { MenuItem } from "@/data/menuItems";
import menuData from "@/data/menuData.json";

interface UseMenuDataReturn {
  menuItems: MenuItem[];
  categories: string[];
  loading: boolean;
  error: string | null;
}

export const useMenuData = (): UseMenuDataReturn => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [categories, setCategories] = useState<string[]>(["All"]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      setLoading(true);
      setError(null);

      // Load from local JSON
      const items: MenuItem[] = (menuData as any[]).map((item) => ({
        id: item.id,
        slug: item.slug || item.id,
        name: item.name,
        category: item.category,
        categoryOrder: item.categoryOrder ?? 99,
        image: item.image,
        isNew: item.isNew ?? false,
        description: item.description,
        price: item.price ?? 0,
      }));

      // Extract unique categories in order
      const categorySet = new Set<string>();
      const orderedCategories: { name: string; order: number }[] = [];

      items.forEach((item) => {
        if (!categorySet.has(item.category)) {
          categorySet.add(item.category);
          orderedCategories.push({
            name: item.category,
            order: item.categoryOrder ?? 99,
          });
        }
      });

      orderedCategories.sort((a, b) => a.order - b.order);
      const categoryNames = ["All", ...orderedCategories.map((c) => c.name)];

      setCategories(categoryNames);
      setMenuItems(items);
    } catch (err) {
      console.error("Error loading menu data:", err);
      setError(
        err instanceof Error ? err.message : "Failed to load menu items."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  return { menuItems, categories, loading, error };
};
