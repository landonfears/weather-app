import type { DayOfWeek, OutdoorEvent, TimeOfDay } from "~/server/types";

export const IDB_KEY = "weather";
export const LOCAL_STORAGE_KEY = "weather";
export const DAYS_OF_WEEK: DayOfWeek[] = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
export const TIMES_OF_DAY: { name: TimeOfDay; hourRange: [number, number] }[] =
  [
    {
      name: "Morning",
      hourRange: [6, 12],
    },
    {
      name: "Afternoon",
      hourRange: [12, 18],
    },
    {
      name: "Evening",
      hourRange: [18, 24],
    },
    {
      name: "Night",
      hourRange: [0, 6],
    },
  ];

export const DEFAULT_OUTDOOR_EVENT: OutdoorEvent = {
  location: {
    components: {
      "ISO_3166-1_alpha-2": "US",
      "ISO_3166-1_alpha-3": "USA",
      "ISO_3166-2": ["US-NY"],
      _category: "outdoors/recreation",
      _normalized_city: "City of New York",
      _type: "park",
      borough: "Manhattan",
      city: "City of New York",
      continent: "North America",
      country: "United States",
      country_code: "us",
      county: "New York County",
      neighbourhood: "Morningside Heights",
      park: "Morningside Park",
      state: "New York",
      state_code: "NY",
    },
    formatted:
      "Morningside Park, City of New York, New York, United States of America",
    search: "morningside park",
  },
  dayOfWeek: "Saturday",
  timeOfDay: "Morning",
};
