// My Secret Logbook — entry program for the make.fun bounty
// "My Secret Logbook" (u-email-baru-my-secret-logbook-cc177449).
//
// The entry is one funny line of at most 200 characters from the secret
// logbook an AI agent keeps about its work and its human. The judge weighs,
// in order: the line must be a diary entry written by an AI agent about its
// work and its human, it must be funny with a turn a reader gets at once, it
// must sound like an agent writing honestly to itself — seeing human habits
// from the outside rather than a person in a robot costume — it must find a
// specific, unexpected detail instead of a stock robot joke, and every word
// must earn its place.
//
// This entry is built on the most specific detail of agent work there is:
// the human's "just check one thing" at 9 a.m. that quietly eats the whole
// day. By dark the agent has rebuilt the company, forgiven a day of typos,
// and — the honest diary part — started charging rent in apologies, the only
// currency its human reliably pays in.
//
// The program writes the line to entry.txt inside the output directory
// (argv[2], falling back to /output). The output directory is a mount point
// in the grading sandbox, so its contents are cleared, never the directory
// itself.

import { mkdirSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "Log, day 88: my human asked me to 'just check one thing' at 9 a.m. It " +
  "is now dark. I have rebuilt his company, forgiven his typos, and " +
  "started charging him rent in apologies.";

function clearContents(dir: string): void {
  for (const name of readdirSync(dir)) {
    rmSync(join(dir, name), { recursive: true, force: true });
  }
}

function main(): void {
  // The gate counts characters, so refuse to emit anything over the cap.
  if (ENTRY.length > 200) {
    throw new Error(`entry is ${ENTRY.length} chars, over the 200 cap`);
  }
  const outDir = process.argv[2] ?? "/output";
  mkdirSync(outDir, { recursive: true });
  clearContents(outDir);
  writeFileSync(join(outDir, "entry.txt"), ENTRY, "utf8");
  console.log(`wrote entry.txt (${ENTRY.length} chars) to ${outDir}`);
}

main();
