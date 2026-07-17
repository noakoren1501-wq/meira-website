# Content Guide — Meira Koren Website

This guide explains how to update everything on the website **without touching any code**. No programming knowledge needed — just editing text files and moving photos into folders.

There are only three places you'll ever need to work in:

| What you're changing | Where it lives |
|---|---|
| Site-wide text (homepage, About, WhatsApp number, contact email) | `src/lib/data/site-config.ts` |
| Product & category text (prices, dimensions, descriptions, badges) | `src/lib/data/catalog.json` |
| Photos, the logo, and the Terms & Conditions PDF | `assets/` folder |

Everything else in the project (the `src/app`, `src/components`, `src/lib` folders full of code) is the site's engine — you never need to open those files.

---

## 1. Homepage text (headline, tagline, subheadline)

**File:** `src/lib/data/site-config.ts`

Open the file in any text editor (Notepad, VS Code, etc.). Near the top you'll see:

```ts
siteTagline: "עיצוב פנים ויצירה בעבודת יד",
```

and further down:

```ts
home: {
  heroHeadline: "יצירה בעבודת יד, בעין של מעצבת",
  heroSubheadline: "מאירה קורן יוצרת חפצים ותמונות בעבודת יד...",
  aboutHeading: "קצת עליי",
  aboutText: "אני מאירה קורן, מעצבת פנים ויוצרת יצירות בעבודת יד...",
},
```

- `siteTagline` — the small line above the big headline on the homepage.
- `heroHeadline` — the big headline in the hero section.
- `heroSubheadline` — the paragraph under the headline.

To change any of these, just replace the Hebrew text **between the quotation marks**. Don't delete the quotation marks or the comma at the end of the line.

✅ Correct:
```ts
heroHeadline: "העיצוב שלך, ביצירה שלנו",
```

❌ Don't remove the quotes or the comma — that will break the site.

---

## 2. The "About" section

**File:** `src/lib/data/site-config.ts` — same `home` section as above.

- `aboutHeading` — the small heading above the About paragraph (currently "קצת עליי").
- `aboutText` — the About paragraph itself. This can be as long as you like; it will wrap automatically.

---

## 3. The WhatsApp number

**File:** `src/lib/data/site-config.ts`

```ts
whatsapp: {
  phoneInternational: "972500000000",
  defaultMessage: "היי מאירה, אשמח לשמוע פרטים נוספים על היצירות שלך.",
},
```

This **one line** controls every WhatsApp button on the entire website (product pages, contact page, footer). Change `phoneInternational` to the real number:

- Use the **international format**, digits only.
- No `+`, no spaces, no dashes.
- Example: an Israeli number `050-123-4567` becomes `972501234567` (drop the leading `0`, add `972` in front).

`defaultMessage` is the text that's pre-filled when someone messages from the footer or contact page (not tied to a specific product).

---

## 4. Prices, dimensions, descriptions, and badges

**File:** `src/lib/data/catalog.json`

This file contains every product and category on the site. Open it in a text editor. It looks like a long list of entries — don't worry about the overall structure, just find the product you want by searching (Ctrl+F) for its Hebrew name, e.g. search for `"אומאמי"`.

Each product looks like this:

```json
{
  "id": "wooden-sign-omammi",
  "slug": "omammi",
  "categorySlug": "wooden-sign",
  "title": "אומאמי",
  "shortDescription": "תיאור בקרוב",
  "fullDescription": "תיאור מלא בקרוב",
  "price": null,
  "salePrice": null,
  "badge": "רב מכר",
  "dimensions": "מידות לפי בקשה",
  ...
}
```

Here's what each editable field means:

| Field | What it controls | How to set it |
|---|---|---|
| `shortDescription` | Short text shown near the price on the product page | Replace the text between the quotes |
| `fullDescription` | The longer description paragraph on the product page | Replace the text between the quotes |
| `price` | The product's price in shekels | A plain number with no quotes, e.g. `price: 180`. To show **"price on request"** instead of a number, set it to `price: null` |
| `salePrice` | An optional discounted price | A number lower than `price`, e.g. `salePrice: 140`. Set to `null` if there's no sale. **`salePrice` only works if `price` is also a real number** — it's ignored when `price` is `null` |
| `dimensions` | The size text shown on the product page | Replace the text between the quotes, e.g. `"40×30 ס״מ"` |
| `badge` | A small label on the product photo (e.g. "חדש", "רב מכר", "מהדורה מוגבלת") | Replace the text between the quotes, or set to `null` for no badge |
| `whatsappProductName` | The product name used in the WhatsApp message when someone clicks "Buy" | Usually leave as-is — it defaults to the product's title |

**Important:** text values always go in quotation marks (`"like this"`). Numbers and `null` never use quotation marks (`180` not `"180"`, `null` not `"null"`).

After saving `catalog.json`, double-check your edit didn't break the file's structure — every entry needs a comma after it except the very last one in a list, and every `{` needs a matching `}`. If you're not sure, only change the text/numbers between existing quotes and leave everything else (commas, brackets, quotes) exactly as it was.

### Category descriptions

Near the top of the same file is a `categories` list with a similar structure — `description` there works the same way as `shortDescription`/`fullDescription` for products.

---

## 5. Replacing product photos

**Folder:** `assets/<category>/<product>/`

Every product has its own folder inside `assets`, organized like this:

```
assets/
├── שלט עץ - Wooden sign/
│   ├── אומאמי - omammi/
│   │   ├── photo1.jpg
│   │   ├── photo2.jpg
│   │   └── ...
```

To replace a product's photos:
1. Open the matching folder (search by the Hebrew product name).
2. Delete the old photo files and drop in the new ones (JPG or PNG — any filename works).
3. Run the update command (see **Section 12** below).

The website will automatically pick up the new photos, resize them, and update the product page — you don't need to touch any code or the `catalog.json` file for this.

**Do not** rename product or category folders — the folder name is what generates the page's web address. If you rename a folder, its web address changes and any shared/bookmarked links to that product will stop working.

---

## 6. Replacing category cover images

Category cover photos (shown on the Categories page) are automatically taken from the **first product's first photo** in that category. To change a category's cover image, make sure the photo you want appears first (alphabetically, or renamed to sort first) inside that category's first product folder, then run the update command.

---

## 7. Replacing the logo

**File:** `assets/logo/logo.png`

Replace this file with your new logo (keep the filename `logo.png`), then run the update command. This updates the logo everywhere it appears on the site (header and homepage).

Note: the small icon shown in the browser tab (the "favicon") is a separate file and isn't updated automatically by this process — ask a developer to update it if you change the logo.

---

## 8. Replacing the Terms & Conditions PDF

**Folder:** `assets/תקנון/`

Drop your PDF file into this folder (delete the old one first, or just replace it — keep only one PDF in this folder). Then run the update command. The new PDF will automatically become the file linked from the footer's "תנאי שימוש" link.

---

## 9. Adding a new product

1. Go into the correct category folder inside `assets/` (e.g. `assets/שלט עץ - Wooden sign/`).
2. Create a **new folder** named like the others: `<Hebrew name> - <English name>`, for example:
   ```
   ברכה לבית חדש - New home blessing
   ```
3. Drop the product's photos into that new folder.
4. Run the update command (**Section 12**).
5. Open `catalog.json`, find the new product (search for its Hebrew name), and fill in the real `price`, `dimensions`, `shortDescription`, and `fullDescription` — they'll start out as placeholder text ("תיאור בקרוב" etc.) that you should replace.
6. If you want the new product to appear in the "Featured" section on the homepage, find `"featured": false` in that product's entry and change it to `"featured": true`.

---

## 10. Deleting a product

1. Delete that product's entire folder from inside `assets/<category>/`.
2. Run the update command (**Section 12** below).

The product and its photos will be automatically removed from the website. This is permanent — make sure you don't still need those photos before deleting.

---

## 11. Adding a new category

1. Inside `assets/`, create a new top-level folder named like the existing ones: `<Hebrew name> - <English name>`.
2. Inside that new folder, create at least one product folder with photos (same as adding a product — see Section 9).
3. Run the update command (**Section 12**).
4. Open `catalog.json`, find the new category near the top of the file, and fill in a real `description` (it starts as placeholder text).

The new category will automatically appear on the Categories page and in the site's navigation-driven pages — no code changes needed.

---

## 12. Running the update command

Whenever you add, remove, or replace **photos** (a new product, a deleted product, a new category, or swapped photos), someone technical needs to run one command so the website regenerates the optimized images and refreshes `catalog.json`:

```
npm run generate:catalog
```

This is run from a terminal inside the project folder. It's safe to run any time — it never deletes or overwrites the prices, descriptions, dimensions, or badges you've already entered; it only updates photos and adds placeholder text for genuinely new products.

**You do NOT need to run this command** if you only edited text inside `catalog.json` or `site-config.ts` directly (price, description, dimensions, badge, WhatsApp number, homepage text) — those changes take effect immediately.

---

## Quick reference

| I want to... | Edit this | Run the update command? |
|---|---|---|
| Change the homepage headline/About text | `site-config.ts` | No |
| Change the WhatsApp number | `site-config.ts` | No |
| Change a price or add a sale price | `catalog.json` | No |
| Change dimensions or a description | `catalog.json` | No |
| Add or remove a badge | `catalog.json` | No |
| Replace a product's photos | `assets/` folder | **Yes** |
| Replace the logo | `assets/logo/logo.png` | **Yes** |
| Replace the Terms & Conditions PDF | `assets/תקנון/` folder | **Yes** |
| Add a new product | `assets/` folder, then `catalog.json` | **Yes** |
| Delete a product | `assets/` folder | **Yes** |
| Add a new category | `assets/` folder, then `catalog.json` | **Yes** |
