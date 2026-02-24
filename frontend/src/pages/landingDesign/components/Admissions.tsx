import { useMemo, useState } from 'react';
import { Send, CheckCircle } from 'lucide-react';

export function Admissions() {
  const [formData, setFormData] = useState({
    name: '',
    course: '',
    parentContact: '',
    email: '',
    message: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const contactDigits = formData.parentContact.replace(/\D/g, '');
  const isEmailValid = useMemo(() => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim()), [formData.email]);
  const isContactValid = contactDigits.length === 10;
  const isFormValid = useMemo(
    () =>
      formData.name.trim().length > 0 &&
      formData.course.trim().length > 0 &&
      isEmailValid &&
      isContactValid,
    [formData.name, formData.course, isEmailValid, isContactValid, contactDigits]
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const payload = { ...formData, parentContact: contactDigits };
    console.log('Admission Form Submission:', JSON.stringify(payload, null, 2));
    // Simulate form submission
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        course: '',
        parentContact: '',
        email: '',
        message: '',
      });
    }, 3000);
  };

  return (
    <section id="admissions" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left - Info */}
          <div>
            <span className="text-[#d4af37] font-semibold uppercase tracking-wider text-sm">
              Join Us
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0f172a] mt-3 mb-6">
              Start Your Journey to Success
            </h2>
            <p className="text-[#64748b] mb-8 leading-relaxed">
              Take the first step towards your dream career. Fill out the admission form and our
              counseling team will reach out to you within 24 hours.
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#d4af37] rounded-lg flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-[#0f172a] mb-2">Free Counseling Session</h4>
                  <p className="text-sm text-[#64748b]">
                    Get personalized guidance on choosing the right course and batch
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#d4af37] rounded-lg flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-[#0f172a] mb-2">Scholarship Test</h4>
                  <p className="text-sm text-[#64748b]">
                    Eligible for scholarships up to 50% based on entrance test performance
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#d4af37] rounded-lg flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-[#0f172a] mb-2">Flexible Payment Plans</h4>
                  <p className="text-sm text-[#64748b]">
                    Easy installment options available to make quality education accessible
                  </p>
                </div>
              </div>
            </div>

            {/* Contact Info */}
            <div className="mt-8 p-6 bg-white rounded-xl border border-gray-200">
              <h4 className="font-semibold text-[#0f172a] mb-4">Contact Information</h4>
              <div className="space-y-2 text-sm text-[#64748b]">
                <p><strong>Phone:</strong> +91 98765 43210</p>
                <p><strong>Email:</strong> admissions@novaneeti.edu</p>
                <p><strong>Address:</strong> 123 Academic Avenue, Education District, City - 560001</p>
              </div>
            </div>
          </div>

          {/* Right - Form */}
          <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
            <h3 className="text-2xl font-bold text-[#0f172a] mb-6">Admission Form</h3>

            {isSubmitted ? (
              <div className="py-12 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <h4 className="text-xl font-semibold text-[#0f172a] mb-2">Application Submitted!</h4>
                <p className="text-[#64748b]">We'll contact you within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-[#0f172a] mb-2">
                    Student Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1E3A8A] focus:border-[#1E3A8A] outline-none transition-all"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label htmlFor="course" className="block text-sm font-medium text-[#0f172a] mb-2">
                    Select Course *
                  </label>
                  <select
                    id="course"
                    name="course"
                    value={formData.course}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d4af37] focus:border-[#d4af37] outline-none transition-all"
                  >
                    <option value="">Choose a course</option>
                    <option value="iit-jee">IIT-JEE (Main + Advanced)</option>
                    <option value="neet">NEET (Medical)</option>
                    <option value="foundation">Foundation Program</option>
                    <option value="crash">Crash Course</option>
                    <option value="test-series">Test Series</option>
                    <option value="repeater">Repeater Program</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="parentContact" className="block text-sm font-medium text-[#0f172a] mb-2">
                    Parent Contact Number *
                  </label>
                  <input
                    type="tel"
                    id="parentContact"
                    name="parentContact"
                    value={formData.parentContact}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d4af37] focus:border-[#d4af37] outline-none transition-all"
                    placeholder="+91 XXXXX XXXXX"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-[#0f172a] mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d4af37] focus:border-[#d4af37] outline-none transition-all"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-[#0f172a] mb-2">
                    Message (Optional)
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d4af37] focus:border-[#d4af37] outline-none transition-all resize-none"
                    placeholder="Any questions or special requirements..."
                  />
                </div>

                <button
                  type="submit"
                  className={`w-full py-4 rounded-lg flex items-center justify-center gap-2 font-semibold transition-colors duration-200 ${
                    isFormValid
                      ? 'bg-[#d4af37] text-white hover:bg-[#b8991f]'
                      : 'bg-[#d4af37]/40 text-white/60 cursor-not-allowed pointer-events-none'
                  }`}
                  disabled={!isFormValid}
                >
                  <span>Submit Application</span>
                  <Send className="w-5 h-5" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
