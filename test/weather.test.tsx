import { waitFor } from "@testing-library/react";
import Weather from "~/components/weather";
import type { OutdoorEvent } from "~/server/types";
import { afterAll, afterEach, beforeAll, describe, expect, it } from "vitest";
import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";
import geocodeMock from "~/mocks/geocode/disney.json";
import weatherMock from "~/mocks/weather/disney.json";
import "fake-indexeddb/auto";
import { formatDatetimeEpoch } from "~/lib/utils";
import { renderWithClient, testQueryClient } from "./utils";

const server = setupServer(
  http.get(`/api/weather`, ({ request }) => {
    const url = new URL(request.url);
    const query = url.searchParams.get("query");
    const time = url.searchParams.get("time");

    if (query && time) {
      const randomWeatherMock =
        weatherMock[Math.floor(Math.random() * weatherMock.length)];
      return HttpResponse.json(randomWeatherMock);
    }

    return new HttpResponse("Invalid request", { status: 400 });
  }),
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("weather", { timeout: 30000 }, () => {
  it("should display weather event date", async () => {
    const mockOutdoorEvent: OutdoorEvent = {
      location: {
        components: geocodeMock.results[0]!.components,
        formatted: geocodeMock.results[0]!.formatted,
        search: "Disney",
        timezone: geocodeMock.results[0]!.annotations.timezone.name,
      },
      dayOfWeek: "Monday",
      timeOfDay: "Morning",
      cancels: [],
    };

    const rendered = renderWithClient(
      testQueryClient,
      <Weather
        outdoorEvent={mockOutdoorEvent}
        setOutdoorEvent={() => {
          //
        }}
      />,
    );
    const date = formatDatetimeEpoch(
      weatherMock?.[0]!.currentConditions.datetimeEpoch,
      weatherMock?.[0]!.timezone,
    );
    await waitFor(() => {
      rendered.getByText(date);
    });
    const slides = rendered.getAllByText(date);
    expect(slides).toHaveLength(53);
  });
});
