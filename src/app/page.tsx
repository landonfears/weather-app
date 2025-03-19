"use client";

import Example from "~/components/f";
import WeatherQueryClientProvider from "~/providers/query-client";

export default function HomePage() {
  return (
    <WeatherQueryClientProvider>
      <Example />
    </WeatherQueryClientProvider>
  );
}
