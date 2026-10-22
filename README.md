# ANB Official Website — v16 Pro Upgrade Patch

## What's included
- More polished studio homepage with capability cards and a clear build workflow.
- Expanded About page explaining design, engineering, release-verification and improvement principles.
- Improved project discovery cards that visibly link users to full project profiles.
- Project detail page adds a release-status reminder and navigation to updates/downloads.
- Updates page adds v16 release notes and preserves manual Facebook sharing and copy-text controls.
- Responsive styles for mobile and desktop; reduced-motion preference respected.
- Corrected the previous auto-posting wording: Facebook sharing is manual; no auto-publishing workflow is enabled by this patch.

## Apply on Android using Termux
1. Download and extract this ZIP into the existing repository folder.
2. Run `git diff --check`.
3. Run `node --check script.js` and `node --check project-details.js`.
4. Review `git status` and changes before committing.
5. Commit and push to the existing `main` branch.

Example commands:
```bash
cd ~/ANB-Official-Website
git status
unzip -o /storage/emulated/0/Download/ANB-Official-Website-v16-Pro-Upgrade-Patch.zip -d .
git diff --check
node --check script.js
node --check project-details.js
git add index.html projects.html project-details.html about.html updates.html styles.css README.md
git commit -m "Upgrade ANB website design and project details v16"
git push origin main
```

## Important
This ZIP only prepares the files. It does not push to GitHub or deploy the live site. Verify the Pages deployment after pushing. Facebook posts must be reviewed and published manually using the share controls.
