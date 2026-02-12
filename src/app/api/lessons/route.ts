import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { SRS_STAGES } from "@/lib/srs";
import { generalRateLimit, checkRateLimit } from "@/lib/upstash";
import type { LessonItem } from "@/types";

// GET /api/lessons - Returns available lessons (unlocked items not yet started)
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page") || "0");
  const limit = parseInt(searchParams.get("limit") || "0"); // 0 = use user's lessonsPerDay
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    const userId = session.user.id;

    // Rate limiting
    const rateLimit = await checkRateLimit(generalRateLimit, userId);
    if (!rateLimit.success) {
      return NextResponse.json({ error: "Trop de requetes" }, { status: 429 });
    }
    const user = await prisma.user.findUnique({ where: { id: userId } });

    if (!user) {
      return NextResponse.json(
        { error: "Utilisateur non trouvé" },
        { status: 404 }
      );
    }

    const lessons: LessonItem[] = [];

  const maxLessons = limit > 0 ? limit : user.lessonsPerDay;

  // Get radicals that are unlocked (stage 0) and not started
  // Optimized: Only fetch kanji character and first meaning for preview
  const radicalProgress = await prisma.userRadicalProgress.findMany({
    where: { userId, srsStage: SRS_STAGES.LOCKED },
    include: {
      radical: {
        include: {
          kanji: {
            select: {
              kanji: {
                select: { character: true, meaningsFr: true },
              },
            },
            take: 3, // Reduced from 5
          },
        },
      },
    },
    take: maxLessons,
  });

  for (const rp of radicalProgress) {
    lessons.push({
      type: "radical",
      id: rp.radical.id,
      character: rp.radical.character,
      meaningsFr: [rp.radical.meaningFr],
      mnemonic: rp.radical.mnemonic,
      customMnemonic: rp.customMnemonic,
      imageUrl: rp.radical.imageUrl,
      usedInKanji: rp.radical.kanji.map((k) => ({
        character: k.kanji.character,
        meaningFr: k.kanji.meaningsFr[0] || "",
      })),
    });
  }

  // Get kanji that are unlocked (stage 0) and not started
  // Optimized: Only fetch essential fields for radicals and vocabulary
  const kanjiProgress = await prisma.userKanjiProgress.findMany({
    where: { userId, srsStage: SRS_STAGES.LOCKED },
    include: {
      kanji: {
        include: {
          radicals: {
            select: {
              radical: {
                select: { character: true, meaningFr: true, imageUrl: true },
              },
            },
          },
          vocabulary: {
            select: {
              vocabulary: {
                select: { word: true, meaningsFr: true, readings: true },
              },
            },
            take: 2, // Reduced from 3
          },
        },
      },
    },
    take: Math.max(0, maxLessons - lessons.length),
  });

  for (const kp of kanjiProgress) {
    lessons.push({
      type: "kanji",
      id: kp.kanji.id,
      character: kp.kanji.character,
      meaningsFr: kp.kanji.meaningsFr,
      readingsOn: kp.kanji.readingsOn,
      readingsKun: kp.kanji.readingsKun,
      mnemonic: kp.kanji.meaningMnemonicFr,
      readingMnemonic: kp.kanji.readingMnemonicFr,
      customMnemonic: kp.customMeaningMnemonic,
      customReadingMnemonic: kp.customReadingMnemonic,
      componentRadicals: kp.kanji.radicals.map((r) => ({
        character: r.radical.character,
        meaningFr: r.radical.meaningFr,
        imageUrl: r.radical.imageUrl,
      })),
      usedInVocabulary: kp.kanji.vocabulary.map((v) => ({
        word: v.vocabulary.word,
        meaningFr: v.vocabulary.meaningsFr[0] || "",
        reading: v.vocabulary.readings[0] || "",
      })),
    });
  }

  // Get vocabulary that are unlocked (stage 0) and not started
  // Optimized: Kanji info not displayed in lessons, skip the join
  const vocabProgress = await prisma.userVocabularyProgress.findMany({
    where: { userId, srsStage: SRS_STAGES.LOCKED },
    include: {
      vocabulary: true, // No need for kanji relation in lesson display
    },
    take: Math.max(0, maxLessons - lessons.length),
  });

  for (const vp of vocabProgress) {
    lessons.push({
      type: "vocabulary",
      id: vp.vocabulary.id,
      character: vp.vocabulary.word,
      meaningsFr: vp.vocabulary.meaningsFr,
      readings: vp.vocabulary.readings,
      mnemonic: vp.vocabulary.mnemonicFr,
      customMnemonic: vp.customMnemonic,
      sentence: vp.vocabulary.sentenceJp
        ? { jp: vp.vocabulary.sentenceJp, fr: vp.vocabulary.sentenceFr || "" }
        : null,
    });
  }

    return NextResponse.json(
      { lessons, total: lessons.length },
      {
        headers: {
          "Cache-Control": "private, max-age=30, stale-while-revalidate=60",
        },
      }
    );
  } catch (error) {
    console.error("Lessons GET error:", error);
    return NextResponse.json(
      { error: "Erreur lors du chargement des leçons" },
      { status: 500 }
    );
  }
}
