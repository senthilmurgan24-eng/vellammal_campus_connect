import { memo, useMemo } from 'react';
import { Link } from 'react-router-dom';
import ImageWithSkeleton from '@/components/ui/ImageWithSkeleton';

type Product = {
  id: string;
  title: string;
  subtitle: string;
  price: string;
  mrp: string;
  off: string;
  badges: { label: string; color: 'primary' | 'orange' | 'green' | 'blue' }[];
  tag: string;
  rating: string;
  reviews: string;
  image: string;
};

const badgeClass = {
  primary: 'bg-primary text-white',
  orange: 'bg-orange-500 text-white',
  green: 'bg-green-500 text-white',
  blue: 'bg-blue-500 text-white'
} as const;

const ProductCard = memo(({ product }: { product: Product }) => (
  <div className="group flex flex-col bg-white dark:bg-background-dark border border-gray-100 dark:border-gray-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:shadow-primary/5 transition-all duration-300">
    <div className="relative aspect-[4/5] overflow-hidden bg-primary/5">
      <ImageWithSkeleton
        src={product.image}
        alt={product.title}
        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        skeletonClassName="h-full w-full"
      />
      <div className="absolute top-3 left-3 flex flex-col gap-2">
        {product.badges.map((b) => (
          <span key={b.label} className={`rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider ${badgeClass[b.color]}`}>
            {b.label}
          </span>
        ))}
      </div>
      <button className="absolute top-3 right-3 flex size-9 items-center justify-center rounded-full bg-white/90 backdrop-blur shadow-sm text-gray-400 hover:text-red-500 transition-colors">
        <span className="material-symbols-outlined">favorite</span>
      </button>
    </div>
    <div className="flex flex-col p-5 gap-3">
      <div>
        <p className="text-xs font-bold text-primary uppercase tracking-widest mb-1">{product.tag}</p>
        <h3 className="text-lg font-bold leading-snug group-hover:text-primary transition-colors">{product.title}</h3>
        <div className="mt-1 flex items-center gap-1">
          <div className="flex text-yellow-400">
            <span className="material-symbols-outlined text-sm">star</span>
            <span className="material-symbols-outlined text-sm">star</span>
            <span className="material-symbols-outlined text-sm">star</span>
            <span className="material-symbols-outlined text-sm">star</span>
            <span className="material-symbols-outlined text-sm">{product.rating === '4.0' ? 'star' : 'star_half'}</span>
          </div>
          <span className="text-xs font-medium text-[#4c739a]">
            ({product.rating} • {product.reviews} reviews)
          </span>
        </div>
      </div>
      <p className="text-sm text-slate-500">{product.subtitle}</p>
      <div className="flex items-baseline gap-2 mt-auto">
        <p className="text-2xl font-bold text-[#0d141b] dark:text-white">{product.price}</p>
        <p className="text-sm font-medium text-[#4c739a] line-through">{product.mrp}</p>
        <p className="text-xs font-bold text-green-600">{product.off} OFF</p>
      </div>
      <div className="grid grid-cols-2 gap-3 mt-2">
        <button className="flex items-center justify-center gap-2 rounded-xl border-2 border-primary/20 bg-transparent py-2.5 text-sm font-bold text-primary hover:bg-primary/5 transition-all">
          <span className="material-symbols-outlined text-lg">add_shopping_cart</span>
        </button>
        <button className="flex items-center justify-center gap-2 rounded-xl bg-primary py-2.5 text-sm font-bold text-white hover:bg-primary/90 transition-all shadow-lg shadow-primary/25">
          Buy Now
        </button>
      </div>
    </div>
  </div>
));

const Store = () => {
  const products = useMemo<Product[]>(
    () => [
      {
        id: 'p1',
        title: 'Physics JEE Complete Module Set',
        subtitle: 'Printed modules + PDFs + practice tests',
        price: '₹2,499',
        mrp: '₹3,999',
        off: '35%',
        tag: 'JEE Mains & Advanced',
        rating: '4.8',
        reviews: '1.2k',
        image:
          'https://lh3.googleusercontent.com/aida-public/AB6AXuBb2Olrzx4Mw_Ahg7DtCdXs4uhDvFNr44eOB93V-gnsRUFEZsUdbJaxYh_TydxebfePKyGJ4242VDyGlSWUX7PCPJbUeKZJkne_MB6LMHjqes1lOSw0FZ9tUD-oAJEqGN_Y3uYubxqMbDd7JpRYxM8eU2qhfW90cd0tFOOI5Ld2RbPgXFZGTRKwkj2zyd8Jm1f-dLwn-9FJv8OWVFgNyCUOue91kHxtpg1kVcZeUH8SWZI_STxgQlSzYFCpwbM9ftyWV9FqaRZ45BJc',
        badges: [
          { label: 'Best Seller', color: 'orange' },
          { label: 'Combo Pack', color: 'primary' }
        ]
      },
      {
        id: 'p2',
        title: 'Biology NEET Foundation (Class XI & XII)',
        subtitle: 'Focus on diagrams, mnemonics, and PYQs',
        price: '₹1,899',
        mrp: '₹2,499',
        off: '24%',
        tag: 'NEET Preparation',
        rating: '4.9',
        reviews: '850',
        image:
          'https://lh3.googleusercontent.com/aida-public/AB6AXuBT7m4fRJK7x9oOvNkQomlzWjHR5KlvfQpQMdD4BYkau39Ycus2BJ8SYXOnfIXhOD3HOJQDgiEcroIufrVIqRO3aCpHKrqiAXchvjjhOfPW0CeVy-bj2o92Cq692RN_0MIOYSlD49eOJ4AWQg8bf-SUfHuahumnKpZLYCp8hpsvEpca7YFcbr9gb0Vq93sLZpHlfdH-IlghesDFTd-w5SQMo6MlB1v85t-OsbVnkZ6w46V0usAhSxMG4f8ivG31KUPdG8MJdCls-0fF',
        badges: [{ label: 'Updated for 2024', color: 'green' }]
      },
      {
        id: 'p3',
        title: 'Calculus & Geometry Mastery Guide',
        subtitle: 'Advanced problem sets with stepwise hints',
        price: '₹799',
        mrp: '₹1,199',
        off: '33%',
        tag: 'Advanced Maths',
        rating: '4.0',
        reviews: '320',
        image:
          'https://lh3.googleusercontent.com/aida-public/AB6AXuCaDQrTan_q7rwiiqbBDn6WT5560BbDwYVZr-NDws6nTJ2_jAJ7UfpIQOt9OcPS4EUyhr4KDRTJeJsNhaKoI6x9ieaSBJgTjz_6fBDg4Ax5sYLzohqai-EeLCOBCmxLRApdQkiwicBZqqxDl7L09VagOi5ku1Ey4e3OLg0ZpaYlH3Tdvb08U6nJWhq5DChrQcLXPExVdtVW08ASFkrRuhDuQMNt9tQWOXL8oXK9zo6K5lqFdo45h5E-s-DeakYDfTrXoJezLx_8AtUm',
        badges: [{ label: 'Digital PDF Only', color: 'blue' }]
      }
    ],
    []
  );

  return (
    <div className="bg-background-light dark:bg-background-dark text-[#0d141b] min-h-screen flex flex-col">
      <header className="sticky top-0 z-50 w-full border-b border-solid border-primary/10 bg-white/80 dark:bg-background-dark/80 backdrop-blur-md px-4 md:px-10 py-3">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-8">
          <div className="flex items-center gap-4 shrink-0">
            <div className="flex items-center justify-center size-10 rounded-lg bg-primary text-white">
              <span className="material-symbols-outlined text-2xl">auto_stories</span>
            </div>
            <div className="hidden lg:block">
              <h2 className="text-[#0d141b] dark:text-white text-lg font-bold leading-tight tracking-tight">Vellammal Campus Connect</h2>
              <p className="text-xs text-primary font-medium">NEET/JEE Preparation</p>
            </div>
          </div>

          <div className="flex flex-1 max-w-2xl">
            <label className="relative w-full h-11">
              <div className="absolute inset-y-0 left-0 flex items-center pl-4 text-primary pointer-events-none">
                <span className="material-symbols-outlined">search</span>
              </div>
              <input
                className="w-full h-full rounded-xl border-none bg-primary/5 dark:bg-primary/10 focus:ring-2 focus:ring-primary/50 pl-12 pr-4 text-sm text-[#0d141b] dark:text-white placeholder:text-[#4c739a]"
                placeholder="Search for modules, subjects, or topics..."
                type="text"
              />
            </label>
          </div>

          <div className="flex items-center gap-4">
            <nav className="hidden xl:flex items-center gap-6 mr-4">
              <Link className="text-sm font-semibold text-primary" to="/store">
                Store
              </Link>
              <Link className="text-sm font-medium text-[#4c739a] hover:text-primary transition-colors" to="#">
                Courses
              </Link>
              <Link className="text-sm font-medium text-[#4c739a] hover:text-primary transition-colors" to="/practice-tests">
                Tests
              </Link>
            </nav>
            <div className="flex items-center gap-2">
              <button className="relative flex items-center justify-center size-11 rounded-xl bg-primary/5 dark:bg-primary/10 text-primary hover:bg-primary/10 transition-colors">
                <span className="material-symbols-outlined">shopping_cart</span>
                <span className="absolute top-2 right-2 flex size-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white border-2 border-white dark:border-background-dark">
                  2
                </span>
              </button>
              <button className="hidden md:flex items-center justify-center size-11 rounded-xl bg-primary/5 dark:bg-primary/10 text-primary hover:bg-primary/10 transition-colors">
                <span className="material-symbols-outlined text-[24px]">notifications</span>
              </button>
              <div className="size-11 rounded-xl bg-primary/20 p-0.5 border border-primary/20 cursor-pointer overflow-hidden">
                <ImageWithSkeleton
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBqgAH9BWeuSfecxrkoPYeqjItUWxQ3oFxu_e-0XGlLmTbAk67QNVyd3a5JpnYKWYtu1sWXg4FC80ttRcAMDDVHf9pD6ht7E7fTlg-k518XSu2_M85eAz-b8NVAai-03LA3xlEnkGM0uW-eyKmYiS-y2K6mAAJ6D1JZnDDSk6PKZblqCU26V-Hv26Q7Tn5_GVjzBnJ-KGHvi6eOUmpyOOzJzf6Ln9stE2uSbHFTss2azIWVD-eDSr6g91AEye1htT9lMgMCQCRFLFh0"
                  alt="User avatar"
                  className="w-full h-full rounded-lg object-cover"
                  skeletonClassName="w-full h-full"
                />
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-[1440px] grow flex-col px-4 md:px-10 py-6">
        <nav className="mb-6 flex items-center gap-2 text-sm">
          <Link className="text-[#4c739a] hover:text-primary" to="/dashboard">
            Home
          </Link>
          <span className="material-symbols-outlined text-sm text-[#4c739a]">chevron_right</span>
          <span className="text-[#4c739a]">Store</span>
          <span className="material-symbols-outlined text-sm text-[#4c739a]">chevron_right</span>
          <span className="font-semibold text-primary">Study Modules</span>
        </nav>

        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="w-full lg:w-64 shrink-0">
            <div className="sticky top-24 flex flex-col gap-6">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-lg">Filters</h3>
                <button className="text-xs font-semibold text-primary uppercase tracking-wider hover:underline">Clear All</button>
              </div>

              <div className="flex flex-col gap-3">
                <p className="text-xs font-bold uppercase tracking-widest text-[#4c739a]">Subjects</p>
                <div className="space-y-1">
                  <label className="flex items-center gap-3 px-3 py-2 rounded-lg bg-primary text-white cursor-pointer transition-all">
                    <span className="material-symbols-outlined text-xl">biotech</span>
                    <span className="text-sm font-medium">Physics</span>
                    <span className="ml-auto material-symbols-outlined text-sm">check</span>
                  </label>
                  <label className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-primary/5 text-[#0d141b] dark:text-white cursor-pointer transition-all group">
                    <span className="material-symbols-outlined text-xl text-primary group-hover:text-primary/70">science</span>
                    <span className="text-sm font-medium">Chemistry</span>
                  </label>
                  <label className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-primary/5 text-[#0d141b] dark:text-white cursor-pointer transition-all group">
                    <span className="material-symbols-outlined text-xl text-primary group-hover:text-primary/70">eco</span>
                    <span className="text-sm font-medium">Biology</span>
                  </label>
                  <label className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-primary/5 text-[#0d141b] dark:text-white cursor-pointer transition-all group">
                    <span className="material-symbols-outlined text-xl text-primary group-hover:text-primary/70">calculate</span>
                    <span className="text-sm font-medium">Mathematics</span>
                  </label>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <p className="text-xs font-bold uppercase tracking-widest text-[#4c739a]">Academic Level</p>
                <div className="flex flex-wrap gap-2">
                  <button className="rounded-lg border border-primary/20 bg-primary/5 px-4 py-2 text-sm font-semibold text-primary">Class XI</button>
                  <button className="rounded-lg border border-gray-200 dark:border-gray-800 px-4 py-2 text-sm font-medium hover:border-primary/50">Class XII</button>
                  <button className="rounded-lg border border-gray-200 dark:border-gray-800 px-4 py-2 text-sm font-medium hover:border-primary/50">Foundation</button>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <p className="text-xs font-bold uppercase tracking-widest text-[#4c739a]">Material Type</p>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <div className="size-5 rounded border-2 border-primary bg-primary flex items-center justify-center">
                      <span className="material-symbols-outlined text-white text-[14px] font-bold">check</span>
                    </div>
                    <span className="text-sm font-medium group-hover:text-primary transition-colors">Combo (Printed + PDF)</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <div className="size-5 rounded border-2 border-gray-300 dark:border-gray-700"></div>
                    <span className="text-sm font-medium group-hover:text-primary transition-colors">Digital PDF Only</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <div className="size-5 rounded border-2 border-gray-300 dark:border-gray-700"></div>
                    <span className="text-sm font-medium group-hover:text-primary transition-colors">Printed Modules Only</span>
                  </label>
                </div>
              </div>

              <div className="mt-4 rounded-xl bg-gradient-to-br from-primary to-blue-700 p-4 text-white">
                <h4 className="font-bold">Need Help?</h4>
                <p className="text-xs mt-1 text-white/80">Talk to our counselors for guidance on module selection.</p>
                <button className="mt-4 w-full rounded-lg bg-white py-2 text-xs font-bold text-primary shadow-lg shadow-black/10">Request Call</button>
              </div>
            </div>
          </aside>

          <section className="flex-1">
            <div className="mb-6 flex items-center justify-between">
              <h1 className="text-2xl font-bold">
                Available Modules <span className="text-[#4c739a] font-normal text-base ml-2">(128 results)</span>
              </h1>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-[#4c739a] uppercase tracking-wider">Sort By:</span>
                <select className="rounded-lg border-none bg-primary/5 text-sm font-semibold text-primary focus:ring-0 cursor-pointer">
                  <option>Most Popular</option>
                  <option>Price: Low to High</option>
                  <option>Newest Arrivals</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {products.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        </div>
      </main>

      <footer className="mt-12 border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-background-dark py-10">
        <div className="mx-auto max-w-[1440px] px-4 md:px-10">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <div className="flex flex-col gap-2">
              <p className="text-sm font-bold text-[#4c739a] uppercase tracking-widest text-center md:text-left">Secure Payments Powered By</p>
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-6 opacity-70 grayscale hover:grayscale-0 transition-all">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-3xl">payments</span>
                  <span className="font-bold">UPI</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-3xl text-blue-600">credit_card</span>
                  <span className="font-bold">VISA</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-3xl text-orange-500">contactless</span>
                  <span className="font-bold">MASTERCARD</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-3xl text-primary">account_balance</span>
                  <span className="font-bold">NET BANKING</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-8">
              <div className="text-center md:text-right">
                <p className="text-sm font-bold">100% Student Satisfaction</p>
                <p className="text-xs text-[#4c739a]">7-day easy return policy for printed modules</p>
              </div>
              <div className="flex gap-4">
                <a className="text-gray-400 hover:text-primary transition-colors" href="#">
                  <svg className="size-6 fill-current" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"></path>
                  </svg>
                </a>
                <a className="text-gray-400 hover:text-primary transition-colors" href="#">
                  <svg className="size-6 fill-current" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"></path>
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <div className="mt-8 flex flex-col items-center justify-between border-t border-gray-100 dark:border-gray-800 pt-6 md:flex-row">
            <p className="text-xs text-[#4c739a]">© 2024 Vellammal Campus Connect. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a className="text-xs font-medium text-[#4c739a] hover:text-primary" href="#">
                Privacy Policy
              </a>
              <a className="text-xs font-medium text-[#4c739a] hover:text-primary" href="#">
                Terms of Service
              </a>
              <a className="text-xs font-medium text-[#4c739a] hover:text-primary" href="#">
                Refund Policy
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Store;
