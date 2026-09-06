"use client";

import { useState } from "react";
import Link from "next/link";

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-navy/10 bg-white/80 backdrop-blur-md dark:border-white/10 dark:bg-navy/80">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-5 sm:px-6 lg:px-8">
        <Link href="/" className="font-serif text-3xl font-bold tracking-tight text-navy dark:text-gold">
          Gourmet<span className="text-gold dark:text-white">.</span>
        </Link>
        <div className="hidden md:flex md:items-center md:gap-8">
          <Link href="/" className="text-base font-medium transition-colors hover:text-gold">Home</Link>
          <Link href="/recipes" className="text-base font-medium transition-colors hover:text-gold">Recipes</Link>
          <Link href="/about" className="text-base font-medium transition-colors hover:text-gold">About</Link>
          <Link href="/contact" className="text-base font-medium transition-colors hover:text-gold">Contact</Link>
        </div>
        <div className="flex items-center md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="text-navy dark:text-white p-2">
            {isOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
            )}
          </button>
        </div>
      </div>
      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-t border-navy/10 bg-white dark:border-white/10 dark:bg-navy">
          <div className="space-y-1 px-4 pb-3 pt-2">
            <Link href="/" className="block rounded-md px-3 py-3 text-base font-medium hover:bg-navy/5 dark:hover:bg-white/5">Home</Link>
            <Link href="/recipes" className="block rounded-md px-3 py-3 text-base font-medium hover:bg-navy/5 dark:hover:bg-white/5">Recipes</Link>
            <Link href="/about" className="block rounded-md px-3 py-3 text-base font-medium hover:bg-navy/5 dark:hover:bg-white/5">About</Link>
            <Link href="/contact" className="block rounded-md px-3 py-3 text-base font-medium hover:bg-navy/5 dark:hover:bg-white/5">Contact</Link>
          </div>
        </div>
      )}
    </nav>
  );
}
