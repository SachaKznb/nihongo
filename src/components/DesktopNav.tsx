"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface DropdownItem {
  href: string;
  label: string;
  icon: string;
  description?: string;
}

interface DropdownMenuProps {
  label: string;
  items: DropdownItem[];
  isActive: boolean;
}

function DropdownMenu({ label, items, isActive }: DropdownMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const hasActiveItem = items.some(item => pathname === item.href || pathname.startsWith(item.href + "/"));

  return (
    <div ref={dropdownRef} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-1.5 px-3 py-2 text-sm rounded-lg transition-colors ${
          hasActiveItem || isActive
            ? "bg-teal-50 text-teal-700 font-medium"
            : "text-stone-600 hover:text-stone-900 hover:bg-stone-100"
        }`}
      >
        {label}
        <svg
          className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-1 w-56 bg-white rounded-xl shadow-lg border border-stone-200 py-2 z-50">
          {items.map((item) => {
            const itemActive = pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 px-4 py-2.5 transition-colors ${
                  itemActive
                    ? "bg-teal-50 text-teal-700"
                    : "text-stone-600 hover:bg-stone-50 hover:text-stone-900"
                }`}
              >
                <span className="text-lg w-6 text-center">{item.icon}</span>
                <div className="flex-1">
                  <span className="font-medium">{item.label}</span>
                  {item.description && (
                    <p className="text-xs text-stone-400 mt-0.5">{item.description}</p>
                  )}
                </div>
                {itemActive && <span className="w-2 h-2 bg-teal-500 rounded-full" />}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default function DesktopNav() {
  const pathname = usePathname();

  const studyItems: DropdownItem[] = [
    { href: "/lessons", label: "Lecons", icon: "📚", description: "Apprendre du nouveau contenu" },
    { href: "/reviews", label: "Revisions", icon: "🔄", description: "Pratiquer ce que vous savez" },
    { href: "/reading-practice", label: "Lecture", icon: "📖", description: "Histoires personnalisees" },
  ];

  const contentItems: DropdownItem[] = [
    { href: "/radicals", label: "Radicaux", icon: "部" },
    { href: "/kanji", label: "Kanji", icon: "漢" },
    { href: "/vocabulary", label: "Vocabulaire", icon: "語" },
    { href: "/grammar", label: "Grammaire", icon: "文" },
  ];

  const progressItems: DropdownItem[] = [
    { href: "/stats", label: "Statistiques", icon: "📊", description: "Votre progression" },
    { href: "/leaderboard", label: "Classement", icon: "🏆", description: "Comparez-vous aux autres" },
    { href: "/levels", label: "Niveaux", icon: "📈", description: "Contenu par niveau" },
  ];

  return (
    <div className="hidden md:flex items-center gap-1">
      {/* Dashboard - always visible */}
      <Link
        href="/dashboard"
        prefetch={true}
        className={`px-3 py-2 text-sm rounded-lg transition-colors ${
          pathname === "/dashboard"
            ? "bg-teal-50 text-teal-700 font-medium"
            : "text-stone-600 hover:text-stone-900 hover:bg-stone-100"
        }`}
      >
        Tableau de bord
      </Link>

      <div className="w-px h-5 bg-stone-200 mx-1" />

      {/* Dropdowns */}
      <DropdownMenu label="Apprendre" items={studyItems} isActive={false} />
      <DropdownMenu label="Contenu" items={contentItems} isActive={false} />
      <DropdownMenu label="Progression" items={progressItems} isActive={false} />

      <div className="w-px h-5 bg-stone-200 mx-1" />

      {/* Rewards - standalone highlighted */}
      <Link
        href="/rewards"
        className={`px-3 py-2 text-sm rounded-lg transition-colors font-medium ${
          pathname === "/rewards"
            ? "bg-amber-100 text-amber-700"
            : "text-amber-600 hover:text-amber-700 hover:bg-amber-50"
        }`}
      >
        Recompenses
      </Link>
    </div>
  );
}
