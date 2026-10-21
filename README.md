# ANB Official Website — v9 Patch

## What's improved
- Adds Arrow Up / Arrow Down keyboard navigation for project search suggestions.
- Escape closes suggestions and returns focus to the search field.
- Improves touch target sizes for search, menu, and primary buttons on mobile.
- Adds stronger focus styling and a high-contrast preference enhancement.
- Preserves the Royal Neon Blue + Golden theme, project content, and centered search.

## Apply on Android / Termux
1. Download this ZIP into your phone's Download folder.
2. In Termux run `cd ~/ANB-Official-Website`.
3. Run `git status` first. Do not overwrite work you need to keep.
4. Extract with `unzip -o /storage/emulated/0/Download/ANB-Official-Website-v9-Patch.zip -d .`
5. Run `git diff --check` and `node --check script.js`.
6. If checks pass, run `git add index.html styles.css script.js README.md assets/anb-mark.svg`, then `git commit -m "Improve accessible search keyboard navigation"`, then `git push origin main`.

Git push and live deployment must be verified separately after publishing.


## v10 — Search UX polish
- Shows a dynamic project count when the search is empty or populated.
- Adds a branded no-results state with one-tap example searches and a clear-search action.
- Makes search matching consistent with the project aliases used by suggestions.
- Preserves the Royal Neon Blue + Gold theme, existing project links, and the no-category-filter layout.

Apply this patch over the existing repository root; check `git diff --check` and `node --check script.js` before pushing.
