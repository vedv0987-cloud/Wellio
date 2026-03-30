import { useState, useMemo } from "react";
import Fuse from "fuse.js";

interface SearchOptions<T> {
  data: T[];
  keys: string[];
  threshold?: number;
}

export function useSearch<T>({ data, keys, threshold = 0.3 }: SearchOptions<T>) {
  const [query, setQuery] = useState("");

  const fuse = useMemo(
    () => new Fuse(data, { keys, threshold, includeScore: true }),
    [data, keys, threshold]
  );

  const results = useMemo(() => {
    if (!query.trim()) return data;
    return fuse.search(query).map((result) => result.item);
  }, [query, fuse, data]);

  return { query, setQuery, results };
}
