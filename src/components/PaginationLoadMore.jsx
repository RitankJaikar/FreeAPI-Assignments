import { Button } from "./Button";

export const PaginationLoadMore = ({ data, onLoadMore, loading }) => {
  if (!data?.data) return null;

  return (
    <div className="mt-8 flex items-center justify-center">
      <Button onClick={onLoadMore} disabled={!data.data.nextPage || loading}>
        {loading ? "Loading..." : "Load More"}
      </Button>
    </div>
  );
};
