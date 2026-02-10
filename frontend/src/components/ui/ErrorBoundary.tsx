import { ReactNode } from 'react';
import { ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary';

interface Props {
  children: ReactNode;
}

function FallbackComponent({ error, resetErrorBoundary }: { error: Error; resetErrorBoundary: () => void }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-red-50 text-red-700">
      <div className="max-w-md p-6 text-center space-y-3">
        <p className="text-lg font-semibold">Something went wrong.</p>
        <p className="text-sm text-red-600">{error.message}</p>
        <button
          onClick={resetErrorBoundary}
          className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-white font-semibold"
        >
          Reload
        </button>
      </div>
    </div>
  );
}

const ErrorBoundary = ({ children }: Props) => {
  return (
    <ReactErrorBoundary FallbackComponent={FallbackComponent} onReset={() => window.location.reload()}>
      {children}
    </ReactErrorBoundary>
  );
};

export default ErrorBoundary;
