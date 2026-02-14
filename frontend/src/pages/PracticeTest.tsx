import { memo, useMemo } from 'react';
import clsx from 'clsx';
import ImageWithSkeleton from '@/components/ui/ImageWithSkeleton';

type Option = { key: string; label: string; value: string };
type PaletteStatus = 'answered' | 'notAnswered' | 'flagged' | 'notVisited' | 'current';

const OptionCard = memo(({ option, name }: { option: Option; name: string }) => (
  <label className="group relative flex items-center p-4 border-2 border-slate-100 dark:border-slate-800 rounded-xl cursor-pointer hover:border-primary/30 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all has-[:checked]:border-primary has-[:checked]:bg-primary/5">
    <input className="hidden" name={name} type="radio" />
    <span className="w-8 h-8 flex items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-500 font-bold mr-4 group-has-[:checked]:bg-primary group-has-[:checked]:text-white">
      {option.key}
    </span>
    <span className="text-base font-medium text-slate-700 dark:text-slate-300">{option.label}</span>
    <div className="ml-auto opacity-0 group-has-[:checked]:opacity-100">
      <span className="material-symbols-outlined text-primary">check_circle</span>
    </div>
  </label>
));

const PaletteButton = memo(({ idx, status }: { idx: number; status: PaletteStatus }) => {
  const base =
    status === 'answered'
      ? 'bg-green-500 text-white shadow-sm'
      : status === 'notAnswered'
        ? 'bg-red-400 text-white shadow-sm'
        : status === 'flagged'
          ? 'bg-amber-400 text-white shadow-sm'
          : status === 'current'
            ? 'bg-primary text-white shadow-md ring-4 ring-primary/20'
            : 'bg-slate-200 dark:bg-slate-700 text-slate-500';

  return (
    <button className={clsx('w-10 h-10 flex items-center justify-center rounded-lg text-xs font-bold', base)}>{idx.toString().padStart(2, '0')}</button>
  );
});

const LegendItem = memo(({ colorClass, label }: { colorClass: string; label: string }) => (
  <div className="flex items-center gap-3">
    <span className={clsx('w-3 h-3 rounded-sm', colorClass)}></span>
    <span className="text-xs font-medium text-slate-600 dark:text-slate-400">{label}</span>
  </div>
));

const PracticeTest = () => {
  const options = useMemo<Option[]>(
    () => [
      { key: 'A', label: 'R / 3', value: 'R/3' },
      { key: 'B', label: 'R / 2', value: 'R/2' },
      { key: 'C', label: '2R / 3', value: '2R/3' },
      { key: 'D', label: 'R / 4', value: 'R/4' }
    ],
    []
  );

  const palette = useMemo<PaletteStatus[]>(
    () => [
      'answered',
      'answered',
      'answered',
      'notVisited',
      'flagged',
      'answered',
      'answered',
      'notVisited',
      'notVisited',
      'notAnswered',
      'answered',
      'answered',
      'notVisited',
      'current',
      'notVisited',
      'notVisited',
      'notVisited',
      'notVisited',
      'notVisited',
      'notVisited',
      'notVisited',
      'notVisited',
      'notVisited',
      'notVisited',
      'notVisited'
    ],
    []
  );

  return (
    <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 min-h-screen flex flex-col overflow-hidden">
      <header className="h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-6 z-50">
        <div className="flex items-center gap-4">
          <div className="bg-primary p-1.5 rounded-lg text-white">
            <span className="material-symbols-outlined block text-2xl">school</span>
          </div>
          <div>
            <h1 className="text-lg font-bold leading-tight tracking-tight">Nova Neeti IIT Academy</h1>
            <p className="text-xs text-slate-500 font-medium">JEE Main Full Mock - Test #24</p>
          </div>
        </div>
        <nav className="hidden md:flex items-center bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
          <button className="px-6 py-1.5 rounded-lg text-sm font-semibold bg-white dark:bg-slate-700 shadow-sm text-primary">Physics</button>
          <button className="px-6 py-1.5 rounded-lg text-sm font-semibold text-slate-500 hover:text-slate-700">Chemistry</button>
          <button className="px-6 py-1.5 rounded-lg text-sm font-semibold text-slate-500 hover:text-slate-700">Mathematics</button>
        </nav>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3 bg-red-50 dark:bg-red-950/30 px-4 py-2 rounded-xl border border-red-100 dark:border-red-900">
            <span className="material-symbols-outlined text-red-600 dark:text-red-400 text-xl">timer</span>
            <span className="font-mono text-lg font-bold text-red-600 dark:text-red-400">02:45:12</span>
          </div>
          <button className="bg-primary hover:bg-primary/90 text-white px-5 py-2 rounded-lg text-sm font-bold transition-all shadow-md shadow-primary/20">
            Submit Test
          </button>
        </div>
      </header>

      <main className="flex flex-1 overflow-hidden">
        <section className="flex-1 flex flex-col bg-white dark:bg-background-dark overflow-y-auto custom-scrollbar">
          <div className="px-8 pt-8 pb-4 flex justify-between items-end border-b border-slate-50 dark:border-slate-800">
            <div>
              <span className="inline-block bg-primary/10 text-primary text-xs font-bold px-3 py-1 rounded-full mb-2 uppercase tracking-wider">
                Single Correct Type
              </span>
              <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Question 14</h2>
            </div>
            <div className="flex gap-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                Marks: <span className="text-green-600">+4</span> <span className="text-red-600 ml-1">-1</span>
              </span>
            </div>
          </div>

          <div className="px-8 py-6 space-y-8">
            <p className="text-lg leading-relaxed text-slate-700 dark:text-slate-300">
              A point particle of mass <span className="italic font-serif">m</span> is released from rest at the top of a smooth sphere of radius{' '}
              <span className="italic font-serif">R</span>. At what vertical distance from the top will the particle leave the sphere?
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {options.map((option) => (
                <OptionCard key={option.key} option={option} name="q14" />
              ))}
            </div>

            <div className="bg-gradient-to-r from-primary/5 to-purple-500/5 border border-primary/20 p-6 rounded-2xl flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white shadow-lg shadow-primary/20">
                  <span className="material-symbols-outlined">auto_awesome</span>
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 dark:text-white">Stuck on this question?</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Ask Nova for a conceptual hint without revealing the answer.</p>
                </div>
              </div>
              <button className="bg-white dark:bg-slate-800 hover:bg-slate-50 text-primary border border-primary/30 px-5 py-2.5 rounded-xl font-bold text-sm shadow-sm flex items-center gap-2 transition-all">
                <span className="material-symbols-outlined text-lg">psychology</span>
                Ask Nova Mentor
              </button>
            </div>

            <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-8 border border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2 mb-4">
                <span className="material-symbols-outlined text-green-500">task_alt</span>
                <h4 className="text-lg font-bold text-slate-800 dark:text-white">Detailed Explanation</h4>
              </div>
              <div className="space-y-4 text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                <p>1. Using Energy Conservation: Loss in PE = Gain in KE.</p>
                <p>
                  2. At any height <span className="italic font-serif">h</span> from the top, <span className="italic font-serif">mg(h) = ½mv²</span>.
                </p>
                <p>
                  3. Radial Force Equation: <span className="italic font-serif">mg cosθ - N = mv² / R</span>.
                </p>
                <p>
                  4. The particle leaves the sphere when normal reaction <span className="italic font-serif">N = 0</span>.
                </p>
                <p>
                  Substituting <span className="italic font-serif">cosθ = (R-h)/R</span> and solving, we find <span className="italic font-serif">h = R/3</span>.
                </p>
              </div>
              <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-700 flex justify-between items-center">
                <button className="flex items-center gap-2 text-primary font-bold text-sm hover:underline">
                  <span className="material-symbols-outlined text-lg">play_circle</span>
                  Watch Video Solution
                </button>
                <button className="bg-primary text-white px-5 py-2 rounded-lg text-sm font-bold shadow-md shadow-primary/10">Practice More Like This</button>
              </div>
            </div>
          </div>
        </section>

        <aside className="w-80 bg-background-light dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 flex flex-col">
          <div className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-primary/10 p-2 rounded-lg text-primary">
                <span className="material-symbols-outlined block">apps</span>
              </div>
              <h3 className="font-bold text-slate-800 dark:text-white uppercase tracking-wider text-xs">Question Palette</h3>
            </div>
            <div className="grid grid-cols-5 gap-3 max-h-[400px] overflow-y-auto custom-scrollbar pr-1">
              {palette.map((status, idx) => (
                <PaletteButton key={idx} idx={idx + 1} status={status} />
              ))}
            </div>
            <div className="mt-8 space-y-3 pt-6 border-t border-slate-200 dark:border-slate-800">
              <LegendItem colorClass="bg-green-500" label="Answered (7)" />
              <LegendItem colorClass="bg-red-400" label="Not Answered (1)" />
              <LegendItem colorClass="bg-amber-400" label="Flagged (1)" />
              <LegendItem colorClass="bg-slate-200 dark:bg-slate-700" label="Not Visited (16)" />
            </div>
          </div>
          <div className="mt-auto p-6 bg-slate-100 dark:bg-slate-800/30">
            <div className="flex items-center gap-3 mb-4">
              <div className="size-10 rounded-full bg-cover bg-center border-2 border-white">
                <ImageWithSkeleton
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCGbSMCctfjSE8ArGZwq_agIACphQkkQCrIkFAiRyOae-7_o5Bymhb33oR5jShbVY_OMG-UGW8jrJNUUn1Ly8ItncF9B8IzpEte-Va2_xI-77FDR60uOefgBww6hIh8gDUzP6iw8L9zwwmumVLJQ-bBNIQAcKB2q9kaRH6toWTSyDvEiwqUKo8xiMKlA0z7EGuPXYwDkjzACWneQalKPLGnWAKk4PJlGVltSKoBhYbbzsQ69Y2zshtNzrJZUtxDY8vgoKsiU0hrK-4Z"
                  alt="Student"
                  className="w-full h-full"
                  skeletonClassName="w-full h-full"
                />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-800 dark:text-white leading-tight">Aditya Sharma</p>
                <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Roll: 2024-JEE-442</p>
              </div>
            </div>
            <button className="w-full flex items-center justify-center gap-2 text-xs font-bold text-slate-500 hover:text-red-500 transition-colors">
              <span className="material-symbols-outlined text-sm">logout</span>
              Logout
            </button>
          </div>
        </aside>
      </main>

      <footer className="h-20 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 px-8 flex items-center justify-between z-50">
        <div className="flex gap-4">
          <button className="flex items-center gap-2 border border-slate-300 dark:border-slate-700 px-6 py-2.5 rounded-lg text-sm font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all">
            <span className="material-symbols-outlined text-lg">chevron_left</span>
            Previous
          </button>
          <button className="flex items-center gap-2 border border-amber-500 text-amber-600 px-6 py-2.5 rounded-lg text-sm font-bold hover:bg-amber-50 transition-all">
            <span className="material-symbols-outlined text-lg">flag</span>
            Mark for Review
          </button>
        </div>
        <div className="flex gap-4">
          <button className="px-8 py-2.5 rounded-lg text-sm font-bold text-slate-500 hover:bg-slate-100 transition-all">Clear Response</button>
          <button className="bg-primary hover:bg-primary/90 text-white px-10 py-2.5 rounded-lg text-sm font-bold shadow-lg shadow-primary/20 flex items-center gap-2 transition-all">
            Save &amp; Next
            <span className="material-symbols-outlined text-lg">chevron_right</span>
          </button>
        </div>
      </footer>
    </div>
  );
};

export default PracticeTest;
