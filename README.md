# ANB Official Website — v3 Interactive Pro patch

## What's improved
- Keeps the existing Cyber Pro visual design and the current repository structure.
- Adds canonical URL, search indexing directives, Open Graph and Twitter metadata, and Organization structured data.
- Adds a keyboard-accessible “Skip to content” link and visible keyboard focus styles.
- Adds an “Explore repositories” link in the Projects heading.
- Adds a scroll-aware “Back to top” button that respects reduced-motion preferences.
- Preserves verified project links and does not invent APK download links.

## Update from Android using Termux
1. Download `ANB-Official-Website-v3-Patch.zip` to the Android Downloads folder.
2. Run the following commands. They do not use nano and do not force-push.

```sh
cd ~/ANB-Official-Website
git status
unzip -o /storage/emulated/0/Download/ANB-Official-Website-v3-Patch.zip -d .
git add index.html styles.css script.js README.md assets/anb-mark.svg
git commit -m "Add SEO metadata and interactive accessibility improvements"
git push origin main
```

If `git status` shows unrelated changes, stop and inspect them before committing. If the ZIP downloaded elsewhere, update its path. If Git says “nothing to commit,” do not repeat the commit; check the live page and repository history instead.

## Verify
Open https://anbsolution.github.io/anb-official-website/ and check the Projects links, mobile navigation, back-to-top button, logo, and page sections. GitHub Pages branch publishing can take a few minutes after a push. This patch has not been pushed automatically.
