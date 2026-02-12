import { prisma } from "@/lib/db";
import { auth } from "@/lib/auth";
import Link from "next/link";
import { KanjiGrid } from "@/components/KanjiGrid";

export default async function KanjiPage() {
  const session = await auth();
  if (!session?.user?.id) return null;

  const kanji = await prisma.kanji.findMany({
    include: {
      level: true,
      userProgress: {
        where: { userId: session.user.id },
        select: {
          srsStage: true,
          customMeaningMnemonic: true,
          meaningCorrect: true,
          meaningIncorrect: true,
          readingCorrect: true,
          readingIncorrect: true,
          nextReviewAt: true,
        },
      },
    },
    orderBy: [{ levelId: "asc" }, { id: "asc" }],
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Kanji</h1>
        <p className="text-gray-600">
          Les kanji sont les caracteres chinois utilises en japonais
        </p>
      </div>

      {kanji.length > 0 ? (
        <KanjiGrid kanjiList={kanji} />
      ) : (
        <div className="text-center py-16">
          <p className="text-gray-600">Aucun kanji disponible</p>
          <Link href="/dashboard" className="text-pink-600 hover:underline mt-4 inline-block">
            Retour au tableau de bord
          </Link>
        </div>
      )}
    </div>
  );
}
