import { prisma } from "@/lib/db";
import { auth } from "@/lib/auth";
import Link from "next/link";
import { VocabularyGrid } from "@/components/VocabularyGrid";

export default async function VocabularyPage() {
  const session = await auth();
  if (!session?.user?.id) return null;

  const vocabulary = await prisma.vocabulary.findMany({
    include: {
      level: true,
      userProgress: {
        where: { userId: session.user.id },
        select: {
          srsStage: true,
          customMnemonic: true,
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
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Vocabulaire</h1>
        <p className="text-gray-600">
          Les mots de vocabulaire utilisant les kanji appris
        </p>
      </div>

      {vocabulary.length > 0 ? (
        <VocabularyGrid vocabularyList={vocabulary} />
      ) : (
        <div className="text-center py-16">
          <p className="text-gray-600">Aucun vocabulaire disponible</p>
          <Link href="/dashboard" className="text-pink-600 hover:underline mt-4 inline-block">
            Retour au tableau de bord
          </Link>
        </div>
      )}
    </div>
  );
}
