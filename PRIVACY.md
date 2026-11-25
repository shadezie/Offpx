# Privacy Policy — Offpx

**Last updated: November 2026**

Offpx is a Chrome extension for inspecting the visual styling of web
pages. This policy explains, plainly, what it does and does not do with your
data.

## What Offpx does

Offpx reads the computed CSS styles and element geometry of the page you
are actively inspecting, so it can show that information in its side panel.
This happens entirely inside your browser, on the single tab you activated it
on.

To show that page at a device size, Offpx loads it a second time into a frame
beside the panel. That request goes from your browser to the same site you are
already on, exactly as a refresh would, with your own cookies. Nothing about it
is sent to the developer or to anyone else.

## What Offpx does not do

- It makes **no network requests of its own**. Apart from reloading the page
  you are on into its frame, nothing is ever sent anywhere.
- It does not collect, log, or transmit anything about the pages you visit,
  their content, or your activity on them.
- No analytics, no telemetry, no tracking, no crash reporting to a third
  party.
- No user accounts, no sign-in, nothing tied to your identity.

## What is stored, and where

The extension saves a small set of your own display preferences using
Chrome's local storage API, entirely on your device:

- Your chosen unit (px, rem, or em)
- Light or dark theme
- Which edge of the window the panel docks to
- Which sections of the panel you have folded
- Whether you have seen the first-run steps
- The device size you last used on the stage

Earlier versions stored the same kind of preferences under the name Design
Tool. Offpx reads those once, so your settings carry over.

None of this leaves your browser. It is never transmitted anywhere, and the
developer has no access to it, no way to see it, and no copy of it.

## Permissions

Offpx requests four permissions: `activeTab`, `scripting`, `storage`
and `declarativeNetRequestWithHostAccess`. It does not request a host
permission, so it has no standing access to any site — only the tab you
explicitly activate it on, for that one visit.

The last of those is used for one thing. To show a page at a device size, the
tool loads that page into a frame beside its panel, and some sites send a
header forbidding that. While the tool is on in a tab, it removes that header
from the tab's own frames of the site you are already on, so the frame can
load. It does not read, record or send any request or response, the rule
applies to no other tab and no other site, and it is deleted when you turn the
tool off. See the [README](https://github.com/shadezie/Offpx) for how
each permission is used.

## Open source

The full source is public: https://github.com/shadezie/Offpx. Anything
claimed in this policy can be verified directly in the code.

## Changes to this policy

Any change to this policy will be reflected here with an updated date.

## Contact

Questions: open an issue at https://github.com/shadezie/Offpx/issues
