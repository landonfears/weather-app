"use client";

import { useQuery } from "@tanstack/react-query";
import { Dispatch, SetStateAction, useState } from "react";
import {
  cn,
  formatDatetimeEpoch,
  formatDateToISOString,
  getNextDayOfWeek,
} from "~/lib/utils";
import { OutdoorEvent } from "~/server/types";
import SvgIcon from "./svg/icon";
import { Skeleton } from "./ui/skeleton";
import { CalendarHeart, Umbrella, Wind } from "lucide-react";
import { CurrentConditions } from "~/server/visual-crossing";
import Chart from "./chart";
import { useIntersectionObserver } from "~/hooks/use-intersection-observer";
import weatherMock from "~/mocks/weather.json" assert { type: "json" };

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

  const { data, isFetching, isFetched } = useQuery({
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
          return response.json();
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
          <Skeleton className="h-16 w-16 rounded-full md:h-20 md:w-20 lg:h-24 lg:w-24" />
          <div className="flex w-full flex-col gap-2">
            <div className="flex w-full items-center justify-between gap-2 rounded-md py-2 text-xl">
              <Skeleton className="h-7 w-full" />
            </div>
            <div className="flex items-center gap-2">
              <Skeleton className="h-8 w-8 rounded-full" />
              <Skeleton className="h-6 w-full" />
            </div>
            <div className="flex items-center gap-2">
              <Skeleton className="h-8 w-8 rounded-full" />
              <Skeleton className="h-6 w-full" />
            </div>
          </div>
        </div>
        <Skeleton className="h-[200px] w-full" />
      </div>
    );
  }

  const conditions = data?.[0]?.currentConditions as CurrentConditions;

  return (
    <div
      ref={ref}
      className={cn(
        "my-4 flex w-full flex-col items-center justify-center gap-4 rounded-none px-0 shadow-none md:rounded-2xl md:border md:border-neutral-50 md:px-8 md:pb-12 md:pt-8 md:shadow-lg",
      )}
    >
      <div
        className={cn(
          offsetWeek < 0 ? "opacity-40" : "",
          "flex items-center justify-center gap-1",
        )}
      >
        <CalendarHeart className="hidden h-7 w-7 md:block" />
        <h2 className="rounded-md px-10 py-2 text-center text-lg md:px-4">
          {formatDatetimeEpoch(conditions.datetimeEpoch, data?.[0]?.timezone)}
        </h2>
      </div>
      <div className="flex w-full items-start justify-center gap-4">
        <SvgIcon
          icon={conditions?.icon}
          className="h-auto w-16 md:w-24 lg:w-32"
        />
        <div className="flex grow flex-col gap-2">
          <div className="flex items-center justify-between gap-2 rounded-md bg-neutral-100 px-4 py-2 text-xl">
            <span className="text-lg">{conditions.conditions}</span>
            <span className="font-bold">
              {Math.round(conditions.temp)}&deg;
            </span>
          </div>
          <div className="flex items-center justify-start gap-2">
            <Wind className="h-6 w-6" />
            <span className="text-base">
              {Math.round(conditions.windspeed)} mph
            </span>
          </div>
          <div className="flex items-center justify-start gap-2">
            <Umbrella className="h-6 w-6" />
            <span className="text-base">
              {conditions.precipprob}% chance of rain
            </span>
          </div>
        </div>
      </div>
      <Chart
        conditions={data.map((d) => d.currentConditions)}
        timezone={data?.[0]!.timezone}
      />
    </div>
  );
}
