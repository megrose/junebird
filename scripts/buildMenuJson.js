/**
 * Converts Working menu - Sheet1.csv → ../src/data/menuData.json
 * Run from the scripts/ folder: node buildMenuJson.js
 */

import { createReadStream, writeFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import csv from "csv-parser";

const __dirname = dirname(fileURLToPath(import.meta.url));
const CSV_PATH = resolve(__dirname, "Working menu - Sheet1.csv");
const OUTPUT_PATH = resolve(__dirname, "../src/data/menuData.json");

function createSlug(text) {
    return text
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-");
}

const rows = [];

createReadStream(CSV_PATH)
    .pipe(csv())
    .on("data", (row) => rows.push(row))
    .on("end", () => {
        const items = rows
            .filter((row) => (row.isDeleted || "").trim().toUpperCase() !== "TRUE")
            .map((row) => {
                const name = (row.name || "").trim();
                const slug = (row.slug || "").trim() || createSlug(name);
                return {
                    id: slug,
                    slug,
                    name,
                    category: (row.category || "").trim(),
                    categoryOrder: Number(row.categoryOrder) || 99,
                    image: (row.image_url || "").trim(),
                    isNew: (row.isNew || "").trim().toUpperCase() === "TRUE",
                    description: (row.description || "").trim(),
                    price: Number(row.price) || 0,
                };
            });

        writeFileSync(OUTPUT_PATH, JSON.stringify(items, null, 2));
        console.log(`✅ Written ${items.length} items to src/data/menuData.json`);
    });
