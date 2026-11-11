/**
 * Manifest and package-shape checks that do not need a DSH host.
 *
 * `npm test` runs this after `node --check`, so a release can never ship a
 * package.json that points at a missing file, a patch that lost its entry, or
 * a client bundle whose style list got mangled by an editor.
 */
import { readFileSync, existsSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const problems = [];
const check = (label, ok, detail = "") => {
  if (!ok) problems.push(detail === "" ? label : `${label}: ${detail}`);
};

const pkg = JSON.parse(readFileSync(join(root, "package.json"), "utf8"));

for (const key of ["name", "version", "description", "license", "main", "exports", "files"]) {
  check(`package.json missing "${key}"`, pkg[key] !== undefined);
}
check("version is semver", /^\d+\.\d+\.\d+(-[0-9A-Za-z.-]+)?$/.test(pkg.version ?? ""), pkg.version);
check("license is MIT", pkg.license === "MIT", pkg.license);
check("repository.url is a git URL", /^git\+https?:\/\/.+\.git$/.test(pkg.repository?.url ?? ""), pkg.repository?.url);
check("bugs.url points at an issue tracker", /\/issues$/.test(pkg.bugs?.url ?? ""), pkg.bugs?.url);
check("dsh.bundle.patch is declared", pkg.dsh?.bundle?.patch === "./cordis.patch.yml");
check("dsh.client.platform is web", pkg.dsh?.client?.platform === "web");

for (const file of pkg.files ?? []) {
  check(`files[] entry is missing on disk`, existsSync(join(root, file)), file);
}
for (const [sub, target] of Object.entries(pkg.exports ?? {})) {
  const file = join(root, String(target).replace(/^\.\//, ""));
  check(`exports["${sub}"] target is missing on disk`, existsSync(file), target);
}

const patch = readFileSync(join(root, "cordis.patch.yml"), "utf8");
check("cordis.patch.yml declares the plugin id", /id:\s*ui-cyberpunk/.test(patch));
check("cordis.patch.yml declares the package name", /name:\s*dsh-client-ui-cyberpunk/.test(patch));

const client = readFileSync(join(root, "lib/client.js"), "utf8");
const opens = (client.match(/\{/g) ?? []).length;
const closes = (client.match(/\}/g) ?? []).length;
check("lib/client.js braces are unbalanced", opens === closes, `${opens} { vs ${closes} }`);
check("lib/client.js registers a module factory", /__ModuleLoader__|\.register\(/.test(client));
const rules = (client.match(/^\s*"html body/gm) ?? []).length;
check("lib/client.js has no style rules", rules > 200, `${rules} rules`);
check("lib/client.js has no leftover :has() selector", !/":has\(|,\s*:has\(/.test(client));
check("lib/client.js still references the retired --cp-* tokens", !/--cp-[a-z]/i.test(client));
check("lib/client.js uses the --csk-* token namespace", /--csk-accent/.test(client));

if (problems.length > 0) {
  console.error(`FAILED - ${problems.length} problem(s):`);
  for (const problem of problems) console.error(`  - ${problem}`);
  process.exit(1);
}

console.log(`OK - ${pkg.name}@${pkg.version}, ${rules} style rules, manifest and package shape are consistent`);
