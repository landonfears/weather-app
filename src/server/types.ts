import type { LocationComponents } from "./open-cage";

export interface FetchError {
  message: string;
}

export type DayOfWeek =
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday"
  | "Sunday";

export type TimeOfDay = "Morning" | "Afternoon" | "Evening" | "Night";

export interface OutdoorLocation {
  search: string;
  components: LocationComponents;
  formatted: string;
}
export interface OutdoorEvent {
  location: OutdoorLocation;
  dayOfWeek: DayOfWeek;
  timeOfDay: TimeOfDay;
}
