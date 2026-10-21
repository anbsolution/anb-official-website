# ANB Official Website — v7 Royal Neon Blue + Gold Theme

This is a **patch** for the existing `anbsolution/anb-official-website` repository.
It preserves the existing page structure, project search behavior, navigation, and sections.
The main change is the premium Royal Neon Blue + Gold visual palette.

## Apply from Android Termux
From the existing repository directory:
```bash
cd ~/ANB-Official-Website
git status
unzip -o /storage/emulated/0/Download/ANB-Official-Website-v7-Patch.zip -d .
git diff --check
git diff --stat
```
Review the changes before committing. If `git status` showed unrelated edits before applying the patch, stop and review those first.

Then:
```bash
git add styles.css index.html script.js README.md assets/anb-mark.svg
git commit -m "Apply royal neon blue and gold theme"
git push origin main
```

After pushing, verify the latest commit on GitHub and open:
https://anbsolution.github.io/anb-official-website/

A successful local patch or push does not itself prove that GitHub Pages deployment has completed.
