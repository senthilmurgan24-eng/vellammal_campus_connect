import { Link } from 'react-router-dom';

const courses = [
  {
    title: 'IIT–JEE (Main + Advanced)',
    description: '1 & 2 Year programs for XI, XII and Dropper students.'
  },
  {
    title: 'NEET (UG)',
    description: 'NCERT-focused preparation with regular test series.'
  },
  {
    title: 'Foundation (VIII–X)',
    description: 'CBSE + Olympiad foundation strengthening.'
  }
];

const stats = ['Consistent IIT & NIT selections', '95% NEET qualifying rate', '100+ Foundation success stories'];

function Landing() {
  return (
    <div className="min-h-screen bg-[#f4f6f8] text-[#222]">

      <header className="bg-primary text-white px-6 py-6 shadow-lg shadow-primary/25">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold">Nova Neeti IIT Academy</h1>
            <p className="text-sm opacity-90">Empowering Tomorrow’s Achievers Today</p>
          </div>
          <nav className="flex flex-wrap items-center gap-3 text-sm font-semibold uppercase tracking-wide">
            <a className="text-white/80 transition hover:text-white" href="#about">
              About
            </a>
            <a className="text-white/80 transition hover:text-white" href="#courses">
              Courses
            </a>
            <a className="text-white/80 transition hover:text-white" href="#results">
              Results
            </a>
            <a className="text-white/80 transition hover:text-white" href="#admissions">
              Admissions
            </a>
            <a className="text-white/80 transition hover:text-white" href="#contact">
              Contact
            </a>
            <Link
              to="/login"
              className="ml-3 rounded-full bg-white/20 px-4 py-2 text-xs font-bold tracking-wider text-white transition hover:bg-white/30"
            >
              Login
            </Link>
          </nav>
        </div>
      </header>

      <section className="hero bg-[#eaf0ff] px-6 py-16 text-center">
        <h2 className="text-3xl font-extrabold md:text-4xl">Your Nexus to IIT–JEE & NEET Excellence</h2>
        <p className="mt-3 text-lg text-[#1e2b46]">Concept clarity • Discipline • Results</p>
        <a
          className="btn mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white shadow-md shadow-primary/30 transition hover:bg-primary/90"
          href="#admissions"
        >
          Apply Now
        </a>
      </section>

      <section id="about" className="px-6 py-16 md:px-16">
        <h2 className="text-2xl font-bold">About Us</h2>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-[#2a3343]">
          Nova Neeti IIT Academy is a premier coaching institute dedicated to IIT–JEE, NEET and Foundation
          preparation. We believe in a strong nexus between conceptual clarity and result-oriented training.
        </p>
      </section>

      <section id="courses" className="px-6 py-16 md:px-16">
        <h2 className="text-2xl font-bold">Courses Offered</h2>
        <div className="cards mt-8 grid gap-6 md:grid-cols-3">
          {courses.map((course) => (
            <div key={course.title} className="card p-6 shadow-xl">
              <h3 className="text-xl font-semibold">{course.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">{course.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="results" className="px-6 py-16 md:px-16">
        <h2 className="text-2xl font-bold">Results & Achievements</h2>
        <ul className="mt-6 space-y-3 text-sm font-medium text-[#1e2b46]">
          {stats.map((item) => (
            <li key={item} className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">check_circle</span>
              {item}
            </li>
          ))}
        </ul>
      </section>

      <section id="admissions" className="px-6 py-16 md:px-16">
        <div className="max-w-3xl space-y-6">
          <div>
            <h2 className="text-2xl font-bold">Admissions</h2>
            <p className="mt-2 text-sm text-[#1f2b37]">
              Fill the enquiry form below. We will contact you shortly.
            </p>
          </div>
          <form className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white/70 p-6 shadow">
            <input
              className="rounded-lg border border-slate-200 px-4 py-3 text-sm w-full"
              type="text"
              placeholder="Student Name"
              aria-label="Student Name"
              required
            />
            <input
              className="rounded-lg border border-slate-200 px-4 py-3 text-sm w-full"
              type="text"
              placeholder="Parent Mobile Number"
              aria-label="Parent Mobile Number"
              required
            />
            <input
              className="rounded-lg border border-slate-200 px-4 py-3 text-sm w-full"
              type="email"
              placeholder="Email Address"
              aria-label="Email Address"
            />
            <textarea
              className="h-24 rounded-lg border border-slate-200 px-4 py-3 text-sm w-full"
              placeholder="Course Interested"
              aria-label="Course Interested"
            ></textarea>
            <button className="btn-primary w-full" type="submit">
              Submit
            </button>
          </form>
        </div>
      </section>

      <section id="contact" className="px-6 py-16 md:px-16">
        <h2 className="text-2xl font-bold">Contact Us</h2>
        <div className="mt-4 space-y-2 text-sm text-[#1e2b46]">
          <p>
            <strong>Phone:</strong> 9344104954
          </p>
          <p>
            <strong>Email:</strong> novaneetiitacademy@gmail.com
          </p>
          <p>
            <strong>Office Hours:</strong> 9:00 AM – 7:00 PM (Mon–Sat)
          </p>
        </div>
      </section>

      <footer className="border-t border-slate-200 px-6 py-8 text-sm text-[#1e2b46]">
        © 2026 Nova Neeti IIT Academy. All Rights Reserved.
      </footer>
    </div>
  );
}

export default Landing;
