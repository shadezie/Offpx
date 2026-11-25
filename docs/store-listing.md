# Chrome Web Store listing

Copy for the Developer Dashboard. Keep this in sync with what is actually
submitted, so the next release does not have to reinvent it.

---

## Store listing tab

**Name**

```
Offpx
```

**Short description** (132 char limit, this is 116)

```
Catch the pixel that's off, before your users do. Measure, inspect and check any live site at mobile, tablet and desktop.
```

**Category**: Developer Tools
**Language**: English

**Detailed description**

```
Offpx finds where the build drifted from the design.

It inspects live websites: it measures spacing, reveals type, colour and layout
properties, and tests responsive layouts at any screen size. It is made for
designers and front-end teams who notice the pixel that is off.

Turn it on and the page moves onto a stage beside a side panel. Pick mobile,
tablet, desktop or large desktop, type any width and height, or drag the
frame's edge. The page responds at that size.

Hover an element and read its type: size, weight and line height up front,
then family, letter spacing, transform and colour. Select one element, hold Cmd
or Ctrl over another, and the distance between them is drawn on the page.
Select a container and see margin and padding as nested rings, with the flex or
grid gap stated beside them.

WHAT YOU GET

• A stage with device sizes: mobile, tablet, desktop, large desktop, or custom
• A side panel that never covers the page it is measuring
• Type styles in a designer's vocabulary, not CSS
• The gap between any two elements, drawn on the page, only when you ask
• Design token names instead of raw values, where the site defines them
• Media: the format actually served, aspect ratio, and whether the asset fits
• A spacing box: margin, padding, content, border and gap
• px, rem and em, converted everywhere at once
• Click any value to copy it
• Interact and Inspect modes, so you can open a menu and then measure it
• Light and dark

DESIGN TOKENS

If the site is built on CSS custom properties, a colour reads as
--color-brand-600 rather than its hex, with the hex shown underneath. Copy
either one: the token name for code, the value for Figma. Where a token can
only be inferred by matching values, it says so.

MEDIA

Hover an image or video for the format the browser chose from srcset, so a
picture element serving WebP reports WebP. Aspect ratio is stated for the box,
and again for the asset when the two differ, with what the box does about it:
cropped, letterboxed or stretched. Asset scale catches a blurry upscale and a
3x file in a 100px slot.

BUILT FOR REAL PAGES

Card grids often stretch an invisible click target over the whole card, so a
plain hover lands on that instead of the heading. Offpx skips overlays that
paint nothing, and holding Cmd or Ctrl before you select reaches the most
specific element under the cursor.

rem is resolved against the page's real root font size, not an assumed 16px.

Nested measurements come from the container's padding box, so a 12px padding
with a 1px border reads as 12px, not 13px.

PRIVACY

No network requests of its own. No analytics. No accounts. Nothing is injected
into any page until you click the toolbar icon or press the shortcut, and
access is limited to that one tab. Your settings are stored locally and never
leave your machine.

Open source: https://github.com/shadezie/Offpx

HOW TO USE IT

Click the toolbar icon or press Option+Shift+I (Alt+Shift+I on Windows). The
page opens on the stage, ready to use. Switch to Inspect, hover to read an
element, click to select it, and hold Cmd or Ctrl over another to measure.
Esc clears the selection.
```

---

## Privacy tab

**Single purpose**

```
Offpx inspects the styling of elements on the page the user is viewing,
so a designer can check typography, spacing and layout against their design
without reading CSS.
```

**Permission justifications**

`activeTab`

```
The extension reads computed styles and element geometry from the page the user
is inspecting. activeTab limits that to the single tab the user activated, and
only after they click the toolbar icon or press the extension's shortcut. This
is used instead of a host permission so the extension has no access to any page
until the user explicitly asks for it.
```

`scripting`

```
Used to inject the inspection overlay into the active tab when the user
activates the extension. Because there is no always-on content script, this is
the only way the tool reaches the page, and it runs only on the tab covered by
the activeTab grant.
```

`declarativeNetRequestWithHostAccess`

```
The extension shows the page the user is inspecting at mobile, tablet and
desktop sizes by loading it into a frame beside the inspector. Many sites send
X-Frame-Options or a frame-ancestors policy that forbids framing, which leaves
that frame empty. While the user has the extension turned on in a tab, one
session rule removes those two response headers from sub-frame requests in that
tab to the tab's own host, so the page can be framed by itself. The rule is
scoped to that tab, that host and sub-frames only, and is removed when the user
turns the extension off. No request or response is read, stored or transmitted.
The WithHostAccess variant is used so the rule only ever applies where the user
has granted access by activating the extension on that tab.
```

`storage`

```
Stores the user's own display preferences locally: the unit (px, rem or em),
the light or dark theme, which edge the panel docks to, and the stage size last
used. No
browsing data is stored and nothing is transmitted.
```

**Data usage disclosures**

Tick nothing. The extension collects no user data. Then certify all three:

- Not being sold to third parties
- Not being used or transferred for purposes unrelated to the single purpose
- Not being used or transferred to determine creditworthiness or for lending

**Privacy policy URL**: not required, since no user data is collected.

---

## Assets

| Asset | Size | File |
| --- | --- | --- |
| Icon | 128x128 | `src/icons/icon-128.png` |
| Screenshot 1 | 1280x800 | `docs/store/01-measure-1280x800.png` |
| Screenshot 2 | 1280x800 | `docs/store/02-type-mobile-1280x800.png` |
| Screenshot 3 | 1280x800 | `docs/store/04-custom-size-1280x800.png` |
| Screenshot 4 | 1280x800 | `docs/store/03-rotate-landscape-1280x800.png` |
| Screenshot 5 | 1280x800 | `docs/store/05-media-1280x800.png` |
| Small promo tile | 440x280 | `docs/store/promo-440x280.png` |
| Marquee promo tile | 1400x560 | `docs/store/marquee-1400x560.png` |

The small tile and marquee are optional; screenshots are the ones that matter.
Upload all five, in this order. The first one is what shows in search results,
and the measurement is the clearest single picture of what the tool does.

All five are of shadezie.com, served locally, in both themes.

All five are regenerated from `docs/raw/` by `npm run store-images`, so replacing
a screenshot means dropping a new file in there and rerunning it, never editing
anything in `docs/store/` by hand.

---

## Before each submission

```bash
npm test          # every suite green
npm run package   # dist/offpx-<version>.zip
```

Bump `version` in `manifest.json` first (and `package.json`, to match). The Web
Store rejects an upload whose version is not higher than the published one.

## Released

| Version | What shipped |
| --- | --- |
| 1.0.0 | First release: type styles, measurement, spacing box, units, copy |
| 1.1.0 | Design token names, media format and aspect ratio, both sides of a measurement, folded shortcuts, Obsidian and Paper palettes |
| 2.0.0 | Renamed Offpx. Side panel, stage with device sizes, measure on Cmd/Ctrl, new palette and type. Not yet submitted |
