"use client";

import { useState } from "react";

export default function AdminImportExportPage() {
  const [exporting, setExporting] = useState<string | null>(null);

  const handleExport = async (type: "radicals" | "kanji" | "vocabulary") => {
    setExporting(type);
    try {
      const res = await fetch(`/api/admin/content/${type}?limit=10000`);
      if (res.ok) {
        const data = await res.json();
        const items = data[type] || data.kanji || data.vocabulary || data.radicals;

        // Convert to CSV
        let csv = "";
        if (type === "radicals") {
          csv = "id,character,meaning,meaningMnemonic,image,levelNumber\n";
          items.forEach((item: { id: string; character: string | null; meaning: string; meaningMnemonic: string | null; image: string | null; level: { number: number } }) => {
            csv += `"${item.id}","${item.character || ""}","${item.meaning}","${(item.meaningMnemonic || "").replace(/"/g, '""')}","${item.image || ""}",${item.level.number}\n`;
          });
        } else if (type === "kanji") {
          csv = "id,character,meaning,meaningMnemonic,onyomi,kunyomi,readingMnemonic,levelNumber\n";
          items.forEach((item: { id: string; character: string; meaning: string; meaningMnemonic: string | null; onyomi: string[]; kunyomi: string[]; readingMnemonic: string | null; level: { number: number } }) => {
            csv += `"${item.id}","${item.character}","${item.meaning}","${(item.meaningMnemonic || "").replace(/"/g, '""')}","${item.onyomi.join(",")}","${item.kunyomi.join(",")}","${(item.readingMnemonic || "").replace(/"/g, '""')}",${item.level.number}\n`;
          });
        } else if (type === "vocabulary") {
          csv = "id,word,reading,meaning,meaningMnemonic,readingMnemonic,partOfSpeech,levelNumber\n";
          items.forEach((item: { id: string; word: string; reading: string; meaning: string; meaningMnemonic: string | null; readingMnemonic: string | null; partOfSpeech: string | null; level: { number: number } }) => {
            csv += `"${item.id}","${item.word}","${item.reading}","${item.meaning}","${(item.meaningMnemonic || "").replace(/"/g, '""')}","${(item.readingMnemonic || "").replace(/"/g, '""')}","${item.partOfSpeech || ""}",${item.level.number}\n`;
          });
        }

        // Download
        const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = `nihongo-${type}-${new Date().toISOString().split("T")[0]}.csv`;
        link.click();
      }
    } catch (error) {
      console.error("Export failed:", error);
      alert("Erreur lors de l'export");
    } finally {
      setExporting(null);
    }
  };

  return (
    <div className="p-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-stone-900">Import / Export</h1>
        <p className="text-stone-500 mt-1">
          Exportez ou importez du contenu en masse
        </p>
      </div>

      {/* Export Section */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-stone-200 mb-6">
        <h2 className="text-lg font-semibold text-stone-900 mb-4">Exporter</h2>
        <p className="text-sm text-stone-500 mb-4">
          Exportez le contenu au format CSV pour le modifier dans un tableur.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            onClick={() => handleExport("radicals")}
            disabled={exporting !== null}
            className="p-4 border border-stone-200 rounded-lg hover:bg-stone-50 disabled:opacity-50 text-left"
          >
            <div className="text-2xl mb-2">部</div>
            <div className="font-medium text-stone-900">Radicaux</div>
            <div className="text-xs text-stone-500">
              {exporting === "radicals" ? "Export en cours..." : "Exporter en CSV"}
            </div>
          </button>

          <button
            onClick={() => handleExport("kanji")}
            disabled={exporting !== null}
            className="p-4 border border-stone-200 rounded-lg hover:bg-stone-50 disabled:opacity-50 text-left"
          >
            <div className="text-2xl mb-2">漢</div>
            <div className="font-medium text-stone-900">Kanji</div>
            <div className="text-xs text-stone-500">
              {exporting === "kanji" ? "Export en cours..." : "Exporter en CSV"}
            </div>
          </button>

          <button
            onClick={() => handleExport("vocabulary")}
            disabled={exporting !== null}
            className="p-4 border border-stone-200 rounded-lg hover:bg-stone-50 disabled:opacity-50 text-left"
          >
            <div className="text-2xl mb-2">語</div>
            <div className="font-medium text-stone-900">Vocabulaire</div>
            <div className="text-xs text-stone-500">
              {exporting === "vocabulary" ? "Export en cours..." : "Exporter en CSV"}
            </div>
          </button>
        </div>
      </div>

      {/* Import Section */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-stone-200">
        <h2 className="text-lg font-semibold text-stone-900 mb-4">Importer</h2>
        <p className="text-sm text-stone-500 mb-4">
          L&apos;import en masse sera disponible dans une prochaine version.
          Pour l&apos;instant, utilisez les formulaires de creation individuels.
        </p>

        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <svg
              className="w-5 h-5 text-amber-600 mt-0.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <div>
              <p className="font-medium text-amber-800">Fonctionnalite a venir</p>
              <p className="text-sm text-amber-700 mt-1">
                L&apos;import CSV permettra de creer ou mettre a jour du contenu en masse
                a partir d&apos;un fichier.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Format Documentation */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-stone-200 mt-6">
        <h2 className="text-lg font-semibold text-stone-900 mb-4">Format CSV</h2>
        <div className="space-y-4 text-sm">
          <div>
            <h3 className="font-medium text-stone-700">Radicaux</h3>
            <code className="text-xs bg-stone-100 p-2 rounded block mt-1">
              id, character, meaning, meaningMnemonic, image, levelNumber
            </code>
          </div>
          <div>
            <h3 className="font-medium text-stone-700">Kanji</h3>
            <code className="text-xs bg-stone-100 p-2 rounded block mt-1">
              id, character, meaning, meaningMnemonic, onyomi, kunyomi, readingMnemonic, levelNumber
            </code>
          </div>
          <div>
            <h3 className="font-medium text-stone-700">Vocabulaire</h3>
            <code className="text-xs bg-stone-100 p-2 rounded block mt-1">
              id, word, reading, meaning, meaningMnemonic, readingMnemonic, partOfSpeech, levelNumber
            </code>
          </div>
        </div>
      </div>
    </div>
  );
}
