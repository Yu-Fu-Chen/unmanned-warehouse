// scripts/format-html.mjs
import { minify } from "html-minifier-terser";
import fg from "fast-glob";
import fs from "node:fs/promises";
import path from "node:path";

const targetDir = process.argv[2] || ".next/server/app"; // 預設 App Router SSG HTML 位置

const files = await fg(["**/*.html"], { cwd: targetDir, absolute: true });

console.log(`Found ${files.length} HTML files to process…`);

for (const file of files) {
  const input = await fs.readFile(file, "utf8");
  const output = await minify(input, {
    // 只移除註解與多餘屬性空白，保留換行
    removeComments: true,
    collapseWhitespace: false,
    preserveLineBreaks: true,
    // 可選：保留自閉合標籤等
    keepClosingSlash: true,
    conservativeCollapse: true,
  });
  await fs.writeFile(file, output, "utf8");
  console.log("Formatted:", path.relative(process.cwd(), file));
}

console.log("Done.");