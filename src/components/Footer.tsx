import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-navy/10 bg-white py-12 dark:border-white/10 dark:bg-navy mt-auto">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-between gap-6 md:flex-row">
        <p className="text-sm font-medium text-navy/60 dark:text-white/60">
          © {new Date().getFullYear()} Gourmet. All rights reserved.
        </p>
        <div className="flex gap-8">
          <Link href="/recipes" className="text-sm font-medium text-navy/80 hover:text-gold dark:text-white/80 dark:hover:text-gold">Recipes</Link>
          <Link href="/about" className="text-sm font-medium text-navy/80 hover:text-gold dark:text-white/80 dark:hover:text-gold">About</Link>
          <Link href="/contact" className="text-sm font-medium text-navy/80 hover:text-gold dark:text-white/80 dark:hover:text-gold">Contact</Link>
        </div>
      </div>
    </footer>
  );
}
