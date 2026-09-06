import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="w-full flex flex-col">
      {/* Hero Section */}
      <section className="relative flex min-h-[80vh] items-center justify-center section-padding">
        <Image 
          src="/hero-bg.jpg" 
          alt="Premium Culinary Dish" 
          fill 
          className="object-cover brightness-50"
          priority
        />
        <div className="relative z-10 flex flex-col items-center text-center">
          <h1 className="max-w-3xl font-serif text-5xl font-bold leading-tight text-white sm:text-6xl lg:text-7xl drop-shadow-lg">
            Elevate Your <span className="text-gold">Culinary</span> Experience
          </h1>
          <p className="mt-6 max-w-xl text-lg font-medium text-white/90 drop-shadow-md">
            Discover a curated collection of premium recipes designed for the modern gastronome.
          </p>
          <div className="mt-10 flex gap-4">
            <Link href="/recipes" className="rounded-none bg-gold px-8 py-4 text-sm font-bold tracking-wider text-navy transition-all hover:bg-gold-hover hover:-translate-y-1 hover:shadow-xl">
              EXPLORE RECIPES
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Section */}
      <section className="bg-background section-padding text-foreground">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 flex flex-col items-center text-center">
            <h2 className="font-serif text-4xl font-bold tracking-tight text-navy dark:text-white sm:text-5xl">
              Featured <span className="text-gold">Creations</span>
            </h2>
            <div className="mt-4 h-1 w-24 bg-gold mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="premium-card group cursor-pointer overflow-hidden rounded-2xl bg-white dark:bg-navy/50 border border-navy/5 dark:border-white/5">
                <div className="relative h-64 overflow-hidden">
                  <div className="absolute inset-0 bg-navy/20 group-hover:bg-transparent transition-colors z-10" />
                  <Image
                    src={`/hero-bg.jpg`}
                    alt={`Recipe ${i}`}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <div className="p-8 flex flex-col items-start text-left">
                  <span className="text-xs font-bold uppercase tracking-wider text-gold">Dinner</span>
                  <h3 className="mt-2 font-serif text-2xl font-bold text-navy dark:text-white">
                    Seared Duck Breast
                  </h3>
                  <p className="mt-4 text-sm text-navy/70 dark:text-white/70">
                    A masterpiece of culinary art, combining rich flavors with delicate textures.
                  </p>
                  <div className="mt-6 flex items-center w-full justify-between">
                    <span className="text-sm font-medium text-navy dark:text-white">45 mins</span>
                    <span className="text-sm font-medium text-gold group-hover:underline">View Recipe →</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
