import { Header, Hero, KeyHighlights, About, Courses, Faculty, Results, Admissions, Gallery, NoticeBoard, Footer } from '@/pages/landingDesign';

export default function Landing() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Header />
      <main className="pt-24">
        <Hero />
        <KeyHighlights />
        <About />
        <Courses />
        <Faculty />
        <Results />
        <Admissions />
        <Gallery />
        <NoticeBoard />
      </main>
      <Footer />
    </div>
  );
}
