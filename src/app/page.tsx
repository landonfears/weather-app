"use client";

import Weather from "~/components/weather";
import WeatherQueryClientProvider from "~/providers/query-client";

export default function HomePage() {
  return (
    <WeatherQueryClientProvider>
      <Weather />
    </WeatherQueryClientProvider>
  );
}
