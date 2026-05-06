import { useEffect, useRef } from "react";

export const PaginationInfiniteScroll = ({ data, onLoadMore, loading }) => {
  const observerTarget = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // Threshold kam rakha hai taaki halka sa touch hote hi trigger ho jaye
        if (entries[0].isIntersecting && !loading && data?.data?.nextPage) {
          onLoadMore();
        }
      },
      {
        threshold: 0.1, // 10% dikhte hi trigger hoga
        rootMargin: "200px", // User ke pahunchne se 200px pehle hi load shuru kar dega
      },
    );

    const currentTarget = observerTarget.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [loading, data?.data?.nextPage, onLoadMore]);

  return (
    <>
      {(loading || data?.data?.nextPage) && (
        <div className="mt-8 rounded-3xl border border-zinc-800 bg-zinc-950/80 p-5 text-center text-sm">
          {/* Target div hamesha empty rakhein ya hamesha render karein */}
          <div ref={observerTarget} className="mx-auto h-1 w-full" />

          {loading && (
            <p className="text-blue-200 animate-pulse">Loading more...</p>
          )}
        </div>
      )}

      {!loading && !data?.data?.nextPage && (
        <p className="mt-8 text-center text-sm text-slate-400">
          No more items to load.
        </p>
      )}
    </>
  );
};
