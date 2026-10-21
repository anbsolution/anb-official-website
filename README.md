# ANB Official Website — v2 patch

This patch fixes the broken ANB logo/emblem by adding the missing `assets/anb-mark.svg` file that the HTML already references. It also improves the mobile navigation panel contrast and menu accessibility/closing behavior.

## Mobile Termux update
1. Download `ANB-Official-Website-v2-Patch.zip` to your Android Downloads folder.
2. In Termux, run:

```sh
cd ~/ANB-Official-Website
git status
unzip -o /storage/emulated/0/Download/ANB-Official-Website-v2-Patch.zip -d .
git add index.html styles.css script.js README.md assets/anb-mark.svg
git commit -m "Fix logo assets and improve mobile navigation"
git push origin main
```

If the ZIP downloaded to a different folder, update the ZIP path accordingly. Do not run `git push --force`.

## Verify after push
- Open the repository's **Actions** tab only if a workflow is configured; this site currently uses GitHub Pages branch publishing.
- In Settings → Pages, confirm `main` and `/(root)` remain selected.
- Open https://anbsolution.github.io/anb-official-website/ and refresh. If the old version remains, wait a few minutes and refresh again.

This patch does not add APK download links or claim unverified releases exist.
