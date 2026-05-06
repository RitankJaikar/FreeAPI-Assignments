export const ErrorMessage = ({ error }) => {
  if (!error) return null;
  return (
    <div className="rounded-3xl border border-red-500/20 bg-red-950/10 px-4 py-3 text-sm text-red-200">
      <strong>Error:</strong> {error}
    </div>
  );
};
