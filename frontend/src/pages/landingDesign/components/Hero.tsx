import { ArrowRight } from 'lucide-react';
import { memo, useCallback, useEffect, useRef, useState } from 'react';
import type { PointerEvent } from 'react';
import banner1 from '@/assets/hero/banner_1.png';
import banner2 from '@/assets/hero/banner_2.png';
import banner3 from '@/assets/hero/banner_3.png';

type Slide = {
  id: string;
  image: string;
  alt: string;
};

const slides: Slide[] = [
  {
    id: 'hero-students-gate',
    image: banner1,
    alt: 'Group of Indian students outside Nova Neeti IIT Academy'
  },
  {
    id: 'hero-classroom-focus',
    image: banner2,
    alt: 'Indian students writing notes in a classroom'
  },
  {
    id: 'hero-doctor-mentor',
    image: banner3,
    alt: 'Doctor mentoring medical students during anatomy class'
  }
];

const AUTO_PLAY_DURATION = 10000;

function HeroComponent() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(0);
  const heroRef = useRef<HTMLElement | null>(null);
  const animationRef = useRef<number | null>(null);
  const startRef = useRef<number | null>(null);
  const isHoveredRef = useRef(false);
  const currentIndexRef = useRef(0);
  const pointerStartX = useRef<number | null>(null);
  const pointerDeltaX = useRef(0);

  const goToSlide = useCallback((value: number) => {
    const safeValue = (value + slides.length) % slides.length;
    currentIndexRef.current = safeValue;
    setCurrentIndex(safeValue);
    setProgress(0);
    startRef.current = null;
  }, []);

  const step = useCallback(
    (timestamp: number) => {
      if (!isVisible || isHoveredRef.current) {
        startRef.current = timestamp;
        animationRef.current = requestAnimationFrame(step);
        return;
      }

      if (!startRef.current) {
        startRef.current = timestamp;
      }

      const elapsed = timestamp - startRef.current;
      const ratio = Math.min(elapsed / AUTO_PLAY_DURATION, 1);
      setProgress(ratio);

      if (ratio >= 1) {
        goToSlide(currentIndexRef.current + 1);
        animationRef.current = requestAnimationFrame(step);
        return;
      }

      animationRef.current = requestAnimationFrame(step);
    },
    [goToSlide, isVisible]
  );

  useEffect(() => {
    slides.forEach((slide) => {
      const image = new Image();
      image.src = slide.image;
    });
  }, []);

  useEffect(() => {
    animationRef.current = requestAnimationFrame(step);
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [step]);

  useEffect(() => {
    const node = heroRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(entry.isIntersecting);
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if ((event.target as HTMLElement).closest('[data-carousel-indicator]')) {
      return;
    }
    pointerStartX.current = event.clientX;
    pointerDeltaX.current = 0;
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (pointerStartX.current === null) return;
    pointerDeltaX.current = event.clientX - pointerStartX.current;
  };

  const handlePointerUp = (event: PointerEvent<HTMLDivElement>) => {
    if (pointerStartX.current !== null && Math.abs(pointerDeltaX.current) > 45) {
      if (pointerDeltaX.current < 0) {
        goToSlide(currentIndexRef.current + 1);
      } else {
        goToSlide(currentIndexRef.current - 1);
      }
    }
    pointerStartX.current = null;
    pointerDeltaX.current = 0;
    event.currentTarget.releasePointerCapture(event.pointerId);
  };

  const handlePointerCancel = (event: PointerEvent<HTMLDivElement>) => {
    pointerStartX.current = null;
    pointerDeltaX.current = 0;
    event.currentTarget.releasePointerCapture(event.pointerId);
  };

  const handleIndicatorClick = useCallback(
    (index: number) => {
      goToSlide(index);
    },
    [goToSlide]
  );

  const formatIndex = (value: number) => String(value).padStart(2, '0');

  const content = (
    <div className="relative z-10 max-w-6xl px-4 sm:px-6 lg:px-8 py-14 lg:py-24 text-left text-white">
      <div className="max-w-3xl space-y-6">
        <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-semibold tracking-[0.4em] text-white uppercase">
          Nova Neeti IIT Academy
        </span>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight drop-shadow-[0_10px_35px_rgba(0,0,0,0.45)]">
          Empowering Tomorrow’s Achievers Today
        </h1>
        <p className="text-lg sm:text-xl text-white/80 leading-relaxed">
          Your Nexus to Excellence in IIT–JEE and NEET Preparation
        </p>
        <div className="flex flex-wrap gap-4">
          <a
            href="#admissions"
            className="inline-flex items-center gap-2 rounded-full bg-[#d4af37] px-6 py-3 text-sm font-semibold uppercase tracking-wide text-[#1E293B] shadow-lg shadow-[#0f172a]/40 transition hover:bg-[#b8991f]"
          >
            Apply Now
            <ArrowRight className="w-4 h-4" />
          </a>
          <a
            href="#courses"
            className="inline-flex items-center gap-2 rounded-full border border-white/60 px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white transition hover:border-white hover:bg-white/10"
          >
            Explore Courses
          </a>
        </div>
      </div>
    </div>
  );

  return (
    <section
      id="home"
      ref={heroRef}
      role="region"
      aria-roledescription="carousel"
      aria-label="Nova Neeti hero banner"
      onMouseEnter={() => (isHoveredRef.current = true)}
      onMouseLeave={() => {
        isHoveredRef.current = false;
        startRef.current = null;
      }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerCancel}
    className="relative min-h-[70vh] md:min-h-[85vh] w-full overflow-hidden bg-slate-950 text-white select-none"
    >
      <div className="absolute inset-0">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className="absolute inset-0 transition-opacity duration-[500ms] ease-in-out"
            style={{ opacity: index === currentIndex ? 1 : 0 }}
          >
            <img src={slide.image} alt={slide.alt} loading="lazy" className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/20 to-slate-950/90" />
          </div>
        ))}
      </div>

      <div className="relative z-20 mx-auto flex min-h-full flex-col justify-center">{content}</div>

      <div className="absolute inset-x-0 bottom-6 flex flex-col items-center gap-3 px-6">

        <div className="flex items-center gap-2">
          {slides.map((_, index) => {
            const isActive = currentIndex === index;
            return (
            <button
              key={index}
              type="button"
              onClick={() => handleIndicatorClick(index)}
              aria-label={`Go to slide ${index + 1}`}
              data-carousel-indicator
                className="relative flex h-3 w-12 items-center rounded-full border border-white/30 bg-white/20 transition hover:bg-white/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                <span className="pointer-events-none absolute inset-0 rounded-full bg-white/10" aria-hidden="true" />
                <span
                  className="pointer-events-none relative block h-full rounded-full bg-gradient-to-r from-[#d4af37] to-[#fcd34d] transition-[width] duration-[500ms] ease-in-out"
                  style={{ width: isActive ? `${Math.min(1, progress) * 100}%` : '0%' }}
                />
              </button>
            );
          })}
        </div>
        
      </div>
    </section>
  );
}

export const Hero = memo(HeroComponent);
