import { CSSProperties, memo, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import { useApiQuery } from '@/hooks/useApi';
import { fetchDashboard, fetchPerformance } from '@/api/services/student';
import { fetchNotifications } from '@/api/services/notifications';
import useWebSocket from '@/hooks/useWebSocket';
import Skeleton from '@/components/ui/Skeleton';
import ImageWithSkeleton from '@/components/ui/ImageWithSkeleton';

type Notification = {
  id: string;
  title: string;
  body: string;
  ts: string;
};

type CourseProgress = {
  name: string;
  percent: number;
  remainingLabel: string;
  color: string;
};

type PlannerItem = {
  title: string;
  subtitle: string;
  priority?: 'high' | 'normal' | 'completed';
  completed?: boolean;
};

type TestItem = {
  type: string;
  title: string;
  startsIn: string;
  colorHex: string;
};

type ResourceItem = {
  icon: string;
  label: string;
  colorClass: string;
};

const ProgressCircle = memo(({ course }: { course: CourseProgress }) => {
  const style = {
    ['--value' as string]: course.percent,
    ['--progress-color' as string]: course.color
  } as CSSProperties;

  return (
    <div className="p-4 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 flex flex-col items-center">
      <div className="relative w-24 h-24 flex items-center justify-center mb-4">
        <div className="circular-progress w-full h-full rounded-full flex items-center justify-center" style={style}>
          <div className="w-[85%] h-[85%] bg-white dark:bg-slate-900 rounded-full flex flex-col items-center justify-center">
            <span className="text-lg font-bold">{course.percent}%</span>
          </div>
        </div>
      </div>
      <h4 className="font-bold text-slate-900 dark:text-white">{course.name}</h4>
      <p className="text-xs text-slate-500">{course.remainingLabel}</p>
    </div>
  );
});

const PlannerRow = memo(({ item }: { item: PlannerItem }) => {
  const priorityBadge =
    item.priority === 'high' ? (
      <span className="text-[10px] uppercase font-black text-primary bg-primary/10 px-2 py-0.5 rounded">High Priority</span>
    ) : null;

  return (
    <div
      className={clsx('flex items-start gap-4 p-4 rounded-xl', {
        'bg-slate-50 dark:bg-slate-800/50 border-l-4 border-primary': item.priority === 'high',
        'bg-slate-50 dark:bg-slate-800/50 border-l-4 border-emerald-500 opacity-60': item.completed,
        'bg-slate-50 dark:bg-slate-800/50': !item.priority && !item.completed
      })}
    >
      <div className="mt-1">
        <input
          className={clsx('rounded h-5 w-5 cursor-pointer', {
            'text-primary focus:ring-primary': !item.completed,
            'text-emerald-500 focus:ring-emerald-500': item.completed
          })}
          type="checkbox"
          defaultChecked={item.completed}
        />
      </div>
      <div className="flex-1">
        <div className="flex justify-between items-start">
          <h5
            className={clsx('font-bold text-slate-900 dark:text-white', {
              'line-through': item.completed
            })}
          >
            {item.title}
          </h5>
          {priorityBadge}
        </div>
        <p className="text-sm text-slate-500 mt-1">{item.subtitle}</p>
      </div>
    </div>
  );
});

const TestCard = memo(({ test }: { test: TestItem }) => {
  const style = { ['--bar-color' as string]: test.colorHex } as CSSProperties;
  return (
    <div
      className="relative pl-6 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:rounded-full before:bg-[var(--bar-color)] before:content-['']"
      style={style}
    >
      <p className="text-xs font-bold uppercase tracking-tighter" style={{ color: test.colorHex }}>
        {test.type}
      </p>
      <h5 className="font-bold text-sm mt-1">{test.title}</h5>
      <div className="flex items-center gap-2 mt-3 text-slate-500">
        <span className="material-symbols-outlined text-sm">schedule</span>
        <span className="text-xs font-medium">
          Starts in: <span className="text-slate-900 dark:text-white font-bold">{test.startsIn}</span>
        </span>
      </div>
      {test.type.toLowerCase().includes('mock') && (
        <div className="mt-4 flex gap-2">
          <button className="flex-1 py-2 bg-primary text-white text-xs font-bold rounded-lg">View Syllabus</button>
          <button className="px-3 py-2 bg-slate-100 dark:bg-slate-800 rounded-lg">
            <span className="material-symbols-outlined text-sm">bookmark</span>
          </button>
        </div>
      )}
    </div>
  );
});

const ResourceCard = memo(({ resource }: { resource: ResourceItem }) => (
  <Link
    to="#"
    className="flex flex-col items-center p-4 bg-slate-50 dark:bg-slate-800 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
  >
    <span className={clsx('material-symbols-outlined mb-2', resource.colorClass)}>{resource.icon}</span>
    <span className="text-[10px] font-bold uppercase text-slate-500">{resource.label}</span>
  </Link>
));

const Sidebar = memo(({ notificationsCount }: { notificationsCount: number }) => (
  <aside className="w-64 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col shrink-0">
    <div className="p-6 flex items-center gap-3">
      <div className="bg-primary text-white p-2 rounded-lg flex items-center justify-center">
        <span className="material-symbols-outlined text-2xl">school</span>
      </div>
      <div>
        <h1 className="font-bold text-lg leading-tight">RankNova</h1>
        <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">Institute</p>
      </div>
    </div>
    <nav className="flex-1 px-4 space-y-2 mt-4">
      <Link className="flex items-center gap-3 px-4 py-3 rounded-xl bg-primary/10 text-primary font-semibold" to="/dashboard">
        <span className="material-symbols-outlined">dashboard</span>
        <span>Dashboard</span>
      </Link>
      <Link
        className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        to="#"
      >
        <span className="material-symbols-outlined">menu_book</span>
        <span>My Courses</span>
      </Link>
      <Link
        className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        to="/practice-tests"
      >
        <span className="material-symbols-outlined">assignment</span>
        <span>Practice Tests</span>
      </Link>
      <Link
        className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        to="/analytics"
      >
        <span className="material-symbols-outlined">leaderboard</span>
        <span>Analytics</span>
      </Link>
      <Link
        className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        to="/store"
      >
        <span className="material-symbols-outlined">event</span>
        <span>Store</span>
      </Link>
    </nav>
    <div className="p-4 mt-auto">
      <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-xl">
        <div className="flex items-center gap-3 mb-3">
          <div className="h-10 w-10 rounded-full bg-slate-300 overflow-hidden">
            <ImageWithSkeleton
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuApccJV5fPXYVdoAxjKOgQCIXJk9py-zTtuRiazHkF_1u4qf7sphMO-v8FVbRN1rrYHNyrKnNXLiCNweOrteAjnfsmULf3mI0WyhxT0ccaHAmzXScK-DQE7mXh7z1rAY_ZPexKW6KjO0R85GvlF23mYQoXYmo_msg2VH4XvGJJDG7ly9Hf7fy0o7hfE_o1IkvnYfgmMA_wwdyWRV0gSjI0RtOCwGil9Nu764sumphPYLqyuoqsrCaMTKc30uPDZIUrstJZD7Moo7Wda"
              alt="Profile"
              className="w-full h-full object-cover"
              skeletonClassName="w-full h-full"
            />
          </div>
          <div>
            <p className="text-sm font-bold">Abishek R.</p>
            <p className="text-xs text-slate-500">NEET Aspirant</p>
          </div>
        </div>
        <button className="w-full flex items-center justify-center gap-2 text-xs font-bold py-2 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg hover:bg-slate-100 transition-colors">
          <span className="material-symbols-outlined text-sm">settings</span>
          Account Settings
        </button>
        <p className="text-[11px] text-slate-400 mt-3 text-center">Notifications: {notificationsCount}</p>
      </div>
    </div>
  </aside>
));

const Dashboard = () => {
  const { data: dashboard, isLoading: dashLoading } = useApiQuery(['dashboard'], '/student/dashboard', {
    queryFn: fetchDashboard,
    staleTime: 10 * 60 * 1000
  });
  const { data: performance, isLoading: perfLoading } = useApiQuery(['performance'], '/student/performance', {
    queryFn: fetchPerformance
  });
  const { data: notificationData } = useApiQuery<Notification[]>(['notifications'], '/notifications', {
    queryFn: fetchNotifications,
    staleTime: 2 * 60 * 1000
  });

  const [liveNotifications, setLiveNotifications] = useState<Notification[]>([]);

  useWebSocket({
    topics: ['/topic/notifications', '/topic/live-updates'],
    onMessage: (msg) => {
      try {
        const payload = JSON.parse(msg.body);
        setLiveNotifications((prev) => [payload, ...prev].slice(0, 10));
      } catch (e) {
        console.error('WS parse error', e);
      }
    }
  });

  const notifications = useMemo(
    () => [...(liveNotifications ?? []), ...(notificationData ?? [])],
    [liveNotifications, notificationData]
  );

  const courses = useMemo<CourseProgress[]>(
    () => [
      { name: 'Physics', percent: 85, remainingLabel: '12 topics left', color: '#8b5cf6' },
      { name: 'Chemistry', percent: 60, remainingLabel: '24 topics left', color: '#137fec' },
      { name: 'Biology', percent: 72, remainingLabel: '18 topics left', color: '#10b981' }
    ],
    []
  );

  const planner = useMemo<PlannerItem[]>(
    () => [
      { title: 'Watch Organic Chemistry Part 2', subtitle: 'Video Lecture • 45 mins', priority: 'high' },
      { title: 'Solve 50 Kinematics MCQs', subtitle: 'Practice Session • Estimated 1h 20m' },
      { title: 'Revise Cell Biology Notes', subtitle: 'Revision • Completed', completed: true }
    ],
    []
  );

  const tests = useMemo<TestItem[]>(
    () => [
      { type: 'Mock Exam', title: 'Full Syllabus Mock Test #04', startsIn: '02d 04h 20m', colorHex: '#137fec' },
      { type: 'Subject Wise', title: 'Organic Chemistry Mastery', startsIn: '05d 08h 15m', colorHex: '#fb923c' }
    ],
    []
  );

  const resources = useMemo<ResourceItem[]>(
    () => [
      { icon: 'description', label: 'Formulas', colorClass: 'text-primary' },
      { icon: 'history', label: 'PYQs', colorClass: 'text-emerald-500' },
      { icon: 'lightbulb', label: 'Shortcuts', colorClass: 'text-orange-500' },
      { icon: 'groups', label: 'Doubt Room', colorClass: 'text-purple-500' }
    ],
    []
  );

  const streak = dashboard?.streak ?? 12;
  const points = dashboard?.points ?? 1250;
  const percentile = performance?.percentile ?? 94;

  return (
    <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 font-display">
      <div className="flex min-h-screen overflow-hidden">
        <Sidebar notificationsCount={notifications.length} />

        <main className="flex-1 overflow-y-auto">
          <header className="h-16 border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md sticky top-0 z-10 px-8 flex items-center justify-between">
            <div className="flex items-center gap-4 flex-1">
              <div className="relative w-full max-w-md">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">search</span>
                <input
                  className="w-full bg-slate-100 dark:bg-slate-800 border-none rounded-lg pl-10 pr-4 py-2 text-sm focus:ring-2 focus:ring-primary/50"
                  placeholder="Search topics, videos, or tests..."
                  type="text"
                />
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button className="relative p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors">
                <span className="material-symbols-outlined">notifications</span>
                {notifications.length > 0 && (
                  <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-slate-900"></span>
                )}
              </button>
              <button className="px-4 py-2 bg-primary text-white text-sm font-bold rounded-lg hover:bg-primary/90 transition-colors">
                Upgrade Plan
              </button>
            </div>
          </header>

          <div className="p-8 space-y-8">
            <section className="flex flex-col lg:flex-row gap-6">
              <div className="flex-1">
                <h2 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">
                  Welcome back, {dashboard?.userName ?? 'Abishek'}!
                </h2>
                <p className="text-slate-500 mt-1">
                  You&apos;ve completed {performance?.weeklyCompletion ?? 75}% of your weekly goals. Keep pushing!
                </p>
              </div>
              <div className="flex items-center gap-4 bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                <div className="flex items-center gap-2 px-3 py-1.5 bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 rounded-lg">
                  <span className="material-symbols-outlined fill-1">local_fire_department</span>
                  <span className="font-bold">{streak} Day Streak</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg">
                  <span className="material-symbols-outlined">military_tech</span>
                  <span className="font-bold">{points.toLocaleString()} Points</span>
                </div>
                <div className="flex items-center gap-3 pl-4 border-l border-slate-200 dark:border-slate-700">
                  <div className="h-10 w-10 flex items-center justify-center bg-primary/10 rounded-full text-primary" title="Physics Pro Badge">
                    <span className="material-symbols-outlined">bolt</span>
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Physics Pro</span>
                </div>
              </div>
            </section>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-8">
                <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="font-bold text-lg">Course Progress</h3>
                    <button className="text-primary text-sm font-semibold hover:underline">View All</button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {courses.map((course) => (
                      <ProgressCircle key={course.name} course={course} />
                    ))}
                  </div>
                </div>

                <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="font-bold text-lg">Daily Study Planner</h3>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">
                        {new Date().toLocaleDateString(undefined, {
                          month: 'short',
                          day: '2-digit',
                          year: 'numeric'
                        })}
                      </span>
                    </div>
                  </div>
                  <div className="space-y-4">
                    {planner.map((item) => (
                      <PlannerRow key={item.title} item={item} />
                    ))}
                    <button className="w-full py-3 border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-xl text-slate-400 text-sm font-bold hover:border-primary hover:text-primary transition-all flex items-center justify-center gap-2">
                      <span className="material-symbols-outlined">add</span>
                      Add New Task
                    </button>
                  </div>
                </div>
              </div>

              <div className="space-y-8">
                <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm">
                  <h3 className="font-bold text-lg mb-6">Upcoming Tests</h3>
                  <div className="space-y-6">
                    {tests.map((test, idx) => (
                      <div key={test.title}>
                        <TestCard test={test} />
                        {idx < tests.length - 1 && <hr className="border-slate-100 dark:border-slate-800 mt-6" />}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-gradient-to-br from-primary to-blue-700 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden">
                  <div className="relative z-10">
                    <p className="text-blue-100 text-sm font-medium">Monthly Assessment</p>
                    {perfLoading ? (
                      <Skeleton className="h-8 mt-2" />
                    ) : (
                      <h4 className="text-3xl font-bold mt-1">{percentile}th Percentile</h4>
                    )}
                    <p className="text-blue-100/80 text-xs mt-4 leading-relaxed">
                      Your performance in Chemistry is 15% higher than last month. You are currently in the Top 5% of aspirants nationwide.
                    </p>
                    <button className="mt-6 w-full py-2 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-lg text-xs font-bold transition-all">
                      Download Detailed Report
                    </button>
                  </div>
                  <span className="material-symbols-outlined absolute -bottom-4 -right-4 text-9xl opacity-10 rotate-12">trending_up</span>
                </div>

                <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm">
                  <h3 className="font-bold text-lg mb-4">Quick Resources</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {resources.map((res) => (
                      <ResourceCard key={res.label} resource={res} />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-lg font-semibold">Notifications</h2>
                <p className="text-xs text-slate-500">Realtime via WebSocket + cached</p>
              </div>
              <div className="divide-y divide-slate-100 dark:divide-slate-800 max-h-96 overflow-y-auto no-scrollbar">
                {notifications.map((n) => (
                  <div key={n.id} className="py-3">
                    <p className="font-semibold text-slate-800 dark:text-slate-100">{n.title}</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">{n.body}</p>
                    <p className="text-[11px] text-slate-400">{new Date(n.ts).toLocaleString()}</p>
                  </div>
                ))}
                {!notifications.length && <p className="text-sm text-slate-500 py-2">No notifications</p>}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
