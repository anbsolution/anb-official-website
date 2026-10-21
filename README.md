# ANB Official Website v11 — White, Royal Blue & Gold Mixed Theme

Mobile-first theme update for the existing `anb-official-website` repository. Preserves the project search, project cards, dialogs, navigation, downloads information, SEO metadata, and existing links.

## Theme direction
- Clean white and soft-blue content surfaces
- Royal blue navigation/ticker/footer and project accents
- Gold highlights for focus states, accents, and interactive details
- Higher contrast text on light surfaces
- Updated browser theme color

## Apply on Android with Termux
1. Download the ZIP into Android Downloads.
2. `cd ~/ANB-Official-Website`
3. Check `git status` and preserve any uncommitted changes.
4. Extract this ZIP into the repository root.
5. Run `git diff --check` and `node --check script.js`.
6. Review `git diff`, then commit and push to `main`.

This patch does not include a new APK or claim a release is available. GitHub Pages deployment must be checked after pushing.


## v12 — dedicated project detail pages
- Selecting a project card opens `project-details.html?project=...` with a dedicated project profile.
- Each profile includes overview, planned features, development status, platform/category details and official links where available.
- Added visible **Back to projects** and **Home** navigation on detail pages.
- Search suggestions open the matching project detail page; search itself remains text-based.
- Project status and planned features are labelled carefully so the site does not claim unreleased functionality is already available.
