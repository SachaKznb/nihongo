import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-stone-50 pattern-overlay flex flex-col">
      {/* Header */}
      <nav className="px-6 py-4">
        <Link href="/" className="flex items-center gap-2 w-fit">
          <span className="text-3xl font-japanese">&#26085;</span>
          <span className="text-xl font-bold text-stone-800">nihongo</span>
        </Link>
      </nav>

      {/* Content */}
      <div className="flex-1 flex items-center justify-center p-6">
        {children}
      </div>

      {/* Footer */}
      <footer className="px-6 py-4 text-center text-stone-400 text-sm">
        &copy; 2024 Nihongo. Tous droits reserves.
      </footer>
    </div>
  );
}
