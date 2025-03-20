import { clsx, type ClassValue } from "clsx";
import { Dispatch, SetStateAction } from "react";
import { twMerge } from "tailwind-merge";
import { Result } from "~/server/open-cage";
import {
  DayOfWeek,
  OutdoorEvent,
  OutdoorLocation,
  TimeOfDay,
} from "~/server/types";
import { DAYS_OF_WEEK, TIMES_OF_DAY } from "~/constants";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDateToISOString(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");
  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
}

export function formatLocation(location: OutdoorLocation): string {
  return location.formatted;
}

export const resultToOutdoorLocation = (
  result: Result,
  search: string,
): OutdoorLocation => {
  return {
    search,
    components: result.components,
    formatted: result.formatted,
    timezone: result.annotations.timezone.name,
  };
};

export const handleNewOrUpdatedOutdoorEventStore = (
  outdoorEventStore: OutdoorEvent,
  setOutdoorEvent: Dispatch<SetStateAction<OutdoorEvent>>,
  eventId: number | string,
) => {
  setOutdoorEvent(outdoorEventStore);
};

export function getNextDayOfWeek(
  dayOfWeek: DayOfWeek,
  timeOfDay: TimeOfDay,
  offset: number = 0,
  timeZone: string = "America/New_York",
): Date[] {
  const now = new Date();
  const dayIndex = DAYS_OF_WEEK.indexOf(dayOfWeek);
  const timeRange = TIMES_OF_DAY.find(
    (time) => time.name === timeOfDay,
  )?.hourRange;

  if (!timeRange) {
    throw new Error("Invalid time of day");
  }

  // Calculate the next occurrence of the specified day of the week
  const resultDates: Date[] = [];
  const currentDayIndex = now.getDay();
  let daysUntilNext = dayIndex - currentDayIndex;
  if (daysUntilNext < 0) {
    daysUntilNext += 7;
  }

  // Get the next occurrence of the specified day
  const nextDay = new Date(now);
  nextDay.setDate(now.getDate() + daysUntilNext + offset * 7);

  // Generate dates for the specified time range
  for (let hour = timeRange[0]; hour < timeRange[1]; hour++) {
    const date = new Date(nextDay);
    date.setHours(hour, 0, 0, 0);

    // Convert to the specified time zone
    const options: Intl.DateTimeFormatOptions = {
      timeZone,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    };
    const timeString = date.toLocaleTimeString("en-US", options);
    const [hours, minutes, seconds] = timeString.split(":").map(Number);
    date.setHours(hours!, minutes, seconds);

    resultDates.push(date);
  }

  return resultDates;
}

export function formatDatetimeEpoch(
  datetimeEpoch: number,
  timezone: string = "America/New_York",
): string {
  const date = new Date(datetimeEpoch * 1000); // Convert from seconds to milliseconds
  const options: Intl.DateTimeFormatOptions = {
    timeZone: timezone,
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return date.toLocaleDateString("en-US", options);
}

export function datetimeEpochToHour(
  datetimeEpoch: number,
  timezone: string = "America/New_York",
): string {
  const date = new Date(datetimeEpoch * 1000); // Convert from seconds to milliseconds
  const options: Intl.DateTimeFormatOptions = {
    timeZone: timezone,
    hour: "numeric",
    hour12: true,
  };
  return date.toLocaleTimeString("en-US", options);
}
