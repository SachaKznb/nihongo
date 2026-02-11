import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { SRS_STAGES } from "@/lib/srs";
import type { LessonItem } from "@/types";

// GET /api/lessons - Returns available lessons (unlocked items not yet started)
export async function GET() {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Non autorise" }, { status: 401 });
  }

  const userId = session.user.id;
  const user = await prisma.user.findUnique({ where: { id: userId } });

  if (!user) {
    return NextResponse.json(
      { error: "Utilisateur non trouve" },
      { status: 404 }
    );
  }

  const lessons: LessonItem[] = [];

  // Get radicals that are unlocked (stage 0) and not started
  const radicalProgress = await prisma.userRadicalProgress.findMany({
    where: { userId, srsStage: SRS_STAGES.LOCKED },
    include: { radical: true },
    take: user.lessonsPerDay,
  });

  for (const rp of radicalProgress) {
    lessons.push({
      type: "radical",
      id: rp.radical.id,
      character: rp.radical.character,
      meaningsFr: [rp.radical.meaningFr],
      mnemonic: rp.radical.mnemonic,
      imageUrl: rp.radical.imageUrl,
    });
  }

  // Get kanji that are unlocked (stage 0) and not started
  const kanjiProgress = await prisma.userKanjiProgress.findMany({
    where: { userId, srsStage: SRS_STAGES.LOCKED },
    include: {
      kanji: {
        include: {
          radicals: { include: { radical: true } },
        },
      },
    },
    take: Math.max(0, user.lessonsPerDay - lessons.length),
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
    });
  }

  // Get vocabulary that are unlocked (stage 0) and not started
  const vocabProgress = await prisma.userVocabularyProgress.findMany({
    where: { userId, srsStage: SRS_STAGES.LOCKED },
    include: {
      vocabulary: {
        include: {
          kanji: { include: { kanji: true } },
        },
      },
    },
    take: Math.max(0, user.lessonsPerDay - lessons.length),
  });

  for (const vp of vocabProgress) {
    lessons.push({
      type: "vocabulary",
      id: vp.vocabulary.id,
      character: vp.vocabulary.word,
      meaningsFr: vp.vocabulary.meaningsFr,
      readings: vp.vocabulary.readings,
      mnemonic: vp.vocabulary.mnemonicFr,
      sentence: vp.vocabulary.sentenceJp
        ? { jp: vp.vocabulary.sentenceJp, fr: vp.vocabulary.sentenceFr || "" }
        : null,
    });
  }

  return NextResponse.json({ lessons, total: lessons.length });
}
