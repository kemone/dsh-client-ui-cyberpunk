# Changelog

All notable changes to this skin. The project uses `0.1.x` while the host UI is still moving; breaking changes
follow the host, not semver's usual guarantees.

This file records milestones. The skin was developed against a live GUI, so most `0.1.x` levels in between are
single-rule iterations (one colour, one inset, one selector) and are not listed individually.

## [0.1.282] - 2026-11-07

### Changed

- Repository packaging: added `repository` / `bugs` / `homepage` / `author` / `publishConfig` to `package.json`,
  plus `scripts/verify-manifest.mjs` (manifest + package-shape checks), a CI workflow and the docs below.
- Screenshots for both themes (`docs/screenshots/`, dark and light, conversation and new session) with a gallery
  in the README.
- Prebuilt install tarball in `dist/` (`npm pack` of this commit, 386 kB with screenshots), so the repository can
  be installed without a build step. It is the same artifact `npm publish` would upload.
- Two comments still claimed the workspace-row edge was keyed with `:has()`; it is keyed with `data-dsh-folder`
  since 0.1.279. Comments only, no selector changed.

## [0.1.281] - 2026-11-07

### Fixed

- Non-transcript tabs (轨迹 / 上下文 / bili 压缩 / 编队) had their first row hidden behind the floating glass header.
  The skin now marks the mounted view (`data-dsh-view="chat" | "pane"`) and reserves the header height on the view
  area of non-transcript panes only; the transcript keeps reserving room inside its own scroller, so messages keep
  sliding under the card.

## [0.1.280] - 2026-11-07

### Fixed

- The first transcript message was hidden behind the glass header card: the scroller now reserves
  `calc(var(--csk-header-h) + 8px)` of top padding.

## [0.1.279] - 2026-11-07

### Changed

- Removed the last `:has()` selectors from the stylesheet: the code-block chrome keys off `.NYOO6G_code`, and the
  workspace row is marked with `data-dsh-folder` by the DOM pass instead of a parent selector.

## [0.1.277] - 2026-11-07

### Fixed

- The assistant vertical rail finally attaches to `[data-chat-group-key][data-chat-flow-kind="assistant-step"]`
  after three wrong guesses about the wrapper class.

## [0.1.269] - 2026-11-07

### Added

- Main accent colour is user-selectable; the bright variant is derived with `color-mix()`.

## [0.1.267] - 2026-11-07

### Fixed

- 55 dark-theme rules were missing the `[data-dsh-skin-on]` gate and could apply before the skin had armed
  itself (that is what recoloured the host boot card).

## [0.1.244] - 2026-11-06

### Added

- The conversation header became a floating glass card (absolute, 8 px inset, 14 px radius, `backdrop-filter`,
  70 % tint) with the transcript sliding underneath. `z-index: 30` keeps it above sticky code-block banners.

## [0.1.223] - 2026-11-06

### Removed

- Temporary layout probe (F10) used while aligning the sidebar.

## [0.1.197] - 2026-11-05

### Accessibility

- Focus rings for the three injected controls, a `forced-colors` block, and a guard that checks contrast of every
  interactive token on both themes.

## [0.1.193] - 2026-11-05

### Added

- One-line summary row in **Settings → General** with five feature switches.
- Session status marks now read the host's `data-state` attribute instead of localized labels, so they work in
  every UI language.

## [0.1.170] - 2026-11-05

### Added

- Light theme: warm-paper surfaces with violet borders; the accent switches to violet while cyan stays as the data
  colour (links, syntax, caret).

## [0.1.0] - 2026-10-25

### Added

- First dark-only skin: navy surfaces, cyan hairlines, deep-red selection, column frame and sidebar glass blocks.
