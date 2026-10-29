# josefquiroga.github.io

Personal portfolio of Jose Quiroga, a Data Scientist based in Sydney. It is hosted on GitHub Pages at <https://josefquiroga.github.io/>.

The site is plain HTML/CSS/JS with no build step. Pushing to `main` deploys it.

## Structure

| Path | Purpose |
| --- | --- |
| `index.html`, `about.html`, `projects.html`, … | Top-level pages |
| `projects/*.html` | Project case studies (`rfm-clusters.html` is the standalone 3D chart embedded in `rfm-segmentation.html`) |
| `css/site.css` | Shared design tokens, nav (including the mobile menu), footer, animations |
| `css/project.css` | Shared layout for the project case-study pages |
| `js/site.js` | Mobile menu toggle and scroll-reveal animation |
| `images/` | Project images (WebP) |
| `404.html` | GitHub Pages "not found" page. Uses absolute paths because it can be served at any depth |

Each page keeps its own `<style>` block for rules only that page uses. Shared rules go in `css/`.

## Preview locally

```sh
python3 -m http.server 8000
# open http://localhost:8000
```

## Adding a project

1. Copy an existing page in `projects/` (e.g. `satellite.html`) and edit the content.
2. Add a card for it to `projects.html` (and `index.html` if it should be featured). Set `data-roles` on the card to any of `ds de da rs` (Data Science, Data Engineering, Analytics, Research) so the filter buttons pick it up, and add the matching `role-tag` labels.
3. Update the prev/next links at the bottom of the neighbouring project pages.
4. Add the URL to `sitemap.xml`.
5. Convert images to WebP before adding them: `cwebp -q 80 -resize 1600 0 in.png -o images/out.webp`.
