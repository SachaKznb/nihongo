import { PrismaClient } from "@prisma/client";
import Anthropic from "@anthropic-ai/sdk";
import * as fs from "fs";
import * as path from "path";

// Load .env file manually
function loadEnvFile() {
  const envPath = path.join(process.cwd(), ".env");
  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, "utf-8");
    for (const line of envContent.split("\n")) {
      const trimmedLine = line.trim();
      if (trimmedLine && !trimmedLine.startsWith("#")) {
        const [key, ...valueParts] = trimmedLine.split("=");
        if (key && valueParts.length > 0) {
          let value = valueParts.join("=");
          if ((value.startsWith('"') && value.endsWith('"')) ||
              (value.startsWith("'") && value.endsWith("'"))) {
            value = value.slice(1, -1);
          }
          if (!process.env[key]) {
            process.env[key] = value;
          }
        }
      }
    }
  }
}

loadEnvFile();

const prisma = new PrismaClient();

function getAnthropicClient() {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    console.error("\nERROR: ANTHROPIC_API_KEY not set in .env file\n");
    throw new Error("ANTHROPIC_API_KEY environment variable is not set");
  }
  return new Anthropic({ apiKey });
}

interface KanjiItem {
  id: number;
  character: string;
  meaningsFr: string[];
  meaningMnemonicFr: string;
  levelId: number;
  radicals: { radical: { meaningFr: string; character: string | null } }[];
}

function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Evaluate mnemonic quality (same criteria as radical script)
function evaluateMnemonic(mnemonic: string): { score: number; issues: string[] } {
  if (!mnemonic) return { score: 1, issues: ["manquant"] };

  const issues: string[] = [];
  let score = 5;

  // Check length
  if (mnemonic.length < 50) {
    issues.push("trop court (<50 caractères)");
    score -= 2;
  } else if (mnemonic.length < 80) {
    issues.push("court (<80 caractères)");
    score -= 1;
  }

  // Check for story elements
  const storyWords = ["imagine", "comme", "quand", "alors", "soudain", "voilà", "c'est", "regarde"];
  const hasStory = storyWords.some(w => mnemonic.toLowerCase().includes(w));
  if (!hasStory) {
    issues.push("pas d'histoire");
    score -= 1;
  }

  // Check for visual imagery
  const visualWords = ["forme", "ressemble", "trait", "ligne", "carré", "rond", "vertical", "horizontal", "courbe"];
  const hasVisual = visualWords.some(w => mnemonic.toLowerCase().includes(w));
  if (!hasVisual && mnemonic.length < 100) {
    issues.push("manque de description visuelle");
    score -= 0.5;
  }

  // Check for generic/boring patterns
  const boringPatterns = [
    /signifie|représente|symbolise/i,
  ];
  const isBoring = boringPatterns.some(p => p.test(mnemonic));
  if (isBoring && mnemonic.length < 100) {
    issues.push("générique/ennuyeux");
    score -= 1;
  }

  return { score: Math.max(1, Math.min(5, score)), issues };
}

async function generatePremiumMnemonic(
  client: Anthropic,
  kanji: KanjiItem
): Promise<string> {
  // Build radical context
  const radicalInfo = kanji.radicals.map(r =>
    `- ${r.radical.character || "[image]"} = "${r.radical.meaningFr}"`
  ).join("\n");

  const prompt = `Tu es le MEILLEUR créateur de mnémoniques au monde pour l'apprentissage du japonais destiné aux francophones.

KANJI À MÉMORISER:
- Caractère: ${kanji.character}
- Signification(s): ${kanji.meaningsFr.join(", ")}
- Niveau: ${kanji.levelId}

RADICAUX QUI COMPOSENT CE KANJI:
${radicalInfo || "Aucun radical associé"}

MNÉMONIQUE DE SENS ACTUEL (À AMÉLIORER):
"${kanji.meaningMnemonicFr}"

CRÉE UN MNÉMONIQUE DE SENS EXCEPTIONNEL qui respecte ces critères:

1. LONGUEUR: 100-180 caractères (pas plus, pas moins)

2. STRUCTURE OBLIGATOIRE:
   a) Utilise les RADICAUX comme éléments de l'histoire
   b) Chaque radical doit être mentionné par son sens
   c) L'histoire doit ABOUTIR à la signification du kanji (${kanji.meaningsFr[0]})

3. ÉLÉMENTS OBLIGATOIRES:
   - Une HISTOIRE mémorable qui combine les radicaux
   - Au moins une référence FRANÇAISE (lieu, célébrité, nourriture, film, histoire)
   - Un élément ÉMOTIONNEL ou HUMORISTIQUE
   - Un lien CLAIR avec la signification

4. EXEMPLES DE QUALITÉ:
   - Pour 休 (repos) avec radicaux 人 (personne) + 木 (arbre): "Une PERSONNE s'appuie contre un ARBRE pour se REPOSER. Comme un Parisien fatigué qui fait la sieste sous un platane aux Tuileries !"
   - Pour 好 (aimer) avec radicaux 女 (femme) + 子 (enfant): "Une FEMME serre son ENFANT dans ses bras - l'image même de l'AMOUR maternel. Comme les mamans françaises au parc avec leurs petits !"

5. À ÉVITER:
   - Les définitions pures ("Ce kanji signifie...")
   - Ignorer les radicaux
   - Les phrases génériques sans personnalité
   - Les mnémoniques trop courts ou trop longs

Réponds UNIQUEMENT avec le nouveau mnémonique, sans guillemets, sans explications, sans "Voici" ni introduction.`;

  const response = await client.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 400,
    messages: [{ role: "user", content: prompt }],
  });

  const content = response.content[0];
  if (content.type === "text") {
    let text = content.text.trim();
    // Remove any quotes or introductory text
    text = text.replace(/^["']|["']$/g, "");
    text = text.replace(/^(Voici|Nouveau mnémonique|Mnémonique)[:\s]*/i, "");
    return text;
  }
  throw new Error("Unexpected response format");
}

async function main() {
  console.log("=".repeat(80));
  console.log("🎯 KANJI MEANING MNEMONIC IMPROVEMENT SCRIPT (Premium Quality)");
  console.log("=".repeat(80));

  const args = process.argv.slice(2);
  const dryRun = args.includes("--dry-run");
  const forceAll = args.includes("--force-all");
  const limitArg = args.find(a => a.startsWith("--limit="));
  const limit = limitArg ? parseInt(limitArg.split("=")[1]) : undefined;
  const minScoreArg = args.find(a => a.startsWith("--min-score="));
  const minScore = minScoreArg ? parseInt(minScoreArg.split("=")[1]) : 4;
  const levelArg = args.find(a => a.startsWith("--level="));
  const levelFilter = levelArg ? parseInt(levelArg.split("=")[1]) : undefined;
  const levelRangeArg = args.find(a => a.startsWith("--levels="));
  let levelMin: number | undefined;
  let levelMax: number | undefined;
  if (levelRangeArg) {
    const [min, max] = levelRangeArg.split("=")[1].split("-").map(Number);
    levelMin = min;
    levelMax = max;
  }

  console.log("\nConfiguration:");
  console.log(`  Mode: ${dryRun ? "DRY RUN" : "LIVE"}`);
  console.log(`  Force all: ${forceAll}`);
  console.log(`  Min score to skip: ${minScore}/5`);
  if (limit) console.log(`  Limit: ${limit} items`);
  if (levelFilter) console.log(`  Level filter: ${levelFilter}`);
  if (levelMin && levelMax) console.log(`  Level range: ${levelMin}-${levelMax}`);

  // Fetch all kanji with their radicals
  console.log("\nFetching all kanji...");

  const whereClause: Record<string, unknown> = {};
  if (levelFilter) {
    whereClause.levelId = levelFilter;
  } else if (levelMin && levelMax) {
    whereClause.levelId = { gte: levelMin, lte: levelMax };
  }

  const allKanji = await prisma.kanji.findMany({
    where: whereClause,
    orderBy: { levelId: "asc" },
    select: {
      id: true,
      character: true,
      meaningsFr: true,
      meaningMnemonicFr: true,
      levelId: true,
      radicals: {
        select: {
          radical: {
            select: {
              meaningFr: true,
              character: true,
            },
          },
        },
      },
    },
  });

  console.log(`Total kanji: ${allKanji.length}`);

  // Evaluate each kanji
  console.log("\nEvaluating mnemonic quality...\n");

  const evaluations: { kanji: KanjiItem; score: number; issues: string[] }[] = [];

  for (const kanji of allKanji) {
    const { score, issues } = evaluateMnemonic(kanji.meaningMnemonicFr);
    evaluations.push({ kanji, score, issues });
  }

  // Sort by score (worst first)
  evaluations.sort((a, b) => a.score - b.score);

  // Show quality distribution
  const distribution = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  for (const e of evaluations) {
    distribution[Math.round(e.score) as 1 | 2 | 3 | 4 | 5]++;
  }

  console.log("Quality Distribution:");
  console.log(`  ⭐ (1/5): ${distribution[1]} kanji`);
  console.log(`  ⭐⭐ (2/5): ${distribution[2]} kanji`);
  console.log(`  ⭐⭐⭐ (3/5): ${distribution[3]} kanji`);
  console.log(`  ⭐⭐⭐⭐ (4/5): ${distribution[4]} kanji`);
  console.log(`  ⭐⭐⭐⭐⭐ (5/5): ${distribution[5]} kanji`);

  // Filter to items needing improvement
  let toImprove = forceAll
    ? evaluations
    : evaluations.filter(e => e.score < minScore);

  console.log(`\nKanji needing improvement (score < ${minScore}): ${toImprove.length}`);

  if (limit) {
    toImprove = toImprove.slice(0, limit);
    console.log(`After limit: ${toImprove.length}`);
  }

  if (toImprove.length === 0) {
    console.log("\n✅ All kanji already have good meaning mnemonics!");
    return;
  }

  // Show samples
  console.log("\nWorst mnemonics to improve:");
  for (const item of toImprove.slice(0, 10)) {
    console.log(`\n  ${item.kanji.character} (${item.kanji.meaningsFr[0]}) - Score: ${item.score.toFixed(1)}/5`);
    console.log(`    Issues: ${item.issues.join(", ") || "none identified"}`);
    console.log(`    Radicals: ${item.kanji.radicals.map(r => r.radical.meaningFr).join(", ") || "none"}`);
    console.log(`    Current: "${item.kanji.meaningMnemonicFr.substring(0, 60)}..."`);
  }

  if (dryRun) {
    console.log("\n[DRY RUN] Would improve", toImprove.length, "kanji");
    console.log("\nRun without --dry-run to apply changes.");
    return;
  }

  // Process improvements
  const client = getAnthropicClient();
  let processed = 0;
  let failed = 0;
  let improved = 0;

  console.log("\n" + "=".repeat(80));
  console.log("🚀 GENERATING PREMIUM MNEMONICS");
  console.log("=".repeat(80) + "\n");

  for (const item of toImprove) {
    const { kanji } = item;

    try {
      const newMnemonic = await generatePremiumMnemonic(client, kanji);
      const { score: newScore } = evaluateMnemonic(newMnemonic);

      // Only update if the new mnemonic is better
      if (newScore >= item.score || forceAll) {
        await prisma.kanji.update({
          where: { id: kanji.id },
          data: { meaningMnemonicFr: newMnemonic },
        });

        processed++;
        if (newScore > item.score) improved++;

        console.log(`✅ [${processed}/${toImprove.length}] ${kanji.character} (${kanji.meaningsFr[0]})`);
        console.log(`   Score: ${item.score.toFixed(1)} → ${newScore.toFixed(1)}`);
        console.log(`   New: "${newMnemonic.substring(0, 70)}..."\n`);
      } else {
        console.log(`⏭️ Skipped ${kanji.character} - new version not better\n`);
      }

      // Rate limiting
      await sleep(300);

      // Longer pause every 20 items
      if (processed % 20 === 0 && processed < toImprove.length) {
        console.log("--- Pausing 3s ---\n");
        await sleep(3000);
      }

    } catch (error) {
      failed++;
      console.error(`❌ FAILED: ${kanji.character}:`, error);

      if (String(error).includes("rate") || String(error).includes("529")) {
        console.log("Rate limited! Waiting 30s...");
        await sleep(30000);
      } else {
        await sleep(1000);
      }
    }
  }

  // Summary
  console.log("\n" + "=".repeat(80));
  console.log("📊 SUMMARY");
  console.log("=".repeat(80));
  console.log(`Processed: ${processed}`);
  console.log(`Improved: ${improved}`);
  console.log(`Failed: ${failed}`);
  console.log(`Skipped: ${toImprove.length - processed - failed}`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
