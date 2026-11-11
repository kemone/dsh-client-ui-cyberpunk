/**
 * Host half of the cyberpunk skin.
 *
 * The skin is pure CSS applied in the browser, so this half only has to exist:
 * the Loader mounts it, it declares no services and no config, and it never
 * touches the host. Keeping it empty means the plugin cannot break a session
 * start even if the stylesheet is later edited live.
 */

export const name = "ui-cyberpunk";

export function apply() {}
