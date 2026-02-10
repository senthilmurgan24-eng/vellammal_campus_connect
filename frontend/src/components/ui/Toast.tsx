import { createContext, ReactNode, useCallback, useContext, useMemo, useState } from 'react';
import clsx from 'clsx';

export type ToastVariant = 'info' | 'success' | 'error' | 'warning';

export interface ToastMessage {
  id: string;
  title?: string;
  description?: string;
  variant?: ToastVariant;
  duration?: number;
}

interface ToastContextValue {
  push: (msg: Omit<ToastMessage, 'id'>) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [messages, setMessages] = useState<ToastMessage[]>([]);

  const push = useCallback((msg: Omit<ToastMessage, 'id'>) => {
    const message: ToastMessage = {
      id: crypto.randomUUID(),
      variant: 'info',
      duration: 3500,
      ...msg
    };
    setMessages((prev) => [...prev, message]);
    setTimeout(() => setMessages((prev) => prev.filter((m) => m.id !== message.id)), message.duration);
  }, []);

  const value = useMemo(() => ({ push }), [push]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 w-80">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={clsx(
              'rounded-lg p-3 shadow-lg border text-sm backdrop-blur bg-white/90 dark:bg-slate-900/90',
              {
                'border-blue-200 text-blue-900': msg.variant === 'info',
                'border-green-200 text-green-900': msg.variant === 'success',
                'border-amber-200 text-amber-900': msg.variant === 'warning',
                'border-red-200 text-red-900': msg.variant === 'error'
              }
            )}
          >
            {msg.title && <p className="font-semibold mb-1">{msg.title}</p>}
            {msg.description && <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-300">{msg.description}</p>}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

const useToast = () => {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within ToastProvider');
  return ctx;
};

const Toast = () => null; // portal handled in provider
export default Toast;
export { useToast };
