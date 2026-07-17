// Repeatable asset pipeline: scans assets/<category>/<product>/*.{png,jpg,jpeg}
// and produces optimized WebP masters under public/images/ plus
// src/lib/data/catalog.json. Safe to re-run: hand-edited text fields
// (price, dimensions, descriptions, featured, whatsappProductName) are
// preserved across runs by matching on a deterministic id.
//
// Usage: node scripts/generate-catalog.mjs

import { readdirSync, statSync, mkdirSync, existsSync, readFileSync, writeFileSync, copyFileSync } from "node:fs";
import path from "node:path";
import sharp from "sharp";
import slugify from "slugify";

const ROOT = path.resolve(import.meta.dirname, "..");
const ASSETS_DIR = path.join(ROOT, "assets");
const IMAGES_OUT_DIR = path.join(ROOT, "public", "images", "products");
const CATALOG_PATH = path.join(ROOT, "src", "lib", "data", "catalog.json");

const IMAGE_EXTENSIONS = new Set([".png", ".jpg", ".jpeg"]);
const MAX_EDGE = 2400;
const WEBP_QUALITY = 82;

const PLACEHOLDERS = {
  price: null,
  dimensions: "מידות לפי בקשה",
  shortDescription: "תיאור בקרוב",
  fullDescription: "תיאור מלא בקרוב",
  categoryDescription: "תיאור הקטגוריה בקרוב",
};

function naturalCompare(a, b) {
  return a.localeCompare(b, "en", { numeric: true, sensitivity: "base" });
}

function listDirs(dir) {
  return readdirSync(dir)
    .filter((name) => !name.startsWith(".") && statSync(path.join(dir, name)).isDirectory())
    .sort(naturalCompare);
}

function listImageFiles(dir) {
  return readdirSync(dir)
    .filter((name) => {
      if (name.startsWith(".") || name.startsWith("~$")) return false;
      const full = path.join(dir, name);
      if (!statSync(full).isFile()) return false;
      return IMAGE_EXTENSIONS.has(path.extname(name).toLowerCase());
    })
    .sort(naturalCompare);
}

const HEBREW_CHAR = /[֐-׿]/;

// Folders are named "<Hebrew> - <English>" almost everywhere, but at least one
// ("picture - תמונה") is reversed. Detect Hebrew by character content rather
// than position so both orders resolve correctly.
function splitBilingualName(folderName) {
  const separatorIndex = folderName.indexOf(" - ");
  if (separatorIndex === -1) {
    return { hebrew: folderName, english: folderName };
  }
  const first = folderName.slice(0, separatorIndex).trim();
  const second = folderName.slice(separatorIndex + 3).trim();
  return HEBREW_CHAR.test(first) ? { hebrew: first, english: second } : { hebrew: second, english: first };
}

function uniqueSlug(baseSlug, usedSlugs) {
  if (!usedSlugs.has(baseSlug)) {
    usedSlugs.add(baseSlug);
    return baseSlug;
  }
  let n = 2;
  while (usedSlugs.has(`${baseSlug}-${n}`)) n += 1;
  const finalSlug = `${baseSlug}-${n}`;
  usedSlugs.add(finalSlug);
  return finalSlug;
}

function loadExistingCatalog() {
  if (!existsSync(CATALOG_PATH)) return { categories: [], products: [] };
  try {
    return JSON.parse(readFileSync(CATALOG_PATH, "utf-8"));
  } catch {
    return { categories: [], products: [] };
  }
}

async function processImage(sourcePath, destPath) {
  const pipeline = sharp(sourcePath).rotate().resize({
    width: MAX_EDGE,
    height: MAX_EDGE,
    fit: "inside",
    withoutEnlargement: true,
  });
  const { info } = await pipeline.webp({ quality: WEBP_QUALITY }).toFile(destPath).then((info) => ({ info }));
  return { width: info.width, height: info.height };
}

async function main() {
  const existing = loadExistingCatalog();
  const existingProductsById = new Map(existing.products.map((p) => [p.id, p]));
  const existingCategoriesById = new Map(existing.categories.map((c) => [c.id, c]));

  const categorySlugs = new Set();
  const categories = [];
  const products = [];
  const seenProductIds = new Set();
  const seenCategoryIds = new Set();

  let imagesProcessed = 0;

  const NON_CATEGORY_FOLDERS = new Set(["logo", "תקנון"]);
  const categoryFolders = listDirs(ASSETS_DIR).filter((name) => !NON_CATEGORY_FOLDERS.has(name));

  for (const categoryFolder of categoryFolders) {
    const categoryDir = path.join(ASSETS_DIR, categoryFolder);
    const { hebrew: categoryTitle, english: categoryEnglish } = splitBilingualName(categoryFolder);
    const categorySlug = uniqueSlug(slugify(categoryEnglish, { lower: true, strict: true }), categorySlugs);
    const categoryId = categorySlug;
    seenCategoryIds.add(categoryId);

    const productSlugsInCategory = new Set();
    const productFolders = listDirs(categoryDir);
    let categoryCoverImage = null;

    for (const productFolder of productFolders) {
      const productDir = path.join(categoryDir, productFolder);
      const imageFiles = listImageFiles(productDir);
      if (imageFiles.length === 0) continue; // skip empty/stray folders

      const { hebrew: productTitle, english: productEnglish } = splitBilingualName(productFolder);
      const productSlug = uniqueSlug(
        slugify(productEnglish, { lower: true, strict: true }),
        productSlugsInCategory
      );
      const productId = `${categorySlug}-${productSlug}`;
      seenProductIds.add(productId);

      const outDir = path.join(IMAGES_OUT_DIR, categorySlug, productSlug);
      mkdirSync(outDir, { recursive: true });

      const images = [];
      for (let i = 0; i < imageFiles.length; i += 1) {
        const fileName = imageFiles[i];
        const sourcePath = path.join(productDir, fileName);
        const outName = String(i + 1).padStart(2, "0") + ".webp";
        const destPath = path.join(outDir, outName);

        const { width, height } = await processImage(sourcePath, destPath);
        imagesProcessed += 1;

        images.push({
          src: `/images/products/${categorySlug}/${productSlug}/${outName}`,
          width,
          height,
          alt: `${productTitle} – תמונה ${i + 1}`,
        });
      }

      // Pre-render a PNG copy of the cover image for opengraph-image.tsx: the OG image
      // route runs inside the Next.js server process, where calling sharp directly
      // crashes it (conflicts with Next's own bundled sharp) — so conversion must
      // happen here, at generation time, in this standalone script instead.
      await sharp(path.join(outDir, "01.webp"))
        .resize(480, 480, { fit: "contain", background: "#e4e4e2" })
        .png()
        .toFile(path.join(outDir, "og.png"));

      const priorProduct = existingProductsById.get(productId);
      const product = {
        id: productId,
        slug: productSlug,
        categorySlug,
        title: productTitle,
        shortDescription: priorProduct?.shortDescription ?? PLACEHOLDERS.shortDescription,
        fullDescription: priorProduct?.fullDescription ?? PLACEHOLDERS.fullDescription,
        price: priorProduct?.price ?? PLACEHOLDERS.price,
        salePrice: priorProduct?.salePrice ?? null,
        dimensions: priorProduct?.dimensions ?? PLACEHOLDERS.dimensions,
        images,
        coverImage: images[0].src,
        featured: priorProduct?.featured ?? false,
        whatsappProductName: priorProduct?.whatsappProductName ?? productTitle,
      };
      products.push(product);

      if (!categoryCoverImage) categoryCoverImage = images[0].src;
    }

    const priorCategory = existingCategoriesById.get(categoryId);
    categories.push({
      id: categoryId,
      slug: categorySlug,
      title: categoryTitle,
      description: priorCategory?.description ?? PLACEHOLDERS.categoryDescription,
      coverImage: priorCategory?.coverImage ?? categoryCoverImage,
      featured: priorCategory?.featured ?? true,
    });
  }

  // Warn about folders that disappeared since the last run instead of silently dropping hand-edited copy.
  for (const id of existingProductsById.keys()) {
    if (!seenProductIds.has(id)) {
      console.warn(`[generate-catalog] product "${id}" no longer has a matching assets/ folder — removed from catalog.json`);
    }
  }
  for (const id of existingCategoriesById.keys()) {
    if (!seenCategoryIds.has(id)) {
      console.warn(`[generate-catalog] category "${id}" no longer has a matching assets/ folder — removed from catalog.json`);
    }
  }

  const catalog = { categories, products };
  mkdirSync(path.dirname(CATALOG_PATH), { recursive: true });
  writeFileSync(CATALOG_PATH, JSON.stringify(catalog, null, 2) + "\n", "utf-8");

  // Logo: single source image, WebP-ify it too.
  const logoSource = path.join(ASSETS_DIR, "logo", "logo.png");
  if (existsSync(logoSource)) {
    const logoOutDir = path.join(ROOT, "public", "images", "logo");
    mkdirSync(logoOutDir, { recursive: true });
    await processImage(logoSource, path.join(logoOutDir, "logo.webp"));
  }

  // Terms & Conditions: copy the real PDF from assets/תקנון/ if the client has supplied one.
  const termsDir = path.join(ASSETS_DIR, "תקנון");
  if (existsSync(termsDir)) {
    const pdfFile = readdirSync(termsDir).find((name) => name.toLowerCase().endsWith(".pdf"));
    if (pdfFile) {
      const documentsOutDir = path.join(ROOT, "public", "documents");
      mkdirSync(documentsOutDir, { recursive: true });
      copyFileSync(path.join(termsDir, pdfFile), path.join(documentsOutDir, "terms-and-conditions.pdf"));
      console.log(`[generate-catalog] copied real Terms & Conditions PDF from assets/תקנון/${pdfFile}`);
    }
  }

  console.log(
    `[generate-catalog] done: ${categories.length} categories, ${products.length} products, ${imagesProcessed} images processed.`
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
