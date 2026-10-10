import { Award, Target, TrendingUp, Users } from 'lucide-react';

export function KeyHighlights() {
  const highlights = [
    {
      icon: Award,
      title: 'IIT-qualified Faculty',
      description: 'Learn from experts who have walked the path of success themselves',
    },
    {
      icon: Target,
      title: 'Concept Clarity + Result-Oriented Teaching',
      description: 'Deep understanding of fundamentals with a strategic approach to exams',
    },
    {
      icon: TrendingUp,
      title: 'Proven Track Record of Top Ranks',
      description: 'Consistent results with students securing top positions in JEE & NEET',
    },
    {
      icon: Users,
      title: 'Personalized Mentorship',
      description: 'Individual attention and customized study plans for every student',
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {highlights.map((highlight, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-xl shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group cursor-pointer border border-gray-100 hover:border-[#1E3A8A]/30"
            >
              <div className="w-16 h-16 bg-[#1E3A8A] rounded-lg flex items-center justify-center mb-6 group-hover:bg-[#d4af37] transition-colors duration-300">
                <highlight.icon className="w-8 h-8 text-[#d4af37] group-hover:text-white" />
              </div>
              <h3 className="text-lg font-semibold text-[#1E3A8A] mb-3 group-hover:text-[#d4af37] transition-colors duration-300">
                {highlight.title}
              </h3>
              <p className="text-sm text-[#64748b] leading-relaxed">
                {highlight.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}