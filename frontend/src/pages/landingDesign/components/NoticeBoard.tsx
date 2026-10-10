import { Calendar, Bell, Award } from 'lucide-react';

export function NoticeBoard() {
  const notices = [
    {
      type: 'exam',
      icon: Calendar,
      title: 'JEE Main Mock Test',
      date: 'February 20, 2026',
      description: 'Full-length mock test for JEE Main 2026. Registration open till Feb 18.',
      color: 'bg-blue-500',
    },
    {
      type: 'result',
      icon: Award,
      title: 'Foundation Result Declaration',
      date: 'February 15, 2026',
      description: 'Class VIII-X foundation course final exam results will be announced.',
      color: 'bg-green-500',
    },
    {
      type: 'event',
      icon: Bell,
      title: 'Parent-Teacher Meeting',
      date: 'February 22, 2026',
      description: 'Quarterly PTM to discuss student progress and performance analysis.',
      color: 'bg-orange-500',
    },
    {
      type: 'admission',
      icon: Bell,
      title: 'New Batch Admission Open',
      date: 'March 1, 2026',
      description: 'Enrollments open for 2026-27 academic session. Limited seats available.',
      color: 'bg-purple-500',
    },
    {
      type: 'exam',
      icon: Calendar,
      title: 'NEET Practice Test Series',
      date: 'February 25, 2026',
      description: 'Weekly test series for NEET 2026 aspirants starts this week.',
      color: 'bg-teal-500',
    },
    {
      type: 'event',
      icon: Bell,
      title: 'Scholarship Test Announcement',
      date: 'March 5, 2026',
      description: 'Merit-based scholarship test for new admissions. Up to 50% scholarship.',
      color: 'bg-indigo-500',
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-[#d4af37] font-semibold uppercase tracking-wider text-sm">
            Updates
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1E3A8A] mt-3 mb-4">
            Notice Board
          </h2>
          <p className="text-[#64748b] max-w-2xl mx-auto">
            Stay updated with the latest announcements, exam schedules, and important events
          </p>
        </div>

        {/* Scrollable Notices Container */}
        <div className="relative">
          <div className="overflow-x-auto pb-4 scrollbar-hide">
            <div className="flex gap-6 max-w-5xl mx-auto" style={{ width: 'max-content' }}>
              {notices.map((notice, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 group min-w-[320px] max-w-[320px]"
                >
                  <div className="flex items-start gap-4">
                    <div className={`${notice.color} w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                      <notice.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-semibold text-[#1E3A8A] group-hover:text-[#d4af37] transition-colors">
                          {notice.title}
                        </h4>
                      </div>
                      <p className="text-xs text-[#d4af37] font-medium mb-2 flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {notice.date}
                      </p>
                      <p className="text-sm text-[#64748b] leading-relaxed">
                        {notice.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Scroll Hint */}
          <div className="text-center mt-6">
            <p className="text-sm text-[#64748b]">← Scroll to view more notices →</p>
          </div>
        </div>

        {/* View All Button */}
        <div className="text-center mt-10">
          <button className="text-[#d4af37] font-medium hover:text-[#b8991f] transition-colors inline-flex items-center gap-2">
            View All Notices
            <span>→</span>
          </button>
        </div>
      </div>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}