import { useState, useEffect } from "react";
import { Button } from "./Button";

export const PaginationTimed = ({ data, onNextPage, loading }) => {
  const [timeRemaining, setTimeRemaining] = useState(5);
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    if (!isActive || !data?.data?.nextPage || loading) return;

    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          onNextPage();
          return 5;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isActive, data?.data?.nextPage, loading, onNextPage]);

  const handleSkip = () => {
    if (data?.data?.nextPage && !loading) {
      onNextPage();
      setTimeRemaining(5);
    }
  };

  const handlePause = () => {
    setIsActive(!isActive);
  };

  return (
    <div className="mt-8 space-y-4 rounded-3xl border border-zinc-800 bg-zinc-950/80 p-5 text-sm text-slate-200">
      <div className="space-y-3">
        <p className="text-slate-100">
          Next page in:{" "}
          <span className="font-semibold">{timeRemaining} seconds</span>
        </p>
        <div className="h-3 overflow-hidden rounded-full border border-zinc-800 bg-zinc-900">
          <div
            className="h-full bg-blue-500 transition-all"
            style={{ width: `${(timeRemaining / 5) * 100}%` }}
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        <Button
          onClick={handleSkip}
          disabled={!data?.data?.nextPage || loading}
        >
          Skip to Next
        </Button>
        <Button onClick={handlePause}>{isActive ? "Pause" : "Resume"}</Button>
      </div>

      <p className="text-slate-400">
        Page {data?.data?.page} of {data?.data?.totalPages}
      </p>
    </div>
  );
};
