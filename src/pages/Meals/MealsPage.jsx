import React from "react";
import { Utensils } from "lucide-react";
import { useFetchData } from "../../hooks";
import {
  BackToHome,
  SearchForm,
  Loader,
  ErrorMessage,
  PaginationNumbered,
  CardArticle,
} from "../../components";

function MealsPage() {
  const { data, loading, error, handleSearch, goToPage } =
    useFetchData("/meals");

  const meals = data?.data?.data || [];

  return (
    <div className="space-y-6">
      <BackToHome />

      <section className="space-y-3">
        <div className="inline-flex items-center gap-2 rounded-full bg-zinc-950/80 px-4 py-2 text-xs uppercase tracking-[0.24em] text-slate-400">
          <Utensils className="h-4 w-4 text-orange-400" />
          Meals
        </div>
        <div>
          <h1 className="text-3xl font-semibold text-white">Meals</h1>
          <p className="max-w-2xl text-sm leading-6 text-slate-400">
            Browse meal recipes with a clean card grid and numbered page navigation.
          </p>
        </div>
      </section>

      <SearchForm
        onSearch={handleSearch}
        placeholder="Search meals by name..."
      />

      <hr className="border-zinc-800" />

      <Loader isLoading={loading} message="Loading meals..." />
      <ErrorMessage error={error} />

      {!loading && meals.length > 0 && (
        <div className="space-y-6">
          <div className="grid gap-6 xl:grid-cols-2">
            {meals.map((meal, index) => {
              const metadata = [
                { label: "Category", value: meal.strCategory },
                { label: "Area", value: meal.strArea },
                { label: "Tags", value: meal.strTags || "No tags" },
              ];

              const actionLinks = [];
              if (meal.strYoutube) {
                actionLinks.push(
                  <a
                    key="youtube"
                    href={meal.strYoutube}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-full border border-blue-500 px-3 py-1 text-xs text-blue-300 transition hover:bg-blue-500/10"
                  >
                    Watch on YouTube
                  </a>
                );
              }
              if (meal.strSource) {
                actionLinks.push(
                  <a
                    key="source"
                    href={meal.strSource}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-full border border-slate-600 px-3 py-1 text-xs text-slate-300 transition hover:bg-slate-700/70"
                  >
                    Recipe Source
                  </a>
                );
              }

              return (
                <CardArticle
                  key={`${meal.idMeal ?? index}-${index}`}
                  title={meal.strMeal}
                  subtitle={`${meal.strCategory} cuisine from ${meal.strArea}`}
                  description={meal.strInstructions?.slice(0, 200)}
                  metadata={metadata}
                  image={meal.strMealThumb}
                >
                  {actionLinks.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {actionLinks}
                    </div>
                  )}
                </CardArticle>
              );
            })}
          </div>

          <PaginationNumbered
            data={data}
            onPageChange={goToPage}
            loading={loading}
          />
        </div>
      )}
    </div>
  );
}

export default MealsPage;
