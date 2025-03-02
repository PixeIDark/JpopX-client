import { Loader } from "lucide-react";

interface LoadingSpinnerProps {
  isLoading: boolean;
  className?: string;
  size?: number;
}

function LoadingSpinner({ isLoading, className, size = 24 }: LoadingSpinnerProps) {
  if (!isLoading) return null;

  return (
    <div className={`${className} flex w-full items-center justify-center py-4`}>
      <Loader size={size} className="animate-rotate" />
    </div>
  );
}

export default LoadingSpinner;
