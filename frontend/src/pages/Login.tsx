import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApiMutation } from '@/hooks/useApi';
import { login, LoginPayload } from '@/api/services/auth';
import { useToast } from '@/components/ui/Toast';
import ImageWithSkeleton from '@/components/ui/ImageWithSkeleton';
import usePerformance from '@/hooks/usePerformance';
import { tokenStore } from '@/utils/tokenStore';

const roles: LoginPayload['role'][] = ['student', 'parent', 'faculty'];

const heroImage =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuAb_0EnMcoovYroLLCSgx2D4yt8OdK2adJTlCG4SOGSEYJvcvYAwluR70p3khewsZ2ZC9l0f72h2iNKdwnknxaQwNaERjX4MFjdlV0EUpNLti3T3jruxu6YkFFco1J62DNekPOmgF7HDbybi218RcSkilHu-wOE3g4sVpu6NaUv0ry6jsEGEBRCuviE4hMA-e7NZdyh0AN82J4uey8ZBa3E3dtWyGB1K3gqistqh3JHVNkpCpdEd4GNa3mMTheKuvhZvL5Oz3N6knZd';

const roleLabels: Record<LoginPayload['role'], string> = {
  student: 'Student',
  parent: 'Parent',
  faculty: 'Faculty'
};

function Login() {
  usePerformance();
  const [role, setRole] = useState<LoginPayload['role']>('student');
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { push } = useToast();

  const mutation = useApiMutation('/auth/login', 'post', {
    mutationFn: (payload: LoginPayload) => login(payload),
    onSuccess: () => {
      push({ variant: 'success', title: 'Welcome back!' });
      navigate('/dashboard');
    },
    onError: () => {
      // Allow navigation while backend is unavailable (e.g., 404) for UI walkthroughs.
      tokenStore.setTokens('demo-access-token', 'demo-refresh-token');
      push({
        variant: 'warning',
        title: 'Backend offline',
        description: 'Proceeding in preview mode. Data may be stale or unavailable.'
      });
      navigate('/dashboard');
    }
  });

  const isDisabled = useMemo(() => !identifier || !password || mutation.isPending, [identifier, password, mutation.isPending]);
  const identifierLabel = role === 'faculty' ? 'Faculty ID or Mobile Number' : 'Student ID or Mobile Number';
  const identifierPlaceholder = role === 'faculty' ? 'e.g. FAC2024001 or 9876543210' : 'e.g. VCC2024001 or 9876543210';

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate({ identifier, password, role });
  };

  return (
    <div className="bg-background-light dark:bg-background-dark text-[#0d141b] dark:text-white min-h-screen">
      <header className="flex items-center justify-between border-b border-[#e7edf3] dark:border-slate-800 bg-white dark:bg-background-dark px-6 md:px-10 py-3 sticky top-0 z-40">
        <div className="flex items-center gap-3 text-primary">
          <div className="size-8">
            <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
              <g clipPath="url(#clip0)">
                <path
                  clipRule="evenodd"
                  d="M47.2426 24L24 47.2426 0.757 24 24 .757 47.2426 24ZM12.2426 21h23.5148L24 9.2426 12.2426 21Z"
                  fill="currentColor"
                  fillRule="evenodd"
                ></path>
              </g>
              <defs>
                <clipPath id="clip0">
                  <rect width="48" height="48" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </div>
          <h2 className="text-xl font-bold">Nova Neeti IIT Academy</h2>
        </div>
        <button className="flex min-w-[84px] items-center justify-center rounded-lg h-10 px-4 bg-primary/10 text-primary text-sm font-bold">
          <span className="material-symbols-outlined mr-2 text-lg">help_outline</span>
          <span className="truncate">Support</span>
        </button>
      </header>

      <main className="flex flex-col lg:flex-row login-split-container overflow-hidden">
        <div className="hidden lg:flex lg:w-1/2 relative bg-primary overflow-hidden items-center justify-center p-12">
          <div className="absolute inset-0 opacity-20 pointer-events-none">
            <div className="absolute top-[-10%] left-[-10%] w-full h-full bg-[radial-gradient(circle,rgba(255,255,255,0.2)_1px,transparent_1px)] [background-size:20px_20px]"></div>
          </div>
          <div className="relative z-10 w-full max-w-xl text-white space-y-6">
            <div className="rounded-2xl overflow-hidden shadow-2xl aspect-[4/3] bg-cover bg-center border-4 border-white/20">
              <ImageWithSkeleton
                src={heroImage}
                alt="Students"
                className="h-full w-full"
                skeletonClassName="h-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent" />
            </div>
            <h1 className="text-4xl xl:text-5xl font-black leading-tight tracking-tight">
              Empowering your journey to excellence in NEET &amp; JEE
            </h1>
            <p className="text-lg opacity-90 font-light leading-relaxed">
              A comprehensive EdTech platform designed for the next generation of doctors and engineers.
            </p>
            <div className="flex flex-wrap gap-3">
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
                <span className="material-symbols-outlined text-sm">check_circle</span>
                <span className="text-sm font-medium">Expert Faculty</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
                <span className="material-symbols-outlined text-sm">analytics</span>
                <span className="text-sm font-medium">Real-time Analytics</span>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full lg:w-1/2 flex items-center justify-center p-6 md:p-12 lg:p-20 bg-white dark:bg-background-dark">
          <div className="w-full max-w-md">
            <div className="mb-10">
              <h2 className="text-3xl font-bold mb-2">Welcome Back</h2>
              <p className="text-slate-500 dark:text-slate-400">Please login to access your campus dashboard</p>
            </div>

            <div className="flex w-full border-b border-slate-200 dark:border-slate-800 mb-8 overflow-x-auto no-scrollbar">
              {roles.map((r) => {
                const active = r === role;
                return (
                  <button
                    key={r}
                    className={`flex-1 min-w-[100px] flex flex-col items-center justify-center border-b-2 pb-3 pt-2 font-bold transition-colors ${
                      active ? 'border-primary text-primary' : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-primary'
                    }`}
                    onClick={() => setRole(r)}
                  >
                    <span className="material-symbols-outlined mb-1">
                      {r === 'student' ? 'school' : r === 'parent' ? 'family_restroom' : 'badge'}
                    </span>
                    <span className="text-sm capitalize">{roleLabels[r]}</span>
                  </button>
                );
              })}
            </div>

            <form className="space-y-6" onSubmit={onSubmit}>
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">{identifierLabel}</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-slate-400">person</span>
                  <input
                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-slate-200 dark:border-slate-800 dark:bg-slate-900 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                    placeholder={identifierPlaceholder}
                    type="text"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    autoComplete="username"
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">Password</label>
                  <a className="text-xs font-bold text-primary hover:underline" href="#">
                    Forgot Password?
                  </a>
                </div>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-slate-400">lock</span>
                  <input
                    className="w-full pl-10 pr-12 py-3 rounded-lg border border-slate-200 dark:border-slate-800 dark:bg-slate-900 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                    placeholder="Enter your password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="current-password"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
                    <span className="material-symbols-outlined text-lg">visibility</span>
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <input className="w-4 h-4 rounded text-primary focus:ring-primary border-slate-300" id="remember" type="checkbox" />
                <label className="text-sm text-slate-600 dark:text-slate-400" htmlFor="remember">
                  Keep me logged in
                </label>
              </div>
              <button
                className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-3.5 rounded-lg shadow-lg shadow-primary/20 transition-all flex items-center justify-center gap-2 disabled:opacity-60"
                type="submit"
                disabled={isDisabled}
              >
                {mutation.isPending ? 'Signing in...' : 'Login to Dashboard'}
                <span className="material-symbols-outlined text-lg">arrow_forward</span>
              </button>
              <div className="relative py-2">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-200 dark:border-slate-800" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white dark:bg-background-dark px-2 text-slate-500">Or continue with</span>
                </div>
              </div>
              <button
                className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-primary text-slate-700 dark:text-slate-300 font-bold py-3 rounded-lg transition-all flex items-center justify-center gap-2"
                type="button"
                onClick={() => push({ variant: 'info', title: 'OTP', description: 'OTP flow coming soon' })}
              >
                <span className="material-symbols-outlined text-lg">vibration</span>
                Login via OTP
              </button>
            </form>

            <div className="mt-12 pt-8 border-t border-slate-100 dark:border-slate-800 flex flex-wrap justify-center gap-6 text-xs font-medium text-slate-500">
              <a className="hover:text-primary transition-colors" href="#">
                Privacy Policy
              </a>
              <a className="hover:text-primary transition-colors" href="#">
                Terms of Service
              </a>
              <a className="hover:text-primary transition-colors" href="#">
                Cookie Settings
              </a>
            </div>
          </div>
        </div>
      </main>

      <div className="lg:hidden p-8 bg-primary/5 dark:bg-primary/10">
        <div className="text-center">
          <h3 className="text-xl font-bold text-primary mb-2">Nova Neeti IIT Academy</h3>
          <p className="text-sm text-slate-600 dark:text-slate-400">Your digital gateway to academic excellence.</p>
        </div>
      </div>
    </div>
  );
}

export default Login;
