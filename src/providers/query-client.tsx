import { QueryClient } from "@tanstack/react-query";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { nanoid } from "nanoid";
import { createIDBPersister } from "~/persister/indexed-db";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { staleTime: 1000 * 60 * 60, gcTime: 1000 * 60 * 60 * 24 },
  },
});

const persister = createIDBPersister();

export default function WeatherQueryClientProvider({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{
        persister,
        buster: nanoid(),
      }}
    >
      {children}
    </PersistQueryClientProvider>
  );
}
