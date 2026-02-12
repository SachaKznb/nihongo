"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface MobileNavProps {
  userName: string;
}

export default function MobileNav({ userName }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { href: "/dashboard", label: "Tableau de bord", icon: "🏠" },
    { href: "/lessons", label: "Leçons", icon: "📚" },
    { href: "/reviews", label: "Révisions", icon: "🔄" },
    { href: "/radicals", label: "Radicaux", icon: "部" },
    { href: "/kanji", label: "Kanji", icon: "漢" },
    { href: "/vocabulary", label: "Vocabulaire", icon: "語" },
    { href: "/rewards", label: "Récompenses", icon: "🎁", highlight: true },
    { href: "/settings", label: "Paramètres", icon: "⚙️" },
  ];

  const isActive = (href: string) => pathname === href;

  return (
    <>
      {/* Hamburger button - visible on mobile only */}
      <button
        onClick={() => setIsOpen(true)}
        className="md:hidden p-2 text-stone-600 hover:text-stone-900 hover:bg-stone-100 rounded-lg transition-colors"
        aria-label="Menu"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Slide-out menu */}
      <div
        className={`fixed top-0 left-0 h-full w-72 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-out md:hidden ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-stone-200">
          <Link
            href="/dashboard"
            className="flex items-center gap-2"
            onClick={() => setIsOpen(false)}
          >
            <span className="text-2xl font-japanese">日</span>
            <span className="text-lg font-bold text-stone-800">nihongo</span>
          </Link>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 text-stone-500 hover:text-stone-700 hover:bg-stone-100 rounded-lg"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* User info */}
        <div className="p-4 bg-stone-50 border-b border-stone-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center">
              <span className="text-lg font-medium text-teal-700">
                {userName.charAt(0).toUpperCase()}
              </span>
            </div>
            <div>
              <p className="font-medium text-stone-900">{userName}</p>
              <p className="text-xs text-stone-500">Connecté</p>
            </div>
          </div>
        </div>

        {/* Navigation links */}
        <nav className="p-4 space-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                isActive(link.href)
                  ? "bg-teal-50 text-teal-700"
                  : link.highlight
                  ? "text-amber-600 hover:bg-amber-50"
                  : "text-stone-600 hover:bg-stone-100"
              }`}
            >
              <span className="text-lg">{link.icon}</span>
              <span className="font-medium">{link.label}</span>
              {isActive(link.href) && (
                <span className="ml-auto w-2 h-2 bg-teal-500 rounded-full" />
              )}
            </Link>
          ))}
        </nav>

        {/* Sign out button at bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-stone-200 bg-white">
          <form action="/api/auth/signout" method="POST">
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 px-4 py-3 text-stone-600 hover:text-stone-900 hover:bg-stone-100 rounded-xl transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
                />
              </svg>
              <span>Déconnexion</span>
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
