import { Clock, Users, BookOpen, Calendar } from 'lucide-react';

export function Courses() {
  const courses = [
    {
      name: 'IIT-JEE (Main + Advanced)',
      duration: '2 Years',
      targetClass: 'Class XI & XII',
      mode: 'Offline / Hybrid',
      description: 'Comprehensive program covering Physics, Chemistry, and Mathematics',
      color: 'from-blue-600 to-blue-700',
    },
    {
      name: 'NEET (Medical)',
      duration: '2 Years',
      targetClass: 'Class XI & XII',
      mode: 'Offline / Hybrid',
      description: 'Complete preparation for Physics, Chemistry, and Biology',
      color: 'from-green-600 to-green-700',
    },
    {
      name: 'Foundation Program',
      duration: '3 Years',
      targetClass: 'Class VIII - X',
      mode: 'Offline',
      description: 'Strong foundation building for future competitive exams',
      color: 'from-purple-600 to-purple-700',
    },
    {
      name: '+2 Integrated Program',
      duration: '2 Years',
      targetClass: 'Class XI & XII',
      mode: 'Offline / Hybrid',
      description: 'Board + Competitive exam preparation in a single integrated course',
      color: 'from-indigo-600 to-indigo-700',
    },
    {
      name: 'Medical Entrance Preparation',
      duration: '1-2 Years',
      targetClass: 'Class XII / Dropper',
      mode: 'Offline / Online',
      description: 'Specialized program for NEET and other medical entrance exams',
      color: 'from-teal-600 to-teal-700',
    },
  ];

  return (
    <section id="courses" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-[#d4af37] font-semibold uppercase tracking-wider text-sm">
            Our Programs
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1E3A8A] mt-3 mb-4">
            Courses We Offer
          </h2>
          <p className="text-[#64748b] max-w-2xl mx-auto">
            Choose from our range of meticulously designed courses tailored to meet your academic goals
          </p>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course, index) => (
            <div
              key={index}
              className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 group border border-gray-100"
            >
              {/* Colored Header */}
              <div className={`h-2 bg-gradient-to-r ${course.color}`}></div>

              <div className="p-8">
                <h3 className="text-xl font-bold text-[#1E3A8A] mb-3 group-hover:text-[#d4af37] transition-colors">
                  {course.name}
                </h3>
                <p className="text-sm text-[#64748b] mb-6 leading-relaxed">
                  {course.description}
                </p>

                {/* Course Details */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3 text-sm text-[#64748b]">
                    <Clock className="w-4 h-4 text-[#d4af37]" />
                    <span>Duration: {course.duration}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-[#64748b]">
                    <Users className="w-4 h-4 text-[#d4af37]" />
                    <span>For: {course.targetClass}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-[#64748b]">
                    <BookOpen className="w-4 h-4 text-[#d4af37]" />
                    <span>Mode: {course.mode}</span>
                  </div>
                </div>

                {/* CTA Button */}
                <a
                  href="#admissions"
                  className="block w-full text-center bg-[#1E3A8A] text-white py-3 rounded-lg hover:bg-[#d4af37] transition-colors duration-200"
                >
                  Enroll Now
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-12 bg-white p-8 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-start gap-4">
            <Calendar className="w-6 h-6 text-[#d4af37] mt-1 flex-shrink-0" />
            <div>
              <h4 className="font-semibold text-[#1E3A8A] mb-2">Batch Starting Soon</h4>
              <p className="text-sm text-[#64748b]">
                New batches for all programs commence in April and July. Limited seats available.
                Book your seat today to secure admission.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}