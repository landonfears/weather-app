import { clsx, type ClassValue } from "clsx";
import { Dispatch, SetStateAction } from "react";
import { twMerge } from "tailwind-merge";
import { LOCAL_STORAGE_KEY } from "~/constants";
import { Result } from "~/server/open-cage";
import { OutdoorEvent, OutdoorLocation } from "~/server/types";

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
  let parts = [];
  return location.formatted;
  // parts.push(location.components.park ?? location.components.neighbourhood);
  // parts = parts.filter((part) => part);
  // if (parts.length) {
  //   parts.push(location.components.city ?? location.components.state);
  //   return parts.join(", ");
  // }
  // parts.push(
  //   location.components.suburb ??
  //     location.components.hamlet ??
  //     location.components.quarter ??
  //     location.components.town ??
  //     location.components.borough,
  // );
  // parts = parts.filter((part) => part);
  // if (parts.length) {
  //   parts.push(location.components.city ?? location.components.state);
  //   return parts.join(", ");
  // }
  // parts.push(location.components.city ?? location.components.county);
  // parts = parts.filter((part) => part);
  // if (parts.length) {
  //   parts.push(location.components.state);
  //   return parts.join(", ");
  // }
  // parts.push(
  //   location.components.state ??
  //     location.components.country ??
  //     location.components.continent,
  // );
  // parts = parts.filter((part) => part);
  // return parts.join(", ");
}

export const resultToOutdoorLocation = (
  result: Result,
  search: string,
): OutdoorLocation => {
  return {
    search,
    components: result.components,
    formatted: result.formatted,
  };
};

export const handleNewOrUpdatedOutdoorEventStore = (
  outdoorEventLocation: OutdoorLocation,
  setOutdoorEvent: Dispatch<SetStateAction<OutdoorEvent>>,
  eventId: number | string,
) => {
  setOutdoorEvent((prevOutdoorEvent) => ({
    ...prevOutdoorEvent,
    location: outdoorEventLocation,
  }));
  localStorage.setItem(LOCAL_STORAGE_KEY, eventId.toString() ?? "");
};
