import React from "react";
import { Cat } from "lucide-react";
import { useFetchData } from "../../hooks";
import { BackToHome, Button, Loader, ErrorMessage } from "../../components";

function CatsPage() {
  const { data, loading, error, refetch } = useFetchData("/cats/cat/random", {
    isPaginated: false,
  });

  const breed = data?.data || {};

  return (
    <div className="space-y-6">
      <BackToHome />

      <section className="space-y-3">
        <div className="inline-flex items-center gap-2 rounded-full bg-zinc-950/80 px-4 py-2 text-xs uppercase tracking-[0.24em] text-slate-400">
          <Cat className="h-4 w-4 text-rose-400" />
          Cat Viewer
        </div>
        <div>
          <h1 className="text-3xl font-semibold text-white">
            Random Cat Viewer
          </h1>
          <p className="max-w-2xl text-sm leading-6 text-slate-400">
            Load a fresh random cat breed and view the image and traits in a
            polished card layout.
          </p>
        </div>
      </section>

      <ErrorMessage error={error} />
      <Loader isLoading={loading} message="Loading cat..." />

      {breed && (
        <div className="space-y-6 rounded-3xl border border-zinc-800 bg-zinc-950/80 p-6 shadow-[0_20px_100px_rgba(15,23,42,0.25)]">
          <div className="grid gap-6 lg:grid-cols-[1fr_2fr]">
            {breed.image && (
              <img
                className="h-full w-full rounded-3xl object-cover"
                src={breed.image}
                alt={breed.name}
              />
            )}
            <div className="space-y-4">
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold text-white">
                  {breed.name || "Random Cat"}
                </h2>
                <p className="text-sm text-slate-400">
                  {breed.origin ? `Origin: ${breed.origin}` : "Breed details"}
                </p>
              </div>
              <div className="grid gap-3 text-sm text-slate-200">
                <p>
                  <strong>Temperament:</strong> {breed.temperament || "Unknown"}
                </p>
                <p>
                  <strong>Description:</strong>{" "}
                  {breed.description || "No description available."}
                </p>
                <p>
                  <strong>Life span:</strong>{" "}
                  {breed.life_span ? `${breed.life_span} years` : "N/A"}
                </p>
                <p>
                  <strong>Weight:</strong> {breed.weight?.metric || "N/A"} kg (
                  {breed.weight?.imperial || "N/A"} lbs)
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      <Button onClick={refetch} disabled={loading}>
        {loading ? "Loading..." : "Load new cat"}
      </Button>
    </div>
  );
}

export default CatsPage;
