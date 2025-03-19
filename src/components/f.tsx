"use client";

import type { OpenCageResponse } from "~/server/open-cage";
import { useQuery } from "@tanstack/react-query";

export default function Example() {
  const { isPending, error, data, isFetching } = useQuery({
    queryKey: ["geocode"],
    queryFn: async () => {
      const response = await fetch(`/api/geocode?query=morningside park`);
      return (await response.json()) as OpenCageResponse;
    },
    // staleTime: 1000 * 60 * 5, // 5 minutes
    // gcTime: 1000 * 60 * 10,
  });

  console.log("res data", isFetching, isPending, data, error);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      weather app
    </main>
  );
}
