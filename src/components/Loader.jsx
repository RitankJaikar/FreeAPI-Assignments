export const Loader = ({ isLoading, message = "Loading..." }) => {
  if (!isLoading) return null;
  return (
    <div className="rounded-3xl border border-blue-500/20 bg-blue-950/10 px-4 py-3 text-sm text-blue-100">
      {message}
    </div>
  );
};
