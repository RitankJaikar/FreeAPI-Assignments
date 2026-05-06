import { useState } from "react";
import { Button } from "./Button";

export const SearchForm = ({ onSearch, placeholder = "Search..." }) => {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(input);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-3 rounded-3xl border border-zinc-800 bg-zinc-950/70 p-4 shadow-sm sm:flex-row sm:items-center"
    >
      <label htmlFor="searchInput" className="sr-only">
        Search
      </label>
      <input
        id="searchInput"
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-3xl border border-zinc-800 bg-zinc-900 px-4 py-3 text-sm text-white outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
      />
      <Button type="submit" className="shrink-0">
        Search
      </Button>
    </form>
  );
};
