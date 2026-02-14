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

interface RadicalItem {
  id: number;
  character: string | null;
  meaningFr: string;
  meaningHintFr: string | null;
  mnemonic: string;
  levelId: number;
  imageUrl: string | null;
}

function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Evaluate mnemonic quality
function evaluateMnemonic(mnemonic: string): { score: number; issues: string[] } {
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
    /^(le|la|les|un|une)\s+\w+\s+(qui|que|dont)/i,
    /signifie|représente|symbolise/i,
  ];
  const isBoring = boringPatterns.some(p => p.test(mnemonic));
  if (isBoring && mnemonic.length < 100) {
    issues.push("générique/ennuyeux");
    score -= 1;
  }

  // Check for French cultural references (bonus)
  const frenchRefs = ["paris", "france", "français", "baguette", "croissant", "café", "fromage",
    "versailles", "tour eiffel", "provence", "monet", "napoleon", "astérix", "gaule"];
  const hasFrenchRef = frenchRefs.some(r => mnemonic.toLowerCase().includes(r));
  if (!hasFrenchRef) {
    issues.push("pas de référence française");
  }

  return { score: Math.max(1, Math.min(5, score)), issues };
}

async function generatePremiumMnemonic(
  client: Anthropic,
  radical: RadicalItem
): Promise<string> {
  const prompt = `Tu es le MEILLEUR créateur de mnémoniques au monde pour l'apprentissage du japonais destiné aux francophones.

RADICAL À MÉMORISER:
- Caractère: ${radical.character || "[Pas de caractère - radical à image]"}
- Signification: ${radical.meaningFr}
${radical.meaningHintFr ? `- Indice supplémentaire: ${radical.meaningHintFr}` : ""}
${radical.imageUrl ? `- Ce radical est représenté par une image (pas un caractère)` : ""}

MNÉMONIQUE ACTUEL (À AMÉLIORER):
"${radical.mnemonic}"

CRÉE UN MNÉMONIQUE EXCEPTIONNEL qui respecte ces critères:

1. LONGUEUR: 100-180 caractères (pas plus, pas moins)

2. STRUCTURE EN 3 PARTIES:
   a) ACCROCHE: Une image visuelle forte qui décrit la FORME du radical
   b) HISTOIRE: Une mini-narration mémorable (drôle, absurde ou émouvante)
   c) ANCRAGE: Lien clair avec la SIGNIFICATION (${radical.meaningFr})

3. ÉLÉMENTS OBLIGATOIRES:
   - Description de ce à quoi RESSEMBLE le radical visuellement
   - Au moins une référence FRANÇAISE (lieu, célébrité, nourriture, film, histoire)
   - Un élément ÉMOTIONNEL (humour, surprise, nostalgie, etc.)
   - Vocabulaire CONCRET et imagé (pas abstrait)

4. EXEMPLES DE QUALITÉ:
   - "Un samouraï qui trace UN seul coup d'épée parfait dans l'air. Ce trait horizontal représente ce coup unique et décisif. Comme un chef étoilé qui fait une seule entaille parfaite dans son sashimi !"
   - "DEUX baguettes posées l'une sur l'autre ! Celle du dessus est plus longue car elle n'a pas encore été mangée. À la boulangerie Poilâne, on empile toujours les baguettes comme ça !"

5. À ÉVITER:
   - Les définitions pures ("Ce radical signifie...")
   - Les descriptions abstraites sans image concrète
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
  console.log("🎯 RADICAL MNEMONIC IMPROVEMENT SCRIPT (Premium Quality)");
  console.log("=".repeat(80));

  const args = process.argv.slice(2);
  const dryRun = args.includes("--dry-run");
  const forceAll = args.includes("--force-all");
  const limitArg = args.find(a => a.startsWith("--limit="));
  const limit = limitArg ? parseInt(limitArg.split("=")[1]) : undefined;
  const minScoreArg = args.find(a => a.startsWith("--min-score="));
  const minScore = minScoreArg ? parseInt(minScoreArg.split("=")[1]) : 4;

  console.log("\nConfiguration:");
  console.log(`  Mode: ${dryRun ? "DRY RUN" : "LIVE"}`);
  console.log(`  Force all: ${forceAll}`);
  console.log(`  Min score to skip: ${minScore}/5`);
  if (limit) console.log(`  Limit: ${limit} items`);

  // Fetch all radicals
  console.log("\nFetching all radicals...");
  const allRadicals = await prisma.radical.findMany({
    orderBy: { levelId: "asc" },
    select: {
      id: true,
      character: true,
      meaningFr: true,
      meaningHintFr: true,
      mnemonic: true,
      levelId: true,
      imageUrl: true,
    },
  });

  console.log(`Total radicals: ${allRadicals.length}`);

  // Evaluate each radical
  console.log("\nEvaluating mnemonic quality...\n");

  const evaluations: { radical: RadicalItem; score: number; issues: string[] }[] = [];

  for (const radical of allRadicals) {
    const { score, issues } = evaluateMnemonic(radical.mnemonic);
    evaluations.push({ radical, score, issues });
  }

  // Sort by score (worst first)
  evaluations.sort((a, b) => a.score - b.score);

  // Show quality distribution
  const distribution = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  for (const e of evaluations) {
    distribution[Math.round(e.score) as 1 | 2 | 3 | 4 | 5]++;
  }

  console.log("Quality Distribution:");
  console.log(`  ⭐ (1/5): ${distribution[1]} radicals`);
  console.log(`  ⭐⭐ (2/5): ${distribution[2]} radicals`);
  console.log(`  ⭐⭐⭐ (3/5): ${distribution[3]} radicals`);
  console.log(`  ⭐⭐⭐⭐ (4/5): ${distribution[4]} radicals`);
  console.log(`  ⭐⭐⭐⭐⭐ (5/5): ${distribution[5]} radicals`);

  // Filter to items needing improvement
  let toImprove = forceAll
    ? evaluations
    : evaluations.filter(e => e.score < minScore);

  console.log(`\nRadicals needing improvement (score < ${minScore}): ${toImprove.length}`);

  if (limit) {
    toImprove = toImprove.slice(0, limit);
    console.log(`After limit: ${toImprove.length}`);
  }

  if (toImprove.length === 0) {
    console.log("\n✅ All radicals already have good mnemonics!");
    return;
  }

  // Show samples
  console.log("\nWorst mnemonics to improve:");
  for (const item of toImprove.slice(0, 10)) {
    console.log(`\n  ${item.radical.character || '[img]'} (${item.radical.meaningFr}) - Score: ${item.score.toFixed(1)}/5`);
    console.log(`    Issues: ${item.issues.join(", ") || "none identified"}`);
    console.log(`    Current: "${item.radical.mnemonic.substring(0, 60)}..."`);
  }

  if (dryRun) {
    console.log("\n[DRY RUN] Would improve", toImprove.length, "radicals");
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
    const { radical } = item;

    try {
      const newMnemonic = await generatePremiumMnemonic(client, radical);
      const { score: newScore } = evaluateMnemonic(newMnemonic);

      // Only update if the new mnemonic is better
      if (newScore >= item.score || forceAll) {
        await prisma.radical.update({
          where: { id: radical.id },
          data: { mnemonic: newMnemonic },
        });

        processed++;
        if (newScore > item.score) improved++;

        console.log(`✅ [${processed}/${toImprove.length}] ${radical.character || '[img]'} (${radical.meaningFr})`);
        console.log(`   Score: ${item.score.toFixed(1)} → ${newScore.toFixed(1)}`);
        console.log(`   New: "${newMnemonic.substring(0, 70)}..."\n`);
      } else {
        console.log(`⏭️ Skipped ${radical.character || '[img]'} - new version not better\n`);
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
      console.error(`❌ FAILED: ${radical.character || '[img]'}:`, error);

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
