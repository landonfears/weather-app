import { waitFor } from "@testing-library/react";
import { OutdoorEvent } from "~/server/types";
import { afterAll, afterEach, beforeAll, describe, expect, it } from "vitest";
import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";
import geocodeMock from "~/mocks/geocode/morningside.json";
import { renderWithClient, testQueryClient } from "./utils";
import { LocationSearch } from "~/components/location-search";
import "fake-indexeddb/auto";

const server = setupServer(
  http.get(`/api/geocode`, ({ request }) => {
    const url = new URL(request.url);
    const query = url.searchParams.get("query");

    if (query) {
      return HttpResponse.json(geocodeMock);
    }

    return new HttpResponse("Invalid request", { status: 400 });
  }),
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("geocode", { timeout: 30000 }, () => {
  it("should display accurate location search results", async () => {
    const searchTerm = "Morningside Park";
    const mockOutdoorEvent: OutdoorEvent = {
      location: {
        components: geocodeMock.results[0]!.components,
        formatted: searchTerm, // geocodeMock.results[0]!.formatted,
        search: searchTerm,
        timezone: geocodeMock.results[0]!.annotations.timezone.name,
      },
      dayOfWeek: "Monday",
      timeOfDay: "Morning",
      cancels: [],
    };

    const rendered = renderWithClient(
      testQueryClient,
      <LocationSearch
        currentLocation={mockOutdoorEvent.location}
        onSelect={() => {}}
      />,
    );
    await waitFor(() => {
      rendered.getByDisplayValue(searchTerm);

      const suggestions = rendered
        .getAllByRole("option")
        .map((el) => el.textContent);

      suggestions.forEach((suggestion) => {
        expect(suggestion).toEqual(expect.stringContaining(searchTerm));
      });
    });
  });
});
