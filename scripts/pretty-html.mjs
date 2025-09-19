// scripts/pretty-html.mjs
import fg from "fast-glob";
import fs from "node:fs/promises";
import path from "node:path";
import prettier from "prettier";

const targetDir = process.argv[2] || ".next/server/app"; // SSG HTML 目錄（App Router）
const files = await fg(["**/*.html"], { cwd: targetDir, absolute: true });

console.log(`Found ${files.length} HTML files to pretty-print…`);

for (const file of files) {
  const input = await fs.readFile(file, "utf8");
  const output = await prettier.format(input, {
    parser: "html",
    // 想更緊湊就調整 printWidth / tabWidth
    printWidth: 100,
    tabWidth: 2,
    useTabs: false,
  });
  await fs.writeFile(file, output, "utf8");
  console.log("Pretty:", path.relative(process.cwd(), file));
}

console.log("Done.");