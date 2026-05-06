import React from "react";
import { Quote } from "lucide-react";
import { useFetchData } from "../../hooks";
import {
  BackToHome,
  SearchForm,
  Loader,
  ErrorMessage,
  PaginationLoadMore,
  CardArticle,
} from "../../components";

function QuotesPage() {
  const { data, loading, error, handleSearch, loadMore } = useFetchData(
    "/quotes",
    { appendMode: true },
  );

  const quotes = data?.data?.data || [];

  return (
    <div className="space-y-6">
      <BackToHome />

      <section className="space-y-3">
        <div className="inline-flex items-center gap-2 rounded-full bg-zinc-950/80 px-4 py-2 text-xs uppercase tracking-[0.24em] text-slate-400">
          <Quote className="h-4 w-4 text-sky-400" />
          Quotes
        </div>
        <div>
          <h1 className="text-3xl font-semibold text-white">Random Quotes</h1>
          <p className="max-w-2xl text-sm leading-6 text-slate-400">
            Browse fresh quotes and keep loading more inspiration without losing
            earlier results.
          </p>
        </div>
      </section>

      <SearchForm
        onSearch={handleSearch}
        placeholder="Search by author or content..."
      />

      <hr className="border-zinc-800" />

      <Loader isLoading={loading} message="Loading quotes..." />
      <ErrorMessage error={error} />

      {!loading && quotes.length > 0 && (
        <div className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            {quotes.map((quote, index) => (
              <article
                key={`${quote.id ?? index}-${index}`}
                className="space-y-3 rounded-3xl border border-zinc-800 bg-zinc-950/80 p-6 shadow-[0_20px_100px_rgba(15,23,42,0.25)] transition hover:-translate-y-0.5"
              >
                <p className="text-base leading-7 text-slate-100">
                  “
                  <span className="font-medium text-white">
                    {quote.content}
                  </span>
                  ”
                </p>
                <p className="text-sm text-slate-400">
                  <strong>Author:</strong> {quote.author}
                </p>
                {quote.tags && quote.tags.length > 0 && (
                  <p className="text-sm text-slate-400">
                    <strong>Tags:</strong> {quote.tags.join(", ")}
                  </p>
                )}
              </article>
            ))}
          </div>

          <PaginationLoadMore
            data={data}
            onLoadMore={loadMore}
            loading={loading}
          />
        </div>
      )}
    </div>
  );
}

export default QuotesPage;
