export const Button = ({
  onClick,
  disabled,
  children,
  type = "button",
  className = "",
  ...props
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex items-center justify-center gap-2 rounded-full border border-zinc-700 bg-zinc-900 px-5 py-2.5 text-sm font-medium text-white transition hover:border-blue-500 hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
