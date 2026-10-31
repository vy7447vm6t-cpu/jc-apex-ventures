# Division profiles

A4 PDF profiles for each division, built from the same data as the website.

```bash
npm run profiles
```

PDFs are written to `profiles/out/` as `YYYY-MM-DD_JCApex_<Division>_Profile_v<rev>.pdf`. Pass `-- --out <dir>` to write elsewhere, or `-- --date YYYY-MM-DD` to fix the date in the title block.

- **Project and client facts** come only from `src/content/track-record.ts`. Correct a project there and rebuild; never type figures into a profile. Division descriptions follow each division's brand guidelines.
- **Design rules** are in `Antigravity/JC_Apex_Brand/JC_Apex_Brand_Guidelines.md` (sections 2.8, 2.9 and 3.2) and each division's guidelines. Solis follows the Solis guidelines.
- **Chrome**: the build uses `CHROME_PATH`, or the newest `chrome-headless-shell` in `~/.cache/puppeteer`.
- **Fonts** (Inter, Instrument Sans, Instrument Serif) are bundled in `fonts/` under the SIL Open Font License and inlined into each PDF.

- **Photos** live in `assets/photos/` with `credits.json`. Licensed photos (Wikimedia Commons, CC0 / CC BY / CC BY-SA) are captioned "Representative image" with a short credit, and every profile that uses them lists full credits on its back page. `own-*` photos are the company's own, saved without location data. Covers use only own photos (guidelines 3.2).
- **Maps** in `assets/maps/` are projected from geoBoundaries (DataMeet India, CC BY 2.5 IN; Pathways Data and lgdirectory.gov.in, ODbL). Pin locations are approximate (`PLACES` in `visuals.mjs`).
- **Revisions** are set per document in `REVS` in `build.mjs` and appear in the title block and the file name.

Documents: the JC Apex Ventures company profile (`company.mjs`) and one profile per division (`solis.mjs`, `grid-apex.mjs`, `sanyog.mjs`, `tvasta.mjs`, `emudran.mjs`, `agrim.mjs`), sharing `lib.mjs`, `visuals.mjs` and `styles.css`.
