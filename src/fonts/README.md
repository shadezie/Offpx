# Bundled typefaces

Offpx's brand type ships with the extension so the panel renders the same
everywhere, not only on machines that happen to have it installed. Geist is
licensed under the SIL Open Font License 1.1, which permits bundling and
redistribution and **requires the licence text to travel with the font
files**. That is why `OFL-Geist.txt` is here, and why it must stay in the
packaged zip.

| File | Family | Weight | Use |
| --- | --- | --- | --- |
| `geist-400.woff2` | Geist | 400 | Body and UI |
| `geist-500.woff2` | Geist | 500 | Headings, values |
| `geist-mono-400.woff2` | Geist Mono | 400 | Selectors, tokens, hex |

These are the weights the brand guidelines use: Geist 400 and 500, Geist Mono
400. They were converted from the TTF files in the Offpx brand kit to WOFF2 and
cut down to Latin, Latin-1 and a few symbols, which keeps all three under
75 KB. If the tool ever needs to render other scripts in its own chrome, the
wider character sets have to be added here.

The glyphs themselves are unmodified, and Geist's licence reserves no font
names.
