import { Button } from "./Button";

export const PaginationNumbered = ({ data, onPageChange, loading }) => {
  if (!data?.data) return null;

  const totalPages = data.data.totalPages;
  const currentPage = data.data.page;
  const pages = [];

  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <div className="mt-8 space-y-4 rounded-3xl border border-zinc-800 bg-zinc-950/80 p-5 text-sm text-slate-200">
      <div className="flex flex-wrap items-center gap-3">
        <Button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={!data.data.previousPage || loading}
        >
          ← Previous
        </Button>

        <div className="flex flex-wrap gap-2">
          {pages.map((pageNum) => (
            <Button
              key={pageNum}
              onClick={() => onPageChange(pageNum)}
              disabled={loading || pageNum === currentPage}
              className={
                pageNum === currentPage
                  ? "bg-blue-500 border-blue-500 text-white"
                  : "bg-zinc-900"
              }
            >
              {pageNum}
            </Button>
          ))}
        </div>

        <Button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={!data.data.nextPage || loading}
        >
          Next →
        </Button>
      </div>

      <p className="text-slate-400">
        Page {currentPage} of {totalPages}
      </p>
    </div>
  );
};
