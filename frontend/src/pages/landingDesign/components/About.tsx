import { CheckCircle } from 'lucide-react';

export function About() {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left - Image */}
          <div className="relative">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1758270704226-db897b180243?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoaWdoJTIwc2Nob29sJTIwY2xhc3Nyb29tJTIwdGVhY2hpbmd8ZW58MXx8fHwxNzcxMDkyOTAzfDA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Classroom teaching"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Decorative element */}
            <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-[#1E3A8A]/10 rounded-2xl -z-10"></div>
          </div>

          {/* Right - Content */}
          <div>
            <div className="mb-4">
              <span className="text-[#d4af37] font-semibold uppercase tracking-wider text-sm">
                About Us
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1E3A8A] mb-6">
              Building Future Leaders in Science & Medicine
            </h2>
            <p className="text-[#64748b] mb-6 leading-relaxed">
              Nova Neeti IIT Academy is a premier coaching institute dedicated to nurturing young minds
              and preparing them for the most competitive entrance examinations in India. With over 15
              years of excellence, we have established ourselves as a trusted name in IIT-JEE and NEET
              preparation.
            </p>
            <p className="text-[#64748b] mb-8 leading-relaxed">
              Our mission is to provide world-class education that goes beyond textbooks, fostering
              critical thinking, problem-solving skills, and a genuine love for learning.
            </p>

            {/* Mission Statement Box */}
            <div className="bg-gradient-to-r from-[#1E3A8A] to-[#2563eb] p-6 rounded-xl text-white mb-8 shadow-lg">
              <h3 className="text-lg font-semibold mb-3 text-[#d4af37]">Our Mission</h3>
              <p className="text-gray-100 text-sm leading-relaxed">
                To empower every student with the knowledge, skills, and confidence to excel in their
                academic pursuits and emerge as tomorrow's leaders in science, technology, and medicine.
              </p>
            </div>

            {/* Key Features */}
            <div className="space-y-3">
              {[
                'Comprehensive study materials and practice tests',
                'Regular doubt-clearing sessions',
                'Performance tracking and analytics',
                'Scholarship programs for deserving students',
              ].map((feature, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-[#d4af37] mt-0.5 flex-shrink-0" />
                  <span className="text-[#64748b]">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}