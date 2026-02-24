import { useEffect, useState, useRef } from 'react';
import { Trophy, Target, Award, TrendingUp } from 'lucide-react';

export function Results() {
  const [counts, setCounts] = useState({
    iit: 0,
    neet: 0,
    foundation: 0,
    topRanks: 0,
  });

  const sectionRef = useRef<HTMLElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  const finalValues = {
    iit: 500,
    neet: 750,
    foundation: 1200,
    topRanks: 85,
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          animateCounters();
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  const animateCounters = () => {
    const duration = 2000;
    const steps = 60;
    const stepDuration = duration / steps;

    let currentStep = 0;

    const interval = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;

      setCounts({
        iit: Math.floor(finalValues.iit * progress),
        neet: Math.floor(finalValues.neet * progress),
        foundation: Math.floor(finalValues.foundation * progress),
        topRanks: Math.floor(finalValues.topRanks * progress),
      });

      if (currentStep >= steps) {
        clearInterval(interval);
        setCounts(finalValues);
      }
    }, stepDuration);
  };

  const stats = [
    {
      icon: Trophy,
      value: counts.iit,
      suffix: '+',
      label: 'IIT Selections',
      color: 'from-blue-500 to-blue-600',
    },
    {
      icon: Target,
      value: counts.neet,
      suffix: '+',
      label: 'NEET Qualifiers',
      color: 'from-green-500 to-green-600',
    },
    {
      icon: Award,
      value: counts.foundation,
      suffix: '+',
      label: '+2 Top Scorers',
      color: 'from-purple-500 to-purple-600',
    },
    {
      icon: TrendingUp,
      value: counts.topRanks,
      suffix: '%',
      label: 'Foundation Achievements',
      color: 'from-orange-500 to-orange-600',
    },
  ];

  return (
    <section ref={sectionRef} id="results" className="py-20 bg-[#1E3A8A] relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-96 h-96 bg-[#d4af37] rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#d4af37] rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-[#d4af37] font-semibold uppercase tracking-wider text-sm">
            Our Achievements
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mt-3 mb-4">
            Results That Speak Volumes
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Our students' success is a testament to our commitment to excellence in education
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-xl text-center hover:bg-white/10 transition-all duration-300 group"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#d4af37] mb-6 group-hover:scale-110 transition-transform duration-300">
                <stat.icon className="w-8 h-8 text-white" />
              </div>
              <div className="text-5xl font-bold text-[#d4af37] mb-2">
                {stat.value}
                <span>{stat.suffix}</span>
              </div>
              <div className="text-gray-300 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Recent Achievements */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-6 rounded-xl">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-2 h-2 rounded-full bg-[#d4af37]"></div>
              <h4 className="text-white font-semibold">JEE Advanced 2025</h4>
            </div>
            <p className="text-gray-300 text-sm">
              52 students secured ranks under AIR 500, with 3 students in Top 100
            </p>
          </div>
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-6 rounded-xl">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-2 h-2 rounded-full bg-[#d4af37]"></div>
              <h4 className="text-white font-semibold">NEET 2025</h4>
            </div>
            <p className="text-gray-300 text-sm">
              98% of our students qualified, with 15 students scoring above 680/720
            </p>
          </div>
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-6 rounded-xl">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-2 h-2 rounded-full bg-[#d4af37]"></div>
              <h4 className="text-white font-semibold">Scholarships Won</h4>
            </div>
            <p className="text-gray-300 text-sm">
              Students won scholarships worth ₹2.5 Crores in various national competitions
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}