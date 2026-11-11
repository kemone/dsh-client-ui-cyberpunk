# Developing

The whole skin is one client file:

```
lib/client.js    stylesheet + DOM injectors + settings slots
lib/index.js     host half, intentionally an empty apply()
cordis.patch.yml bundle patch that adds the plugin to a profile
```

## Style file layout

`lib/client.js` keeps the stylesheet as an array of strings near the top (`const CSS = [...]`), then a second
stylesheet for the injected chrome (`SHELL_CSS`), then the JavaScript. Editing order is top-down; the array joins
with `\n` into a single string that is written into one `<style id="dsh-skin-cyberpunk">`.

Rules are grouped by surface, and every rule carries one of three prefixes — this is the load-bearing convention,
because it decides which theme sees the rule:

| Prefix | Applies to | Used for |
|---|---|---|
| `html body[data-dsh-skin-on]` | both themes | geometry: frame, gutters, radii, insets, the composer card layout |
| `html body[data-ds-dark-theme][data-dsh-skin-on]` | dark only | colours, glows, gradients |
| `html body:not([data-ds-dark-theme])[data-dsh-skin-on]` | light only | the warm-paper / violet palette |

The `[data-dsh-skin-on]` gate is set by `armSkin()` **after** the host boot card leaves the DOM. Without it the
skin's tokens recolour the boot card itself (the host paints it with `--dsw-alias-bg-base`), which looks like a
flash of the wrong theme on every launch.

Two rules about the stylesheet:

- **No `:has()`.** The project deliberately avoids it: the host ships an older Chromium in some shells and the
  selector silently kills the whole rule block. Where a parent had to be styled, the DOM pass sets an attribute
  (`data-dsh-folder`, `data-dsh-view`, `data-dsh-state`, `data-dsh-approval`) and the CSS keys off that.
- **No `--cp-*` tokens.** The skin's own knobs live in `--csk-*` so it never collides with a host token namespace.
  Host tokens are overridden, not invented.

## DOM passes

Small `install*()` functions run after `apply()`:

| Function | What it marks |
|---|---|
| `installRefreshButton()` | the title-bar refresh button |
| `installSettingsRow()` | turns the sidebar username row into a settings button |
| `installSettingsHud()` | frames the settings view, latched until you leave it |
| `installSessionMarks()` | `data-dsh-state` / `data-dsh-folder` / `data-dsh-approval` on rows |
| `installHeaderOverlay()` | measures the glass header, writes `--csk-header-h`, aligns width with the message column, marks `data-dsh-view` |
| `installReloadKeys()` | F5 / Ctrl+Shift+R page reload |
| `installThemeSection()` | registers `settings.section` (control page) and `settings.general.item` (summary row) |

Every installer returns a disposer and `apply()` reverses them on unload. Observers are shared through one
`watch()` helper to stay inside the budget.

## Host contract

The skin targets the host's CSS-Modules class names and a few data attributes. Those are the fragile part; the
bundled `check-host-contract` guard (internal) greps the host bundle for every class name and attribute used
here. When a host upgrade renames them, the rule stops matching silently — check the three column frame, the
sidebar blocks and the composer card visually.

Two host facts worth remembering:

- **`inject` is mandatory.** Reading `ctx.locale` / `ctx.slots` without declaring them in
  `module.exports.inject` throws `Error: cannot get property "locale" without inject`. The skin wraps apply in
  `try/catch` for robustness, so the failure mode is *the settings page silently missing* rather than a crash.
  If the control page disappears, check `exports.inject` first.
- **The right column is a track, not a box.** Its panel width is drawn by the occupant; the grid track decides how
  much room the centre column yields. Shrinking the panel's inline width does not widen the transcript, which is
  why the "startup width" experiment was reverted.

## Checks

The repository's `npm test` runs `node --check` and `scripts/verify-manifest.mjs` (manifest fields, `files[]`,
`exports` targets, patch entry, brace balance, rule count, banned tokens). The internal build also runs
budget / token-drift / contrast / a11y / host-contract / plugin-adaptation guards; those need a DSH install and
are not part of the published package.

## Build and install

```powershell
npm pack                                                  # dsh-client-ui-cyberpunk-<version>.tgz
dsh plugin --profile desktop add F:\path\to\that.tgz       # install
dsh plugin --profile desktop remove dsh-client-ui-cyberpunk
```

A same-version reinstall is skipped by the package manager — bump the version (or `link:` the checkout) when you
change the skin.
