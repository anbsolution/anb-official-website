# ANB Official Website — v5 Search Patch

This patch updates the existing GitHub Pages website in place. It does not create a new repository.

## v5 changes
- Removes all category filter chips, as requested.
- Moves the project search field into the center of the top navigation/header.
- Search filters project cards by matching text only; an empty search shows all projects.
- Shows a result count/message only after the visitor starts searching.
- Adds `/` keyboard shortcut to focus search and `Escape` to clear it.
- Preserves the existing Cyber Pro visual design, project detail dialogs, navigation, SEO, and existing links.

The search is a local project-catalogue search, not a web-wide internet search engine.

## Mobile GitHub Pages update
1. Download `ANB-Official-Website-v5-Patch.zip` to Android Downloads.
2. In Termux:
   ```sh
   cd ~/ANB-Official-Website
   git status
   unzip -o /storage/emulated/0/Download/ANB-Official-Website-v5-Patch.zip -d .
   git diff --check
   git add index.html styles.css script.js README.md assets/anb-mark.svg
   git commit -m "Move project search to header and remove filters"
   git push origin main
   ```
3. If `git status` shows unrelated uncommitted changes before extraction, stop and review them first.
4. After push, test the centered search on desktop and mobile and confirm that entering `AI` narrows the cards and clearing the query restores all projects.

GitHub push and live deployment are not confirmed by creating this patch alone.
