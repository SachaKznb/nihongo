import { prisma } from "@/lib/db";
import { auth } from "@/lib/auth";
import Link from "next/link";
import { RadicalGrid } from "@/components/RadicalGrid";

export default async function RadicalsPage() {
  const session = await auth();
  if (!session?.user?.id) return null;

  const radicals = await prisma.radical.findMany({
    include: {
      level: true,
      userProgress: {
        where: { userId: session.user.id },
        select: {
          srsStage: true,
          customMnemonic: true,
          meaningCorrect: true,
          meaningIncorrect: true,
          nextReviewAt: true,
        },
      },
    },
    orderBy: [{ levelId: "asc" }, { id: "asc" }],
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Radicaux</h1>
        <p className="text-gray-600">
          Les radicaux sont les composants de base des kanji
        </p>
      </div>

      {radicals.length > 0 ? (
        <RadicalGrid radicals={radicals} />
      ) : (
        <div className="text-center py-16">
          <p className="text-gray-600">Aucun radical disponible</p>
          <Link href="/dashboard" className="text-pink-600 hover:underline mt-4 inline-block">
            Retour au tableau de bord
          </Link>
        </div>
      )}
    </div>
  );
}
