import { Button } from "./Button";

export const PaginationBasic = ({ data, onNextPage, onPrevPage, loading }) => {
  if (!data?.data) return null;

  return (
    <div className="mt-8 flex flex-col gap-4 rounded-3xl border border-zinc-800 bg-zinc-950/80 p-5 text-sm text-slate-200 sm:flex-row sm:items-center sm:justify-between">
      <Button
        onClick={onPrevPage}
        disabled={!data.data.previousPage || loading}
      >
        ← Previous
      </Button>

      <span className="text-slate-400">
        Page {data.data.page} of {data.data.totalPages}
      </span>

      <Button onClick={onNextPage} disabled={!data.data.nextPage || loading}>
        Next →
      </Button>
    </div>
  );
};
