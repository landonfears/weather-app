"use client";

import { useQuery } from "@tanstack/react-query";
import type { Dispatch, SetStateAction } from "react";
import {
  cn,
  datetimeEpochToHour,
  formatDatetimeEpoch,
  formatDateToISOString,
  getNextDayOfWeek,
  handleNewOrUpdatedOutdoorEventStore,
} from "~/lib/utils";
import type { OutdoorEvent } from "~/server/types";
import SvgIcon from "./svg/icon";
import { Skeleton } from "./ui/skeleton";
import { CalendarHeart, Umbrella } from "lucide-react";
import type { VisualCrossingResponse } from "~/server/visual-crossing";
import Chart from "./chart";
import { useIntersectionObserver } from "~/hooks/use-intersection-observer";
import { Button } from "./ui/button";
import {
  getAllOutdoorEventLocationStore,
  updateOutdoorEventLocationStore,
} from "~/persister/events";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";

export default function WeatherData({
  outdoorEvent,
  setOutdoorEvent,
  offsetWeek,
}: {
  outdoorEvent: OutdoorEvent;
  setOutdoorEvent: Dispatch<SetStateAction<OutdoorEvent>>;
  offsetWeek: number;
}) {
  const { ref, hasBeenVisible, isVisible } = useIntersectionObserver({
    threshold: 0.1,
    root: null,
    rootMargin: "100px",
  });

  const { data, isFetching } = useQuery({
    queryKey: [
      "weather",
      outdoorEvent.location.formatted,
      outdoorEvent.dayOfWeek,
      outdoorEvent.timeOfDay,
      offsetWeek,
    ],
    queryFn: async () => {
      const queryDates = getNextDayOfWeek(
        outdoorEvent.dayOfWeek,
        outdoorEvent.timeOfDay,
        offsetWeek,
        outdoorEvent.location.timezone,
      ).map((d) => formatDateToISOString(d));

      const weatherData = await Promise.all(
        queryDates.map(async (date) => {
          const response = await fetch(
            `/api/weather?query=${encodeURIComponent(
              outdoorEvent.location.formatted,
            )}&time=${encodeURIComponent(date)}`,
          );
          const data = (await response.json()) as VisualCrossingResponse;
          return data;
        }),
      );
      return weatherData;
    },
    enabled:
      !!outdoorEvent.location.formatted &&
      !!outdoorEvent.dayOfWeek &&
      !!outdoorEvent.timeOfDay &&
      (isVisible || hasBeenVisible),
  });

  if (isFetching || !data || (!hasBeenVisible && !isVisible)) {
    return (
      <div
        ref={ref}
        className="my-4 flex h-auto w-full flex-col items-center justify-center gap-4 rounded-none px-0 shadow-none md:px-8 md:pb-12 md:pt-8"
      >
        <Skeleton className="h-10 w-full" />
        <div className="flex w-full items-start justify-center gap-4">
          <Skeleton className="h-[170px] w-full" />
        </div>
        <Skeleton className="h-[200px] w-full" />
      </div>
    );
  }

  const conditions = data?.[0]!.currentConditions;
  if (!conditions) {
    if (offsetWeek !== 0) {
      return null;
    }
    return (
      <div className="flex h-full items-center justify-center">
        <p>Oops, something went wrong.</p>
      </div>
    );
  }
  const eventDate = conditions.datetimeEpoch;

  const handleEventCancel = (cancel: boolean) => {
    getAllOutdoorEventLocationStore()
      .then((events) => {
        const eventId = events?.[0]?.id;
        if (eventId) {
          const buildEvent = {
            ...outdoorEvent,
            cancels: cancel
              ? Array.from(new Set([...outdoorEvent.cancels, eventDate]))
              : outdoorEvent.cancels?.filter((d) => d !== eventDate),
          };
          updateOutdoorEventLocationStore(eventId, buildEvent)
            .then(() => {
              handleNewOrUpdatedOutdoorEventStore(buildEvent, setOutdoorEvent);
            })
            .catch(console.error);
        }
      })
      .catch(console.error);
  };

  return (
    <div
      ref={ref}
      className={cn(
        "relative my-4 flex w-full flex-col items-center justify-center gap-4 rounded-none px-0 shadow-none md:rounded-2xl md:border md:border-neutral-50 md:px-8 md:pb-12 md:pt-8 md:shadow-lg",
      )}
    >
      {offsetWeek >= 0 && !outdoorEvent.cancels?.includes(eventDate) && (
        <Button
          variant="destructive"
          className="absolute top-12 z-10 -mb-5 h-auto rounded-full px-2 py-1 text-xs font-bold md:right-3 md:top-3 md:m-0"
          onClick={() => handleEventCancel(true)}
        >
          Cancel
        </Button>
      )}
      {offsetWeek >= 0 && outdoorEvent.cancels?.includes(eventDate) && (
        <Button
          variant="destructive"
          className="absolute top-12 z-10 -mb-5 h-auto rounded-full bg-green-600 px-2 py-1 text-xs font-bold hover:bg-green-500 md:right-3 md:top-3 md:m-0"
          onClick={() => handleEventCancel(false)}
        >
          Revive
        </Button>
      )}
      <div
        className={cn(
          offsetWeek < 0 ? "opacity-40" : "",
          "flex items-center justify-center gap-1",
        )}
      >
        <CalendarHeart
          className={cn(
            offsetWeek >= 0 ? "text-blue-600" : "",
            "hidden h-7 w-7 md:block",
          )}
        />
        <h2
          className={cn(
            offsetWeek >= 0 && outdoorEvent.cancels?.includes(eventDate)
              ? "line-through"
              : "",
            "rounded-md px-10 py-2 text-center text-lg md:px-4",
          )}
        >
          {formatDatetimeEpoch(conditions.datetimeEpoch, data?.[0]?.timezone)}
        </h2>
      </div>
      <ScrollArea
        id="hour-scroll"
        className="w-full whitespace-nowrap rounded-md border"
      >
        <div className="flex w-max gap-4 space-x-4 p-4 pb-6">
          {data
            .map((d) => d.currentConditions)
            .map((conditions) => (
              <div
                key={conditions.datetimeEpoch}
                className="flex w-20 flex-col items-center justify-center gap-0.5"
              >
                <h3 className="text-sm font-bold">
                  {datetimeEpochToHour(
                    conditions.datetimeEpoch,
                    data?.[0]?.timezone,
                  )}
                </h3>
                <SvgIcon icon={conditions.icon} className="h-8 w-8 shrink" />
                <span className="text-xs">{conditions.conditions}</span>
                <span className="text-lg font-bold">
                  {Math.round(conditions.temp)}&deg;
                </span>
                <div className="flex items-center justify-start gap-1">
                  <Umbrella className="h-4 w-4" />
                  <span className="grow text-xs">
                    {Math.round(conditions.precipprob)}%
                  </span>
                </div>
              </div>
            ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
      <Chart
        conditions={data.map((d) => d.currentConditions)}
        timezone={data?.[0]!.timezone}
      />
    </div>
  );
}
