"use client";

import { useQuery } from "@tanstack/react-query";
import { Dispatch, SetStateAction, useState } from "react";
import {
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
// import ClearNight from "~/icons/3/clear-night.svg";
// import ClearDay from "~/icons/1/clear-day.svg";

export default function Weather({
  outdoorEvent,
  setOutdoorEvent,
}: {
  outdoorEvent: OutdoorEvent;
  setOutdoorEvent: Dispatch<SetStateAction<OutdoorEvent>>;
}) {
  const [offsetWeek, setOffsetWeek] = useState(0);
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
          return response.json();
        }),
      );

      return weatherData;
    },
    enabled:
      !!outdoorEvent.location.formatted &&
      !!outdoorEvent.dayOfWeek &&
      !!outdoorEvent.timeOfDay,
  });

  if (isFetching || !data) {
    return (
      <div className="my-4 flex w-full flex-col items-center justify-center gap-4 md:w-1/2">
        <Skeleton className="h-8 w-full" />
        <div className="flex w-full items-start justify-center gap-4">
          <Skeleton className="h-16 w-16 rounded-full md:h-20 md:w-20 lg:h-24 lg:w-24" />
          <div className="flex w-full flex-col gap-2">
            <Skeleton className="h-7 w-full" />
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
      </div>
    );
  }

  const conditions = data?.[0]?.currentConditions as CurrentConditions;

  return (
    <div className="my-4 flex w-full flex-col items-center justify-center gap-4 md:w-1/2">
      <div className="flex items-center justify-center gap-1">
        <CalendarHeart className="h-8 w-8" />
        <h2 className="rounded-md px-4 py-2 text-center text-xl">
          {formatDatetimeEpoch(conditions.datetimeEpoch, data?.[0]?.timezone)}
        </h2>
      </div>
      <div className="flex items-start justify-center gap-4">
        <SvgIcon
          icon={conditions?.icon}
          className="h-auto w-16 md:w-24 lg:w-32"
        />
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between gap-2 rounded-md bg-neutral-100 px-4 py-2 text-xl">
            <span>{conditions.conditions}</span>
            <span className="font-bold">
              {Math.round(conditions.temp)}&deg;
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Wind className="h-8 w-8" />
            <span className="text-xl">
              {Math.round(conditions.windspeed)} mph
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Umbrella className="h-8 w-8" />
            <span className="text-xl">
              {conditions.precipprob}% chance of rain
            </span>
          </div>
        </div>
      </div>
      <Chart
        conditions={data.map((d) => d.currentConditions)}
        timezone={data?.[0]?.timezone}
      />
    </div>
  );
}
