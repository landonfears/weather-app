import { env } from "~/env";
import type { FetchError } from "./types";

export async function getWeather(location: string, time: Date) {
  try {
    console.log("getWeather", location, encodeURIComponent(location), time);
    //2020-12-15T13:00:00
    const response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/London,UK/2020-12-15T13:00:00?unitGroup=us&key=${env.VISUAL_CROSSING_API_KEY}&include=current&contentType=json`,
      {
        method: "GET",
        redirect: "follow",
      },
    );
    const graph = (await response.json()) as unknown;
    return graph;
    return null;
  } catch (cause) {
    console.error(cause);
    return {
      message: "Something went wrong...",
    } as FetchError;
  }
}
