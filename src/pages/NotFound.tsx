import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background">
      <div className="absolute top-1/4 left-1/4 w-[480px] h-[480px] bg-brand-200/40 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[380px] h-[380px] bg-brand-300/30 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative text-center px-6">
        <p className="text-[10rem] sm:text-[14rem] font-extrabold leading-none font-heading hero-gradient-text">
          404
        </p>
        <h1 className="mt-4 text-2xl sm:text-3xl font-bold text-ink font-heading">
          Page not found
        </h1>
        <p className="mt-3 text-ink-muted max-w-md mx-auto">
          The page you were looking for doesn't exist or has been moved.
        </p>
        <a
          href="/"
          className="btn-primary mt-8 inline-flex"
        >
          <ArrowLeft size={16} />
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
