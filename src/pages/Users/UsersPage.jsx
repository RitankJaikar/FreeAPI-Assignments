import React from "react";
import { Users } from "lucide-react";
import { useFetchData } from "../../hooks";
import {
  BackToHome,
  SearchForm,
  Loader,
  ErrorMessage,
  PaginationInfiniteScroll,
  CardArticle,
} from "../../components";

function UsersPage() {
  const { data, loading, error, handleSearch, loadMore } = useFetchData(
    "/randomusers",
    { appendMode: true },
  );

  const users = data?.data?.data || [];

  return (
    <div className="space-y-6">
      <BackToHome />

      <section className="space-y-3">
        <div className="inline-flex items-center gap-2 rounded-full bg-zinc-950/80 px-4 py-2 text-xs uppercase tracking-[0.24em] text-slate-400">
          <Users className="h-4 w-4 text-cyan-400" />
          Users
        </div>
        <div>
          <h1 className="text-3xl font-semibold text-white">Random Users</h1>
          <p className="max-w-2xl text-sm leading-6 text-slate-400">
            Scroll to load more users while preserving the existing list and
            layout.
          </p>
        </div>
      </section>

      <SearchForm
        onSearch={handleSearch}
        placeholder="Search by name or email..."
      />

      <hr className="border-zinc-800" />

      <Loader isLoading={loading} message="Loading users..." />
      <ErrorMessage error={error} />

      {!loading && users.length > 0 && (
        <div className="space-y-6">
          <div className="grid gap-6 xl:grid-cols-2">
            {users.map((user, index) => {
              const fullName = `${user.name?.title} ${user.name?.first} ${user.name?.last}`;
              const metadata = [
                { label: "Email", value: user.email },
                { label: "Age", value: `${user.dob?.age} years` },
                { label: "Gender", value: user.gender },
                {
                  label: "Location",
                  value: `${user.location?.city}, ${user.location?.state}, ${user.location?.country}`,
                },
                { label: "Phone", value: user.phone },
              ];

              // return (
              //   <CardArticle
              //     key={`${user.id ?? index}-${index}`}
              //     title={fullName}
              //     subtitle="User Profile"
              //     metadata={metadata}
              //     image={user.picture?.large}
              //   />
              // );

              return (
                <article
                  key={`${user.id ?? index}-${index}`}
                  className="space-y-4 rounded-3xl border border-zinc-800 bg-zinc-950/80 p-6 shadow-[0_20px_100px_rgba(15,23,42,0.25)] transition hover:-translate-y-0.5"
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                    {user.picture?.large && (
                      <img
                        className="h-24 w-24 rounded-3xl object-cover border border-zinc-800"
                        src={user.picture.large}
                        alt={`${user.name.first} ${user.name.last}`}
                      />
                    )}

                    <div className="space-y-1 text-slate-200">
                      <p className="text-xl font-semibold text-white">
                        {user.name.title} {user.name.first} {user.name.last}
                      </p>
                      <p className="text-sm text-slate-400">{user.email}</p>
                    </div>
                  </div>

                  <div className="grid gap-2 text-sm text-slate-400 sm:grid-cols-2">
                    <p>
                      <strong>Age:</strong> {user.dob?.age} years
                    </p>
                    <p>
                      <strong>Gender:</strong> {user.gender}
                    </p>
                    <p className="sm:col-span-2">
                      <strong>Location:</strong> {user.location?.city},{" "}
                      {user.location?.state}, {user.location?.country}
                    </p>
                    <p>
                      <strong>Phone:</strong> {user.phone}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>

          <PaginationInfiniteScroll
            data={data}
            onLoadMore={loadMore}
            loading={loading}
          />
        </div>
      )}
    </div>
  );
}

export default UsersPage;
