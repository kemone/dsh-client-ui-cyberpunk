/**
 * Browser half of the cyberpunk skin.
 *
 * Registers one factory in the client module table. The factory injects a single
 * stylesheet that overrides the design tokens the shell already consumes, so
 * every component picks the new palette up without knowing this plugin exists.
 * Overrides are scoped to `body[data-ds-dark-theme]`, which means switching the
 * appearance back to light simply disables the skin.
 */
/* The shell imports this bundle more than once on a cold start: from the batched script
   the boot kernel loads, and again per entry from client-modules, which keeps its own
   loader table. The second import has to register in that table, so there is deliberately
   no window-level "already registered" flag: with one, the second import returned early,
   the entry was left without a factory, and the shell answered "import failed" and
   reloaded the document — which is where the default boot card came from. A duplicate
   load() in the same table throws, so that case is caught instead; the first
   registration stays valid and the import still resolves. */
(function registerCyberpunk() {
  const loader = window.__ModuleLoader__;
  if (loader === void 0 || typeof loader.load !== "function") {
    /* The loader is installed by the app bundle, which can land after a bundle that was
       fetched in the first parallel wave. Retry shortly instead of throwing. */
    window.setTimeout(registerCyberpunk, 10);
    return;
  }

  try {
    loader.load({
    id: "dsh-client-ui-cyberpunk",
    factory: (require) => {
      /* The settings section needs React; a host that does not hand it over simply gets
         the stylesheet-only skin instead of a failed activation. */
      let React = null;
      try {
        React = require("react");
      } catch (error) {
        React = null;
      }

      const STYLE_ID = "dsh-cyberpunk-theme";

      const CSS = [
        /* The token overrides wait for `data-dsh-skin-on`, which the script sets only once
           the shell's boot card has left the document. The boot card paints its background
           from `--dsw-alias-bg-base` and its text from `--dsw-alias-label-primary`, so
           without this gate the card would turn from the host's light grey to this palette
           the moment the bundle was evaluated — a mid-boot colour flip. */
        "html body[data-ds-dark-theme][data-dsh-skin-on]{--csk-accent:#00e5ff;--csk-accent-bright:#22e8ff;--csk-accent-violet:#a06bff;--csk-accent-violet-deep:#6a3bd8;--csk-danger:#ff5d73;",
        /* Plugin CSS that uses light-dark() keys off color-scheme, not off our body
           attribute; without this the light branch wins inside a dark window. */
        "color-scheme:dark;",
        "--csk-edge-color:#22e8ff;",
        "--csk-edge-alpha:44%;",
        "--csk-block-color:#22e8ff;",
        "--csk-block-alpha:30%;",
        "--csk-card-color:#22e8ff;",
        "--csk-card-alpha:14%;",
        "--csk-breath-duration:5.6s;",
        /* ---- pending-approval mark ---- */
        /* ---- surface ramp: cold blue-violet instead of neutral grey ---- */
        "--dsw-alias-bg-base:#05070f;",
        "--dsw-alias-bg-layer-1:#0a1222;",
        "--dsw-alias-bg-layer-2:#0e1a2e;",
        "--dsw-alias-bg-layer-3:#142540;",
        "--dsw-alias-bg-overlay:#2b4a6b;",
        "--dsw-alias-bg-document-preview:#0a1222;",
        "--dsw-specific-sidebar-fill:#070d19;",
        "--dsw-alias-bg-skeleton:#00e5ff12;",
        "--dsw-alias-bg-multi-select:#0e1a2e;",
        "--dsw-alias-bg-module-platform:#142540;",
        /* ---- text ---- */
        "--dsw-alias-label-primary:#e6f7ff;",
        "--dsw-alias-label-primary-bluish:#e6f7ff;",
        "--dsw-alias-label-primary-dimmed:#cfeaff;",
        "--dsw-alias-label-primary-foreground:#05070f;",
        "--dsw-alias-label-primary-inverted:#142540;",
        "--dsw-alias-label-secondary:#9fc3e0;",
        "--dsw-alias-label-tertiary:#84a8c9;",
        "--dsw-alias-label-caption:#7f9ab8;",
        "--dsw-alias-label-dimmed:#1c3450;",
        "--dsw-alias-menu-icon:#cfeaff;",
        /* ---- neon hairlines ---- */
        "--dsw-alias-border-inverted:#00e5ff1f;",
        "--dsw-alias-border-inverted2:#ff2bd61f;",
        "--dsw-alias-border-l1:#00e5ff12;",
        "--dsw-alias-border-l2-darkmode-thin:#00e5ff1f;",
        "--dsw-alias-border-l2:#00e5ff29;",
        "--dsw-alias-border-l3:color-mix(in srgb,var(--csk-edge-color) var(--csk-edge-alpha),transparent);",
        "--dsw-alias-border-l4:#00e5ff5c;",
        "--dsw-elevation-stroke-color:#00e5ff29;",
        /* ---- interaction ---- */
        "--dsw-alias-interactive-bg-hover:#00e5ff12;",
        "--dsw-alias-interactive-bg-active:#00e5ff24;",
        "--dsw-alias-interactive-bg-hover-accent:#ff2bd633;",
        "--dsw-alias-interactive-bg-hover-solid:#142540;",
        "--dsw-alias-button-ghost-active-fill:#142540;",
        "--dsw-alias-button-ghost-active-hover:#1c3450;",
        "--dsw-alias-button-ghost-active-border:#00e5ff5c;",
        "--dsw-alias-button-elevated-fill:#0e1a2e;",
        "--dsw-alias-button-floating-fill:#0e1a2e;",
        "--dsw-alias-button-floating-hover:#142540;",
        "--dsw-alias-button-tool-bar-fill:#1b2b4580;",
        "--dsw-alias-button-tool-bar-fill-invisible:#1b2b455c;",
        "--dsw-alias-button-tool-bar-hover:#24395c99;",
        "--dsw-alias-button-info-fill:#00b8cf;",
        "--dsw-alias-button-info-hover:#00d1ea;",
        /* ---- brand / accent ---- */
        "--dsw-alias-brand-primary:#00e5ff;",
        "--dsw-alias-brand-primary-invert:#e6f7ff;",
        "--dsw-alias-brand-text:#00e5ff;",
        "--dsw-alias-state-business-primary:#00e5ff;",
/* --- host state semantics, matched to the skin palette --- */
"--dsw-alias-state-error-primary:#ff4d6a;",
"--dsw-alias-state-error-secondary:#ff8fa3;",
"--dsw-alias-state-error-tertiary:rgba(255,77,106,.16);",
"--dsw-alias-state-warn-primary:#fcee0a;",
"--dsw-alias-state-warn-secondary:#ffe95c;",
"--dsw-alias-state-warn-tertiary:rgba(252,238,10,.14);",
"--dsw-alias-state-warn-label:#ffe95c;",
"--dsw-alias-state-success-primary:#3dff9e;",
"--dsw-alias-state-success-secondary:#7dffc0;",
"--dsw-alias-state-success-tertiary:rgba(61,255,158,.14);",
"--dsw-alias-interactive-bg-hover-danger:rgba(255,77,106,.10);",
        "--dsw-alias-state-business-tertiary:#063a46;",
        "--dsw-alias-link:#00e5ff;",
        "--dsw-focus-ring-color:#00e5ff;",
        "--dsw-alias-label-deep-diving:#00e5ff;",
        "--dsw-alias-label-deep-diving-shimmer:#ff9bee;",
        "--dsw-alias-label-shimmer:#ff2bd680;",
        "--dsw-alias-switch-thumb:#00e5ff;",
        /* ---- surfaces that paint their own fill ---- */
        "--dsw-specific-bubble:#0f1a30;",
        "--dsw-specific-bubble-highlight:#16243d;",
        "--dsw-specific-input-major:#0a1526;",
        "--dsw-specific-login-input:#080f1c;",
        "--dsw-specific-selector:#14213a;",
        "--dsw-specific-tip:#0e1b31;",
        "--dsw-specific-sidebar-nav-item-active:#142540;",
        "--dsw-specific-sidebar-nav-item-active-accent:#1d3452;",
        "--dsw-specific-sidebar-nav-item-hover:#0e1a2e;",
        "--dsw-menu-surface-fill:#0b1322e6;",
        "--dsw-specific-menu:#0b1322e6;",
        "--dsw-alias-menu-group-header-fill:#0a1120f0;",
        "--dsw-alias-toast-bg:#0b1322;",
        "--dsw-alias-tooltip-bg:#0a1220;",
        "--dsw-alias-tooltip-key-bg:#1b2b45;",
        "--dsw-alias-turn-trigger-bg:#0e1a2e;",
        "--dsw-alias-turn-trigger-bg-hover:#142540;",
        "--dsw-alias-settings-card-fill:#0a1222;",
        "--dsw-alias-settings-card-stroke:#00e5ff29;",
        /* ---- markdown / code ---- */
        "--dsw-alias-markdown-code-block:#0a1224;",
        "--dsw-alias-markdown-code-block-banner:#101a2e;",
        "--dsw-alias-markdown-code-segment-selected:#16263e;",
        "--dsw-alias-markdown-code-segment-unselected:#0c1626;",
        "--dsw-alias-markdown-inline-code:#0e1a2c;",
        "--dsw-alias-markdown-tag:#142540;",
        "--dsw-alias-markdown-citation:#142540;",
        "--dsw-alias-markdown-placeholder:#0e1a2e;",
        "--dsw-alias-bg-document-selection:color-mix(in srgb, #8c0f28 50%, transparent);",
        /* ---- diff ---- */
        "--dsw-alias-code-diff-added:#22e06a1f;",
        "--dsw-alias-code-diff-deleted:#ff4d6d1f;",
        "--dsw-alias-file-diff-added-bg:#08251b;",
        "--dsw-alias-file-diff-added-gutter:#041810;",
        "--dsw-alias-file-diff-added-marker:#3df5a0;",
        "--dsw-alias-file-diff-deleted-bg:#2a0a18;",
        "--dsw-alias-file-diff-deleted-gutter:#1c0510;",
        "--dsw-alias-file-diff-deleted-marker:#ff4d6d;",
        /* ---- scrollbar ---- */
        "--dsw-alias-scrollbar-bg-l1:#1b2b45;",
        "--dsw-alias-scrollbar-bg-l2:#24395c;",
        "--dsw-alias-scrollbar-hover-l1:#2f4a75;",
        "--dsw-alias-scrollbar-hover-l2:#3a5c8f;",
        /* ---- syntax colours ---- */
        "--shiki-token-constant:#7df9ff;",
        "--shiki-token-string:#9dff6b;",
        "--shiki-token-comment:#5f7d99;",
        "--shiki-token-keyword:#ff5ce1;",
        "--shiki-token-parameter:#ffd76e;",
        "--shiki-token-function:#b18cff;",
        "--shiki-token-string-expression:#b6ff7a;",
        "--shiki-token-punctuation:#9fb6d4;",
        "--shiki-token-link:#00e5ff;",
        /* ---- static ramps: some components read these directly ---- */
        "--dsw-static-neutral-bluish-00:#ffffff;",
        "--dsw-static-neutral-bluish-50:#e6f7ff;",
        "--dsw-static-neutral-bluish-75:#cfeaff;",
        "--dsw-static-neutral-bluish-100:#cfeaff;",
        "--dsw-static-neutral-bluish-150:#b9dcf7;",
        "--dsw-static-neutral-bluish-200:#a3ccef;",
        "--dsw-static-neutral-bluish-300:#7fa9d2;",
        "--dsw-static-neutral-bluish-400:#5f92bd;",
        "--dsw-static-neutral-bluish-500:#4b7ba6;",
        "--dsw-static-neutral-bluish-600:#3a6389;",
        "--dsw-static-neutral-bluish-700:#2b4a6b;",
        "--dsw-static-neutral-bluish-750:#1c3450;",
        "--dsw-static-neutral-bluish-800:#142540;",
        "--dsw-static-neutral-bluish-850:#0e1a2e;",
        "--dsw-static-neutral-bluish-875:#0a1222;",
        "--dsw-static-neutral-bluish-900:#070d19;",
        "--dsw-static-neutral-bluish-950:#05070f;",
        "--dsw-static-neutral-bluish-1000:#000000;",
        "--dsw-static-neutral-550:#33465f;",
        "--dsw-static-neutral-600:#2a3a52;",
        "--dsw-static-neutral-700:#1b2839;",
        "--dsw-static-neutral-800:#121c2c;",
        "--dsw-static-neutral-850:#0d1522;",
        "--dsw-static-neutral-900:#080d16;",
        "--dsw-static-deepseek-50:#eafeff;",
        "--dsw-static-deepseek-100:#ccfaff;",
        "--dsw-static-deepseek-300:#7ff0ff;",
        "--dsw-static-deepseek-400:#00e5ff;",
        "--dsw-static-deepseek-450:#00d1ea;",
        "--dsw-static-deepseek-500:#00b8cf;",
        "--dsw-static-deepseek-600:#0a8fa6;",
        "--dsw-static-deepseek-800:#063a46;",
        "--dsw-static-deepseek-900:#04222b;",
        "--dsw-static-blue-50:#fff0fb;",
        "--dsw-static-blue-100:#ffe0f7;",
        "--dsw-static-blue-300:#ffa8ec;",
        "--dsw-static-blue-400:#ff6ee0;",
        "--dsw-static-blue-450:#ff4ddb;",
        "--dsw-static-blue-500:#ea2ac6;",
        "--dsw-static-blue-600:#d81bb4;",
        "--dsw-static-blue-800:#5c1049;",
        "--dsw-static-blue-900:#3d0b31;",
        "--dsw-static-blue-950:#2a0722;",
        /* Third-party plugin aliases: the installed plugins in this profile reference these,
           the host leaves them undefined (or neutral), so they used to paint host defaults. */
        "--dsw-alias-bg-mask-1:rgba(2,6,14,.62);",
        "--dsw-alias-bg-mask-2:rgba(2,6,14,.42);",
        "--dsw-alias-bg-mask-3:rgba(2,6,14,.76);",
        "--dsw-alias-surface-overlay:#0a1322;",
        "--dsw-alias-border-secondary:rgba(0,229,255,.18);",
        "--dsw-alias-bg-l2:#0b1526;",
        "--dsw-alias-specific-menu-item-hover:rgba(0,229,255,.10);",
        "--dsw-alias-hairline:rgba(0,229,255,.22);",
        "--dsw-alias-label-quaternary:#5c7a9c;",
        "--dsw-alias-brand:#22e8ff;",
        "--dsw-alias-brand-bg:rgba(0,229,255,.12);",
        "--dsw-alias-accent:#ff4ddb;",
        "--dsw-alias-accent-soft:rgba(255,77,219,.16);",
        "--dsw-alias-accent-ink:#ffd0f4;",
        "--dsw-alias-danger:#ff4d6a;",
        /* The host derives the primary button from brand-primary; these three are referenced
           directly by plugins, so spell them out instead of relying on the derivation. */
        "--dsw-alias-button-primary-fill:var(--dsw-alias-brand-primary);",
        "--dsw-alias-button-primary-hover:color-mix(in srgb,var(--dsw-alias-brand-primary) 84%,#04121a);",
        "--dsw-alias-button-info-label:#04121a;",
        "}",
        "html body:not([data-ds-dark-theme])[data-dsh-skin-on]{--csk-accent:#0891b2;--csk-accent-bright:#0a7f9c;--csk-accent-violet:#6d3bd1;",
        "color-scheme:light;",
        "--csk-edge-color:#6d3bd1;",
        "--csk-edge-alpha:66%;",
        "--csk-block-color:#6d3bd1;",
        "--csk-block-alpha:30%;",
        "--csk-card-color:#6d3bd1;",
        "--csk-card-alpha:16%;",
        "--csk-breath-duration:5.6s;",
        "--csk-ink:#241f18;",
        "--csk-frame:#ece3d4;",
        "--csk-line:color-mix(in srgb,var(--csk-block-color) var(--csk-block-alpha),transparent);",
        "--csk-line-soft:rgba(109,59,209,.16);",
        "--csk-glow:rgba(109,59,209,.16);",
        "--dsw-alias-bg-base:#faf6ef;",
        "--dsw-alias-bg-layer-1:#f5efe4;",
        "--dsw-alias-bg-layer-2:#f0e9dc;",
        "--dsw-alias-bg-layer-3:#e9e1d2;",
        "--dsw-alias-bg-overlay:#d8cfbf;",
        "--dsw-alias-bg-document-preview:#f5efe4;",
        "--dsw-specific-sidebar-fill:#f6efe5;",
        "--dsw-alias-bg-skeleton:rgba(109,59,209,.10);",
        "--dsw-alias-bg-multi-select:#f0e9dc;",
        "--dsw-alias-bg-module-platform:#e9e1d2;",
        "--dsw-alias-label-primary:#241f18;",
        "--dsw-alias-label-primary-bluish:#241f18;",
        "--dsw-alias-label-primary-dimmed:#3d352a;",
        "--dsw-alias-label-primary-foreground:#faf6ef;",
        "--dsw-alias-label-primary-inverted:#e9e1d2;",
        "--dsw-alias-label-secondary:#5a5145;",
        "--dsw-alias-label-tertiary:#5f5548;",
        "--dsw-alias-label-caption:#695f50;",
        "--dsw-alias-label-dimmed:#d7cfc0;",
        "--dsw-alias-menu-icon:#5a5145;",
        "--dsw-alias-border-inverted:rgba(109,59,209,.18);",
        "--dsw-alias-border-inverted2:rgba(194,36,143,.18);",
        "--dsw-alias-border-l1:rgba(109,59,209,.16);",
        "--dsw-alias-border-l2-darkmode-thin:rgba(109,59,209,.20);",
        "--dsw-alias-border-l2:rgba(109,59,209,.24);",
        "--dsw-alias-border-l3:color-mix(in srgb,var(--csk-edge-color) var(--csk-edge-alpha),transparent);",
        "--dsw-alias-border-l4:rgba(109,59,209,.50);",
        "--dsw-elevation-stroke-color:rgba(109,59,209,.24);",
        "--dsw-alias-interactive-bg-hover:rgba(109,59,209,.08);",
        "--dsw-alias-interactive-bg-active:rgba(109,59,209,.14);",
        "--dsw-alias-interactive-bg-hover-accent:rgba(194,36,143,.10);",
        "--dsw-alias-interactive-bg-hover-solid:#f0e9dc;",
        "--dsw-alias-button-ghost-active-fill:#e9e1d2;",
        "--dsw-alias-button-ghost-active-hover:#e3d9c7;",
        "--dsw-alias-button-ghost-active-border:rgba(109,59,209,.50);",
        "--dsw-alias-button-elevated-fill:#ffffff;",
        "--dsw-alias-button-floating-fill:#ffffff;",
        "--dsw-alias-button-floating-hover:#f8f2e8;",
        "--dsw-alias-button-tool-bar-fill:rgba(255,252,246,.72);",
        "--dsw-alias-button-tool-bar-fill-invisible:rgba(255,252,246,.52);",
        "--dsw-alias-button-tool-bar-hover:rgba(231,240,250,.9);",
        "--dsw-alias-button-info-fill:#0a7f9c;",
        "--dsw-alias-button-info-hover:#0891b2;",
        "--dsw-alias-brand-primary:#0a7f9c;",
        "--dsw-alias-brand-primary-invert:#faf6ef;",
        "--dsw-alias-brand-text:#08647d;",
        "--dsw-alias-state-business-primary:#0a7f9c;",
/* --- host state semantics, matched to the skin palette --- */
"--dsw-alias-state-error-primary:#a82739;",
"--dsw-alias-state-error-secondary:#b3253c;",
"--dsw-alias-state-error-tertiary:#fbe6ea;",
"--dsw-alias-state-warn-primary:#8a6508;",
"--dsw-alias-state-warn-secondary:#a67c0a;",
"--dsw-alias-state-warn-tertiary:#fbf1dc;",
"--dsw-alias-state-warn-label:#7a5906;",
"--dsw-alias-state-success-primary:#1f7a4d;",
"--dsw-alias-state-success-secondary:#2b8f5c;",
"--dsw-alias-state-success-tertiary:#e3f3ea;",
"--dsw-alias-interactive-bg-hover-danger:rgba(179,37,60,.08);",
        "--dsw-alias-state-business-tertiary:#e8def5;",
        "--dsw-alias-link:#08647d;",
        "--dsw-focus-ring-color:#0891b2;",
        "--dsw-alias-label-deep-diving:#076b82;",
        "--dsw-alias-label-deep-diving-shimmer:#a41a74;",
        "--dsw-alias-label-shimmer:rgba(194,36,143,.45);",
        "--dsw-alias-switch-thumb:#0a7f9c;",
        "--dsw-specific-bubble:#f0e7f7;",
        "--dsw-specific-bubble-highlight:#e6dbf2;",
        "--dsw-specific-input-major:#fffcf6;",
        "--dsw-specific-login-input:#fbf6ee;",
        "--dsw-specific-selector:#f3ece0;",
        "--dsw-specific-tip:#f3ebf7;",
        "--dsw-specific-sidebar-nav-item-active:#ece2f6;",
        "--dsw-specific-sidebar-nav-item-active-accent:#ddd0ee;",
        "--dsw-specific-sidebar-nav-item-hover:#f0e9dc;",
        "--dsw-menu-surface-fill:rgba(255,252,246,.94);",
        "--dsw-specific-menu:rgba(255,252,246,.94);",
        "--dsw-alias-menu-group-header-fill:rgba(244,249,255,.96);",
        "--dsw-alias-toast-bg:#ffffff;",
        "--dsw-alias-tooltip-bg:#241f18;",
        "--dsw-alias-tooltip-key-bg:#3a332b;",
        "--dsw-alias-turn-trigger-bg:#f0e9dc;",
        "--dsw-alias-turn-trigger-bg-hover:#e9e1d2;",
        "--dsw-alias-settings-card-fill:#fffcf6;",
        "--dsw-alias-settings-card-stroke:rgba(109,59,209,.24);",
        "--dsw-alias-markdown-code-block:#f6efe4;",
        "--dsw-alias-markdown-code-block-banner:#efe7f6;",
        "--dsw-alias-markdown-code-segment-selected:#ece4f3;",
        "--dsw-alias-markdown-code-segment-unselected:#f5efe4;",
        "--dsw-alias-markdown-inline-code:#f3ece0;",
        "--dsw-alias-markdown-tag:#ece4f4;",
        "--dsw-alias-markdown-citation:#ece4f4;",
        "--dsw-alias-markdown-placeholder:#f0e9dc;",
        "--dsw-alias-bg-document-selection:rgba(190,18,60,.22);",
        "--dsw-alias-code-diff-added:rgba(22,163,74,.14);",
        "--dsw-alias-code-diff-deleted:rgba(220,38,38,.12);",
        "--dsw-alias-file-diff-added-bg:#ecfdf3;",
        "--dsw-alias-file-diff-added-gutter:#e2f7ea;",
        "--dsw-alias-file-diff-added-marker:#15803d;",
        "--dsw-alias-file-diff-deleted-bg:#fef2f2;",
        "--dsw-alias-file-diff-deleted-gutter:#fde8ea;",
        "--dsw-alias-file-diff-deleted-marker:#b91c1c;",
        "--dsw-alias-scrollbar-bg-l1:#d8cbb8;",
        "--dsw-alias-scrollbar-bg-l2:#cabca6;",
        "--dsw-alias-scrollbar-hover-l1:#bfb09a;",
        "--dsw-alias-scrollbar-hover-l2:#a89a84;",
        "--shiki-token-constant:#0e7490;",
        "--shiki-token-string:#15803d;",
        "--shiki-token-comment:#8a8073;",
        "--shiki-token-keyword:#be185d;",
        "--shiki-token-parameter:#b45309;",
        "--shiki-token-function:#6d28d9;",
        "--shiki-token-string-expression:#166534;",
        "--shiki-token-punctuation:#4a443a;",
        "--shiki-token-link:#0369a1;",
        "--dsw-static-neutral-bluish-00:#ffffff;",
        "--dsw-static-neutral-bluish-50:#fffcf6;",
        "--dsw-static-neutral-bluish-75:#f8f2e8;",
        "--dsw-static-neutral-bluish-100:#f3ece0;",
        "--dsw-static-neutral-bluish-150:#ece3d4;",
        "--dsw-static-neutral-bluish-200:#e0d6c4;",
        "--dsw-static-neutral-bluish-300:#cdc1ae;",
        "--dsw-static-neutral-bluish-400:#b3a898;",
        "--dsw-static-neutral-bluish-500:#9a8d7b;",
        "--dsw-static-neutral-bluish-600:#7b6e5e;",
        "--dsw-static-neutral-bluish-700:#5f5548;",
        "--dsw-static-neutral-bluish-750:#4d453a;",
        "--dsw-static-neutral-bluish-800:#3f372f;",
        "--dsw-static-neutral-bluish-850:#332b24;",
        "--dsw-static-neutral-bluish-875:#2a231d;",
        "--dsw-static-neutral-bluish-900:#241f18;",
        "--dsw-static-neutral-bluish-950:#241f18;",
        "--dsw-static-neutral-bluish-1000:#000000;",
        "--dsw-static-neutral-550:#8c8071;",
        "--dsw-static-neutral-600:#786c5d;",
        "--dsw-static-neutral-700:#5a5045;",
        "--dsw-static-neutral-800:#463c33;",
        "--dsw-static-neutral-850:#362e26;",
        "--dsw-static-neutral-900:#2a241e;",
        "--dsw-static-deepseek-50:#effcff;",
        "--dsw-static-deepseek-100:#d9f7ff;",
        "--dsw-static-deepseek-300:#6fd8ea;",
        "--dsw-static-deepseek-400:#0a7f9c;",
        "--dsw-static-deepseek-450:#0891b2;",
        "--dsw-static-deepseek-500:#0e7490;",
        "--dsw-static-deepseek-600:#155e75;",
        "--dsw-static-deepseek-800:#cff3f9;",
        "--dsw-static-deepseek-900:#e6f9fc;",
        "--dsw-static-blue-50:#fdf0f9;",
        "--dsw-static-blue-100:#fbe4f6;",
        "--dsw-static-blue-300:#f0a6dc;",
        "--dsw-static-blue-400:#dd7acb;",
        "--dsw-static-blue-450:#d05cbe;",
        "--dsw-static-blue-500:#b93fa8;",
        "--dsw-static-blue-600:#a02d92;",
        "--dsw-static-blue-800:#f6d9ef;",
        "--dsw-static-blue-900:#fbeaf7;",
        "--dsw-static-blue-950:#fdf3fa;",
        "--dsw-alias-bg-mask-1:rgba(36,31,24,.34);",
        "--dsw-alias-bg-mask-2:rgba(36,31,24,.22);",
        "--dsw-alias-bg-mask-3:rgba(36,31,24,.52);",
        "--dsw-alias-surface-overlay:#fffdf8;",
        "--dsw-alias-border-secondary:rgba(109,59,209,.26);",
        "--dsw-alias-bg-l2:#f5efe4;",
        "--dsw-alias-specific-menu-item-hover:rgba(109,59,209,.08);",
        "--dsw-alias-hairline:rgba(109,59,209,.28);",
        "--dsw-alias-label-quaternary:#8a8072;",
        "--dsw-alias-brand:#6d3bd1;",
        "--dsw-alias-brand-bg:rgba(109,59,209,.12);",
        "--dsw-alias-accent:#b93fa8;",
        "--dsw-alias-accent-soft:rgba(185,63,168,.14);",
        "--dsw-alias-accent-ink:#7a2468;",
        "--dsw-alias-danger:#b3253c;",
        "--dsw-alias-button-primary-fill:var(--dsw-alias-brand-primary);",
        "--dsw-alias-button-primary-hover:color-mix(in srgb,var(--dsw-alias-brand-primary) 86%,#fffdf8);",
        "--dsw-alias-button-info-label:#faf6ef;",
        "}",
        /* ---- sidebar chrome: framed rows ---- */
        /* ui-workspace: the whole 工作区/session list block. Skipped on the icon rail,
           where a frame around 36px icons would only clip.

           Geometry: the region around it carries a -12px right margin (it lets the
           session scrollbar reach the sidebar edge), so the frame pulls itself back
           by the same inset. That makes its right edge sit on the sidebar's content
           box, level with the account row in the foot. */
        "html body[data-ds-dark-theme][data-dsh-skin-on] .GAkraW_root:not(.GAkraW_rail){border:1px solid var(--dsw-alias-border-l3);border-radius:var(--dsw-radius-md);background:linear-gradient(168deg,#05081ae6 0%,#060514e6 52%,#040509e6 100%);box-shadow:inset 0 0 22px -8px #00e5ff33, 0 0 0 1px #00e5ff10;padding-left:6px;padding-right:12px;padding-top:4px;padding-bottom:6px;margin-top:2px}",
        /* The section header carries a -4px right margin tuned for the unframed edge. */
        "html body[data-dsh-skin-on] .GAkraW_root .GAkraW_sectionHeader{margin-right:0}",
        /* ui-sidebar: the foot sits centred while collapsed, but in the wide column it
           has to stretch so the account frame below spans the same box as the list. */
        "html body[data-dsh-skin-on] .wtg9ga_root:not(.wtg9ga_collapsed) .wtg9ga_footArea{align-items:stretch}",
        /* The launcher sits on the sidebar's bottom inset; match the 4px ladder above it. */
        "html body[data-dsh-skin-on] .wtg9ga_root:not(.wtg9ga_collapsed){padding-bottom:4px}",
        /* ui-settings-account: the signed-in account row at the sidebar foot.
           The foot packs the settings launcher and the account chip into one row, so
           the chip only ever drew the leftover width — visible as a frame narrower
           than the session list above it. Stack the foot on one axis and let the
           account root claim the full line, so all sidebar frames share one width. */
        "html body[data-dsh-skin-on] .wtg9ga_settingsArea{display:flex;flex-direction:column;align-items:stretch;width:100%}",
        "html body[data-dsh-skin-on] ._5Qcc8a_root{width:calc(100% - 4px);margin-left:auto;margin-right:auto;flex:0 0 auto}",
        /* ui-settings-account: the signed-in account row at the sidebar foot. */
        "html body[data-ds-dark-theme][data-dsh-skin-on] ._5Qcc8a_trigger{box-sizing:border-box;height:40px;padding:4px 6px;justify-content:center;gap:8px;border:1px solid var(--dsw-alias-border-l3);background:linear-gradient(115deg,#0b1c3f 0%,#241134 60%,#33122e 100%);box-shadow:inset 0 0 22px -8px #00e5ff33, 0 0 0 1px #00e5ff10}",
        /* The foot row reads as a settings entry, not as an account chip: the avatar
           and the signed-in name are dropped and a settings label takes their place,
           inside the very same frame. Only the label is painted here; the click
           behaviour lives in `installSettingsRow`. */
        "html body[data-dsh-skin-on] ._5Qcc8a_trigger ._5Qcc8a_avatar,html body[data-dsh-skin-on] ._5Qcc8a_trigger ._5Qcc8a_label{display:none}",
        "html body[data-ds-dark-theme][data-dsh-skin-on] ._5Qcc8a_trigger::after{content:\"设置\";font-size:14px;color:var(--dsw-alias-label-primary);letter-spacing:.02em;text-shadow:0 0 12px rgba(0,229,255,.35)}",
        "html body[data-dsh-skin-on] ._5Qcc8a_trigger[data-collapsed=true]::after{content:\"⚙\";font-size:15px}",
        /* The popover is driven programmatically (settings, sign-out) and must never
           be seen: it is hidden for the moment its pick runs, then closed. */
        "html body.dsh-skin-menu-hidden [role=\"menu\"]{opacity:0 !important;pointer-events:none !important}",
        /* Sign-out row appended to the settings account page. */
        "html body[data-ds-dark-theme][data-dsh-skin-on] #dsh-skin-signout{margin-top:12px;width:100%;height:36px;border-radius:var(--dsw-radius-md);border:1px solid color-mix(in srgb,var(--csk-danger) 32%,transparent);background:color-mix(in srgb,var(--csk-danger) 8%,transparent);color:#ff9aa8;font-size:13px;font-family:inherit;letter-spacing:.02em;cursor:pointer;transition:background .15s,border-color .15s,color .15s}",
        "html body[data-ds-dark-theme][data-dsh-skin-on] #dsh-skin-signout:hover{background:color-mix(in srgb,var(--csk-danger) 16%,transparent);border-color:color-mix(in srgb,var(--csk-danger) 52%,transparent);color:#ffbcc6}",
        /* ui-layout: frame each pane from *inside* the column.
           History of this line: a `border` is painted under the pane's children (the
           right dock's opaque surface hid it), and an `outline` is still painted
           under positioned descendants that carry a z-index (the dock panels), so
           both disappeared. A generated child with a z-index above the pane content
           is the only variant that has actually been visible on every column.
           The column itself carries the same radius plus `overflow:hidden`, so its
           square background cannot spill past the rounded frame; the frame is inset
           by 1px so that rounded clip cannot shave its corners off.
           `pointer-events:none` keeps it inert; `border:0` clears the shipped
           hairlines so exactly one line is drawn per pane. */
        "html body[data-dsh-skin-on] .mP3x-q_centerCol,html body[data-dsh-skin-on] .mP3x-q_sidebarCol{position:relative;border:0;border-radius:var(--dsw-radius-lg);overflow:hidden}",
        "html body[data-dsh-skin-on] .mP3x-q_centerCol::after,html body[data-dsh-skin-on] .mP3x-q_sidebarCol::after{content:\"\";position:absolute;inset:1px;border:1px solid var(--dsw-alias-border-l3);border-radius:calc(var(--dsw-radius-lg) - 1px);pointer-events:none;z-index:40}",

        /* Conversation surface: a dark blue-violet wash. The centre column paints
           one, and so does the conversation root, which otherwise covers the column
           with its own opaque bg-base. */
        /* The shell paints full-page views from `--dsw-alias-bg-base`. Redefine that token inside
           the center column so any view root, overlay or nested container that uses it inherits
           the column's own navy instead of the near-black the skin set globally — the flat
           `#05070f` fill is what read as a black band. */
        "html body[data-ds-dark-theme][data-dsh-skin-on] .mP3x-q_centerCol{--dsw-alias-bg-base:#070c1d;background-color:#070c1d;background-image:none;margin-top:6px;margin-bottom:6px}",
        "html body[data-dsh-skin-on] .mP3x-q_centerCol > *{background-color:transparent!important}",
        "html body[data-dsh-skin-on] .mP3x-q_centerCol [class$=\"_page\"],html body[data-dsh-skin-on] .mP3x-q_centerCol [class$=\"_view\"],html body[data-dsh-skin-on] .mP3x-q_centerCol [class$=\"-root\"]{background-color:transparent!important}",
        /* Full-page views (plugin manager, market, settings) put an opaque
           `--dsw-alias-bg-base` strip behind their sticky header so scrolled content hides
           underneath. That strip is now the same flat colour as the column (the wash moved to
           the conversation root), so no seam remains and the strip can stay fully opaque. */
        /* The host also draws a hairline under the condensed header:
             [data-natural][data-compact]:after{border-bottom:.5px solid var(--dsw-alias-border-l3)}
           i.e. a line in the skin's accent colour. On request it is removed rather than
           dimmed — the flat fill change already marks the header edge. */
        "html body[data-dsh-skin-on] .mP3x-q_centerCol [class*=\"pageBar\"][data-natural][data-compact]:after{border-bottom-color:transparent!important}",
        /* The composer seat ships with a fade to the opaque base colour, which hid
           the lower half of the conversation wash. Drop that fill entirely so the
           gradient runs under the input card; the selector out-specifies the
           shipped [data-phase=active] variant. */
        "html body[data-dsh-skin-on] .an3WzG_root .an3WzG_composerSeat{background:transparent}",
        /* The composer card itself is styled in the "cyberpunk composer" block below,
           which supersedes the plain frosted fill this skin started with. */
        /* Frosted dock readings: the three chips under the composer ride the same glass as the card. */
        "html body[data-ds-dark-theme][data-dsh-skin-on] [data-composer-dock] [data-composer-stat]>button,html body[data-ds-dark-theme][data-dsh-skin-on] [data-composer-dock] [data-composer-stat]>span,html body[data-ds-dark-theme][data-dsh-skin-on] [data-composer-dock]>span:not([data-composer-stat])>button{background:color-mix(in srgb,#0a1020 58%,transparent);backdrop-filter:blur(10px) saturate(150%);-webkit-backdrop-filter:blur(10px) saturate(150%);border:1px solid color-mix(in srgb,var(--csk-accent) 13%,transparent);border-radius:999px;box-shadow:0 2px 10px rgba(0,0,0,.32),inset 0 1px 0 rgba(255,252,246,.04);padding:2px 14px}",
        "html body[data-ds-dark-theme][data-dsh-skin-on] [data-composer-dock] [data-composer-stat]>button:hover,html body[data-ds-dark-theme][data-dsh-skin-on] [data-composer-dock]>span:not([data-composer-stat])>button:hover{background:color-mix(in srgb,#0a1020 38%,transparent);border-color:color-mix(in srgb,var(--csk-accent) 32%,transparent);color:var(--dsw-alias-label-primary)}",
        "html body[data-ds-dark-theme][data-dsh-skin-on] [data-composer-dock] [data-composer-stat]>button[aria-expanded=true],html body[data-ds-dark-theme][data-dsh-skin-on] [data-composer-dock]>span:not([data-composer-stat])>button[aria-expanded=true]{border-color:color-mix(in srgb,var(--csk-accent) 46%,transparent);box-shadow:0 0 0 1px color-mix(in srgb,var(--csk-accent) 18%,transparent),0 2px 12px rgba(0,229,255,.18)}",
        /* ---- cyberpunk composer ---- */
        /* A darker glass slab than the rest of the chrome, with a dual-tone edge,
           a faint interior wash and two bracket corners. The ring steps up on hover
           and again while the field holds focus, so the input reads as the live
           surface of the page without flooding it in cyan. */
        "html body[data-ds-dark-theme][data-dsh-skin-on] [data-composer-card]{position:relative;isolation:isolate;background:linear-gradient(158deg,color-mix(in srgb,#0a1526 66%,transparent) 0%,color-mix(in srgb,#070a16 62%,transparent) 58%,color-mix(in srgb,#0b0a1e 60%,transparent) 100%);backdrop-filter:blur(14px) saturate(160%);-webkit-backdrop-filter:blur(14px) saturate(160%);box-shadow:0 0 0 1px color-mix(in srgb,var(--csk-accent) 14%,transparent),0 0 12px -10px rgba(0,229,255,.28),0 20px 44px -30px #000,inset 0 1px 0 rgba(255,252,246,.05),inset 0 0 20px -18px rgba(0,229,255,.3);transition:box-shadow .22s ease}",
        "html body[data-ds-dark-theme][data-dsh-skin-on] [data-composer-card]:hover{box-shadow:0 0 0 1px color-mix(in srgb,var(--csk-accent) 20%,transparent),0 0 14px -9px rgba(0,229,255,.3),0 20px 44px -30px #000,inset 0 1px 0 rgba(255,252,246,.06),inset 0 0 24px -18px rgba(0,229,255,.38)}",
        "html body[data-ds-dark-theme][data-dsh-skin-on] [data-composer-card]:focus-within{box-shadow:0 0 0 1px color-mix(in srgb,var(--csk-accent-bright) 30%,transparent),0 0 18px -8px rgba(0,229,255,.36),0 20px 44px -30px #000,inset 0 0 26px -16px rgba(0,229,255,.45)}",
        "html body[data-ds-dark-theme][data-dsh-skin-on] [data-composer-card]::before{content:\"\";position:absolute;inset:4px;pointer-events:none;border-radius:inherit;background:linear-gradient(var(--csk-accent-bright),var(--csk-accent-bright)) left top/16px 1px no-repeat,linear-gradient(var(--csk-accent-bright),var(--csk-accent-bright)) left top/1px 16px no-repeat,linear-gradient(var(--csk-accent-violet),var(--csk-accent-violet)) right bottom/16px 1px no-repeat,linear-gradient(var(--csk-accent-violet),var(--csk-accent-violet)) right bottom/1px 16px no-repeat;opacity:.38;z-index:0}",
        "html body[data-ds-dark-theme][data-dsh-skin-on] [data-composer-card]::after{content:\"\";position:absolute;left:14px;right:14px;top:0;height:1px;pointer-events:none;background:linear-gradient(90deg,transparent,color-mix(in srgb,var(--csk-accent-bright) 42%,transparent) 18%,color-mix(in srgb,var(--csk-accent-violet) 38%,transparent) 82%,transparent);opacity:.32;z-index:0}",
        "html body[data-ds-dark-theme][data-dsh-skin-on] [data-composer-card] textarea,html body[data-ds-dark-theme][data-dsh-skin-on] [data-composer-card] [data-composer-input]{caret-color:#39e8ff}",
        "html body[data-ds-dark-theme][data-dsh-skin-on] [data-composer-card] textarea::placeholder,html body[data-ds-dark-theme][data-dsh-skin-on] [data-composer-card] [data-composer-placeholder]{color:color-mix(in srgb,#7fd8ef 62%,transparent)}",
        /* The right pane is not a box in the column system: its occupant is an
           absolutely positioned surface anchored to the frame's right edge
           (docs: "a track, not a box"), owns an inline width, and hangs left
           whenever the track is narrower than the panel.

           It carries no frame of its own: the pane is delimited by the 6px gutter
           strip painted on the right column (see below) on the inside and by the
           window edge on the outside. That keeps the right pane visually lighter
           than the framed conversation column, and means there is no border here
           that could collide with the gutter.

           Only geometry is set here: the pane is inset 6px from the top, bottom and
           right so the gutter shows on all three sides, and its width gives back
           the left 6px so it starts at the column's own edge. */
        "html body[data-dsh-skin-on] .acoR2W_panel{box-sizing:border-box;top:6px;bottom:6px;right:6px;max-width:calc(100% - 6px);border-radius:var(--dsw-radius-lg);overflow:clip}",
        /* The pane frame is back — and now it is safe: the dock's own hairline and
           shadow are blanked above, so this is the only line in the right column.
           Inset 1px with a matching radius reduction keeps the rounded corners from
           being shaved off by the panel's own `overflow: clip`. */
        "html body[data-dsh-skin-on] .acoR2W_panel[data-sidebar-right-open]::after{content:\"\";position:absolute;inset:1px;border:1px solid var(--dsw-alias-border-l3);border-radius:calc(var(--dsw-radius-lg) - 1px);pointer-events:none;z-index:40}",
        /* The dock still paints its own drag divider along the pane's left edge;
           with no frame around the pane that line reads as a leftover border. Keep
           the element (it owns the resize affordance) and drop its paint. */
        "html body[data-dsh-skin-on] .acoR2W_panel [data-dockkit-divider]{background:0 0;border:0;box-shadow:none}",
        /* Column resize handles draw a 1px rule through their ::after; with the panes
           framed by their own borders that rule is a second, stray line in the seam.
           Blank the paint and keep the element, so dragging still works. */
        "html body[data-dsh-skin-on] .mP3x-q_handle{background:0 0}",
        "html body[data-dsh-skin-on] .mP3x-q_handle::after{background:0 0 !important;opacity:0 !important}",
        /* The dock pane itself paints a hairline on its left edge (measured
           border-left: 0.667px on `section[data-dockkit-pane]`). The frame is inset 1px from the pane
           edge, so the pane's own hairline would sit just inside it as a second line:
           blank it and let the frame and the 6px gutter do the separating. */
        "html body[data-dsh-skin-on] .acoR2W_panel [data-dockkit-pane],html body[data-dsh-skin-on] .acoR2W_panel [data-dockkit-float],html body[data-dsh-skin-on] .acoR2W_panel [data-dockkit-host]{border-left:0 !important;box-shadow:none !important}",
        /* ui-layout: gutters between the three panes and below the window chrome.
           A 6px column gap stops neighbouring borders from fusing into one seam,
           and the frame's own fill is darkened so the gutters read as seams rather
           than as empty space. The column margins do the same at the top (under the
           titlebar / window edge) and at the bottom; only the left column also gets
           an outer margin, because the right panel is anchored to the frame edge. */
        "html body[data-ds-dark-theme][data-dsh-skin-on] .mP3x-q_frame{column-gap:6px;background:#071029}",
        "html body[data-ds-dark-theme][data-dsh-skin-on] .mP3x-q_rightbarCol{background:#071029}",
        /* The separator band between the conversation column and the right pane is
           drawn *in the gap itself*: the right column paints a strip just outside its
           left edge (the 6px column gap), gated on the pane being open. Painting it
           here — not as the panel's own border — is what makes it sit between the two
           frames instead of hugging one of them. */
        "html body[data-ds-dark-theme][data-dsh-skin-on] .mP3x-q_frame:not([data-rightbar-collapsed]) .mP3x-q_rightbarCol::before{content:\"\";position:absolute;left:-6px;top:6px;bottom:6px;width:6px;background:#071029;pointer-events:none;z-index:30}",
        "html body[data-dsh-skin-on] .mP3x-q_sidebarCol{margin:6px 0 6px 6px}",
        /* One consistent right edge for the three sidebar strips: the new-session
           button, the session list block and the account row all stop 8px short of
           the sidebar content box, so their frames line up instead of stepping. */
              /* The three strips live in different parents: the session list sits in
           `regionArea`, which the shell pulls 12px past the sidebar content box so a
           scrollbar can reach the edge, while the new-session button and the account
           row sit in the root padding box. Per-element margins and widths cannot
           reconcile that (the account row is a `flex:1` item, so its width is
           flex-basis driven). Cancel the region overhang and add nothing else: all
           three then stretch across the very same content box, which is what makes
           them equal in width and centred in the column. */
        "html body[data-dsh-skin-on] .wtg9ga_regionArea{margin-left:0;margin-right:0;padding-left:0;padding-right:0}",
        /* The sidebar field's centring and the footer slot's inset are applied from measurements
           at runtime (installColumnAlign): the host's gutters differ per window width and per
           scrollbar presence, so any fixed inset here is wrong at some size. */
        /* New-session button: the one saturated surface in the sidebar, so it reads as
           the primary action. Blue -> violet -> magenta, with a matching hover step
           (the shipped hover rule is out-specified, so it is restated here). */
        "html body[data-ds-dark-theme][data-dsh-skin-on] .wtg9ga_newSession{background:linear-gradient(115deg,#072a45 0%,#0a3a58 50%,#0d5a5c 100%);color:#eafcff;box-shadow:0 8px 20px -18px #0a3a58cc}",
        "html body[data-ds-dark-theme][data-dsh-skin-on] .wtg9ga_newSession:hover{background:linear-gradient(115deg,#0a3554 0%,#0e4a6c 50%,#12757a 100%)}",
        /* Selected session row: a cyan edge plus a left accent bar, so the active reading stands out from hover. */
        "html body[data-ds-dark-theme][data-dsh-skin-on] .wnFoaW_sessionRow.wnFoaW_selected,html body[data-ds-dark-theme][data-dsh-skin-on] .wnFoaW_projectRow.wnFoaW_selected{background:linear-gradient(90deg,color-mix(in srgb,var(--csk-accent) 7%,transparent) 0%,color-mix(in srgb,#5b2bd6 5%,transparent) 55%,transparent 100%);box-shadow:inset 0 0 0 1px color-mix(in srgb,var(--csk-accent) 20%,transparent),inset 2px 0 0 0 color-mix(in srgb,var(--csk-accent) 52%,transparent),0 0 12px -7px rgba(0,229,255,.28);color:#dcecf5}",
        "html body[data-ds-dark-theme][data-dsh-skin-on] .wnFoaW_sessionRow.wnFoaW_selected:hover,html body[data-ds-dark-theme][data-dsh-skin-on] .wnFoaW_projectRow.wnFoaW_selected:hover{background:linear-gradient(90deg,color-mix(in srgb,var(--csk-accent) 11%,transparent) 0%,color-mix(in srgb,#5b2bd6 7%,transparent) 55%,transparent 100%);box-shadow:inset 0 0 0 1px color-mix(in srgb,var(--csk-accent) 30%,transparent),inset 2px 0 0 0 color-mix(in srgb,var(--csk-accent) 68%,transparent),0 0 13px -7px rgba(0,229,255,.36)}",
        /* Workspace row that contains the current session: the folder icon carries the only state fact,
   so scripts/mark-views.js marks the row with data-dsh-folder and the edge keys off that. */
        "html body[data-ds-dark-theme][data-dsh-skin-on] .wnFoaW_projectRow[data-dsh-folder='active']{background:linear-gradient(90deg,color-mix(in srgb,var(--csk-accent-violet-deep) 16%,transparent) 0%,color-mix(in srgb,#3a1e78 10%,transparent) 60%,transparent 100%);box-shadow:inset 0 0 0 1px color-mix(in srgb,#8a5cff 20%,transparent),inset 2px 0 0 0 color-mix(in srgb,#7d4be0 46%,transparent);color:#dcd2f2}",
        "html body[data-ds-dark-theme][data-dsh-skin-on] .wnFoaW_projectRow[data-dsh-folder='active']:hover{background:linear-gradient(90deg,color-mix(in srgb,#7a48ee 22%,transparent) 0%,color-mix(in srgb,#3a1e78 14%,transparent) 60%,transparent 100%);box-shadow:inset 0 0 0 1px color-mix(in srgb,#9b72ff 30%,transparent),inset 2px 0 0 0 color-mix(in srgb,#8f5cff 66%,transparent)}",
        "html body[data-ds-dark-theme][data-dsh-skin-on] .wnFoaW_projectRow[data-dsh-folder='active'] .wnFoaW_folderActive{color:#b48cff;filter:drop-shadow(0 0 5px rgba(138,92,255,.35))}",
        /* ---- session list hierarchy ---- */
        /* Workspace rows read as the level-0 heading (lit from above, hairline
           underneath); session rows sit inside them as recessed children, pulled in
           another 6px and marked by a spine on their left that tracks the depth CSS
           variable the list already ships. */
        "html body[data-ds-dark-theme][data-dsh-skin-on] .wnFoaW_projectRow{background:linear-gradient(180deg,color-mix(in srgb,var(--csk-accent) 6%,transparent),transparent 92%);box-shadow:inset 0 1px 0 rgba(255,252,246,.05),inset 0 -1px 0 color-mix(in srgb,var(--csk-accent) 8%,transparent)}",
        "html body[data-ds-dark-theme][data-dsh-skin-on] .wnFoaW_projectRow:hover:not(.wnFoaW_selected){background:linear-gradient(180deg,color-mix(in srgb,var(--csk-accent) 10%,transparent),color-mix(in srgb,var(--csk-accent-violet-deep) 7%,transparent))}",
        "html body[data-ds-dark-theme][data-dsh-skin-on] .wnFoaW_sessionRow{position:relative;overflow:clip;padding-inline-start:calc(14px + var(--dsh-workspace-indent,0px));background:linear-gradient(180deg,color-mix(in srgb,#04070f 34%,transparent),color-mix(in srgb,#04070f 18%,transparent))}",
        "html body[data-ds-dark-theme][data-dsh-skin-on] .wnFoaW_sessionRow:hover:not(.wnFoaW_selected){background:linear-gradient(90deg,color-mix(in srgb,var(--csk-accent) 6%,transparent),color-mix(in srgb,var(--csk-accent-violet-deep) 4%,transparent))}",
        "html body[data-ds-dark-theme][data-dsh-skin-on] .wnFoaW_sessionRow::before{content:\"\";position:absolute;top:4px;bottom:4px;left:calc(6px + var(--dsh-workspace-indent,0px));width:1px;border-radius:1px;background:linear-gradient(180deg,color-mix(in srgb,var(--csk-accent) 28%,transparent),color-mix(in srgb,var(--csk-accent-violet-deep) 24%,transparent));opacity:.45;pointer-events:none;transition:opacity .18s ease,width .18s ease}",
        "html body[data-ds-dark-theme][data-dsh-skin-on] .wnFoaW_sessionRow:hover::before{opacity:.85;background:linear-gradient(180deg,color-mix(in srgb,var(--csk-accent-bright) 70%,transparent),color-mix(in srgb,var(--csk-accent-violet) 52%,transparent))}",
        "html body[data-ds-dark-theme][data-dsh-skin-on] .wnFoaW_sessionRow.wnFoaW_selected::before{opacity:1;width:2px;background:linear-gradient(180deg,var(--csk-accent-bright),var(--csk-accent-violet));box-shadow:0 0 8px rgba(34,232,255,.55)}",
        /* The selected row is alive: the frame breathes and a light band sweeps
           across it, both switched off under prefers-reduced-motion. */
        "@keyframes dshSkinBreath{0%,100%{box-shadow:inset 0 0 0 1px color-mix(in srgb,#00e5ff 18%,transparent),inset 2px 0 0 0 color-mix(in srgb,#00e5ff 46%,transparent),0 0 10px -7px rgba(0,229,255,.22)}50%{box-shadow:inset 0 0 0 1px color-mix(in srgb,#00e5ff 36%,transparent),inset 2px 0 0 0 color-mix(in srgb,#9ff6ff 92%,transparent),0 0 18px -4px rgba(0,229,255,.6)}}",
        "@keyframes dshSkinSweep{0%{transform:translateX(-130%)}60%,100%{transform:translateX(230%)}}",
        "html body[data-dsh-skin-on] .wnFoaW_sessionRow.wnFoaW_selected{animation:dshSkinBreath 3.4s ease-in-out infinite}",
        "html body[data-ds-dark-theme][data-dsh-skin-on] .wnFoaW_sessionRow.wnFoaW_selected::after{content:\"\";position:absolute;inset:1px;border-radius:inherit;pointer-events:none;background:linear-gradient(100deg,transparent 42%,color-mix(in srgb,var(--csk-accent-bright) 16%,transparent) 50%,transparent 58%);mix-blend-mode:screen;animation:dshSkinSweep 4.6s ease-in-out infinite}",
        "@media (prefers-reduced-motion: reduce){html body[data-dsh-skin-on] .wnFoaW_sessionRow[data-dsh-state=\"running\"]::before{animation:none !important;opacity:1 !important}html body[data-dsh-skin-on] .wnFoaW_sessionRow.wnFoaW_selected{animation:none !important}html body[data-dsh-skin-on] .wnFoaW_sessionRow.wnFoaW_selected::after{animation:none !important;display:none !important}html body[data-dsh-skin-on] .mP3x-q_centerCol::after{animation:none !important}}",
        /* Sidebar panel rows (Plugins among them): the selected/expanded row gets a
           pink wash plus a 2px left accent, instead of the neutral hover fill. */
        "html body[data-ds-dark-theme][data-dsh-skin-on] .wtg9ga_panelRow.wtg9ga_panelActive,html body[data-ds-dark-theme][data-dsh-skin-on] .wtg9ga_panelRow[aria-expanded=true]{background:color-mix(in srgb,#ff4fb8 9%,transparent);color:#f0c4dc;box-shadow:inset 2px 0 0 #ff4fb899}",
        /* The panel-button group gets the same frame as the strips below it, so the
           sidebar reads as a stack of framed blocks rather than loose rows. */
        "html body[data-ds-dark-theme][data-dsh-skin-on] .wtg9ga_panelList{border:1px solid var(--dsw-alias-border-l3);border-radius:var(--dsw-radius-md);padding:4px;box-shadow:inset 0 0 22px -8px #00e5ff33, 0 0 0 1px #00e5ff10}",
        /* ---- transcript + message frames ---- */
        /* The message column keeps a cyan bloom at the top and a soft darkening at the
           edges. It is painted on the center column, not on the scrolling transcript:
           a background on a scroll container travels with its content in this app, so
           anchoring it one level up is what keeps the gradient still while text moves. */
        "html body[data-ds-dark-theme][data-dsh-skin-on] .an3WzG_root{background-image:radial-gradient(130% 62% at 50% 0%,rgba(0,229,255,.06),transparent 74%),linear-gradient(180deg,rgba(4,10,20,.4),rgba(4,6,14,.1) 60%,rgba(4,6,14,.4)),linear-gradient(168deg,#070c1d 0%,#08071a 52%,#05060e 100%)}",
        /* The wash lives on the conversation root, not on the column: full-page views (plugin
           manager, market, settings) mount their own opaque `--dsw-alias-bg-base` header strip
           inside the column, so any gradient on the column itself stops dead at that strip and
           always reads as a colour break. Flat column + washed chat keeps one continuous fill
           per view and lets those pages line up with the shell's own scrim. */
        "html body[data-dsh-skin-on] .V4vHZW_scroll{background-image:none}",
        /* The conversation header (title row + view tabs) used to sit straight on the wash with
           nothing but a hairline under it, so it read as the top of the transcript rather than a
           bar of its own. Give it its own pane: surface colour at 62% so the wash shows through,
           a backdrop blur for the frosted look, a stronger line underneath and a thin top
           highlight for the glass edge. Everything is token-driven, so both themes follow. */
        "html body[data-dsh-skin-on] .an3WzG_header{position:absolute;top:8px;left:0;right:0;margin-inline:auto;width:min(calc(100% - 2 * (var(--dsh-composer-side-clearance,0px) + 16px)),var(--dsh-chat-content-width,748px));z-index:30;border:0.5px solid color-mix(in srgb,var(--dsw-alias-border-l3) 55%,transparent);border-radius:14px;background:color-mix(in srgb,var(--dsw-alias-bg-base) 70%,transparent);backdrop-filter:blur(18px) saturate(140%);box-shadow:inset 0 1px 0 rgba(255,255,255,.07),0 8px 24px -12px rgba(0,0,0,.45)}",
        /* The glass pane simply sits on top of the message area: no top padding is reserved, so
           the transcript runs the full height of the pane and scrolls underneath the card. The
           measured height reserves room at the top of the scroller (`padding-top`) and also feeds
           `scroll-padding-top`, so the first message starts below the card and the transcript
           still slides underneath it while scrolling
           and keyboard focus from parking a line behind the glass. */
        "html body[data-dsh-skin-on] .an3WzG_root .V4vHZW_scroll{scroll-padding-top:calc(var(--csk-header-h,76px) + 8px);padding-top:calc(var(--csk-header-h,76px) + 8px)}",
"html body[data-dsh-skin-on] .an3WzG_viewArea[data-dsh-view='pane']{padding-top:calc(var(--csk-header-h,76px) + 8px)}",
        /* Assistant turns get a hairline rail so they read as HUD readouts next to
           the user's cut-corner bubble. */
        "html body[data-dsh-skin-on] .V4vHZW_flowItem[data-chat-flow-kind='assistant-step']{position:relative}",
        "html body[data-ds-dark-theme][data-dsh-skin-on] .V4vHZW_flowItem[data-chat-flow-kind='assistant-step']::before{content:\"\";position:absolute;left:-11px;top:6px;bottom:6px;width:1px;border-radius:1px;background:linear-gradient(180deg,color-mix(in srgb,var(--csk-accent-bright) 48%,transparent),color-mix(in srgb,var(--csk-accent-violet) 24%,transparent) 55%,transparent);pointer-events:none}",
        /* User bubble: cut corners, dual-tone glass and a corner tick, the one shape
           in the transcript that is obviously ours. */
        "html body[data-ds-dark-theme][data-dsh-skin-on] [data-message-bubble]{position:relative;background:linear-gradient(140deg,color-mix(in srgb,var(--csk-accent) 11%,transparent),color-mix(in srgb,var(--csk-accent-violet-deep) 15%,transparent));border-radius:12px 3px 12px 3px;box-shadow:0 0 0 1px color-mix(in srgb,var(--csk-accent-bright) 26%,transparent),0 10px 24px -20px #000,inset 0 1px 0 rgba(255,252,246,.06),inset 0 0 18px -12px rgba(0,229,255,.4)}",
        "html body[data-ds-dark-theme][data-dsh-skin-on] [data-message-bubble]::after{content:\"\";position:absolute;right:7px;top:7px;width:12px;height:1px;background:color-mix(in srgb,var(--csk-accent-violet) 75%,transparent);box-shadow:0 0 6px rgba(160,107,255,.6);pointer-events:none}",
        /* ---- settings surface (HUD) ---- */
        /* The settings page gets a 90% opaque wash so the grid below it stays legible,
           four bracket corners and a fading grid: the page reads as a HUD console. */
        "html body[data-ds-dark-theme][data-dsh-skin-on] [data-dsh-skin-settings]{position:relative;isolation:isolate;background:linear-gradient(168deg,color-mix(in srgb,#070c1d 90%,transparent),color-mix(in srgb,#0a0718 90%,transparent)) !important;box-shadow:0 0 0 1px color-mix(in srgb,var(--csk-accent) 18%,transparent),0 0 70px -40px rgba(0,229,255,.45),inset 0 0 140px -80px rgba(0,229,255,.35)}",
        "html body[data-ds-dark-theme][data-dsh-skin-on] [data-dsh-skin-settings]::before{content:\"\";position:absolute;inset:0;pointer-events:none;z-index:0;background-image:linear-gradient(color-mix(in srgb,var(--csk-accent) 5%,transparent) 1px,transparent 1px),linear-gradient(90deg,color-mix(in srgb,var(--csk-accent) 4%,transparent) 1px,transparent 1px);background-size:36px 36px,36px 36px;mask-image:radial-gradient(130% 90% at 50% 0%,#000 25%,transparent 88%);-webkit-mask-image:radial-gradient(130% 90% at 50% 0%,#000 25%,transparent 88%)}",
        "html body[data-ds-dark-theme][data-dsh-skin-on] [data-dsh-skin-settings]::after{content:\"\";position:absolute;inset:10px;pointer-events:none;z-index:0;background:linear-gradient(var(--csk-accent-bright),var(--csk-accent-bright)) left top/18px 1px no-repeat,linear-gradient(var(--csk-accent-bright),var(--csk-accent-bright)) left top/1px 18px no-repeat,linear-gradient(var(--csk-accent-violet),var(--csk-accent-violet)) right top/18px 1px no-repeat,linear-gradient(var(--csk-accent-violet),var(--csk-accent-violet)) right top/1px 18px no-repeat,linear-gradient(var(--csk-accent-bright),var(--csk-accent-bright)) left bottom/18px 1px no-repeat,linear-gradient(var(--csk-accent-bright),var(--csk-accent-bright)) left bottom/1px 18px no-repeat,linear-gradient(var(--csk-accent-violet),var(--csk-accent-violet)) right bottom/18px 1px no-repeat,linear-gradient(var(--csk-accent-violet),var(--csk-accent-violet)) right bottom/1px 18px no-repeat;opacity:.45}",
        "html body[data-ds-dark-theme][data-dsh-skin-on] .dsh-skin-hudchip{position:absolute;right:24px;bottom:14px;z-index:2;font:600 10px/1 ui-monospace,Consolas,monospace;letter-spacing:.2em;color:#7fe9ff;opacity:.7;pointer-events:none;text-shadow:0 0 10px rgba(0,229,255,.6)}",
        /* ---- small flourishes ---- */
              /* Code blocks: a brighter fill than before plus an explicit hairline, so the
           block reads as a surface even where the conversation wash is dark. */
        "html body[data-ds-dark-theme][data-dsh-skin-on] .NYOO6G_code{border:1px solid #00e5ff26;border-radius:var(--dsw-radius-md);overflow:hidden}",
  "html body[data-ds-dark-theme][data-dsh-skin-on] ::selection{background:color-mix(in srgb,#8c0f28 50%,transparent);color:#fff4f6;-webkit-text-stroke:.4px color-mix(in srgb,#ff8fa3 65%,transparent);text-shadow:0 0 6px rgba(255,77,109,.35)}",
        "html body[data-ds-dark-theme][data-dsh-skin-on] a[href]{text-shadow:0 0 10px rgba(0,229,255,.35)}",
        "html body[data-ds-dark-theme][data-dsh-skin-on] ::-webkit-scrollbar-thumb{box-shadow:inset 0 0 6px rgba(0,229,255,.35)}",
        /* Force-refresh button injected into the conversation title bar. */
      
        "#dsh-skin-refresh{position:fixed;right:148px;top:0;height:var(--dsh-windows-titlebar-height,32px);display:inline-flex;align-items:center;padding:0 10px;font:12px/1 \"Segoe UI\",\"Microsoft YaHei\",sans-serif;letter-spacing:.02em;color:var(--dsw-alias-label-secondary);background:transparent;border:0;border-radius:6px;cursor:pointer;pointer-events:auto;-webkit-app-region:no-drag;z-index:2147483000}",
        "html body[data-ds-dark-theme][data-dsh-skin-on] #dsh-skin-refresh:hover{background:color-mix(in srgb,var(--csk-accent) 12%,transparent);color:#bfefff}",
        "html body[data-dsh-skin-on] #dsh-skin-refresh:active{opacity:.65}",
        /* Header rules are drawn edge to edge by the shipped styles, so they run into
           the framed column corners and look like they poke out of the frame. Replace
           the conversation header's bottom border with an inset hairline, and drop the
           equivalent rule inside the right dock so both panes stay "one piece". */
        /* The floating card draws its own outline, so the old full-width hairline under the
           header is switched off rather than left to double up with the border. */
        "html body[data-dsh-skin-on] .an3WzG_header::after{content:none}",
        "html body[data-dsh-skin-on] .acoR2W_panel ._4EiRdG_header{border-bottom:0;position:relative}",
        "html body[data-dsh-skin-on] .acoR2W_panel ._4EiRdG_header::after{content:\"\";position:absolute;left:12px;right:12px;bottom:0;height:1px;background:var(--dsw-alias-border-l3);pointer-events:none}",
        "html body[data-dsh-skin-on] .acoR2W_panel .mOxcpG_split{border:0 !important}",
        "html body[data-dsh-skin-on] .acoR2W_panel .mOxcpG_chevron{border-left:0 !important}",
        "html body[data-dsh-skin-on] .acoR2W_panel ._block_7gxqk_4{border:0 !important}",
        "html body[data-dsh-skin-on] .acoR2W_panel ._3R73eq_header{border-bottom:0 !important;position:relative}",
        "html body[data-dsh-skin-on] .acoR2W_panel ._3R73eq_header::after{content:\"\";position:absolute;left:12px;right:12px;bottom:0;height:1px;background:var(--dsw-alias-border-l3);pointer-events:none}",
        "html body:not([data-ds-dark-theme])[data-dsh-skin-on] .mP3x-q_frame{column-gap:6px;background:var(--csk-frame)}",
        "html body:not([data-ds-dark-theme])[data-dsh-skin-on] .mP3x-q_rightbarCol{background:var(--csk-frame)}",
        "html body:not([data-ds-dark-theme])[data-dsh-skin-on] .mP3x-q_frame:not([data-rightbar-collapsed]) .mP3x-q_rightbarCol::before{content:\"\";position:absolute;left:-6px;top:6px;bottom:6px;width:6px;background:var(--csk-frame);pointer-events:none;z-index:30}",
        "html body:not([data-ds-dark-theme])[data-dsh-skin-on] .GAkraW_root:not(.GAkraW_rail){border:1px solid var(--csk-line);border-radius:var(--dsw-radius-md);background:linear-gradient(168deg,rgba(255,252,245,.97) 0%,rgba(248,241,231,.97) 52%,rgba(241,232,219,.97) 100%);box-shadow:inset 0 0 22px -8px var(--csk-glow),0 0 0 1px var(--csk-line-soft);padding-left:6px;padding-right:12px;padding-top:4px;padding-bottom:6px;margin-top:2px}",
        "html body:not([data-ds-dark-theme])[data-dsh-skin-on] .wtg9ga_panelList{border:1px solid var(--csk-line);border-radius:var(--dsw-radius-md);padding:4px;box-shadow:inset 0 0 22px -8px var(--csk-glow),0 0 0 1px var(--csk-line-soft)}",
        "html body:not([data-ds-dark-theme])[data-dsh-skin-on] ._5Qcc8a_trigger{box-sizing:border-box;height:40px;padding:4px 6px;justify-content:center;gap:8px;border:1px solid var(--csk-line);background:linear-gradient(115deg,#f8eefb 0%,#f1e7f8 60%,#fbedf3 100%);box-shadow:inset 0 0 22px -8px var(--csk-glow),0 0 0 1px var(--csk-line-soft)}",
        "html body:not([data-ds-dark-theme])[data-dsh-skin-on] ._5Qcc8a_trigger::after{content:\"设置\";font-size:14px;color:var(--csk-ink);letter-spacing:.02em}",
        "html body:not([data-ds-dark-theme])[data-dsh-skin-on] ._5Qcc8a_trigger[data-collapsed=true]::after{content:\"⚙\";font-size:15px}",
        "html body:not([data-ds-dark-theme])[data-dsh-skin-on] .wtg9ga_newSession{background:linear-gradient(115deg,#0b6a7c 0%,#0d7890 50%,#0e7f95 100%);color:#f2feff;box-shadow:0 8px 20px -18px rgba(14,116,144,.55)}",
        "html body:not([data-ds-dark-theme])[data-dsh-skin-on] .wtg9ga_newSession:hover{background:linear-gradient(115deg,#0b6b85 0%,#0d8199 50%,#0f9298 100%)}",
        "html body:not([data-ds-dark-theme])[data-dsh-skin-on] .wnFoaW_projectRow{background:linear-gradient(180deg,rgba(109,59,209,.10),transparent 92%);box-shadow:inset 0 1px 0 rgba(255,252,246,.9),inset 0 -1px 0 var(--csk-line-soft)}",
        "html body:not([data-ds-dark-theme])[data-dsh-skin-on] .wnFoaW_projectRow:hover:not(.wnFoaW_selected){background:linear-gradient(180deg,rgba(109,59,209,.15),rgba(109,59,209,.09))}",
        "html body:not([data-ds-dark-theme])[data-dsh-skin-on] .wnFoaW_sessionRow{background:linear-gradient(180deg,rgba(234,224,207,.55),rgba(234,224,207,.30))}",
        "html body:not([data-ds-dark-theme])[data-dsh-skin-on] .wnFoaW_sessionRow:hover:not(.wnFoaW_selected){background:linear-gradient(90deg,rgba(109,59,209,.10),rgba(109,59,209,.07))}",
        "html body:not([data-ds-dark-theme])[data-dsh-skin-on] .wnFoaW_sessionRow.wnFoaW_selected,html body:not([data-ds-dark-theme])[data-dsh-skin-on] .wnFoaW_projectRow.wnFoaW_selected{background:linear-gradient(90deg,rgba(109,59,209,.16) 0%,rgba(109,59,209,.13) 55%,transparent 100%);box-shadow:inset 0 0 0 1px rgba(109,59,209,.34),inset 2px 0 0 0 rgba(109,59,209,.70),0 0 12px -7px rgba(109,59,209,.28);color:#241f18}",
        "html body:not([data-ds-dark-theme])[data-dsh-skin-on] .wnFoaW_sessionRow.wnFoaW_selected:hover,html body:not([data-ds-dark-theme])[data-dsh-skin-on] .wnFoaW_projectRow.wnFoaW_selected:hover{background:linear-gradient(90deg,rgba(109,59,209,.22) 0%,rgba(109,59,209,.18) 55%,transparent 100%);box-shadow:inset 0 0 0 1px rgba(109,59,209,.48),inset 2px 0 0 0 rgba(109,59,209,.85),0 0 13px -7px rgba(109,59,209,.36)}",
        "html body:not([data-ds-dark-theme])[data-dsh-skin-on] .wnFoaW_projectRow[data-dsh-folder='active']{background:linear-gradient(90deg,rgba(109,59,209,.17) 0%,rgba(109,59,209,.10) 60%,transparent 100%);box-shadow:inset 0 0 0 1px rgba(109,59,209,.30),inset 2px 0 0 0 rgba(109,59,209,.60);color:#2a1a4d}",
        "html body:not([data-ds-dark-theme])[data-dsh-skin-on] .wnFoaW_projectRow[data-dsh-folder='active']:hover{background:linear-gradient(90deg,rgba(109,59,209,.24) 0%,rgba(109,59,209,.15) 60%,transparent 100%);box-shadow:inset 0 0 0 1px rgba(109,59,209,.44),inset 2px 0 0 0 rgba(109,59,209,.80)}",
        "html body:not([data-ds-dark-theme])[data-dsh-skin-on] .wnFoaW_projectRow[data-dsh-folder='active'] .wnFoaW_folderActive{color:#5b2bb8;filter:drop-shadow(0 0 5px rgba(109,59,209,.35))}",
        "html body:not([data-ds-dark-theme])[data-dsh-skin-on] .wnFoaW_sessionRow::before{content:\"\";position:absolute;top:4px;bottom:4px;left:calc(6px + var(--dsh-workspace-indent,0px));width:1px;border-radius:1px;background:linear-gradient(180deg,rgba(109,59,209,.45),rgba(109,59,209,.38));opacity:.55;pointer-events:none;transition:opacity .18s ease,width .18s ease}",
        "html body:not([data-ds-dark-theme])[data-dsh-skin-on] .wnFoaW_sessionRow:hover::before{opacity:.9;background:linear-gradient(180deg,rgba(124,72,229,.85),rgba(109,59,209,.65))}",
        "html body:not([data-ds-dark-theme])[data-dsh-skin-on] .wnFoaW_sessionRow.wnFoaW_selected::before{opacity:1;width:2px;background:linear-gradient(180deg,var(--csk-accent),var(--csk-accent-violet));box-shadow:0 0 8px rgba(109,59,209,.45)}",
        "html body:not([data-ds-dark-theme])[data-dsh-skin-on] .wnFoaW_sessionRow.wnFoaW_selected{animation:dshSkinBreath 3.4s ease-in-out infinite}",
        "html body:not([data-ds-dark-theme])[data-dsh-skin-on] .wnFoaW_sessionRow.wnFoaW_selected::after{content:\"\";position:absolute;inset:1px;border-radius:inherit;pointer-events:none;background:linear-gradient(100deg,transparent 42%,rgba(109,59,209,.18) 50%,transparent 58%);animation:dshSkinSweep 4.6s ease-in-out infinite}",
        "html body:not([data-ds-dark-theme])[data-dsh-skin-on] .wtg9ga_panelRow.wtg9ga_panelActive,html body:not([data-ds-dark-theme])[data-dsh-skin-on] .wtg9ga_panelRow[aria-expanded=true]{background:rgba(194,36,143,.10);color:#8d1b6b;box-shadow:inset 2px 0 0 rgba(194,36,143,.55)}",
        /* Same split as the dark theme: wash on the conversation root, flat column. This is what
           stops the light-mode colour break under the plugin page's header strip. */
        "html body:not([data-ds-dark-theme])[data-dsh-skin-on] .mP3x-q_centerCol{--dsw-alias-bg-base:#faf6ef;background-color:#faf6ef;background-image:none;margin-top:6px;margin-bottom:6px}",
        "html body:not([data-ds-dark-theme])[data-dsh-skin-on] .an3WzG_root{background-image:radial-gradient(130% 62% at 50% 0%,rgba(109,59,209,.10),transparent 74%),linear-gradient(180deg,rgba(255,253,248,.55),rgba(250,244,234,.30) 60%,rgba(244,236,223,.50)),linear-gradient(168deg,#fdf9f2 0%,#f8f1e6 52%,#f2e9dc 100%)}",
        "html body:not([data-ds-dark-theme])[data-dsh-skin-on] [data-composer-dock] [data-composer-stat]>button,html body:not([data-ds-dark-theme])[data-dsh-skin-on] [data-composer-dock] [data-composer-stat]>span,html body:not([data-ds-dark-theme])[data-dsh-skin-on] [data-composer-dock]>span:not([data-composer-stat])>button{background:rgba(255,252,246,.72);backdrop-filter:blur(10px) saturate(150%);-webkit-backdrop-filter:blur(10px) saturate(150%);border:1px solid rgba(109,59,209,.20);border-radius:999px;box-shadow:0 2px 10px rgba(10,27,44,.10),inset 0 1px 0 #fff;padding:2px 14px}",
        "html body:not([data-ds-dark-theme])[data-dsh-skin-on] [data-composer-dock] [data-composer-stat]>button:hover,html body:not([data-ds-dark-theme])[data-dsh-skin-on] [data-composer-dock]>span:not([data-composer-stat])>button:hover{background:rgba(255,252,246,.92);border-color:rgba(109,59,209,.36);color:#241f18}",
        "html body:not([data-ds-dark-theme])[data-dsh-skin-on] [data-composer-dock] [data-composer-stat]>button[aria-expanded=true],html body:not([data-ds-dark-theme])[data-dsh-skin-on] [data-composer-dock]>span:not([data-composer-stat])>button[aria-expanded=true]{border-color:rgba(109,59,209,.52);box-shadow:0 0 0 1px rgba(109,59,209,.20),0 2px 12px rgba(109,59,209,.16)}",
        "html body:not([data-ds-dark-theme])[data-dsh-skin-on] [data-composer-card]{position:relative;isolation:isolate;background:linear-gradient(158deg,rgba(255,252,246,.92) 0%,rgba(243,249,255,.88) 58%,rgba(238,244,253,.86) 100%);backdrop-filter:blur(14px) saturate(160%);-webkit-backdrop-filter:blur(14px) saturate(160%);box-shadow:0 0 0 1px rgba(109,59,209,.22),0 0 14px -10px rgba(109,59,209,.35),0 18px 40px -30px rgba(10,27,44,.35),inset 0 1px 0 #fff,inset 0 0 20px -18px rgba(109,59,209,.35);transition:box-shadow .22s ease}",
        "html body:not([data-ds-dark-theme])[data-dsh-skin-on] [data-composer-card]:hover{box-shadow:0 0 0 1px rgba(109,59,209,.30),0 0 16px -9px rgba(109,59,209,.38),0 18px 40px -30px rgba(10,27,44,.35),inset 0 1px 0 #fff,inset 0 0 24px -18px rgba(109,59,209,.42)}",
        "html body:not([data-ds-dark-theme])[data-dsh-skin-on] [data-composer-card]:focus-within{box-shadow:0 0 0 1px rgba(124,72,229,.46),0 0 20px -8px rgba(109,59,209,.42),0 18px 40px -30px rgba(10,27,44,.35),inset 0 0 26px -16px rgba(109,59,209,.45)}",
        "html body:not([data-ds-dark-theme])[data-dsh-skin-on] [data-composer-card]::before{content:\"\";position:absolute;inset:4px;pointer-events:none;border-radius:inherit;background:linear-gradient(var(--csk-accent),var(--csk-accent)) left top/16px 1px no-repeat,linear-gradient(var(--csk-accent),var(--csk-accent)) left top/1px 16px no-repeat,linear-gradient(var(--csk-accent-violet),var(--csk-accent-violet)) right bottom/16px 1px no-repeat,linear-gradient(var(--csk-accent-violet),var(--csk-accent-violet)) right bottom/1px 16px no-repeat;opacity:.5;z-index:0}",
        "html body:not([data-ds-dark-theme])[data-dsh-skin-on] [data-composer-card]::after{content:\"\";position:absolute;left:14px;right:14px;top:0;height:1px;pointer-events:none;background:linear-gradient(90deg,transparent,rgba(124,72,229,.55) 18%,rgba(109,59,209,.45) 82%,transparent);opacity:.5;z-index:0}",
        "html body:not([data-ds-dark-theme])[data-dsh-skin-on] [data-composer-card] textarea,html body:not([data-ds-dark-theme])[data-dsh-skin-on] [data-composer-card] [data-composer-input]{caret-color:var(--csk-accent)}",
        "html body:not([data-ds-dark-theme])[data-dsh-skin-on] [data-composer-card] textarea::placeholder,html body:not([data-ds-dark-theme])[data-dsh-skin-on] [data-composer-card] [data-composer-placeholder]{color:rgba(59,90,120,.9)}",
        "html body:not([data-ds-dark-theme])[data-dsh-skin-on] .V4vHZW_flowItem[data-chat-flow-kind='assistant-step']::before{content:\"\";position:absolute;left:-11px;top:6px;bottom:6px;width:1px;border-radius:1px;background:linear-gradient(180deg,rgba(124,72,229,.58),rgba(109,59,209,.30) 55%,transparent);pointer-events:none}",
        "html body:not([data-ds-dark-theme])[data-dsh-skin-on] [data-message-bubble]{position:relative;background:linear-gradient(140deg,rgba(109,59,209,.10),rgba(109,59,209,.12));border-radius:12px 3px 12px 3px;box-shadow:0 0 0 1px rgba(109,59,209,.32),0 10px 24px -20px rgba(10,27,44,.40),inset 0 1px 0 #fff,inset 0 0 18px -12px rgba(109,59,209,.35)}",
        "html body:not([data-ds-dark-theme])[data-dsh-skin-on] [data-message-bubble]::after{content:\"\";position:absolute;right:7px;top:7px;width:12px;height:1px;background:rgba(109,59,209,.75);box-shadow:0 0 6px rgba(109,59,209,.45);pointer-events:none}",
        "html body:not([data-ds-dark-theme])[data-dsh-skin-on] [data-dsh-skin-settings]{position:relative;isolation:isolate;background:linear-gradient(168deg,rgba(255,252,246,.92),rgba(248,241,230,.92)) !important;box-shadow:0 0 0 1px rgba(109,59,209,.24),0 0 70px -40px rgba(109,59,209,.35),inset 0 0 140px -80px rgba(109,59,209,.22)}",
        "html body:not([data-ds-dark-theme])[data-dsh-skin-on] [data-dsh-skin-settings]::before{content:\"\";position:absolute;inset:0;pointer-events:none;z-index:0;background-image:linear-gradient(rgba(109,59,209,.08) 1px,transparent 1px),linear-gradient(90deg,rgba(109,59,209,.06) 1px,transparent 1px);background-size:36px 36px,36px 36px;mask-image:radial-gradient(130% 90% at 50% 0%,#000 25%,transparent 88%);-webkit-mask-image:radial-gradient(130% 90% at 50% 0%,#000 25%,transparent 88%)}",
        "html body:not([data-ds-dark-theme])[data-dsh-skin-on] [data-dsh-skin-settings]::after{content:\"\";position:absolute;inset:10px;pointer-events:none;z-index:0;background:linear-gradient(var(--csk-accent),var(--csk-accent)) left top/18px 1px no-repeat,linear-gradient(var(--csk-accent),var(--csk-accent)) left top/1px 18px no-repeat,linear-gradient(var(--csk-accent-violet),var(--csk-accent-violet)) right top/18px 1px no-repeat,linear-gradient(var(--csk-accent-violet),var(--csk-accent-violet)) right top/1px 18px no-repeat,linear-gradient(var(--csk-accent),var(--csk-accent)) left bottom/18px 1px no-repeat,linear-gradient(var(--csk-accent),var(--csk-accent)) left bottom/1px 18px no-repeat,linear-gradient(var(--csk-accent-violet),var(--csk-accent-violet)) right bottom/18px 1px no-repeat,linear-gradient(var(--csk-accent-violet),var(--csk-accent-violet)) right bottom/1px 18px no-repeat;opacity:.55}",
        "html body:not([data-ds-dark-theme])[data-dsh-skin-on] .dsh-skin-hudchip{position:absolute;right:24px;bottom:14px;z-index:2;font:600 10px/1 ui-monospace,Consolas,monospace;letter-spacing:.2em;color:var(--csk-accent-bright);opacity:.8;pointer-events:none}",
        "html body:not([data-ds-dark-theme])[data-dsh-skin-on] .NYOO6G_code{border:1px solid rgba(109,59,209,.24);border-radius:var(--dsw-radius-md);overflow:hidden}",
        "html body:not([data-ds-dark-theme])[data-dsh-skin-on] ::selection{background:rgba(190,18,60,.22);color:#3a0a14;-webkit-text-stroke:.4px rgba(190,18,60,.55)}",
        "html body:not([data-ds-dark-theme])[data-dsh-skin-on] a[href]{text-shadow:none}",
        "html body:not([data-ds-dark-theme])[data-dsh-skin-on] ::-webkit-scrollbar-thumb{box-shadow:inset 0 0 6px rgba(109,59,209,.25)}",
        "html body:not([data-ds-dark-theme])[data-dsh-skin-on] #dsh-skin-refresh:hover{background:rgba(109,59,209,.12);color:#241f18}",
        "html body:not([data-ds-dark-theme])[data-dsh-skin-on] #dsh-skin-signout{margin-top:12px;width:100%;height:36px;border-radius:var(--dsw-radius-md);border:1px solid rgba(190,18,60,.32);background:rgba(190,18,60,.06);color:#a81534;font-size:13px;font-family:inherit;letter-spacing:.02em;cursor:pointer;transition:background .15s,border-color .15s,color .15s}",
        "html body:not([data-ds-dark-theme])[data-dsh-skin-on] #dsh-skin-signout:hover{background:rgba(190,18,60,.12);border-color:rgba(190,18,60,.52);color:#8c0f28}",
        /* A session waiting on an approval keeps its own status dot; the ring is the
           list-level cue, drawn as an outline so it never shifts the 32px row height
           and never replaces the selected row's inset shadow. */
        /* Status marks: the host paints a 10px state dot and a compact trailing label,
           so the sheet only decorates the row. Attention covers approvals, plan reviews
           and unanswered questions; running and done read the same dot. */
        "html body[data-ds-dark-theme][data-dsh-skin-on] .wnFoaW_sessionRow[data-dsh-state=\"attention\"]{outline:1px solid color-mix(in srgb,#fcee0a 58%,transparent);outline-offset:-1px;filter:drop-shadow(0 0 3px color-mix(in srgb,#fcee0a 32%,transparent))}",
        "html body:not([data-ds-dark-theme])[data-dsh-skin-on] .wnFoaW_sessionRow[data-dsh-state=\"attention\"]{outline:1px solid #b8860b;outline-offset:-1px;filter:drop-shadow(0 0 3px color-mix(in srgb,#b8860b 28%,transparent))}",
        "html body[data-ds-dark-theme][data-dsh-skin-on] .wnFoaW_sessionRow[data-dsh-state=\"running\"]::before{width:2px;opacity:1;background:linear-gradient(180deg,var(--csk-accent-bright),var(--csk-accent-bright) 60%,var(--csk-accent-violet));box-shadow:0 0 8px rgba(34,232,255,.6);animation:dshSkinRunBar 1.6s ease-in-out infinite}",
        "html body:not([data-ds-dark-theme])[data-dsh-skin-on] .wnFoaW_sessionRow[data-dsh-state=\"running\"]::before{width:2px;opacity:1;background:linear-gradient(180deg,var(--csk-accent-bright),var(--csk-accent-bright) 60%,var(--csk-accent-violet));box-shadow:0 0 8px rgba(10,127,156,.45);animation:dshSkinRunBar 1.6s ease-in-out infinite}",
        "html body[data-ds-dark-theme][data-dsh-skin-on] .wnFoaW_sessionRow[data-dsh-state=\"done\"]{outline:1px solid color-mix(in srgb,#9dff5c 46%,transparent);outline-offset:-1px;filter:drop-shadow(0 0 3px color-mix(in srgb,#9dff5c 26%,transparent))}",
        "html body:not([data-ds-dark-theme])[data-dsh-skin-on] .wnFoaW_sessionRow[data-dsh-state=\"done\"]{outline:1px solid #2f7d18;outline-offset:-1px;filter:drop-shadow(0 0 3px color-mix(in srgb,#2f7d18 22%,transparent))}",
        "@keyframes dshSkinRunBar{0%,100%{opacity:.55;box-shadow:0 0 5px rgba(34,232,255,.25)}50%{opacity:1;box-shadow:0 0 12px rgba(34,232,255,.75)}}",
        /* Code blocks: the host already prints the language and owns a copy button,
           so this only gives the banner a strip and the two controls a chip. */
        "html body[data-ds-dark-theme][data-dsh-skin-on] [data-code-block-banner]{display:flex;align-items:center;justify-content:space-between;gap:8px;padding:4px 8px;border-bottom:1px solid color-mix(in srgb,var(--csk-accent) 18%,transparent);background:linear-gradient(90deg,color-mix(in srgb,var(--csk-accent) 7%,transparent),transparent 62%)}",
        "html body[data-ds-dark-theme][data-dsh-skin-on] [data-code-block-banner] > div:first-child{font:500 10px/1.4 Consolas,\"Microsoft YaHei\",monospace;letter-spacing:.16em;text-transform:uppercase;color:color-mix(in srgb,#9fefff 78%,transparent)}",
        "html body[data-ds-dark-theme][data-dsh-skin-on] [data-code-block-banner] button{font:500 10px/1 Consolas,\"Microsoft YaHei\",monospace;letter-spacing:.1em;text-transform:uppercase;color:color-mix(in srgb,#bfefff 72%,transparent);background:transparent;border:1px solid color-mix(in srgb,var(--csk-accent) 22%,transparent);border-radius:3px;padding:3px 8px;cursor:pointer;transition:color .16s ease,border-color .16s ease,box-shadow .16s ease,background .16s ease}",
        "html body[data-ds-dark-theme][data-dsh-skin-on] [data-code-block-banner] button:hover{color:#eafcff;border-color:color-mix(in srgb,var(--csk-accent-bright) 58%,transparent);box-shadow:0 0 10px -3px rgba(34,232,255,.55)}",
        "html body[data-ds-dark-theme][data-dsh-skin-on] [data-code-block-banner] button:active{background:color-mix(in srgb,var(--csk-accent-bright) 16%,transparent);color:#04121a}",
        "html body:not([data-ds-dark-theme])[data-dsh-skin-on] [data-code-block-banner]{display:flex;align-items:center;justify-content:space-between;gap:8px;padding:4px 8px;border-bottom:1px solid rgba(109,59,209,.18);background:linear-gradient(90deg,rgba(109,59,209,.07),transparent 62%)}",
        "html body:not([data-ds-dark-theme])[data-dsh-skin-on] [data-code-block-banner] > div:first-child{font:500 10px/1.4 Consolas,\"Microsoft YaHei\",monospace;letter-spacing:.16em;text-transform:uppercase;color:#4c3a26}",
        "html body:not([data-ds-dark-theme])[data-dsh-skin-on] [data-code-block-banner] button{font:500 10px/1 Consolas,\"Microsoft YaHei\",monospace;letter-spacing:.1em;text-transform:uppercase;color:#5a5145;background:transparent;border:1px solid rgba(109,59,209,.24);border-radius:3px;padding:3px 8px;cursor:pointer;transition:color .16s ease,border-color .16s ease,box-shadow .16s ease,background .16s ease}",
        "html body:not([data-ds-dark-theme])[data-dsh-skin-on] [data-code-block-banner] button:hover{color:#241f18;border-color:rgba(109,59,209,.55);box-shadow:0 0 10px -4px rgba(109,59,209,.45)}",
        "html body:not([data-ds-dark-theme])[data-dsh-skin-on] [data-code-block-banner] button:active{background:rgba(109,59,209,.14);color:#faf6ef}",
              /* --- breathing edge on the middle column --- */
        "html body[data-ds-dark-theme][data-dsh-skin-on] .mP3x-q_centerCol::after{animation:dshSkinEdgeBreathDark var(--csk-breath-duration,5.6s) ease-in-out infinite}",
        "html body:not([data-ds-dark-theme])[data-dsh-skin-on] .mP3x-q_centerCol::after{animation:dshSkinEdgeBreathLight var(--csk-breath-duration,5.6s) ease-in-out infinite}",
        "@keyframes dshSkinEdgeBreathDark{0%,100%{border-color:var(--dsw-alias-border-l3);box-shadow:0 0 0 0 transparent}50%{border-color:color-mix(in srgb,var(--csk-edge-color) calc(var(--csk-edge-alpha) * 1.75),transparent);box-shadow:0 0 16px -4px rgba(34,232,255,.42),inset 0 0 12px -7px rgba(34,232,255,.45)}}",
        "@keyframes dshSkinEdgeBreathLight{0%,100%{border-color:var(--dsw-alias-border-l3);box-shadow:0 0 0 0 transparent}50%{border-color:color-mix(in srgb,var(--csk-edge-color) calc(var(--csk-edge-alpha) * 1.75),transparent);box-shadow:0 0 16px -5px rgba(109,59,209,.32),inset 0 0 12px -8px rgba(109,59,209,.38)}}",
        /* --- toggles ---
           The control page turns one effect group off through body[data-dsh-off~='<id>']. Every styled rule it
           has to undo sits at (0,4,2)-ish specificity, so the reset uses the same [data-dsh-skin-on] scope plus
           !important: this layer is the single place allowed to outrank the skin, and nothing else may. */
        "html body[data-dsh-skin-on][data-dsh-off~='breath'] .mP3x-q_centerCol::after{animation:none !important}",
        "html body[data-dsh-skin-on][data-dsh-off~='sweep'] .wnFoaW_sessionRow.wnFoaW_selected{animation:none !important}",
        "html body[data-dsh-skin-on][data-dsh-off~='sweep'] .wnFoaW_sessionRow.wnFoaW_selected::after{display:none !important;animation:none !important}",
        "html body[data-dsh-skin-on][data-dsh-off~='marks'] .wnFoaW_sessionRow[data-dsh-state]{outline:none !important;filter:none !important}",
        "html body[data-dsh-skin-on][data-dsh-off~='marks'] .wnFoaW_sessionRow[data-dsh-state='running']::before{animation:none !important;width:1px !important;box-shadow:none !important;background:linear-gradient(180deg,color-mix(in srgb,#00e5ff 28%,transparent),color-mix(in srgb,#6a3bd8 24%,transparent)) !important}",
        "html body[data-dsh-skin-on][data-dsh-off~='code'] [data-code-block-banner]{padding:2px 6px !important;border-bottom:1px solid var(--dsw-alias-border-l2) !important;background:none !important}",
        "html body[data-dsh-skin-on][data-dsh-off~='code'] [data-code-block-banner] > div:first-child{font:inherit !important;letter-spacing:normal !important;text-transform:none !important;color:var(--dsw-alias-label-tertiary) !important}",
        "html body[data-dsh-skin-on][data-dsh-off~='code'] [data-code-block-banner] button{font:inherit !important;letter-spacing:normal !important;text-transform:none !important;border:0 !important;padding:2px 6px !important;color:var(--dsw-alias-label-tertiary) !important;box-shadow:none !important;background:none !important}",
        "html body[data-dsh-skin-on][data-dsh-off~='hud'] [data-dsh-skin-settings]{background:var(--dsw-alias-bg-base) !important;border:0 !important;box-shadow:none !important;backdrop-filter:none !important;-webkit-backdrop-filter:none !important}",
        "html body[data-dsh-skin-on][data-dsh-off~='hud'] [data-dsh-skin-settings]::before,html body[data-dsh-skin-on][data-dsh-off~='hud'] [data-dsh-skin-settings]::after{display:none !important}",
        "html body[data-dsh-skin-on][data-dsh-off~='hud'] .dsh-skin-hudchip{display:none !important}",
        /* Keyboard users get the same affordance as pointer users: one visible ring on every control. */
        "html body[data-dsh-skin-on] .dsh-skin-row:focus-visible,html body[data-dsh-skin-on] .dsh-skin-reset:focus-visible,html body[data-dsh-skin-on] .dsh-skin-field-reset:focus-visible,html body[data-dsh-skin-on] .dsh-skin-swatch:focus-visible,html body[data-dsh-skin-on] .dsh-skin-range:focus-visible{outline:2px solid var(--csk-accent,#22e8ff);outline-offset:2px}",
        /* --- theme control page --- */
        "html body[data-ds-dark-theme][data-dsh-skin-on] .dsh-skin-page{--csk-accent:var(--csk-accent-bright);--csk-accent-soft:rgba(34,232,255,.14);--csk-accent-line:rgba(34,232,255,.34)}",
        "html body:not([data-ds-dark-theme])[data-dsh-skin-on] .dsh-skin-page{--csk-accent:var(--csk-accent-violet);--csk-accent-soft:rgba(109,59,209,.12);--csk-accent-line:rgba(109,59,209,.28)}",
        "html body[data-dsh-skin-on] .dsh-skin-page{display:flex;flex-direction:column;gap:8px;padding:2px 0 20px}",
        "html body[data-dsh-skin-on] .dsh-skin-hero{display:flex;flex-direction:column;gap:4px;padding:10px 12px;margin-bottom:4px;border:1px solid var(--csk-accent-line);border-radius:6px;background:linear-gradient(100deg,var(--csk-accent-soft),transparent 72%)}",
        "html body[data-dsh-skin-on] .dsh-skin-hero-title{font:600 13px/1.4 Consolas,'Microsoft YaHei',monospace;letter-spacing:.14em;text-transform:uppercase;color:var(--csk-accent)}",
        "html body[data-dsh-skin-on] .dsh-skin-hero-sub{font:400 11px/1.5 Consolas,'Microsoft YaHei',monospace;letter-spacing:.08em;color:var(--dsw-alias-label-tertiary)}",
        "html body[data-dsh-skin-on] .dsh-skin-row{display:flex;align-items:center;justify-content:space-between;gap:16px;padding:10px 12px;border:1px solid var(--dsw-alias-border-l2);border-radius:6px;background:transparent;text-align:left;cursor:pointer;transition:border-color .16s ease,background .16s ease}",
        "html body[data-dsh-skin-on] .dsh-skin-row:hover{border-color:var(--csk-accent-line);background:var(--csk-accent-soft)}",
        "html body[data-dsh-skin-on] .dsh-skin-row-text{display:flex;flex-direction:column;gap:2px;min-width:0}",
        "html body[data-dsh-skin-on] .dsh-skin-row-label{font-size:13px;line-height:20px;color:var(--dsw-alias-label-primary)}",
        "html body[data-dsh-skin-on] .dsh-skin-row-hint{font-size:11px;line-height:16px;color:var(--dsw-alias-label-tertiary)}",
        "html body[data-dsh-skin-on] .dsh-skin-switch{position:relative;flex:none;width:34px;height:18px;border-radius:9px;border:1px solid var(--dsw-alias-border-l3);background:transparent;transition:border-color .18s ease,background .18s ease}",
        "html body[data-dsh-skin-on] .dsh-skin-switch[data-on='true']{border-color:var(--csk-accent);background:var(--csk-accent-soft);box-shadow:0 0 10px -4px var(--csk-accent-line)}",
        "html body[data-dsh-skin-on] .dsh-skin-switch-dot{position:absolute;top:2px;left:2px;width:12px;height:12px;border-radius:50%;background:var(--dsw-alias-label-tertiary);transition:transform .18s ease,background .18s ease}",
        "html body[data-dsh-skin-on] .dsh-skin-switch[data-on='true'] .dsh-skin-switch-dot{transform:translateX(16px);background:var(--csk-accent)}",
        "html body[data-dsh-skin-on] .dsh-skin-reset{align-self:flex-start;margin-top:6px;padding:5px 12px;border:1px solid var(--dsw-alias-border-l2);border-radius:4px;background:transparent;color:var(--dsw-alias-label-secondary);font-size:12px;cursor:pointer}",
        "html body[data-dsh-skin-on] .dsh-skin-reset:hover{border-color:var(--csk-accent-line);color:var(--dsw-alias-label-primary)}",
        "html body[data-dsh-skin-on] .dsh-skin-reset[data-confirming=\"true\"]{border-color:#b8860b;color:#b8860b}",
        "html body[data-dsh-skin-on] .dsh-skin-field-reset{flex:none;padding:2px 8px;border:1px solid var(--dsw-alias-border-l2);border-radius:4px;background:transparent;color:var(--dsw-alias-label-tertiary);font:400 11px/1.6 Consolas,'Microsoft YaHei',monospace;cursor:pointer;transition:border-color .15s ease,color .15s ease}",
        "html body[data-dsh-skin-on] .dsh-skin-field-reset:hover{border-color:var(--csk-accent-line);color:var(--dsw-alias-label-primary)}",
        "/* --- summary row inside 设置 → 通用 (the skin's page is one nav entry away) --- */",
        "html body[data-ds-dark-theme][data-dsh-skin-on] .dsh-skin-gitem{--csk-accent:var(--csk-accent-bright);--csk-accent-soft:rgba(34,232,255,.14);--csk-accent-line:rgba(34,232,255,.34)}",
        "html body:not([data-ds-dark-theme])[data-dsh-skin-on] .dsh-skin-gitem{--csk-accent:var(--csk-accent-violet);--csk-accent-soft:rgba(109,59,209,.12);--csk-accent-line:rgba(109,59,209,.28)}",
        "html body[data-dsh-skin-on] .dsh-skin-gitem{display:flex;flex-direction:column;gap:8px;width:100%}",
        "html body[data-dsh-skin-on] .dsh-skin-gitem-head{display:flex;flex-direction:column;gap:2px}",
        "html body[data-dsh-skin-on] .dsh-skin-gitem-title{font-size:13px;line-height:20px;color:var(--dsw-alias-label-primary)}",
        "html body[data-dsh-skin-on] .dsh-skin-gitem-hint{font-size:11px;line-height:16px;color:var(--dsw-alias-label-tertiary)}",
        "html body[data-dsh-skin-on] .dsh-skin-gitem-switches{display:flex;flex-wrap:wrap;gap:6px}",
        "html body[data-dsh-skin-on] .dsh-skin-chip{display:inline-flex;align-items:center;gap:6px;padding:3px 10px;border:1px solid var(--dsw-alias-border-l2);border-radius:999px;background:transparent;color:var(--dsw-alias-label-secondary);font-size:12px;line-height:18px;cursor:pointer;transition:border-color .15s ease,background .15s ease,color .15s ease}",
        "html body[data-dsh-skin-on] .dsh-skin-chip:hover{border-color:var(--csk-accent-line);color:var(--dsw-alias-label-primary)}",
        "html body[data-dsh-skin-on] .dsh-skin-chip[data-on='true']{border-color:var(--csk-accent);background:var(--csk-accent-soft);color:var(--dsw-alias-label-primary)}",
        "html body[data-dsh-skin-on] .dsh-skin-chip::before{content:\"\";width:5px;height:5px;border-radius:50%;background:var(--dsw-alias-label-tertiary)}",
        "html body[data-dsh-skin-on] .dsh-skin-chip[data-on='true']::before{background:var(--csk-accent);box-shadow:0 0 6px var(--csk-accent)}",
        "html body[data-dsh-skin-on] .dsh-skin-chip:focus-visible{outline:2px solid var(--csk-accent);outline-offset:2px}",
        "/* The three controls the skin injects itself (title-bar reload, sidebar settings entry,",
        "   sign-out row in the account page) are real buttons; a keyboard user tabbing into",
        "   them must see where focus is, and the ring has to survive both themes. */",
        "html body[data-ds-dark-theme][data-dsh-skin-on] #dsh-skin-refresh:focus-visible,html body[data-ds-dark-theme][data-dsh-skin-on] #dsh-skin-signout:focus-visible,html body[data-ds-dark-theme][data-dsh-skin-on] ._5Qcc8a_trigger:focus-visible{outline:2px solid var(--csk-accent-bright);outline-offset:-2px}",
        "html body:not([data-ds-dark-theme])[data-dsh-skin-on] #dsh-skin-refresh:focus-visible,html body:not([data-ds-dark-theme])[data-dsh-skin-on] #dsh-skin-signout:focus-visible,html body:not([data-ds-dark-theme])[data-dsh-skin-on] ._5Qcc8a_trigger:focus-visible{outline:2px solid var(--csk-accent-violet);outline-offset:-2px}",
        "/* Windows high-contrast mode replaces author colours, so the neon palette is the first",
        "   thing to disappear; the state rings and the composer edge are redrawn with system",
        "   colour keywords here instead of a hue. */",
        "@media (forced-colors: active){html body[data-dsh-skin-on] .wnFoaW_sessionRow[data-dsh-state=\"attention\"]{outline:2px solid Highlight !important;filter:none !important}html body[data-dsh-skin-on] .wnFoaW_sessionRow[data-dsh-state=\"done\"]{outline:2px solid LinkText !important;filter:none !important}html body[data-dsh-skin-on] .wnFoaW_sessionRow[data-dsh-state=\"running\"]::before{background:Highlight !important;box-shadow:none !important}html body[data-dsh-skin-on] [data-message-bubble]{background:Canvas !important;border:1px solid CanvasText !important}html body[data-dsh-skin-on] [data-composer-card]{background:Canvas !important;border:1px solid CanvasText !important;box-shadow:none !important}html body[data-dsh-skin-on] #dsh-skin-refresh:focus-visible,html body[data-dsh-skin-on] #dsh-skin-signout:focus-visible,html body[data-dsh-skin-on] ._5Qcc8a_trigger:focus-visible,html body[data-dsh-skin-on] .dsh-skin-chip:focus-visible{outline:2px solid Highlight !important}}",
        "/* --- adjustable edges: colour + strength per group, breath speed --- */",
        "html body[data-dsh-skin-on] [data-composer-card]{border-color:color-mix(in srgb,var(--csk-card-color) var(--csk-card-alpha),transparent)!important}",
        "/* --- control page fields --- */",
        "html body[data-dsh-skin-on] .dsh-skin-group{display:flex;flex-direction:column;gap:6px;margin-top:6px}",
        "html body[data-dsh-skin-on] .dsh-skin-group-title{font:500 11px/16px Consolas,'Microsoft YaHei',monospace;letter-spacing:.12em;text-transform:uppercase;color:var(--dsw-alias-label-tertiary);margin-top:10px}",
        "html body[data-dsh-skin-on] .dsh-skin-field{display:flex;align-items:center;gap:10px;padding:8px 12px;border:1px solid var(--dsw-alias-border-l2);border-radius:6px}",
        "html body[data-dsh-skin-on] .dsh-skin-field-label{flex:1;min-width:0;font-size:12px;line-height:18px;color:var(--dsw-alias-label-primary)}",
        "html body[data-dsh-skin-on] .dsh-skin-swatch{flex:none;width:28px;height:24px;padding:0;border:1px solid var(--dsw-alias-border-l2);border-radius:4px;background:transparent;cursor:pointer}",
        "html body[data-dsh-skin-on] .dsh-skin-range{flex:1;min-width:88px;max-width:150px;accent-color:var(--csk-accent)}",
        "html body[data-dsh-skin-on] .dsh-skin-value{flex:none;width:42px;text-align:right;font:400 11px/16px Consolas,monospace;color:var(--dsw-alias-label-tertiary)}",
        /* Sidebar glass blocks follow the block colour: dark theme draws these
           borders with literal colours, so the !important override is the only
           way to retint them without rewriting every rule. */
        "html body[data-dsh-skin-on] .GAkraW_root:not(.GAkraW_rail){border-color:color-mix(in srgb,var(--csk-block-color) var(--csk-block-alpha),transparent)!important}",
        "html body[data-dsh-skin-on] .wtg9ga_panelList{border-color:color-mix(in srgb,var(--csk-block-color) var(--csk-block-alpha),transparent)!important;margin-bottom:4px!important}",
        "html body[data-dsh-skin-on] ._5Qcc8a_trigger{border-color:color-mix(in srgb,var(--csk-block-color) var(--csk-block-alpha),transparent)!important}",
        /* Third-party overlay: the whale pet draws its speech bubble from light-dark()
           variables whose light branch is a blue-white comic bubble. On a dark skin that
           reads as a sheet of paper on the panel, so the bubble borrows the panel's own
           surface, hairline and ink. The shape, tail and type stay the plugin's. */
        "html body[data-ds-dark-theme][data-dsh-skin-on] .pet{--bubble-bg:#0c1729;--bubble-ink:#d8ecf7;--bubble-line:rgba(34,232,255,.38);--bubble-shadow:rgba(0,0,0,.55)}",
        /* The billing plugin (sidebar usage card, its popover and the dashboard) takes
           surfaces, borders and text from the host tokens, but keeps an accent set of its own
           (--ds-blue #4f8cff, --ds-green #34d399, five series colours). Nothing else in the
           profile declares those names, so re-pointing them at the skin's palette recolours
           gauges, spark bars, delta pills and charts without touching its layout. */
        "html body[data-ds-dark-theme][data-dsh-skin-on] :is(.KFXqYa_triggerWrap,.KFXqYa_triggerPop,.KFXqYa_dashboard,.KFXqYa_dashboardModal,.KFXqYa_settingsLayout,.KFXqYa_nativeSettingsRoot){--ds-blue:var(--dsw-alias-brand);--ds-cyan:var(--dsw-alias-brand-primary);--ds-green:var(--dsw-alias-state-success-primary);--ds-amber:var(--dsw-alias-state-warn-primary);--ds-red:var(--dsw-alias-danger);--ds-violet:var(--dsw-alias-accent);--ds-c-1:var(--dsw-alias-brand);--ds-c-2:var(--dsw-alias-brand-primary);--ds-c-3:var(--dsw-alias-accent);--ds-c-4:var(--dsw-alias-state-warn-primary);--ds-c-5:var(--dsw-alias-accent);--ds-c-6:var(--dsw-alias-state-warn-secondary);--ds-c-7:var(--dsw-alias-brand-primary);--ds-hi-top:rgba(34,232,255,.20);--ds-shadow-1:inset 0 1px 0 rgba(34,232,255,.10),0 8px 24px rgba(0,0,0,.5);--ds-shadow-2:inset 0 1px 0 rgba(34,232,255,.14),0 18px 48px rgba(0,0,0,.62)}",
        "html body:not([data-ds-dark-theme])[data-dsh-skin-on] :is(.KFXqYa_triggerWrap,.KFXqYa_triggerPop,.KFXqYa_dashboard,.KFXqYa_dashboardModal,.KFXqYa_settingsLayout,.KFXqYa_nativeSettingsRoot){--ds-blue:var(--dsw-alias-brand);--ds-cyan:var(--dsw-alias-brand-primary);--ds-green:var(--dsw-alias-state-success-primary);--ds-amber:var(--dsw-alias-state-warn-primary);--ds-red:var(--dsw-alias-danger);--ds-violet:var(--dsw-alias-accent);--ds-c-1:var(--dsw-alias-brand);--ds-c-2:var(--dsw-alias-brand-primary);--ds-c-3:var(--dsw-alias-accent);--ds-c-4:var(--dsw-alias-state-warn-primary);--ds-c-5:var(--dsw-alias-accent);--ds-c-6:var(--dsw-alias-state-warn-secondary);--ds-c-7:var(--dsw-alias-brand-primary);--ds-hi-top:rgba(36,31,24,.05);--ds-shadow-1:0 1px 2px rgba(36,31,24,.08),0 8px 24px rgba(36,31,24,.08);--ds-shadow-2:0 2px 4px rgba(36,31,24,.1),0 18px 48px rgba(36,31,24,.12)}",
        /* The billing card draws its border from `--ds-border`, which lands on border-l1 - the
           faintest hairline the skin keeps, so the card reads as borderless next to the panels
           above it. Point that one variable at border-l3, the exact token the panel boxes use,
           and leave everything else alone: the plugin's own padding, radius and surface stay,
           so its height does not change. */
        "html body[data-dsh-skin-on] .KFXqYa_triggerWrap{--ds-border:var(--dsw-alias-border-l3);--ds-border-strong:var(--dsw-alias-border-l3)}",
        /* Match the workspace panel: same gradient surface, so the same border token reads the
           same on both. The plugin's glass fill is lighter than the panels, which is why the
           shared border looked dimmer here. */
        "html body[data-ds-dark-theme][data-dsh-skin-on] .KFXqYa_trigger{background:linear-gradient(168deg,#05081ae6 0%,#060514e6 52%,#040509e6 100%)}",
        "html body:not([data-ds-dark-theme])[data-dsh-skin-on] .KFXqYa_trigger{background:linear-gradient(168deg,rgba(255,252,245,.97) 0%,rgba(248,241,231,.97) 52%,rgba(241,232,219,.97) 100%)}",
        /* The card is ~78px tall and the footer slot sits flush under the list, so it crowded
           the workspace panel. Tighten the padding and the two text rows; the gauge and spark
           keep their own sizes. */
        "html body[data-dsh-skin-on] .KFXqYa_trigger{padding:4px 10px!important}",
        "html body[data-dsh-skin-on] .KFXqYa_triggerLabel{font-size:10px;line-height:13px}",
        "html body[data-dsh-skin-on] .KFXqYa_triggerMetric{font-size:18px;line-height:22px}",
        /* Vertical rhythm: the host stacks the sidebar as 12px under the new-session button and
           8px under the nav list, with nothing before the footer. Collapse every gap in that
           stack to 4px so the whole column reads as one tight ladder. */
        "html body[data-dsh-skin-on] .wtg9ga_root:not(.wtg9ga_collapsed) .wtg9ga_newSession{margin-top:0;margin-bottom:4px}",
        "html body[data-dsh-skin-on] .wtg9ga_footArea{margin-top:4px;row-gap:4px}",
        "html body[data-dsh-skin-on] .wtg9ga_footerActions{row-gap:4px}",
        "html body[data-dsh-skin-on] .wtg9ga_footerActions [role='button']{margin-top:0!important}",
      ].join("\n");

  /* The shell's own boot card is deliberately left unstyled. A client bundle is only
     evaluated after that card has already painted, so any colour of ours would arrive as
     a second appearance of the same card ("grey, then deep blue" = two boot screens).
     Keeping the host's own look is what makes the boot read as one screen. */

      const REFRESH_ID = "dsh-skin-refresh";
      /**
       * Force-refresh button, pinned to the application title bar.
       *
       * It is mounted on the frame (not the conversation header) and positioned fixed
       * at the top of the window, offset left of the OS window controls. Fixed
       * placement keeps it independent of the header's internally rebuilt layout.
       */
      function installRefreshButton(ctx) {
        const attach = () => {
          const frame = document.querySelector(".mP3x-q_frame");
          if (frame === null) return;
          const current = document.getElementById(REFRESH_ID);
          if (current !== null && current.isConnected) return;
          current?.remove();
          const button = document.createElement("button");
          button.id = REFRESH_ID;
          button.type = "button";
          button.title = "重新加载界面";
          button.setAttribute("aria-label", "重新加载界面");
          button.textContent = "刷新";
          button.addEventListener("click", () => window.location.reload());
          frame.appendChild(button);
        };
        const stopPoll = pollWhileVisible(attach, 1000);
        return () => {
          stopPoll();
          document.getElementById(REFRESH_ID)?.remove();
        };
      }

      /**
       * Keyboard reload.
       *
       * Chromium's own reload accelerators (F5, Ctrl+R, Ctrl+Shift+R) never reach the
       * renderer inside Electron, so a page can only be reloaded if the page itself
       * asks for it. All three chords are handled here in the capture phase so they
       * still fire while focus sits in the composer or the terminal.
       *
       * Ctrl+R is additionally claimed by the desktop shell (`page.refresh`, which
       * refreshes the focused right-pane tab), so the shell intercepts that chord
       * before this listener runs. F5 and Ctrl+Shift+R always arrive; Ctrl+R starts
       * working as soon as that shell binding is moved to another chord in
       * Settings > Shortcuts.
       */
      function installReloadKeys() {
        const onKeyDown = (event) => {
          const key = typeof event.key === "string" ? event.key.toLowerCase() : "";
          const withMod = event.ctrlKey || event.metaKey;
          const isF5 = key === "f5";
          const isR = key === "r";
          if (!isF5 && !(withMod && isR)) return;
          if (event.altKey) return;
          event.preventDefault();
          event.stopPropagation();
          window.location.reload();
        };
        window.addEventListener("keydown", onKeyDown, true);
        return () => window.removeEventListener("keydown", onKeyDown, true);
      }

      /**
       * Turn the sidebar-foot account chip into a settings button.
       *
       * The chip is the `settings.launcher` occupant: its own click opens the account
       * popover, whose first item is "settings". Rather than duplicating the settings
       * shell (which owns the modal, the command and the page tree), this opens that
       * popover and immediately picks its first menu item, so the row behaves as one
       * settings button and stays in step with the shipped menu.
       */
      function installSettingsRow(ctx) {
        const FLAG = "__dshCyberpunkSettingsRow";
        if (window[FLAG]) return () => {};
        window[FLAG] = true;
        const CHIP = "._5Qcc8a_trigger";
        const HIDE = "dsh-skin-menu-hidden";
        const SIGNOUT_ID = "dsh-skin-signout";
        let bypass = false;
        let watch = 0;
        let watchTimeout = 0;
        /** Keep the portalled menu invisible until it is gone from the document. */
        const hideMenu = () => {
          document.body.classList.add(HIDE);
          window.clearTimeout(watchTimeout);
          watchTimeout = window.setTimeout(() => {
            window.clearTimeout(watchTimeout);
            document.body.classList.remove(HIDE);
          }, 12000);
        };
        const menuItems = () => {
          const menus = document.querySelectorAll('[role="menu"]');
          const menu = menus.length === 0 ? null : menus[menus.length - 1];
          return menu === null ? [] : Array.from(menu.querySelectorAll('[role="menuitem"]'));
        };
        /**
         * Open the account popover and click the item `pick` returns.
         *
         * The popover is the only surface that carries the shipped actions (settings
         * navigation, sign-out confirmation, the running-task guard), so instead of
         * reimplementing them this drives the popover and hides it from view.
         */
        const pickFromMenu = (pick) => {
          const chip = document.querySelector(CHIP);
          if (chip === null) return;
          hideMenu();
          bypass = true;
          try {
            chip.click();
          } catch (error) {
            bypass = false;
            return;
          }
          window.setTimeout(() => {
            bypass = false;
          }, 0);
          let tries = 0;
          const done = () => {
            window.clearInterval(watch);
            window.clearTimeout(watchTimeout);
            document.body.classList.remove(HIDE);
          };
          const step = () => {
            const item = pick(menuItems());
            if (item === undefined || item === null) {
              tries += 1;
              if (tries < 40) window.setTimeout(step, 50);
              else done();
              return;
            }
            item.click();
            /* React closes the popover on selection, so poll until the portal is gone
               instead of sending Escape: the same key would also dismiss the dialog or
               the settings page that the action just opened. */
            window.clearInterval(watch);
            watch = window.setInterval(() => {
              if (document.querySelector('[role="menu"]') === null) done();
            }, 100);
            window.setTimeout(done, 8000);
          };
          window.setTimeout(step, 60);
        };
        const onClick = (event) => {
          const target = event.target instanceof Element ? event.target.closest(CHIP) : null;
          if (target === null || bypass) return;
          event.preventDefault();
          event.stopImmediatePropagation();
          target.setAttribute("aria-label", "设置");
          pickFromMenu((items) => items[0]);
        };
        document.addEventListener("click", onClick, true);

        /* Sign-out moves into the settings account page: the footer row is a settings
           button now, so the popover that used to carry it is out of reach. One row is
           appended there and drives the shipped popover pick, which keeps the official
           confirmation dialog and the running-task guard. */
        const attachSignOut = () => {
          const existing = document.getElementById(SIGNOUT_ID);
          const section = document.querySelector("._6qcDqa_section");
          if (section === null) return;
          if (section.querySelector("._6qcDqa_accountInfo") === null) {
            existing?.remove();
            return;
          }
          if (existing !== null) return;
          const button = document.createElement("button");
          button.id = SIGNOUT_ID;
          button.type = "button";
          button.textContent = "退出登录";
          button.addEventListener("click", (event) => {
            event.preventDefault();
            event.stopPropagation();
            pickFromMenu((items) => items[items.length - 1]);
          });
          section.appendChild(button);
        };
        const stopSignOutPoll = pollWhileVisible(attachSignOut, 1000);

        return () => {
          document.removeEventListener("click", onClick, true);
          stopSignOutPoll();
          window.clearInterval(watch);
          window.clearTimeout(watchTimeout);
          document.body.classList.remove(HIDE);
          document.getElementById(SIGNOUT_ID)?.remove();
          window[FLAG] = false;
        };
      }
      /**
       * Arm the token overrides once the shell's boot card has left the document.
       *
       * The card paints itself from the very tokens this skin overrides
       * (`--dsw-alias-bg-base`, `--dsw-alias-label-primary`), so applying them while the
       * card is still on screen recolours it mid-boot: the light grey card would turn
       * into this palette's navy right before the app appears. Waiting for the card to
       * leave makes the first skinned frame the real interface instead.
       */
      function armSkin() {
        const ATTR = "data-dsh-skin-on";
        const arm = () => {
          if (document.body === null) return false;
          document.body.setAttribute(ATTR, "");
          return true;
        };
        const bootGone = () => document.querySelector("[data-dsh-boot]") === null;
        const disarm = () => document.body?.removeAttribute(ATTR);
        if (bootGone() && arm()) return disarm;
        /* The card leaving is a DOM removal, so an observer reacts on the next frame;
           the 120 ms tick is only a fallback for a card that is hidden rather than
           removed. Both stop the moment the skin is armed. */
        let timer = 0;
        let tries = 0;
        let observer = null;
        const finish = () => {
          if (timer !== 0) {
            window.clearInterval(timer);
            timer = 0;
          }
          observer?.disconnect();
          observer = null;
        };
        const tick = () => {
          tries += 1;
          /* ~7 s cap: a boot card that never leaves must not keep the skin off forever. */
          if ((bootGone() || tries > 60) && arm()) finish();
        };
        observer = new MutationObserver(tick);
        observer.observe(document.body, { childList: true, subtree: true });
        timer = window.setInterval(tick, 120);
        return () => {
          finish();
          disarm();
        };
      }
      function injectStyle() {
        const previous = document.getElementById(STYLE_ID);
        if (previous) previous.remove();
        const style = document.createElement("style");
        style.id = STYLE_ID;
        style.textContent = CSS;
        (document.head || document.documentElement).appendChild(style);
        return style;
      }

      /* The settings page exposes no stable root hook, and each section is mounted on
     its own, so the HUD is attached to the center column while settings is open and
     removed as soon as the chat composer comes back. */
  const SETTINGS_ATTR = "data-dsh-skin-settings";
  function installSettingsHud() {
    let marked = null;
    let active = false;
    let misses = 0;
    let lastRoot = null;
    const clear = () => {
      if (marked !== null) {
        marked.removeAttribute(SETTINGS_ATTR);
        marked.querySelector(".dsh-skin-hudchip")?.remove();
      }
      marked = null;
    };
    /* Settings is mounted inside the center column, over the chat view, and only one
       section (account) is mounted at a time. The account section is therefore only the
       "settings opened" cue; the HUD is attached to the deepest ancestor of that section
       that still sits directly under the center column, i.e. the settings view itself.
       Attaching to the column would leave the HUD floating over the chat once settings
       closes, which is the bug this replaces. */
    const column = () =>
      document.querySelector(".mP3x-q_centerCol") ?? document.querySelector(".an3WzG_root") ?? null;
    const viewRoot = (account, col) => {
      if (account === null || col === null) return null;
      const dialog = account.closest('[role="dialog"],[aria-modal="true"]');
      if (dialog !== null) return dialog;
      let node = account;
      while (node.parentElement !== null && node.parentElement !== col) node = node.parentElement;
      return node;
    };
    const sync = () => {
      const col = column();
      const account = document.querySelector("._6qcDqa_section");
      if (account !== null) {
        active = true;
        misses = 0;
        lastRoot = viewRoot(account, col) ?? lastRoot;
      } else if (active && lastRoot !== null && !lastRoot.isConnected) {
        /* Settings closed: the view it was mounted in left the document. Give the shell
           one extra pass to mount a new view (tab switches do that) before dropping. */
        misses += 1;
        if (misses >= 2) {
          active = false;
          lastRoot = null;
        }
      } else {
        misses = 0;
      }
      if (col === null || !active || lastRoot === null || !lastRoot.isConnected) {
        clear();
        return;
      }
      if (lastRoot === marked) return;
      clear();
      lastRoot.setAttribute(SETTINGS_ATTR, "");
      marked = lastRoot;
      if (lastRoot.querySelector(".dsh-skin-hudchip") === null) {
        const chip = document.createElement("div");
        chip.className = "dsh-skin-hudchip";
        chip.textContent = "SYS://SETTINGS";
        lastRoot.appendChild(chip);
      }
    };
    const leave = (event) => {
      if (!active) return;
      /* The account section is proof that settings is open, so never drop the HUD then. */
      if (document.querySelector("._6qcDqa_section") !== null) return;
      const target = event.target;
      if (!(target instanceof Element)) return;
      /* Any pointer press outside the settings view means it is closing (backdrop) or
         already gone; presses inside it must keep the HUD. This is what removes the HUD
         on the click that closes settings instead of on the next unrelated click. */
      if (marked !== null && marked.contains(target)) return;
      active = false;
      lastRoot = null;
      clear();
    };
    const onKeyDown = (event) => {
      if (!active || event.key !== "Escape") return;
      /* Let the shell handle Escape first, then check whether settings really closed:
         while it is open the account section is re-mounted by the first tab. */
      window.setTimeout(() => {
        if (active && document.querySelector("._6qcDqa_section") === null) {
          active = false;
          lastRoot = null;
          clear();
        }
      }, 260);
    };
    const observer = new MutationObserver(sync);
    observer.observe(document.body, { childList: true, subtree: true });
    /* The observer is the fast path; this poll only catches changes it cannot see
       (inner settlement without a childList mutation), so 1.5 s is plenty. */
    const stopSyncPoll = pollWhileVisible(sync, 1500);
    document.addEventListener("keydown", onKeyDown, true);
    document.addEventListener("pointerdown", leave, true);
    sync();
    return () => {
      observer.disconnect();
      stopSyncPoll();
      document.removeEventListener("pointerdown", leave, true);
      document.removeEventListener("keydown", onKeyDown, true);
      clear();
    };
  }


  const module = { exports: {} };

      /**
       * The shell answers a thrown activation with "entry did not activate" and reloads
       * the whole document, so a single broken installer used to become a reload loop.
       * Isolating each step keeps the failure local: the rest of the skin still applies
       * and the page is never reloaded.
       */
      function noteProblem(step, error) {
        const message = step + ": " + String(error && error.stack ? error.stack : error);
        try {
          /* Recorded, not thrown: the shell reloads the page on a failed activation and
             this array is the only way a skin bug becomes visible after that reload. */
          window.__cyberpunkProblems = (window.__cyberpunkProblems ?? []).concat(message);
        } catch (ignored) {
          /* nothing else can be done from a bundle without a console */
        }
        try {
          /* Also on the console: the desktop shell copies renderer error lines into its
             web-boot crash log, which is the only channel readable from outside. */
          console.error("[cyberpunk] " + message);
        } catch (ignored) {
          /* a host without console is still fine */
        }
      }

      function attempt(step, run) {
        try {
          const stop = run();
          return typeof stop === "function" ? stop : () => {};
        } catch (error) {
          noteProblem(step, error);
          return () => {};
        }
      }

      /**
       * Mirror a row's status onto the row as `data-dsh-state` (attention / running / done).
       * The list already renders a status dot plus, while a request is open, a compact label;
       * neither is a class the stylesheet can target, and the label disappears the moment the
       * request is answered, so the data attribute written here is both the detection and the
       * reset. A short debounce keeps streaming updates cheap.
       */
      let syncHeaderView = null;

      function installSessionMarks() {
        const ROW = ".wnFoaW_sessionRow";
        /* The status dot already carries the state as a data attribute
           (`<span class="…dot" data-state="warning">`), so a row never has to be recognised
           by its translated label. The previous label matching was also silently broken: its
           literal strings had been double-encoded by an earlier PowerShell edit, so it only
           ever matched the English labels. */
        let timer = 0;
        const mark = (row) => {
          let state = "";
          if (row.querySelector('[data-state="warning"]') !== null) state = "attention";
          if (state === "" && row.querySelector('[data-state="ongoing"]') !== null) state = "running";
          if (state === "" && row.querySelector('[data-state="done"]') !== null) state = "done";
          if (state === "") delete row.dataset.dshState;
          else row.dataset.dshState = state;
        };
        /* The active workspace row has no attribute of its own: the only state fact is the
           folder icon's class, and CSS cannot key a parent selector off a descendant without :has(),
   so the same mark pass sets data-dsh-folder on the row itself.
           Mirror it in the same pass and observer as the session marks, so the stylesheet
           stays querySelector-decidable and no second observer is needed. */
        const markFolder = (row) => {
          if (row.querySelector(".wnFoaW_folderActive") !== null) row.dataset.dshFolder = "active";
          else delete row.dataset.dshFolder;
        };
        const sync = () => {
          timer = 0;
          for (const row of document.querySelectorAll(ROW)) mark(row);
          for (const row of document.querySelectorAll(".wnFoaW_projectRow")) markFolder(row);
          if (syncHeaderView !== null) syncHeaderView();
        };
        const schedule = () => {
          if (timer !== 0) return;
          timer = window.setTimeout(sync, 120);
        };
        const observer = new MutationObserver(schedule);
        observer.observe(document.body ?? document.documentElement, {
          childList: true,
          subtree: true,
          characterData: true,
          attributes: true,
          attributeFilter: ["data-state", "class"],
        });
        schedule();
        return () => {
          observer.disconnect();
          if (timer !== 0) window.clearTimeout(timer);
          for (const row of document.querySelectorAll(ROW)) delete row.dataset.dshState;
          for (const row of document.querySelectorAll(".wnFoaW_projectRow")) delete row.dataset.dshFolder;
        };
      }

      /** Run a cheap reconciliation on a timer, but only while the document is
       *  visible: a minimised or backgrounded window has no reason to keep
       *  querying the DOM, and every poll here is a safety net, not a render path. */
      function pollWhileVisible(run, every) {
        let timer = 0;
        const start = () => {
          if (timer !== 0) return;
          timer = window.setInterval(run, every);
        };
        const stop = () => {
          if (timer === 0) return;
          window.clearInterval(timer);
          timer = 0;
        };
        const onVisibility = () => {
          if (document.hidden === true) {
            stop();
            return;
          }
          run();
          start();
        };
        document.addEventListener("visibilitychange", onVisibility);
        run();
        start();
        return () => {
          stop();
          document.removeEventListener("visibilitychange", onVisibility);
        };
      }
      /* ---------------- theme control section ---------------- */
      /** Effect groups the control page can switch off. Ids double as the tokens
       *  written to <body data-dsh-off> and matched by the sheet. */
      const SKIN_FEATURES = [
        { id: "breath", label: "中栏边框呼吸灯", hint: "边框缓慢明暗一次，速度在下方调节" },
        { id: "sweep", label: "选中行扫光", hint: "选中会话时的横向光带与呼吸轮廓" },
        { id: "marks", label: "会话状态标记", hint: "待审批黄框 / 运行中脉冲条 / 已完成描边" },
        { id: "hud", label: "设置页 HUD", hint: "四角角标、网格底纹与 SYS 芯片" },
        { id: "code", label: "代码块装饰", hint: "语言标签与复制按钮的霓虹描边" },
      ];
      /** Edge groups whose colour and strength the control page can change. Each
       *  entry pairs a label with the two custom properties the sheet reads. */
      const EDGE_GROUPS = [
        { id: "cols", label: "三栏边框", hint: "左 / 中 / 右三栏的外框", colorVar: "--csk-edge-color", alphaVar: "--csk-edge-alpha" },
        { id: "blocks", label: "侧栏玻璃块", hint: "新建会话 / 会话列表 / 用户名行", colorVar: "--csk-block-color", alphaVar: "--csk-block-alpha" },
        { id: "card", label: "输入框描边", hint: "输入卡片的外圈", colorVar: "--csk-card-color", alphaVar: "--csk-card-alpha" },
      ];
      const SKIN_STATE_KEY = "dsh-cyberpunk-state";
      /* Shared by the control page instance; the page is a singleton in settings. */
      let resetTimer = 0;
      const BREATH_MIN = 1.5;
      const BREATH_MAX = 12;
      function isDarkTheme() {
        return document.body !== null && document.body.hasAttribute("data-ds-dark-theme");
      }
      /** Theme defaults: the sheet itself falls back to these when no inline
       *  variable is present, so the pickers just mirror them. */
      function edgeDefaults() {
        const base = isDarkTheme() ? "#22e8ff" : "#6d3bd1";
        return {
          cols: { color: base, alpha: isDarkTheme() ? 44 : 66 },
          blocks: { color: base, alpha: 30 },
          card: { color: base, alpha: isDarkTheme() ? 14 : 16 },
        };
      }
      function skinStateDefaults() {
        const features = {};
        for (const feature of SKIN_FEATURES) features[feature.id] = true;
        const edges = edgeDefaults();
        for (const group of EDGE_GROUPS) edges[group.id].custom = false;
        return { features, edges, accent: { color: "#00e5ff", custom: false }, breath: 5.6 };
      }
      function clampNumber(value, min, max, fallback) {
        const number = typeof value === "number" ? value : Number(value);
        if (!Number.isFinite(number)) return fallback;
        return Math.min(max, Math.max(min, number));
      }
      function readSkinState() {
        const state = skinStateDefaults();
        try {
          const raw = window.localStorage.getItem(SKIN_STATE_KEY);
          if (raw === null) return state;
          const saved = JSON.parse(raw);
          if (saved === null || typeof saved !== "object") return state;
          const features = saved.features !== null && typeof saved.features === "object" ? saved.features : {};
          for (const feature of SKIN_FEATURES) {
            if (typeof features[feature.id] === "boolean") state.features[feature.id] = features[feature.id];
          }
          state.breath = clampNumber(saved.breath, BREATH_MIN, BREATH_MAX, state.breath);
          const edges = saved.edges !== null && typeof saved.edges === "object" ? saved.edges : {};
          for (const group of EDGE_GROUPS) {
            const savedEdge = edges[group.id];
            if (savedEdge === null || typeof savedEdge !== "object") continue;
            if (typeof savedEdge.color === "string" && /^#[0-9a-f]{6}$/i.test(savedEdge.color)) {
              state.edges[group.id].color = savedEdge.color;
            }
            state.edges[group.id].alpha = clampNumber(savedEdge.alpha, 0, 100, state.edges[group.id].alpha);
            state.edges[group.id].custom = savedEdge.custom === true;
          }
          const accent = saved.accent;
          if (
            accent !== null &&
            typeof accent === "object" &&
            typeof accent.color === "string" &&
            /^#[0-9a-f]{6}$/i.test(accent.color)
          ) {
            state.accent = { color: accent.color, custom: accent.custom === true };
          }
        } catch (error) {
          /* Corrupt or unavailable storage keeps the defaults. */
        }
        return state;
      }
      function writeSkinState(state) {
        try {
          window.localStorage.setItem(SKIN_STATE_KEY, JSON.stringify(state));
        } catch (error) {
          /* Private mode without storage: the change still applies to this page. */
        }
      }
      /* The control page and the general-page row each keep their own copy of the state. They
         are never visible at the same time, but a switch flipped in one has to be reflected by
         the other as soon as it mounts - and a stale copy would also let the second surface
         overwrite a colour picked in the first. One window event keeps them in step without
         wiring the two components together. */
      const SKIN_STATE_EVENT = "dsh-skin-state";
      function announceSkinState(state) {
        try {
          window.dispatchEvent(new CustomEvent(SKIN_STATE_EVENT, { detail: state }));
        } catch (error) {
          noteProblem("state-event", error);
        }
      }
      /** State shared by both settings surfaces: local copy plus a listener for the writes. */
      function useSkinState() {
        const [state, setState] = React.useState(readSkinState);
        React.useEffect(() => {
          const onState = (event) => {
            const next = event.detail;
            if (next !== null && typeof next === "object") setState(next);
          };
          window.addEventListener(SKIN_STATE_EVENT, onState);
          return () => window.removeEventListener(SKIN_STATE_EVENT, onState);
        }, []);
        return [state, setState];
      }
      function applySkinState(state) {
        const body = document.body;
        if (body === null) return;
        const off = SKIN_FEATURES.filter((feature) => state.features[feature.id] !== true).map((feature) => feature.id);
        if (off.length === 0) delete body.dataset.dshOff;
        else body.dataset.dshOff = off.join(" ");
        const style = body.style;
        for (const group of EDGE_GROUPS) {
          const edge = state.edges[group.id];
          if (edge === void 0) continue;
          /* Untouched groups stay on the theme's own token values. */
          if (edge.custom !== true) {
            style.removeProperty(group.colorVar);
            style.removeProperty(group.alphaVar);
            continue;
          }
          style.setProperty(group.colorVar, edge.color);
          style.setProperty(group.alphaVar, String(edge.alpha) + "%");
        }
        /* The accent pair drives links, focus rings, the sweep and the HUD brackets. A picker
           only has to move the base colour: the bright one is derived so the pair cannot drift. */
        const accent = state.accent;
        if (accent !== void 0 && accent.custom === true && /^#[0-9a-f]{6}$/i.test(accent.color)) {
          style.setProperty("--csk-accent", accent.color);
          /* Derived against the surface token rather than a fixed white: in the light theme the
             "bright" accent is the darker one, and mixing toward the page colour follows the
             active theme without a second theme listener. */
          style.setProperty(
            "--csk-accent-bright",
            "color-mix(in srgb, var(--csk-accent) 78%, var(--dsw-alias-bg-base))",
          );
        } else {
          style.removeProperty("--csk-accent");
          style.removeProperty("--csk-accent-bright");
        }
        style.setProperty("--csk-breath-duration", String(state.breath) + "s");
        /* Announced from here rather than from the two components, so a new caller cannot
           forget it and leave the other surface showing a stale value. */
        announceSkinState(state);
      }
      function ThemeSection() {
        const [state, setState] = useSkinState();
        const commit = (next) => {
          setState(next);
          writeSkinState(next);
          applySkinState(next);
        };
        const toggle = (id) => {
          const next = Object.assign({}, state, { features: Object.assign({}, state.features) });
          next.features[id] = state.features[id] !== true;
          commit(next);
        };
        const setEdge = (id, patch) => {
          const next = Object.assign({}, state, { edges: Object.assign({}, state.edges) });
          next.edges[id] = Object.assign({}, state.edges[id], patch, { custom: true });
          if (typeof next.edges[id].alpha === "number") next.edges[id].alpha = Math.max(8, Math.min(100, next.edges[id].alpha));
          commit(next);
        };
        const setBreath = (value) => commit(Object.assign({}, state, { breath: value }));
        const setAccent = (color) =>
          commit(Object.assign({}, state, { accent: { color: color, custom: true } }));
        const resetAccent = () =>
          commit(Object.assign({}, state, { accent: { color: state.accent.color, custom: false } }));
        const resetEdge = (id) => {
          const defaults = edgeDefaults()[id];
          const next = Object.assign({}, state, { edges: Object.assign({}, state.edges) });
          next.edges[id] = { color: defaults.color, alpha: defaults.alpha, custom: false };
          commit(next);
        };
        /* One press must not throw away every colour the user picked: the button
           turns into a confirm for four seconds, then falls back on its own. */
        const [confirming, setConfirming] = React.useState(false);
        const reset = () => {
          if (confirming !== true) {
            setConfirming(true);
            window.clearTimeout(resetTimer);
            resetTimer = window.setTimeout(() => setConfirming(false), 4000);
            return;
          }
          window.clearTimeout(resetTimer);
          setConfirming(false);
          commit(skinStateDefaults());
        };
        const toggleRow = (feature) =>
          React.createElement(
            "button",
            {
              key: feature.id,
              type: "button",
              role: "switch",
              "aria-checked": state.features[feature.id] === true,
              className: "dsh-skin-row",
              onClick: () => toggle(feature.id),
            },
            React.createElement(
              "span",
              { className: "dsh-skin-row-text" },
              React.createElement("span", { className: "dsh-skin-row-label" }, feature.label),
              React.createElement("span", { className: "dsh-skin-row-hint" }, feature.hint),
            ),
            React.createElement(
              "span",
              { className: "dsh-skin-switch", "data-on": String(state.features[feature.id] === true) },
              React.createElement("span", { className: "dsh-skin-switch-dot" }),
            ),
          );
        const edgeRow = (group) => {
          const edge = state.edges[group.id];
          return React.createElement(
            "div",
            { key: group.id, className: "dsh-skin-field" },
            React.createElement("span", { className: "dsh-skin-field-label" }, state.edges[group.id].custom === true ? group.label : group.label + " · 跟随主题"),
            React.createElement("input", {
              type: "color",
              className: "dsh-skin-swatch",
              value: edge.color,
              title: group.hint,
              "aria-label": group.label + "颜色",
              onChange: (event) => setEdge(group.id, { color: event.target.value }),
            }),
            React.createElement("input", {
              type: "range",
              className: "dsh-skin-range",
              min: 8,
              max: 100,
              step: 1,
              value: edge.alpha,
              "aria-label": group.label + "不透明度",
              onChange: (event) => setEdge(group.id, { alpha: Number(event.target.value) }),
            }),
            React.createElement("span", { className: "dsh-skin-value" }, String(edge.alpha) + "%"),
            edge.custom === true
              ? React.createElement("button", {
                  type: "button",
                  className: "dsh-skin-field-reset",
                  title: "恢复该组默认值并重新跟随主题",
                  onClick: () => resetEdge(group.id),
                }, "复位")
              : null,
          );
        };
        const accentRow = React.createElement(
          "div",
          { className: "dsh-skin-field" },
          React.createElement(
            "span",
            { className: "dsh-skin-field-label" },
            state.accent.custom === true ? "主色" : "主色 · 跟随主题",
          ),
          React.createElement("input", {
            type: "color",
            className: "dsh-skin-swatch",
            value: state.accent.color,
            title: "链接、焦点环、选中扫光与 HUD 角标的主色",
            "aria-label": "主色",
            onChange: (event) => setAccent(event.target.value),
          }),
          state.accent.custom === true
            ? React.createElement(
                "button",
                {
                  type: "button",
                  className: "dsh-skin-field-reset",
                  title: "恢复默认主色并重新跟随主题",
                  onClick: resetAccent,
                },
                "复位",
              )
            : null,
        );
        return React.createElement(
          "div",
          { className: "dsh-skin-page" },
          React.createElement(
            "div",
            { className: "dsh-skin-hero" },
            React.createElement("div", { className: "dsh-skin-hero-title" }, "CYBERPUNK SKIN"),
            React.createElement("div", { className: "dsh-skin-hero-sub" }, "NIGHT CITY // SKIN CONTROL · 改动即时生效"),
          ),
          React.createElement("div", { className: "dsh-skin-group-title" }, "主色"),
          React.createElement("div", { className: "dsh-skin-group" }, accentRow),
          SKIN_FEATURES.map(toggleRow),
          React.createElement("div", { className: "dsh-skin-group-title" }, "边框颜色与不透明度"),
          React.createElement("div", { className: "dsh-skin-group" }, EDGE_GROUPS.map(edgeRow)),
          React.createElement("div", { className: "dsh-skin-group-title" }, "呼吸灯"),
          React.createElement(
            "div",
            { className: "dsh-skin-field" },
            React.createElement("span", { className: "dsh-skin-field-label" }, "呼吸速度"),
            React.createElement("input", {
              type: "range",
              className: "dsh-skin-range",
              min: BREATH_MIN,
              max: BREATH_MAX,
              step: 0.1,
              value: state.breath,
              "aria-label": "呼吸速度",
              onChange: (event) => setBreath(Number(event.target.value)),
            }),
            React.createElement("span", { className: "dsh-skin-value" }, state.breath.toFixed(1) + "s"),
          ),
          React.createElement("button", { type: "button", className: "dsh-skin-reset", "data-confirming": String(confirming === true), onClick: reset }, confirming === true ? "确认恢复全部默认？" : "全部恢复默认"),
        );
      }
      /** Compact entry inside 设置 → 通用: the five feature switches, plus a pointer to the
       *  full page for colours and breath speed. One row instead of five keeps the general
       *  list from being taken over by a single plugin. */
      function SkinSummaryRow() {
        const [state, setState] = useSkinState();
        const commit = (next) => {
          setState(next);
          writeSkinState(next);
          applySkinState(next);
        };
        const toggle = (id) => {
          const features = Object.assign({}, state.features);
          features[id] = features[id] !== true;
          commit(Object.assign({}, state, { features }));
        };
        return React.createElement(
          "div",
          { className: "dsh-skin-gitem" },
          React.createElement(
            "div",
            { className: "dsh-skin-gitem-head" },
            React.createElement("span", { className: "dsh-skin-gitem-title" }, "赛博皮肤"),
            React.createElement("span", { className: "dsh-skin-gitem-hint" }, "边框颜色、呼吸速度与分组复位在「设置 → 赛博皮肤」"),
          ),
          React.createElement(
            "div",
            { className: "dsh-skin-gitem-switches" },
            SKIN_FEATURES.map((feature) =>
              React.createElement(
                "button",
                {
                  key: feature.id,
                  type: "button",
                  role: "switch",
                  "aria-checked": String(state.features[feature.id] === true),
                  className: "dsh-skin-chip",
                  "data-on": String(state.features[feature.id] === true),
                  title: feature.hint,
                  onClick: () => toggle(feature.id),
                },
                feature.label,
              ),
            ),
          ),
        );
      }
      const SKIN_LOCALE = "ui-cyberpunk";
      const SKIN_NAV_LABEL = { zh: "赛博皮肤", en: "Cyberpunk skin" };
      /** Nav label through the shell's locale plugin when it is present; the
       *  hard-coded pair is only a fallback for a host without locale support. */
      function skinNavLabel(ctx) {
        /* cordis throws on reading a service that the plugin did not declare in `inject`
           ("cannot get property "locale" without inject"), and that throw used to take the
           whole settings section down. Read through a guard so a host without locale still
           gets the hard-coded label. */
        let locale;
        try {
          locale = ctx === null || ctx === void 0 ? void 0 : ctx.locale;
        } catch (error) {
          locale = void 0;
        }
        if (locale === void 0 || typeof locale.bind !== "function") return () => SKIN_NAV_LABEL.zh;
        try {
          const bind = locale.bind(SKIN_LOCALE);
          return () => bind("nav");
        } catch (error) {
          return () => SKIN_NAV_LABEL.zh;
        }
      }
      function installThemeSection(ctx) {
        if (React === null) {
          return () => {};
        }
        if (ctx === null || ctx === void 0 || ctx.slots === void 0) return () => {};
        if (typeof ctx.slots.register !== "function" || typeof ctx.slots.inject !== "function") return () => {};
        const label = skinNavLabel(ctx);
        /* Same "without inject" guard as skinNavLabel: never touch the property unless the
           plugin declared the service (see `module.exports.inject`). */
        let localeService;
        try {
          localeService = ctx.locale;
        } catch (error) {
          localeService = void 0;
        }
        /* Register the two labels the shell can ask for; a host without locale
           support simply never consumes them. */
        if (localeService !== void 0 && typeof localeService.register === "function") {
          const registerLocale = () => localeService.register(SKIN_LOCALE, {
            zh: { nav: SKIN_NAV_LABEL.zh },
            en: { nav: SKIN_NAV_LABEL.en },
          });
          try {
            if (typeof ctx.effect === "function") ctx.effect(registerLocale, "ui-cyberpunk: locale");
            else registerLocale();
          } catch (error) {
            /* A locale plugin that refuses duplicate registration must not block the page. */
          }
        }
        const register = () =>
          ctx.slots.register(
            {
              name: "settings.section",
              id: "cyberpunk-theme",
              /* 5 keeps the entry next to 通用 (0) instead of after every official
                 section (models 10, plugins 15, agent-presets 20). */
              order: 5,
              /* The shell resolves the label while rendering the nav; a locale binding that
                 throws there would take the whole section off the list, so the fallback is
                 inside the function rather than at creation time. */
              label: () => {
                try {
                  return label();
                } catch (error) {
                        return SKIN_NAV_LABEL.zh;
                }
              },
              locale: SKIN_LOCALE,
              inject: () => ({}),
            },
            ThemeSection,
          );
        /* The effect body runs during activation. An error thrown here escapes the
           try/catch below (which only guards the ctx.effect call itself) and makes the
           shell mark the entry failed -> "import failed" -> full document reload. Record
           it instead so the page keeps working and the cause becomes readable. */
        const safeRegister = () => {
          try {
            const stop = ctx.slots.inject("settings.section", register);
            return stop;
          } catch (error) {
            noteProblem("theme-section:inject", error);
            return () => {};
          }
        };
        try {
          if (typeof ctx.effect === "function") {
            ctx.effect(safeRegister, "ui-cyberpunk: theme section");
            return () => {};
          }
          const stop = safeRegister();
          return typeof stop === "function" ? stop : () => {};
        } catch (error) {
          attempt("theme-section", () => {
            throw error;
          });
          return () => {};
        }
      }


      /** 设置 → 通用 里的一行摘要：feature switches live where the user already is, while
       *  the colours and the reset controls stay on the skin's own page. */
      function installGeneralRow(ctx) {
        if (React === null) return () => {};
        if (ctx === null || ctx === void 0 || ctx.slots === void 0) return () => {};
        if (typeof ctx.slots.register !== "function" || typeof ctx.slots.inject !== "function") {
          return () => {};
        }
        const register = () =>
          ctx.slots.register(
            {
              name: "settings.general.item",
              id: "cyberpunk",
              /* Appends after 外观 (10) and 字号 (11) and stays clear of 开发者工具 (15)
                 and the rows the shell adds at 16-20. */
              order: 12,
              locale: SKIN_LOCALE,
              inject: () => ({}),
            },
            SkinSummaryRow,
          );
        try {
          const stop = ctx.slots.inject("settings.general.item", register);
          return typeof stop === "function" ? stop : () => {};
        } catch (error) {
          noteProblem("general-row", error);
          return () => {};
        }
      }

      /* The sidebar field is not centred in its column and the footer slot spans the full width,
       * so its cards reached the column frame. Both gaps are host side-effects (a scroller rail
       * on one side, a full-bleed slot on the other) and both change with the window width and
       * with the presence of the scrollbar - which is why every fixed inset tried before landed
       * off-centre at some size. They are therefore measured and written as inline insets:
       *   - the root is offset by (right gutter - left gutter), which by construction puts the
       *     panel centre on the column centre whatever the host gutters are;
       *   - the footer slot is then inset onto the panel boxes above, so the cards share their
       *     exact left and right edges. */
      function installColumnAlign() {
        if (typeof document === "undefined") return () => {};
        const timers = [];
        const applied = [];
        /* A rail (collapsed) column is ~36px wide and has no panel field: every measurement
           taken there is meaningless, and a stale inline padding from the expanded state would
           crush the rail. Anything beyond these bounds therefore means "the geometry is not
           what this routine understands" - drop our insets and leave the host's layout alone. */
        const MAX_SHIFT = 32;
        const MIN_COLUMN = 96;
        const clear = (element) => {
          if (element === null || element === undefined) return;
          /* A re-render can replace the sidebar nodes mid-session; a reference to a node that
             left the document is dead weight that would otherwise accumulate until dispose. */
          if (element.isConnected === false) {
            const stale = applied.indexOf(element);
            if (stale !== -1) applied.splice(stale, 1);
          }
          element.style.paddingLeft = "";
          element.style.paddingRight = "";
          element.style.marginLeft = "";
          element.style.marginRight = "";
          element.style.boxSizing = "";
        };
        const inset = (element, left, right) => {
          if (element === null || element === undefined) return false;
          element.style.marginLeft = "0px";
          element.style.marginRight = "0px";
          element.style.paddingLeft = "0px";
          element.style.paddingRight = "0px";
          element.style.boxSizing = "border-box";
          if (applied.indexOf(element) === -1) applied.push(element);
          const rect = element.getBoundingClientRect();
          const deltaLeft = left - rect.left;
          const deltaRight = rect.right - right;
          if (Math.abs(deltaLeft) > MAX_SHIFT || Math.abs(deltaRight) > MAX_SHIFT) {
            clear(element);
            return false;
          }
          if (deltaLeft >= 0) element.style.paddingLeft = `${deltaLeft.toFixed(2)}px`;
          else element.style.marginLeft = `${deltaLeft.toFixed(2)}px`;
          if (deltaRight >= 0) element.style.paddingRight = `${deltaRight.toFixed(2)}px`;
          else element.style.marginRight = `${(-deltaRight).toFixed(2)}px`;
          return true;
        };
        /* The root's parent is a `display:contents` slot wrapper with no box, so reading it as
           the column yields 0x0 and a nonsense shift. Climb to the first ancestor that draws a
           box - on the measured window that is `.mP3x-q_sidebarCol`. */
        const columnOf = (root) => {
          let node = root.parentElement;
          while (node !== null && node !== document.body) {
            if (node.getBoundingClientRect().width > 1) return node;
            node = node.parentElement;
          }
          return null;
        };
        const align = () => {
          const root = document.querySelector(".wtg9ga_root");
          if (root === null) return;
          const column = columnOf(root);
          if (column === null) return;
          const panel =
            root.querySelector(".wtg9ga_panelList") ?? root.querySelector(".GAkraW_root:not(.GAkraW_rail)");
          const box = column.getBoundingClientRect();
          if (root.classList.contains("wtg9ga_collapsed") || box.width < MIN_COLUMN || panel === null) {
            clear(root);
            const footerElement = root.querySelector(".wtg9ga_footArea");
            clear(footerElement);
            return;
          }
          root.style.paddingLeft = "";
          root.style.paddingRight = "";
          if (applied.indexOf(root) === -1) applied.push(root);
          const rootRect = root.getBoundingClientRect();
          const field = panel.getBoundingClientRect();
          /* Root and column differ in origin and width: the host sizes the root from the
             sidebar setting while the track is that minus the frame gap (measured: root
             6..361, column 6..355). Derive both paddings from the two rectangles, keeping the
             panel's width: content lands on [column.left + g, column.right - g]. */
          const g = Math.max(0, (box.width - field.width) / 2);
          const padLeft = box.left + g - rootRect.left;
          const padRight = rootRect.right - (box.right - g);
          if (padLeft < 0 || padRight < 0 || padLeft > MAX_SHIFT || padRight > MAX_SHIFT) {
            clear(root);
          } else {
            root.style.paddingLeft = `${padLeft.toFixed(2)}px`;
            root.style.paddingRight = `${padRight.toFixed(2)}px`;
          }
          /* Verify against the column's centre - the thing we are aiming at - not the root's,
             which sits off-centre whenever the host pads the column unevenly. */
          const targetCentre = box.left + box.width / 2;
          const placed = panel.getBoundingClientRect();
          const offCentre = Math.abs(placed.left + placed.width / 2 - targetCentre);
          if (offCentre > 8) clear(root);
          const footer = root.querySelector(".wtg9ga_footArea");
          if (footer === null) return;
          const bounds = panel.getBoundingClientRect();
          inset(footer, bounds.left, bounds.right);
        };
        const run = () => {
          try {
            align();
          } catch (error) {
            noteProblem("column-align", error);
          }
        };
        /* The sidebar mounts late and animates in for 150ms, so measure a few times instead of
           once; a resize can also bring the scrollbar in or out. Collapsing to the rail swaps
           the measured geometry entirely, so that is watched as well. */
        for (const delay of [0, 120, 400, 900, 1600]) {
          timers.push(window.setTimeout(run, delay));
        }
        /* Resizing fires continuously while the window is dragged and every pass forces a
           layout read, so coalesce the calls instead of measuring on each event. */
        let resizeTimer = 0;
        const onResize = () => {
          window.clearTimeout(resizeTimer);
          resizeTimer = window.setTimeout(run, 120);
        };
        window.addEventListener("resize", onResize);
        let collapseWatcher = null;
        let sizeWatcher = null;
        const watch = (node) => {
          if (node === null || typeof MutationObserver !== "function") return null;
          const watcher = new MutationObserver(run);
          watcher.observe(node, { attributes: true, attributeFilter: ["class"] });
          return watcher;
        };
        /* Dragging the sidebar changes its width without firing a window resize, and the
           gutters the insets correct for change with it - so watch the column's box too.
           The column is the host's own element, so our writing the root's padding cannot feed
           back into it and retrigger the observer. */
        const watchSize = (node) => {
          if (node === null || typeof ResizeObserver !== "function") return null;
          let lastWidth = node.getBoundingClientRect().width;
          const watcher = new ResizeObserver(() => {
            const width = node.getBoundingClientRect().width;
            if (Math.abs(width - lastWidth) < 1) return;
            lastWidth = width;
            onResize();
          });
          watcher.observe(node, { box: "border-box" });
          return watcher;
        };
        const attach = () => {
          const root = document.querySelector(".wtg9ga_root");
          if (root === null) return false;
          if (collapseWatcher === null) collapseWatcher = watch(root);
          if (sizeWatcher === null) sizeWatcher = watchSize(root.parentElement ?? root);
          return collapseWatcher !== null && sizeWatcher !== null;
        };
        attach();
        /* A late mount has no root to watch yet: attach the watchers once the shell is up. */
        timers.push(
          window.setTimeout(() => {
            attach();
          }, 1200),
        );
        return () => {
          for (const timer of timers) window.clearTimeout(timer);
          window.clearTimeout(resizeTimer);
          window.removeEventListener("resize", onResize);
          if (collapseWatcher !== null) collapseWatcher.disconnect();
          if (sizeWatcher !== null) sizeWatcher.disconnect();
          for (const element of applied) clear(element);
          applied.length = 0;
        };
      }

      /* The chat header's height is not fixed: it drops the tab row when a conversation has no
         tabs and collapses entirely in the blank variant. CSS therefore cannot know how much
         room the transcript has to reserve, so its real height is published as
         `--csk-header-h` on the conversation root and kept current by a ResizeObserver.
         Width does need measurement: `--dsh-chat-content-width` is declared on `.an3WzG_body`,
         a sibling of the header, so the card cannot inherit it and the falling back to a fixed
         value makes the card narrower than the text. The measured column width is copied onto
         the card instead, and CSS only centres it. */
      function installHeaderOverlay() {
        const timers = [];
        const rootOf = () => document.querySelector(".an3WzG_root");
        /* The card is not a direct child of `.an3WzG_root`: the shell renders it inside
           `.an3WzG_body` (which is the positioned ancestor), so a `:scope >` lookup misses it
           entirely and every measurement silently bailed out. */
        const headerOf = (root) => (root === null ? null : root.querySelector(".an3WzG_header"));
        /* The message column is flagged in JSX (`data-chat-flow`), while the hashed class name
           depends on the build; query the attribute first and keep the class as a fallback. */
        const columnOf = (root) => root === null ? null : (root.querySelector("[data-chat-flow]") ?? root.querySelector(".V4vHZW_column"));
        const measure = () => {
          const root = rootOf();
          const header = headerOf(root);
          if (root === null || header === null) return;
          /* Measured to the card's bottom edge rather than its height: the card floats 8px
             below the column top, and the transcript has to clear that offset as well. */
          const height = Math.round(header.getBoundingClientRect().bottom - root.getBoundingClientRect().top);
          if (height > 0) root.style.setProperty("--csk-header-h", height + "px");
          /* Width: the message column is the ground truth. `--dsh-chat-content-width` is declared
             on `.an3WzG_body` — a sibling of the header — so the header cannot inherit it, and
             that token itself resolves from a JS-published column width. Copying the measured
             column width keeps the card locked to the text through sidebar drags, window
             resizes and scrollbar appearance alike. The card is centred by CSS
             (`left:0;right:0;margin-inline:auto`), so only the number is written here. */
          const field = columnOf(root);
          if (field !== null && field.clientWidth > 0) {
            header.style.width = field.clientWidth + "px";
          } else {
            header.style.removeProperty("width");
          }

          /* Transcript vs other pane: the transcript reserves room inside its own scroller
             (so messages slide under the glass card), every other view has to reserve it on
             the view area instead, otherwise its first rows hide behind the card. */
          const area = root.querySelector(".an3WzG_viewArea");
          if (area !== null) {
            const kind = area.querySelector("[data-chat-flow]") !== null ? "chat" : "pane";
            if (area.dataset.dshView !== kind) area.dataset.dshView = kind;
          }
        };
        syncHeaderView = measure;
        measure();
        let watcher = null;
        const attach = () => {
          const root = rootOf();
          const header = headerOf(root);
          if (header === null || typeof ResizeObserver !== "function") return header !== null;
          watcher = new ResizeObserver(measure);
          watcher.observe(header, { box: "border-box" });
          const scroll = root.querySelector(".V4vHZW_scroll");
          if (scroll !== null) {
            watcher.observe(scroll, { box: "border-box" });
            const field = columnOf(root);
            if (field !== null) watcher.observe(field, { box: "border-box" });
          }
          return true;
        };
        if (!attach()) timers.push(window.setTimeout(attach, 1200));
        window.addEventListener("resize", measure);
        return () => {
          for (const timer of timers) window.clearTimeout(timer);
          window.removeEventListener("resize", measure);
          if (watcher !== null) watcher.disconnect();
          const root = rootOf();
          if (root !== null) root.style.removeProperty("--csk-header-h");
          const header = headerOf(root);
          /* `width` is the only inline property measure() writes; leaving it behind would
             pin the card to a stale column width after the skin is disabled. */
          if (header !== null) header.style.removeProperty("width");
          if (syncHeaderView === measure) syncHeaderView = null;
          const area = root === null ? null : root.querySelector(".an3WzG_viewArea");
          if (area !== null) delete area.dataset.dshView;
        };
      }

      function apply(ctx) {
        /* injectStyle returns the <style> element, not a stop function, so it is captured
           separately; the other installers all return a disposer. */
        let style = null;
        try {
          style = injectStyle();
        } catch (error) {
          attempt("style", () => {
            throw error;
          });
        }
        /* Nothing is drawn over the shell's boot: anything painted before the shell
           settles would be discarded and painted again on its retry reload, and anything
           painted after the boot card is already on screen would read as a second boot
           screen. The token gate below keeps the card on the host's own palette too. */
        applySkinState(readSkinState());
        const stopSkinGate = attempt("skin-gate", armSkin);
        const stopRefreshButton = attempt("refresh", () => installRefreshButton(ctx));
        const stopSettingsRow = attempt("settings-row", installSettingsRow);
        const stopSettingsHud = attempt("settings-hud", installSettingsHud);
        const stopSessionMarks = attempt("session-marks", installSessionMarks);
        const stopReloadKeys = attempt("reload-keys", installReloadKeys);
        const stopThemeSection = attempt("theme-section", () => installThemeSection(ctx));
        const stopGeneralRow = attempt("general-row", () => installGeneralRow(ctx));
        const stopColumnAlign = attempt("column-align", installColumnAlign);
        const stopHeaderOverlay = attempt("header-overlay", installHeaderOverlay);
        const dispose = () => {
          for (const stop of [stopSkinGate, stopRefreshButton, stopSettingsRow, stopSettingsHud, stopSessionMarks, stopReloadKeys, stopThemeSection, stopGeneralRow, stopColumnAlign, stopHeaderOverlay]) stop();
          if (style !== null && typeof style.remove === "function") style.remove();
        };
        if (ctx && typeof ctx.effect === "function") {
          try {
            ctx.effect(() => dispose, "ui-cyberpunk: stylesheet");
          } catch (error) {
            /* An unusable effect registry must not fail activation either. */
          }
        }
        return dispose;
      }

      module.exports.name = "ui-cyberpunk";
      module.exports.apply = apply;
      /* Both services are read by apply(): "slots" for the settings section, "locale" for its
         nav label. cordis throws "cannot get property \"locale\" without inject" when a
         service is read without being declared here - that error used to abort the whole
         theme section, which is why the control page disappeared while the skin stayed. */
      module.exports.inject = ["slots", "locale"];
      return module.exports;
    },
  });
  } catch (error) {
    /* A duplicate load() in the same loader table throws; that case is expected and the
       first registration stays valid. Anything else here means the bundle could not be
       handed to the loader at all, which the shell only reports as "import failed", so
       the reason is pushed to the console for the crash log to pick up. */
    try {
      console.error("[cyberpunk] register failed: " + String(error && error.stack ? error.stack : error));
    } catch (ignored) {
      /* no console available */
    }
  }
})();
