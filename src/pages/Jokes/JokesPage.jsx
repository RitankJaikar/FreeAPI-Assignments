import React from "react";
import { Laugh } from "lucide-react";
import { useFetchData } from "../../hooks";
import {
  BackToHome,
  SearchForm,
  Loader,
  ErrorMessage,
  PaginationBasic,
  CardArticle,
} from "../../components";

function JokesPage() {
  const { data, loading, error, handleSearch, goToNextPage, goToPrevPage } =
    useFetchData("/randomjokes");

  const jokes = data?.data?.data || [];

  return (
    <div className="space-y-6">
      <BackToHome />

      <section className="space-y-3">
        <div className="inline-flex items-center gap-2 rounded-full bg-zinc-950/80 px-4 py-2 text-xs uppercase tracking-[0.24em] text-slate-400">
          <Laugh className="h-4 w-4 text-emerald-400" />
          Jokes
        </div>
        <div>
          <h1 className="text-3xl font-semibold text-white">Random Jokes</h1>
          <p className="max-w-2xl text-sm leading-6 text-slate-400">
            Play through a fresh batch of jokes with simple previous/next
            pagination.
          </p>
        </div>
      </section>

      <SearchForm onSearch={handleSearch} placeholder="Search jokes..." />

      <hr className="border-zinc-800" />

      <Loader isLoading={loading} message="Loading jokes..." />
      <ErrorMessage error={error} />

      {!loading && jokes.length > 0 && (
        <div className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            {jokes.map((joke, index) => (
              <CardArticle
                key={`${joke.id ?? index}-${index}`}
                title={`Joke #${joke.id}`}
                description={joke.content}
                metadata={
                  joke.categories?.length > 0
                    ? [
                        {
                          label: "Categories",
                          value: joke.categories.join(", "),
                        },
                      ]
                    : undefined
                }
              />
            ))}
          </div>

          <PaginationBasic
            data={data}
            onNextPage={goToNextPage}
            onPrevPage={goToPrevPage}
            loading={loading}
          />
        </div>
      )}
    </div>
  );
}

export default JokesPage;
