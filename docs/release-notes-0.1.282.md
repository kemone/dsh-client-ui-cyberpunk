# v0.1.282 — first public release

Cyberpunk neon skin for the DeepSeek Harness web GUI: dark navy surfaces with cyan hairlines and a deep-red text
selection, plus a warm-paper light theme with violet borders. Pure CSS token overrides — no runtime dependency, no
React import, the host half is an empty `apply()`.

## Highlights

- **Two themes, one geometry.** Dark and light share every structural rule; switching `light` / `dark` / `system`
  only swaps colours, so the three-column frame, sidebar glass blocks and composer card never move.
- **Control page inside Settings** (`Settings → Cyberpunk skin`): accent colour, per-group border colour and
  intensity (columns / sidebar blocks / composer), breathing speed, per-group reset and a confirmed global reset.
- **One-line summary row** in `Settings → General` with five feature switches: frame breathing light, selected-row
  sweep, session status marks, settings-page HUD, code-block chrome.
- **Floating glass header** over the transcript, aligned to the message column and re-measured on resize/drag; the
  other conversation tabs reserve the header height themselves so nothing hides underneath.
- **Accessibility work**: focus rings on every injected control, a `forced-colors` fallback, animations honouring
  `prefers-reduced-motion`, and AA contrast checked for both themes (body text ≥ 4.5:1, labels and borders ≥ 3:1).

## Install

Requires DSH `0.2.x` (desktop or web profile). The asset below is the exact `npm pack` output of this tag.

```powershell
dsh plugin --profile desktop add dsh-client-ui-cyberpunk-0.1.282.tgz
```

From a checkout, without a build step:

```powershell
dsh plugin --profile desktop add F:\path\to\dsh-client-ui-cyberpunk\dist\dsh-client-ui-cyberpunk-0.1.282.tgz
```

Uninstall:

```powershell
dsh plugin --profile desktop remove dsh-client-ui-cyberpunk
```

## Asset

| | |
|---|---|
| `dsh-client-ui-cyberpunk-0.1.282.tgz` | 385,669 bytes |
| SHA-256 | `A3F07DE1C8773DEF79ABE1AC84AD5D25CCAFA4D9C8518F21568B1EE2D544AC9D` |
| Contents | `lib/client.js`, `lib/index.js`, `cordis.patch.yml`, `package.json`, `README.md`, `LICENSE`, `docs/screenshots/*.webp` |

## Compatibility

Verified against DSH desktop `0.2.1-rc.5`. Layout rules target the host's CSS-Modules class names
(`.mP3x-q_frame`, `.wnFoaW_sessionRow`, `.acoR2W_panel`, `.wtg9ga_*`); a host upgrade that renames them makes those
rules silently stop matching. Status marks read the host's `data-state` attribute only, so they work in every UI
language.

## Known limits

- `!important` is confined to the feature-switch layer and a few structural rules that must beat the host's inline
  styles.
- The session-row status outline does not shift layout, but Windows high-contrast mode overrides it.
- The terminal (xterm) colour palette is built from a theme snapshot, so pure CSS cannot recolour it.
- The right column keeps the host's startup width: its panel width is drawn by the occupant and the grid track
  decides how much room the centre yields, so an inline-width override cannot widen the transcript (reverted on
  purpose).

## Notes

- Developed against a live GUI; the changelog records milestones, not every single-rule iteration.
- Visual language is the broad “cyberpunk / neon HUD” vocabulary. Not affiliated with CD PROJEKT RED; no assets,
  trademarks, fonts or layouts from *Cyberpunk 2077* are used.

**Full changelog:** https://github.com/kemone/dsh-client-ui-cyberpunk/blob/main/CHANGELOG.md
