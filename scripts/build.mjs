import { rm, mkdir, cp, access } from "node:fs/promises";
import path from "node:path";
import esbuild from "esbuild";

const root = process.cwd();
const distDir = path.join(root, "dist");
const srcDir = path.join(root, "src");
const assetsDir = path.join(root, "assets");

async function exists(p) {
  try {
    await access(p);
    return true;
  } catch {
    return false;
  }
}

await rm(distDir, { recursive: true, force: true });
await mkdir(distDir, { recursive: true });

// Copy HTML
await cp(path.join(srcDir, "index.html"), path.join(distDir, "index.html"));
await cp(
  path.join(srcDir, "attribution.html"),
  path.join(distDir, "attribution.html"),
);

// Build JS
await esbuild.build({
  entryPoints: [path.join(srcDir, "app.js")],
  outfile: path.join(distDir, "app.js"),
  bundle: false,
  minify: true,
  sourcemap: true,
  target: ["es2018"],
});

// Build CSS
await esbuild.build({
  entryPoints: [path.join(srcDir, "styles.css")],
  outfile: path.join(distDir, "styles.css"),
  bundle: false,
  minify: true,
  sourcemap: true,
});

// Copy assets (from repo root -> dist/assets)
if (await exists(assetsDir)) {
  await cp(assetsDir, path.join(distDir, "assets"), { recursive: true });
}
