import React from "react";
import { ShoppingBag } from "lucide-react";
import { useFetchData } from "../../hooks";
import {
  BackToHome,
  SearchForm,
  Loader,
  ErrorMessage,
  PaginationTimed,
  CardArticle,
} from "../../components";
import { formatNumber } from "../../utils/format";

function ProductsPage() {
  const { data, loading, error, handleSearch, goToNextPage } =
    useFetchData("/randomproducts");

  const products = data?.data?.data || [];

  return (
    <div className="space-y-6">
      <BackToHome />

      <section className="space-y-3">
        <div className="inline-flex items-center gap-2 rounded-full bg-zinc-950/80 px-4 py-2 text-xs uppercase tracking-[0.24em] text-slate-400">
          <ShoppingBag className="h-4 w-4 text-lime-400" />
          Products
        </div>
        <div>
          <h1 className="text-3xl font-semibold text-white">Products</h1>
          <p className="max-w-2xl text-sm leading-6 text-slate-400">
            Browse product cards while the page automatically moves to the next batch.
          </p>
        </div>
      </section>

      <SearchForm
        onSearch={handleSearch}
        placeholder="Search products by title..."
      />

      <hr className="border-zinc-800" />

      <Loader isLoading={loading} message="Loading products..." />
      <ErrorMessage error={error} />

      {!loading && products.length > 0 && (
        <div className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {products.map((product, index) => {
              const metadata = [
                { label: "Price", value: `$${product.price}` },
                { label: "Discount", value: `${product.discountPercentage}%` },
                { label: "Rating", value: product.rating },
                { label: "Stock", value: product.stock },
                { label: "Brand", value: product.brand },
                { label: "Category", value: product.category },
              ];

              return (
                <CardArticle
                  key={`${product.id ?? index}-${index}`}
                  title={product.title}
                  subtitle={`${product.brand} · ${product.category}`}
                  description={product.description}
                  metadata={metadata}
                />
              );
            })}
          </div>

          <PaginationTimed
            data={data}
            onNextPage={goToNextPage}
            loading={loading}
          />
        </div>
      )}
    </div>
  );
}

export default ProductsPage;
