import * as fs from "fs";

const files = fs.readdirSync("/Users/sachabouhamidi/nihongo/prisma")
  .filter(f => f.includes("seed-vocab") || f.includes("seed-levels"));

const allWords = new Set<string>();
let totalEntries = 0;

for (const file of files) {
  const content = fs.readFileSync("/Users/sachabouhamidi/nihongo/prisma/" + file, "utf-8");
  const wordRegex = /word:\s*"([^"]+)"/g;
  let match;
  while ((match = wordRegex.exec(content)) !== null) {
    totalEntries++;
    allWords.add(match[1]);
  }
}

console.log("Total entries in seed files: " + totalEntries);
console.log("Unique words: " + allWords.size);
console.log("Duplicates in seed files: " + (totalEntries - allWords.size));
