"use client";

import Dashboard from "~/components/dashboard";
import WeatherQueryClientProvider from "~/providers/query-client";

export default function HomePage() {
  return (
    <WeatherQueryClientProvider>
      <Dashboard />
    </WeatherQueryClientProvider>
  );
}
