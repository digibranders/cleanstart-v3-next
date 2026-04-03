# CleanStart v3 — Image & Asset Optimization (No UI Changes)

## IMPORTANT RULES — READ BEFORE DOING ANYTHING

- **DO NOT change any UI, layout, styling, colors, spacing, or animations**
- **DO NOT change any animation timing, easing curves, or motion behavior**
- **DO NOT rename components, move files, or refactor logic**
- **DO NOT change alt text on any existing images**
- **DO NOT add new features or improve anything beyond what is listed here**
- **All visual output must be pixel-identical to the current site**
- After every step, run: `npm run lint && npx tsc --noEmit`
- After all steps, run: `npm run build` — must pass with zero errors

---

## QUALITY STANDARDS — NON-NEGOTIABLE

These settings must be used for ALL conversions in this prompt. Do not use lower quality presets:

| Asset Type | Format | Quality Setting | Rationale |
|---|---|---|---|
| Sprite animation frames | PNG → WebP | `-q 95` | Animation must be frame-perfect, no banding |
| Product/UI screenshots | PNG → WebP | `-q 95` | Sharp UI edges, text in images must stay crisp |
| Hero video (was GIF) | WebM | `-crf 18` (VP9) | Near-lossless, no color shift allowed |
| Hero video (was GIF) | MP4 | `-crf 15` (H.264) | Near-lossless fallback |

**Do NOT use:**
- `cwebp -q 85` or lower — visible quality loss on UI screenshots
- ffmpeg `-crf 30` or higher for video — visible banding/blocking artifacts
- `cwebp -lossless` — produces files as large as PNG, defeats the purpose

**After every conversion, run a visual check** before deleting the original:
- Open the converted file in a browser
- Compare side-by-side with the original if possible
- Look specifically for: color shifts, blurring on sharp edges, banding in gradients, pixelation
- If ANY degradation is visible, reconvert at higher quality before proceeding

---

## CONTEXT

This is a Next.js 16.2 App Router marketing website at `/Users/siddiqueahmed/Desktop/AI/cleanstart/cleanstart-v3-next`.

**Confirmed audit findings (do not re-audit, just execute):**

- `public/` directory is **300 MB** total — causing ~157 GB/month Vercel bandwidth
- `public/kubr-bird-frames/` — **187 MB** (131 PNG sprite frames, ~1.5 MB each)
- `public/cleansight/cleansight-hero-section-video.gif` — **20 MB** single GIF
- `public/images/figma/` — ~15 MB of unoptimized Figma export PNGs (2–3 MB each)
- `next.config.ts` has no `formats`, no `minimumCacheTTL`, no cache headers
- **19 raw `<img>` tags** across components (all local assets — no external except Unsplash)
- Only **4 components** use `next/image <Image>`
- `components/visualizations/mascot-sprite-animation.tsx` uses `unoptimized={true}` — actively bypassing Next.js image optimization
- **0 pages** export `dynamic = "force-static"` — all 24 marketing pages default to SSR
- Fonts loaded via `<link>` Google Fonts CDN in `app/layout.tsx` — NOT using `next/font`
- `public/download_images.py` — Python script served publicly (security issue)

---

## STEP 1 — Delete Security Risk

Delete the Python script from public/:

```bash
rm public/download_images.py
```

---

## STEP 2 — Fix next.config.ts

Read the current `next.config.ts` first, then replace its entire contents with:

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/kubr-bird-frames-webp/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/:path*\\.(?:svg|ico|woff2)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
```

---

## STEP 3 — Convert kubr-bird-frames PNG → WebP (187 MB → ~50 MB)

**Do not change the animation logic or frame order. Only convert the image format.**

### 3a — Check if cwebp is available

```bash
which cwebp || echo "NOT INSTALLED"
```

If not installed:
```bash
brew install webp
```

### 3b — Convert all 131 frames to WebP

Use `-q 95` (near-lossless, 0–100 scale) to preserve visual fidelity of the sprite animation. Do NOT use lossless (`-lossless`) as it produces larger files without perceptible improvement for photographic sprites.

```bash
mkdir -p public/kubr-bird-frames-webp
for f in public/kubr-bird-frames/*.png; do
  filename=$(basename "$f" .png)
  cwebp -q 95 "$f" -o "public/kubr-bird-frames-webp/${filename}.webp"
done
```

### 3c — Verify conversion succeeded

```bash
ls public/kubr-bird-frames-webp/ | wc -l
# Must output 131 (or whatever count is in kubr-bird-frames/)
du -sh public/kubr-bird-frames-webp/
# Expected: ~80-100 MB at q=95 (down from 187 MB, no visible quality loss)
```

**Visual check:** Open a browser and navigate to the mascot animation in dev mode. Play through several frames. The animation must look identical to the original PNGs — no color banding, no blurring, no artifacts.

### 3d — Update animated-bird.tsx

Read `components/shared/animated-bird.tsx` first. Find where frame paths are constructed (the array or string interpolation building paths like `/kubr-bird-frames/frame_XXX.png`).

Change ONLY the path references:
- `kubr-bird-frames` → `kubr-bird-frames-webp`
- `.png` → `.webp`

Do not change anything else in this file — no className, no width/height, no animation logic.

### 3e — Update mascot-sprite-animation.tsx

Read `components/visualizations/mascot-sprite-animation.tsx` first.

Make two changes only:
1. Update frame path references: `kubr-bird-frames` → `kubr-bird-frames-webp`, `.png` → `.webp`
2. Remove the `unoptimized` prop from the `<Image>` component (this is the only change to the Image tag)

Do not change priority, width, height, className, animation logic, or anything else.

### 3f — Delete original PNG frames (only after verifying site works)

```bash
# Run npm run dev first and visually confirm the mascot animation still works
# Then delete:
rm -rf public/kubr-bird-frames/
```

---

## STEP 4 — Convert 20 MB GIF to Video

`public/cleansight/cleansight-hero-section-video.gif` is 20 MB and should be a `<video>` element.

### 4a — Check if ffmpeg is available

```bash
which ffmpeg || echo "NOT INSTALLED"
```

If not installed:
```bash
brew install ffmpeg
```

### 4b — Convert GIF to WebM + MP4

Use high-quality settings to preserve the exact visual appearance of the original GIF:
- WebM: `-crf 18` (VP9, near-lossless — range is 0–63, lower = better quality)
- MP4: `-crf 15` (H.264, near-lossless — range is 0–51, lower = better quality)
- `-b:v 0` forces constant quality mode (not bitrate-capped)
- `-vf scale=trunc(iw/2)*2:trunc(ih/2)*2` ensures even dimensions required by codecs

```bash
ffmpeg -i public/cleansight/cleansight-hero-section-video.gif \
  -c:v libvpx-vp9 -crf 18 -b:v 0 \
  -vf "scale=trunc(iw/2)*2:trunc(ih/2)*2" \
  -pix_fmt yuv420p \
  public/cleansight/cleansight-hero-video.webm

ffmpeg -i public/cleansight/cleansight-hero-section-video.gif \
  -c:v libx264 -crf 15 -preset slow \
  -vf "scale=trunc(iw/2)*2:trunc(ih/2)*2" \
  -pix_fmt yuv420p \
  public/cleansight/cleansight-hero-video.mp4
```

**Visual check after conversion:** Play both output files and compare against the original GIF frame by frame. There must be no color shift, blurring, or compression artifacts. If any artifacts are visible, lower the CRF value by 2 (e.g., `-crf 16` for WebM, `-crf 13` for MP4) and reconvert.

### 4c — Find where the GIF is used

```bash
grep -rn "cleansight-hero-section-video" app/ components/ --include="*.tsx" --include="*.ts"
```

### 4d — Replace with `<video>` element

In each file found, replace the `<img>` or `<Image>` tag referencing the GIF with:

```tsx
<video
  autoPlay
  loop
  muted
  playsInline
  className={/* keep ALL existing className values exactly as they are */}
  style={/* keep ALL existing style values exactly as they are */}
>
  <source src="/cleansight/cleansight-hero-video.webm" type="video/webm" />
  <source src="/cleansight/cleansight-hero-video.mp4" type="video/mp4" />
</video>
```

**Preserve all existing className and style props exactly. Only change the element type and src.**

### 4e — Delete the original GIF

```bash
rm public/cleansight/cleansight-hero-section-video.gif
```

---

## STEP 5 — Convert Large Figma PNGs to WebP

### 5a — Find all large PNGs in public/images/figma/

```bash
find public/images/figma -name "*.png" -size +200k -exec ls -lh {} \; | sort -k5 -rh
```

### 5b — Convert each to WebP

Figma exports are UI screenshots and illustrations — use `-q 95` to prevent any visible degradation of sharp edges, text in images, or fine UI details.

```bash
for f in public/images/figma/*.png; do
  [ -f "$f" ] || continue
  filename=$(basename "$f" .png)
  cwebp -q 95 "$f" -o "public/images/figma/${filename}.webp"
done
```

**Also convert product overview PNGs and other large assets across public/ subdirectories:**

```bash
# Find all PNGs over 500 KB outside of kubr-bird-frames (already handled)
find public/ -name "*.png" -size +500k \
  ! -path "*/kubr-bird-frames/*" \
  ! -path "*/kubr-bird-frames-webp/*" | sort

# Convert each one found above at q=95
# Run this loop after reviewing the list:
find public/ -name "*.png" -size +500k \
  ! -path "*/kubr-bird-frames/*" \
  ! -path "*/kubr-bird-frames-webp/*" | while read f; do
  dir=$(dirname "$f")
  filename=$(basename "$f" .png)
  cwebp -q 95 "$f" -o "${dir}/${filename}.webp" && echo "Converted: $f"
done
```

**After converting, find all references to those PNG paths:**

```bash
# Get list of converted files and search for their references
find public/ -name "*.webp" ! -path "*/kubr-bird-frames-webp/*" | while read f; do
  png_path="${f%.webp}.png"
  rel_path="${png_path#public}"
  grep -rn "$rel_path" app/ components/ --include="*.tsx" --include="*.ts" --include="*.css"
done
```

Update every reference found: change `.png` → `.webp` in the path string. Do not change anything else.

### 5c — Find all references to these Figma PNGs

```bash
grep -rn "images/figma" app/ components/ --include="*.tsx" --include="*.ts"
```

### 5d — Update each reference

In every file found, change the extension of the Figma image paths:
- `images/figma/filename.png` → `images/figma/filename.webp`

**Only change the file extension. Do not change className, alt, width, height, or anything else.**

### 5e — Visual check before deleting originals

Before deleting any PNG:
1. Run `npm run dev`
2. Navigate to every page that uses a converted image
3. Visually compare the WebP version to the original PNG by temporarily switching the src back and forth in the component
4. Confirm: no visible quality difference, no color shift, no blurring of UI text or icons

### 5f — Verify build passes, then delete originals

```bash
npm run build
# If build passes AND visual check is clean:
find public/ -name "*.png" -size +500k \
  ! -path "*/kubr-bird-frames/*" | while read f; do
  webp="${f%.png}.webp"
  [ -f "$webp" ] && rm "$f" && echo "Deleted: $f"
done
```

---

## STEP 6 — Replace All 19 Raw `<img>` Tags with `<Image>`

For EVERY replacement below:
- Keep all `className` and `style` props **exactly as-is**
- Keep `alt` text **exactly as-is**
- Do NOT add `placeholder="blur"` unless the src is a static import
- Do NOT change any visual dimensions unless required to make `<Image>` work

### 6a — components/home/stats-section.tsx (line ~48)

Read the file. Find the `<img>` tag using `{imgMascot}`. The `imgMascot` is likely a static import at the top of the file. Replace:

```tsx
// BEFORE
<img src={imgMascot} alt="CleanStart mascot" className="..." />

// AFTER
import Image from "next/image";
// (add Image import at top if not already imported)
<Image src={imgMascot} alt="CleanStart mascot" className="..." placeholder="blur" />
// Remove explicit width/height — static imports auto-detect dimensions
```

### 6b — components/home/faq-section.tsx (line ~140)

Same pattern as stats-section. Find `{imgMascot}` `<img>` tag. Apply same replacement.

### 6c — components/home/faq-accordion.tsx (lines ~107, ~203)

Same pattern. Two `<img>` tags using `{imgMascot}`. Replace both.

### 6d — components/layout/site-footer.tsx (line ~143)

Read the file. Find the `<img>` tag with `/Footer/Image (Kubr Bird Mascot).png`.

```tsx
// BEFORE
<img src="/Footer/Image (Kubr Bird Mascot).png" alt="Kubr - CleanStart mascot" className="..." style={{...}} />

// AFTER
import Image from "next/image";
import kubrMascot from "@/public/Footer/Image (Kubr Bird Mascot).png";
<Image src={kubrMascot} alt="Kubr - CleanStart mascot" className="..." style={{...}} placeholder="blur" />
```

### 6e — components/home/security-feature-accordion.tsx (lines ~123, ~181)

Read the file. Check what `card.image` contains — run:
```bash
grep -n "image:" components/home/security-feature-accordion.tsx | head -20
```

If `card.image` is a string path (e.g. `"/some/path.png"`):
- Convert the data array to use static imports instead
- Change each string path to a static import at the top of the file
- Replace `<img src={card.image}` with `<Image src={card.image}` (after updating data)
- Add `fill` prop if the container has a fixed size, OR add `width` and `height` matching the current rendered size

If `card.image` is already a static import object, just replace `<img>` with `<Image>`.

Keep the container `className` and any `style` attributes exactly as-is.

### 6f — components/home/testimonials-section.tsx (line ~587)

Read the file. Find the `<img>` tag using `{avatar}` for author photos.

```tsx
// BEFORE
<img src={avatar} alt={item.name} className="..." />

// AFTER
<Image src={avatar} alt={item.name} className="..." width={48} height={48} />
// (use actual rendered dimensions — check className for size clues like w-12 h-12 = 48x48)
```

Check what `avatar` is — if it's a string URL, keep as-is. If it's a static import, add `placeholder="blur"`.

### 6g — components/home/hero-carousel.tsx (line ~1437)

Read the file. Find the `<img>` tag using `{activeSlide.eventImage}`. Check what `eventImage` contains:
```bash
grep -n "eventImage" components/home/hero-carousel.tsx | head -10
```

If it's a string path to public/, convert data to static imports and use `<Image>`.
If it's already a static import, replace `<img>` with `<Image>` and add `fill` prop inside a positioned container.

### 6h — components/home/resources-section.tsx (lines ~49, ~131, ~167, ~219)

Read the file. These use Unsplash URLs. Replace each `<img>` with `<Image>`:

```tsx
// BEFORE
<img
  src="https://images.unsplash.com/photo-XXXXX?w=800&q=80"
  alt="..."
  className="..."
/>

// AFTER
import Image from "next/image";
<Image
  src="https://images.unsplash.com/photo-XXXXX?w=800&q=80"
  alt="..."  // keep exact same alt text
  fill
  className="object-cover" // add object-cover, keep any other existing classes
/>
```

The parent container must have `position: relative` and a defined height. Check if the parent already has `relative` in its className. If not, add `relative` to the parent's className — do not change any other classes on the parent.

### 6i — components/home/resources-bento-grid.tsx (lines ~65, ~128, ~178, ~248)

Same pattern as resources-section. Lines ~178 and ~248 use Unsplash URLs. Lines ~65 and ~128 use local image variables.

For each replacement:
- Unsplash URLs → `<Image>` with `fill` + `object-cover`
- Local image variables → check if static import or string, convert accordingly
- Ensure parent has `relative` className and a defined height

---

## STEP 7 — Add Static Generation to All 24 Pages

This is a 100% static marketing site. No page has dynamic data.

Add this single line to **every** `page.tsx` file in `app/`. Add it directly after the imports, before the metadata export:

```typescript
export const dynamic = "force-static";
```

Files to update (add the export to each):
1. `app/page.tsx`
2. `app/book-demo/page.tsx`
3. `app/partners/page.tsx`
4. `app/pricing/page.tsx`
5. `app/products/cleansight-dashboard/page.tsx`
6. `app/products/hardened-images/page.tsx`
7. `app/products/software-bill-of-materials/page.tsx`
8. `app/company/about/page.tsx`
9. `app/company/careers/page.tsx`
10. `app/company/contact/page.tsx`
11. `app/company/team/page.tsx`
12. `app/resources/blog/page.tsx`
13. `app/resources/events/page.tsx`
14. `app/resources/knowledge-hub/page.tsx`
15. `app/resources/newsroom/page.tsx`
16. `app/resources/podcast/page.tsx`
17. `app/resources/resource-center/page.tsx`
18. `app/solutions/attack-surface-reduction/page.tsx`
19. `app/solutions/fips-compliance/page.tsx`
20. `app/solutions/for-ciso/page.tsx`
21. `app/solutions/for-developers/page.tsx`
22. `app/solutions/software-composition-analysis/page.tsx`
23. `app/solutions/vulnerability-remediation/page.tsx`

**Only add the one line. Do not touch metadata, imports, or the page component itself.**

---

## STEP 8 — Replace Google Fonts <link> with next/font

Read `app/layout.tsx` fully first.

### 8a — Add next/font import

Add at the top of `app/layout.tsx`:

```typescript
import localFont from "next/font/local";
```

### 8b — Check if Google Sans font files exist

```bash
find public/ -name "*.woff*" -o -name "*.ttf" -o -name "*.otf" 2>/dev/null
```

**If font files exist in public/fonts/:** Use `next/font/local`:
```typescript
const googleSans = localFont({
  src: [
    { path: "../public/fonts/GoogleSans-Regular.woff2", weight: "400", style: "normal" },
    { path: "../public/fonts/GoogleSans-Medium.woff2", weight: "500", style: "normal" },
    { path: "../public/fonts/GoogleSans-SemiBold.woff2", weight: "600", style: "normal" },
    { path: "../public/fonts/GoogleSans-Bold.woff2", weight: "700", style: "normal" },
  ],
  display: "swap",
  variable: "--font-google-sans",
});
```

**If NO font files exist:** Use `next/font/google` with the closest available font:
```typescript
import { Plus_Jakarta_Sans } from "next/font/google";

const googleSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-google-sans",
});
```

### 8c — Apply the font variable

In the `<body>` tag, add the variable class. The body currently has `font-['Google_Sans',sans-serif]` — keep that class, just add the variable:

```tsx
// BEFORE
<body className="font-['Google_Sans',sans-serif] antialiased">

// AFTER
<body className={`${googleSans.variable} font-['Google_Sans',sans-serif] antialiased`}>
```

### 8d — Remove the Google Fonts <link> tags

Find and delete these three lines from the `<head>` section of layout.tsx:
```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
<link href="https://fonts.googleapis.com/css2?family=..." rel="stylesheet" />
```

**Do not change anything else in layout.tsx — metadata, providers, structure all stay identical.**

---

## STEP 9 — Add priority to Hero Image

In `components/home/hero-section.tsx`, find the `<Image>` component around line 763 that uses `/home/cybersecurity-award-2026.svg`. Add the `priority` prop:

```tsx
// BEFORE
<Image src="/home/cybersecurity-award-2026.svg" width={160} height={160} alt="..." />

// AFTER
<Image src="/home/cybersecurity-award-2026.svg" width={160} height={160} alt="..." priority />
```

This is the only image that should get `priority`. Do not add it anywhere else.

---

## STEP 10 — Final Verification

### 10a — Run all checks

```bash
npm run lint
npx tsc --noEmit
npm run build
```

All three must pass with zero errors. Fix any errors before proceeding.

### 10b — Check build output

The `npm run build` output should show `○` (static) symbols for all pages, not `λ` (dynamic/SSR). If any page shows `λ`, re-check that `export const dynamic = "force-static"` was added to that page.tsx.

### 10c — Check final public/ size

```bash
du -sh public/
du -sh public/*/
```

Expected totals after all changes:
- `public/kubr-bird-frames/` — **gone** (deleted)
- `public/kubr-bird-frames-webp/` — ~50–60 MB
- `public/cleansight/cleansight-hero-section-video.gif` — **gone** (deleted)
- `public/download_images.py` — **gone** (deleted)
- Total public/: **under 100 MB** (down from 300 MB)

### 10d — Report summary

Provide a final summary with:
- [ ] List of every file modified
- [ ] List of every file deleted
- [ ] Before/after size of public/ directory
- [ ] Lint ✓ / TypeScript ✓ / Build ✓ confirmation
- [ ] Count of `<img>` → `<Image>` replacements made
- [ ] Confirmation all 24 pages show ○ static in build output

---

## DO NOT TOUCH LIST

These files/behaviors must remain completely unchanged:

- All animation logic in `components/shared/animated-bird.tsx` (only change file paths)
- All animation logic in `components/visualizations/mascot-sprite-animation.tsx` (only remove `unoptimized` and update paths)
- `lib/animations.ts` — do not touch
- `lib/utils.ts` — do not touch
- All `className` values across every component
- All `style` prop values across every component
- All Tailwind classes
- All color values, spacing, typography
- All Motion/Framer Motion animation code
- `app/globals.css`
- All metadata exports in page.tsx files (only ADD the `dynamic` export)
- All component interfaces and TypeScript types
- All existing `<Image>` components that already have correct props
- `public/favicon.ico`, `public/robots.txt`, `public/sitemap.xml` (if they exist)
- Any image referenced in metadata `openGraph.images` fields
