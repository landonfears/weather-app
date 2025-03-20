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
import { Umbrella, Wind } from "lucide-react";
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
    return <Skeleton className="h-8 w-full" />;
  }

  const conditions = data?.[0]?.currentConditions;
  return (
    <div className="my-4 flex w-full flex-col items-center justify-center gap-4 md:w-1/2">
      <h2 className="rounded-md px-4 py-2 text-center text-2xl">
        {formatDatetimeEpoch(conditions.datetimeEpoch)}
      </h2>
      <div className="flex items-start justify-center gap-4">
        <SvgIcon
          icon={conditions?.icon}
          className="h-auto w-16 w-full md:w-20 lg:w-24"
        />
        <div className="flex flex-col gap-2">
          <p className="text-2xl">
            {conditions.conditions} {Math.round(conditions.temp)}&deg;
          </p>
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
    </div>
  );
}
