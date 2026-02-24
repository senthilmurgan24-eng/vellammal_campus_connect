import { Quote } from 'lucide-react';

export function Faculty() {
  const facultyMembers = [
    {
      name: 'Dr. Rajesh Kumar',
      qualification: 'IIT Delhi | Ph.D. in Physics',
      description: '15+ years of experience in coaching JEE Physics with 100+ AIR holders',
      image: 'https://images.unsplash.com/photo-1584554376766-ac0f2c65e949?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBtYWxlJTIwdGVhY2hlcnxlbnwxfHx8fDE3NzEwNDk5MzZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      name: 'Prof. Priya Sharma',
      qualification: 'IIT Bombay | M.Sc. Chemistry',
      description: 'Expert in Organic Chemistry with a track record of top NEET rankers',
      image: 'https://images.unsplash.com/photo-1758685848208-e108b6af94cc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBmZW1hbGUlMjB0ZWFjaGVyfGVufDF8fHx8MTc3MTA0OTkzNnww&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      name: 'Mr. Aditya Singh',
      qualification: 'IIT Kanpur | B.Tech + M.Tech',
      description: 'Mathematics wizard known for simplifying complex problems',
      image: 'https://images.unsplash.com/photo-1584554376766-ac0f2c65e949?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBtYWxlJTIwdGVhY2hlcnxlbnwxfHx8fDE3NzEwNDk5MzZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      name: 'Dr. Meera Reddy',
      qualification: 'AIIMS Delhi | MD',
      description: 'Biology expert with deep insights into NEET examination patterns',
      image: 'https://images.unsplash.com/photo-1758685848208-e108b6af94cc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBmZW1hbGUlMjB0ZWFjaGVyfGVufDF8fHx8MTc3MTA0OTkzNnww&ixlib=rb-4.1.0&q=80&w=1080',
    },
  ];

  return (
    <section id="faculty" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-[#d4af37] font-semibold uppercase tracking-wider text-sm">
            Our Faculty
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1E3A8A] mt-3 mb-4">
            Learn From The Best
          </h2>
          <p className="text-[#64748b] max-w-2xl mx-auto mb-8">
            Our distinguished faculty members bring decades of combined experience and expertise
          </p>

          {/* Quote */}
          <div className="bg-gradient-to-r from-[#1E3A8A] to-[#2563eb] p-8 rounded-xl max-w-3xl mx-auto relative shadow-lg">
            <Quote className="w-12 h-12 text-[#d4af37]/20 absolute top-4 left-4" />
            <p className="text-white text-lg italic relative z-10 pt-4">
              "Our teachers don't just teach — they mentor and mould futures."
            </p>
          </div>
        </div>

        {/* Faculty Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {facultyMembers.map((faculty, index) => (
            <div
              key={index}
              className="group cursor-pointer"
            >
              <div className="relative mb-6">
                {/* Circular Photo */}
                <div className="w-full aspect-square rounded-full overflow-hidden border-4 border-gray-100 group-hover:border-[#d4af37] transition-all duration-300 shadow-lg group-hover:shadow-2xl">
                  <img
                    src={faculty.image}
                    alt={faculty.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                {/* Decorative ring */}
                <div className="absolute inset-0 rounded-full border-2 border-[#d4af37]/0 group-hover:border-[#d4af37]/30 transition-all duration-300 scale-110"></div>
              </div>

              <div className="text-center">
                <h3 className="text-lg font-bold text-[#1E3A8A] mb-2 group-hover:text-[#d4af37] transition-colors">
                  {faculty.name}
                </h3>
                <p className="text-sm text-[#d4af37] font-medium mb-3">
                  {faculty.qualification}
                </p>
                <p className="text-sm text-[#64748b] leading-relaxed">
                  {faculty.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Medical Students & +2 Students Photos */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
          {/* Medical Students */}
          <div className="relative rounded-xl overflow-hidden shadow-xl group">
            <img
              src="https://images.unsplash.com/photo-1766297247913-54717c00e79c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwc3R1ZGVudHMlMjB3aGl0ZSUyMGNvYXR8ZW58MXx8fHwxNzcxMDkyOTA0fDA&ixlib=rb-4.1.0&q=80&w=1080"
              alt="Medical Students"
              className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1E3A8A]/80 to-transparent flex items-end">
              <div className="p-6 text-white">
                <h3 className="text-2xl font-bold mb-2">NEET Aspirants</h3>
                <p className="text-gray-200">Our medical students in action</p>
              </div>
            </div>
          </div>

          {/* +2 Students */}
          <div className="relative rounded-xl overflow-hidden shadow-xl group">
            <img
              src="https://images.unsplash.com/photo-1743032937652-d5e03c3236e1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoaWdoJTIwc2Nob29sJTIwc3R1ZGVudHMlMjBjbGFzc3Jvb218ZW58MXx8fHwxNzcxMDkyOTA1fDA&ixlib=rb-4.1.0&q=80&w=1080"
              alt="+2 Students"
              className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1E3A8A]/80 to-transparent flex items-end">
              <div className="p-6 text-white">
                <h3 className="text-2xl font-bold mb-2">+2 Integrated Program</h3>
                <p className="text-gray-200">Excellence in board and competitive exams</p>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-16 text-center">
          <p className="text-[#64748b] mb-6">
            All our faculty members are carefully selected based on their expertise, teaching methodology,
            and commitment to student success.
          </p>
          <a
            href="#admissions"
            className="inline-block bg-[#d4af37] text-white px-8 py-3 rounded-lg hover:bg-[#b8991f] transition-colors duration-200 shadow-lg hover:shadow-xl"
          >
            Join Our Classes
          </a>
        </div>
      </div>
    </section>
  );
}
