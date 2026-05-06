import React from "react";
import { PlayCircle, Play } from "lucide-react";
import { useFetchData } from "../../hooks";
import {
  BackToHome,
  SearchForm,
  Loader,
  ErrorMessage,
  PaginationInfiniteScroll,
  CardArticle,
} from "../../components";
import {
  formatDate,
  formatDuration,
  formatNumber,
  truncateText,
} from "../../utils/format";

function YouTubePage() {
  const { data, loading, error, handleSearch, loadMore } = useFetchData(
    "/youtube/videos",
    { appendMode: true },
  );

  const videos = data?.data?.data || [];

  return (
    <div className="space-y-6">
      <BackToHome />

      <section className="space-y-3">
        <div className="inline-flex items-center gap-2 rounded-full bg-zinc-950/80 px-4 py-2 text-xs uppercase tracking-[0.24em] text-slate-400">
          <PlayCircle className="h-4 w-4 text-red-400" />
          YouTube
        </div>
        <div>
          <h1 className="text-3xl font-semibold text-white">YouTube Videos</h1>
          <p className="max-w-2xl text-sm leading-6 text-slate-400">
            Browse video results with infinite scroll and a modern card view.
          </p>
        </div>
      </section>

      <SearchForm
        onSearch={handleSearch}
        placeholder="Search videos by title..."
      />

      <hr className="border-zinc-800" />

      <Loader isLoading={loading} message="Loading videos..." />
      <ErrorMessage error={error} />

      {!loading && videos.length > 0 && (
        <div className="space-y-6">
          <div className="grid gap-6 xl:grid-cols-2">
            {videos.map((video, index) => {
              const item = video.items || {};
              const snippet = item.snippet || {};
              const statistics = item.statistics || {};
              const videoId = item.id;
              const youtubeUrl = videoId
                ? `https://www.youtube.com/watch?v=${videoId}`
                : null;

              const metadata = [
                {
                  label: "Published",
                  value: formatDate(snippet.publishedAt),
                },
                {
                  label: "Duration",
                  value: formatDuration(item.contentDetails?.duration),
                },
                {
                  label: "Views",
                  value: formatNumber(statistics.viewCount),
                },
                {
                  label: "Likes",
                  value: formatNumber(statistics.likeCount),
                },
              ];

              return (
                <CardArticle
                  key={`${item.id ?? snippet.title ?? index}-${index}`}
                  title={snippet.title}
                  subtitle={snippet.channelTitle}
                  description={snippet.description}
                  descriptionTitle="Description"
                  metadata={metadata}
                  image={snippet.thumbnails?.high?.url}
                  isClickable={!!youtubeUrl}
                  clickHref={youtubeUrl}
                  icon={
                    <Play size={48} className="text-white drop-shadow-lg" />
                  }
                >
                  {snippet.tags && (
                    <p className="text-sm text-slate-400">
                      <strong>Tags:</strong> {snippet.tags.join(", ")}
                    </p>
                  )}
                </CardArticle>
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

export default YouTubePage;
