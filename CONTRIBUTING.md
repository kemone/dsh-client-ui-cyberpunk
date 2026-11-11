# Contributing

Thanks for taking a look at the skin.

## Reporting

Open an issue with the template. The three facts that make a theming bug reproducible:

1. DSH version (`Help → About`, or the asar build) and OS;
2. light or dark theme, and which feature switches are on (**Settings → Cyberpunk skin**);
3. a screenshot, plus the element's class names if the issue is about a rule not applying
   (right-click → Inspect → copy the `class` attribute).

## Pull requests

- Keep the three-prefix convention (`docs/DEVELOPING.md`): geometry on `html body[data-dsh-skin-on]`, colours on
  the dark or the light prefix. A colour rule under the shared prefix leaks into the other theme.
- Do not introduce `:has()` — mark the element from the DOM pass instead.
- Do not add dependencies. The package intentionally ships zero runtime dependencies.
- Keep the light theme at WCAG AA: body text ≥ 4.5:1, interface labels and borders ≥ 3:1 on their own surface.
- Run `npm test` before opening the PR. It checks syntax, the manifest, the `files[]` list, `exports` targets and
  the stylesheet's brace balance / rule count.

## Commit messages

Short imperative subject, then *why* in the body when the change is not obvious:

```
Fix first message hidden behind the glass header

The scroller reserved no room for the absolutely positioned header, so the
first transcript row sat underneath it after the header became a floating card.
```

## License

By contributing you agree that your changes are licensed under the MIT license (see `LICENSE`).
