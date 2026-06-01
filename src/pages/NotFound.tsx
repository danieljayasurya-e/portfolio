import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background bg-line-grid bg-[size:80px_80px]">
      <div className="relative text-center px-6">
        <p className="text-[8rem] sm:text-[14rem] font-extrabold leading-none font-heading uppercase text-ink inline-block bg-lime border-[3px] border-ink shadow-brutal-xl px-6 -rotate-2">
          404
        </p>
        <h1 className="mt-8 text-2xl sm:text-3xl font-extrabold uppercase text-ink font-heading tracking-tight">
          Page not found
        </h1>
        <p className="mt-3 text-ink-muted font-mono text-sm max-w-md mx-auto">
          The page you were looking for doesn't exist or has been moved.
        </p>
        <a href="/" className="btn-primary mt-8 inline-flex">
          <ArrowLeft size={16} />
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
