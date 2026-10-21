# ANB Official Website — v4 Professional Studio patch

## What's improved
- Adds instant project search across project titles and descriptions.
- Adds category filters for Games, AI & images, Android, Communication, and System software.
- Adds accessible project detail dialogs populated from the existing project cards.
- Keeps the Cyber Pro design, existing navigation, logo, SEO metadata, and verified project URLs.
- Keeps download links honest: no unverified APKs are added.
- Does not change repository name or require a build system.

## Update from Android using Termux
1. Download `ANB-Official-Website-v4-Patch.zip` to Android Downloads.
2. Check for unrelated local changes first.

```sh
cd ~/ANB-Official-Website
git status
unzip -o /storage/emulated/0/Download/ANB-Official-Website-v4-Patch.zip -d .
git diff --check
git add index.html styles.css script.js README.md assets/anb-mark.svg
git commit -m "Add project search filters and detail dialogs"
git push origin main
```

If `git status` shows unrelated changes, stop and inspect before committing. If Git says `nothing to commit`, do not repeat the commit. No nano or local APK build is needed.

## Verify after push
Open https://anbsolution.github.io/anb-official-website/ and test project search, each category filter, the Project details button and dialog close button, mobile navigation, and Back to Top. GitHub Pages can take a few minutes to publish. This patch has not been pushed automatically.
