import { memo, useMemo } from 'react';
import { Link } from 'react-router-dom';
import ImageWithSkeleton from '@/components/ui/ImageWithSkeleton';
import Skeleton from '@/components/ui/Skeleton';

type KPI = { label: string; value: string; sub?: string; delta?: string; deltaColor?: 'green' | 'red' | 'amber' };
type HeatmapSubject = { name: string; cells: string[] };
type GrowthItem = { title: string; description: string; color: 'orange' | 'primary' | 'green'; icon: string };

const KPICard = memo(({ kpi }: { kpi: KPI }) => (
  <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
    <p className="text-slate-500 text-sm font-medium mb-1">{kpi.label}</p>
    <div className="flex items-end gap-2">
      <span className="text-3xl font-bold">{kpi.value}</span>
      {kpi.sub && <span className="text-slate-400 text-sm font-medium mb-1">{kpi.sub}</span>}
      {kpi.delta && (
        <span
          className={`text-sm font-bold flex items-center mb-1 ${
            kpi.deltaColor === 'green' ? 'text-green-600' : kpi.deltaColor === 'red' ? 'text-red-600' : 'text-amber-600'
          }`}
        >
          <span className="material-symbols-outlined text-sm">arrow_upward</span>
          {kpi.delta}
        </span>
      )}
    </div>
  </div>
));

const HeatCell = memo(({ color, tooltip }: { color: string; tooltip?: string }) => (
  <div className="group relative aspect-square rounded-sm hover:ring-2 ring-primary cursor-help" style={{ backgroundColor: color }}>
    {tooltip && (
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-32 hidden group-hover:block bg-slate-900 text-white text-[10px] p-2 rounded shadow-lg z-20">
        {tooltip}
      </div>
    )}
  </div>
));

const LegendItem = memo(({ color, label }: { color: string; label: string }) => (
  <div className="flex items-center gap-3">
    <span className="w-3 h-3 rounded-sm" style={{ backgroundColor: color }}></span>
    <span className="text-xs font-medium text-slate-600 dark:text-slate-400">{label}</span>
  </div>
));

const GrowthCard = memo(({ item }: { item: GrowthItem }) => {
  const colorClasses =
    item.color === 'orange'
      ? 'bg-orange-50 dark:bg-orange-950/20 border border-orange-100 dark:border-orange-900/50 text-orange-900 dark:text-orange-100'
      : item.color === 'green'
        ? 'bg-green-50 dark:bg-green-950/20 border border-green-100 dark:border-green-900/50 text-green-900 dark:text-green-100'
        : 'bg-primary/5 border border-primary/10 text-slate-800 dark:text-slate-100';

  const iconBg =
    item.color === 'orange' ? 'bg-orange-500' : item.color === 'green' ? 'bg-green-500' : 'bg-primary';

  return (
    <div className={`flex gap-4 items-start p-4 rounded-xl ${colorClasses}`}>
      <div className={`${iconBg} text-white p-2 rounded-lg`}>
        <span className="material-symbols-outlined">{item.icon}</span>
      </div>
      <div>
        <p className="text-sm font-bold">{item.title}</p>
        <p className="text-xs mt-1 leading-relaxed text-slate-700 dark:text-slate-300">{item.description}</p>
      </div>
    </div>
  );
});

const Analytics = () => {
  const kpis = useMemo<KPI[]>(
    () => [
      { label: 'Current Percentile', value: '98.42', delta: '1.2%', deltaColor: 'green' },
      { label: 'Avg. Score', value: '642', sub: '/ 720' },
      { label: 'Mock Tests', value: '24', sub: 'Complete' },
      { label: 'Syllabus Completion', value: '82%' }
    ],
    []
  );

  const heatmap: HeatmapSubject[] = useMemo(
    () => [
      {
        name: 'Physics',
        cells: [
          '#16a34a',
          '#22c55e',
          '#34d399',
          '#facc15',
          '#fb923c',
          '#ea580c',
          '#f97316',
          '#16a34a',
          '#16a34a',
          '#22c55e',
          '#34d399',
          '#facc15'
        ]
      },
      {
        name: 'Chemistry',
        cells: ['#34d399', '#16a34a', '#16a34a', '#22c55e', '#facc15', '#facc15', '#facc15', '#22c55e', '#16a34a', '#16a34a', '#16a34a', '#16a34a']
      },
      {
        name: 'Biology',
        cells: ['#16a34a', '#16a34a', '#16a34a', '#22c55e', '#22c55e', '#16a34a', '#16a34a', '#16a34a', '#22c55e', '#34d399', '#facc15', '#fb923c']
      }
    ],
    []
  );

  const growth = useMemo<GrowthItem[]>(
    () => [
      {
        title: 'Immediate Focus: Rotation Mechanics',
        description: 'Your accuracy is high (84%) but your speed is 2x the target average. Practice 50 timed MCQs this week.',
        color: 'orange',
        icon: 'bolt'
      },
      {
        title: 'Revision: Organic Synthesis',
        description: 'Heatmap shows weakness for Nitrogen Compounds. Complete the remedial video lecture and test.',
        color: 'primary',
        icon: 'psychology'
      },
      {
        title: 'Strength Maintenance: Human Physiology',
        description: 'Maintain your 95% accuracy by attempting the “Pro-Level” mock test section tomorrow.',
        color: 'green',
        icon: 'trending_up'
      }
    ],
    []
  );

  return (
    <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 min-h-screen flex">
      <aside className="w-64 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col">
        <div className="p-6 flex items-center gap-3">
          <div className="bg-primary p-2 rounded-lg text-white">
            <span className="material-symbols-outlined text-2xl">school</span>
          </div>
          <h1 className="font-bold text-lg leading-tight tracking-tight">
            Vellammal
            <br />
            <span className="text-primary text-sm">Campus Connect</span>
          </h1>
        </div>
        <nav className="flex-1 px-4 space-y-1">
          <Link className="flex items-center gap-3 px-3 py-2 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg" to="/dashboard">
            <span className="material-symbols-outlined">dashboard</span>
            <span className="text-sm font-medium">Dashboard</span>
          </Link>
          <Link className="flex items-center gap-3 px-3 py-2 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg" to="#">
            <span className="material-symbols-outlined">book</span>
            <span className="text-sm font-medium">Courses</span>
          </Link>
          <Link className="flex items-center gap-3 px-3 py-2 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg" to="/practice-tests">
            <span className="material-symbols-outlined">quiz</span>
            <span className="text-sm font-medium">Tests</span>
          </Link>
          <Link className="flex items-center gap-3 px-3 py-2 bg-primary/10 text-primary rounded-lg" to="/analytics">
            <span className="material-symbols-outlined">analytics</span>
            <span className="text-sm font-medium">Analytics</span>
          </Link>
          <Link className="flex items-center gap-3 px-3 py-2 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg" to="#">
            <span className="material-symbols-outlined">calendar_month</span>
            <span className="text-sm font-medium">Schedule</span>
          </Link>
          <Link className="flex items-center gap-3 px-3 py-2 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg" to="/store">
            <span className="material-symbols-outlined">store</span>
            <span className="text-sm font-medium">Store</span>
          </Link>
        </nav>
        <div className="p-4 border-t border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-3 p-2 bg-slate-50 dark:bg-slate-800 rounded-xl">
            <ImageWithSkeleton
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDAmhb_rzzbVz8PzH8PVi0uDR65Z_qgFMfrvGxGboSnR-cmknM4oYItKOZd6kVZgZMdSUUYiA7Et_8cNbFfvzT6YwRAPn1bTaUs0RXZJVHR-eK13RUVARFpAc_gA6xDqGOLL9vXsIiaN3vRvnFwgX5m7bOemVd08bAauagbOUkb5gyHy2KU0i_ewLSVqk0eMAAEugt2JCT2as_pKJvMVs3K2dSU4jtIcxYk727No4j1Ls7zgIFdUu_Cty7_9zy8NzfHFROI3X25BpaI"
              alt="Profile photo"
              className="w-10 h-10 rounded-full object-cover"
              skeletonClassName="w-10 h-10"
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold truncate">Aryan Sharma</p>
              <p className="text-xs text-slate-500 truncate">NEET Aspirant 2025</p>
            </div>
          </div>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto bg-background-light dark:bg-background-dark">
        <header className="sticky top-0 z-10 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-8 py-4 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-1">
              <span>Analytics</span>
              <span className="material-symbols-outlined text-xs">chevron_right</span>
              <span className="text-primary font-medium">Student Performance</span>
            </div>
            <h2 className="text-2xl font-black tracking-tight">Advanced Performance Analytics</h2>
          </div>
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-semibold hover:bg-slate-50">
              <span className="material-symbols-outlined text-sm">download</span>
              Export Report
            </button>
            <button className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-semibold hover:bg-primary/90">Ask Mentor</button>
          </div>
        </header>

        <div className="p-8 max-w-[1400px] mx-auto space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {kpis.map((kpi) => (
              <KPICard key={kpi.label} kpi={kpi} />
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-4 bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col items-center justify-center relative overflow-hidden">
              <h3 className="w-full text-lg font-bold mb-8">Rank Predictor</h3>
              <div className="relative w-64 h-32 overflow-hidden">
                <div className="absolute inset-0 gauge-conic rounded-t-full opacity-20"></div>
                <div className="absolute inset-0 gauge-conic rounded-t-full mask-[radial-gradient(transparent_50%,black_51%)]"></div>
                <div className="absolute bottom-0 left-1/2 w-1 h-32 bg-slate-900 dark:bg-white -translate-x-1/2 origin-bottom rotate-[45deg] rounded-full transition-transform"></div>
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-8 h-8 rounded-full bg-white dark:bg-slate-900 border-4 border-slate-900 dark:border-white"></div>
              </div>
              <div className="text-center mt-6">
                <p className="text-slate-500 text-sm">Predicted NEET Rank</p>
                <p className="text-4xl font-black text-slate-900 dark:text-white">#1,450 - #2,100</p>
                <div className="mt-4 flex items-center justify-center gap-2 text-xs bg-primary/10 text-primary px-3 py-1 rounded-full font-bold">
                  <span className="material-symbols-outlined text-xs">info</span>
                  95% Confidence Interval
                </div>
              </div>
            </div>

            <div className="lg:col-span-8 bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold">Strength Analysis</h3>
                <div className="flex items-center gap-4 text-xs font-semibold">
                  <div className="flex items-center gap-1">
                    <span className="w-3 h-3 bg-primary rounded-sm"></span> Current
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="w-3 h-3 bg-slate-200 dark:bg-slate-700 rounded-sm"></span> Target
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center h-64 relative">
                <div className="absolute w-56 h-56 border border-slate-100 dark:border-slate-800 radar-shape"></div>
                <div className="absolute w-40 h-40 border border-slate-100 dark:border-slate-800 radar-shape"></div>
                <div className="absolute w-24 h-24 border border-slate-100 dark:border-slate-800 radar-shape"></div>
                <div className="absolute w-48 h-48 bg-primary/20 border-2 border-primary radar-shape"></div>
                <span className="absolute top-0 -translate-y-6 text-xs font-bold text-slate-500">Physics: Mechanics</span>
                <span className="absolute top-1/4 right-0 translate-x-12 text-xs font-bold text-slate-500">Org Chemistry</span>
                <span className="absolute bottom-0 right-1/4 translate-y-6 translate-x-12 text-xs font-bold text-slate-500">Calculus</span>
                <span className="absolute bottom-0 left-1/4 translate-y-6 -translate-x-12 text-xs font-bold text-slate-500">Inorg Chem</span>
                <span className="absolute top-1/4 left-0 -translate-x-12 text-xs font-bold text-slate-500">Modern Physics</span>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-lg font-bold">Topic-wise Weakness Heatmap</h3>
                <p className="text-slate-500 text-sm">Visual mapping of performance across 48 sub-topics</p>
              </div>
              <div className="flex items-center gap-2 text-xs font-bold">
                <span>Weak</span>
                <div className="flex gap-1">
                  {['#ea580c', '#fb923c', '#facc15', '#22c55e', '#16a34a'].map((c) => (
                    <div key={c} className="w-4 h-4 rounded" style={{ backgroundColor: c }}></div>
                  ))}
                </div>
                <span>Strong</span>
              </div>
            </div>
            <div className="space-y-6">
              {heatmap.map((subject) => (
                <div key={subject.name}>
                  <p className="text-xs font-bold text-slate-400 mb-3 uppercase tracking-wider">{subject.name}</p>
                  <div className="heatmap-grid">
                    {subject.cells.map((c, idx) => (
                      <HeatCell key={`${subject.name}-${idx}`} color={c} tooltip={idx === 0 ? `${subject.name} topic ${idx + 1}` : undefined} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm relative">
              <h3 className="text-lg font-bold mb-6">Accuracy vs Speed</h3>
              <div className="h-80 border-l-2 border-b-2 border-slate-200 dark:border-slate-800 relative m-4">
                <div className="absolute top-0 right-0 p-2 text-[10px] font-bold text-green-600 bg-green-50 dark:bg-green-950/30 uppercase">Mastery Zone</div>
                <div className="absolute top-0 left-0 p-2 text-[10px] font-bold text-blue-600 bg-blue-50 dark:bg-blue-950/30 uppercase">Needs Speed</div>
                <div className="absolute bottom-0 right-0 p-2 text-[10px] font-bold text-orange-600 bg-orange-50 dark:bg-orange-950/30 uppercase">Needs Accuracy</div>
                <div className="absolute bottom-0 left-0 p-2 text-[10px] font-bold text-red-600 bg-red-50 dark:bg-red-950/30 uppercase">Critical Improve</div>
                {[['1/4', '1/2'], ['1/3', '1/3'], ['1/4', '3/4'], ['1/2', '1/2'], ['3/4', '1/4'], ['2/3', '2/3'], ['1/5', '9/10']].map(
                  ([top, left], idx) => (
                    <div
                      key={idx}
                      className={`absolute ${idx === 2 ? 'w-4 h-4' : 'w-3 h-3'} bg-primary/80 rounded-full border-2 border-white`}
                      style={{ top: `calc(${top} * 100%)`, left: `calc(${left} * 100%)` }}
                    ></div>
                  )
                )}
                <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 text-[10px] font-bold text-slate-400">Time per question (seconds)</div>
                <div className="absolute top-1/2 -left-12 -rotate-90 text-[10px] font-bold text-slate-400">Accuracy (%)</div>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <h3 className="text-lg font-bold mb-6">Actionable Growth Path</h3>
              <div className="space-y-4">
                {growth.map((item) => (
                  <GrowthCard key={item.title} item={item} />
                ))}
              </div>
              <button className="w-full mt-6 py-3 bg-primary text-white rounded-lg font-bold text-sm shadow-lg shadow-primary/20 hover:bg-primary/90 transition-colors">
                Generate Personalized Practice Set
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Analytics;
