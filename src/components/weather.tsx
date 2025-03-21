"use client";

import type { Dispatch, SetStateAction } from "react";
import { findParentWithId } from "~/lib/utils";
import type { OutdoorEvent } from "~/server/types";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "./ui/carousel";
import WeatherData from "./weather-data";

export default function Weather({
  outdoorEvent,
  setOutdoorEvent,
}: {
  outdoorEvent: OutdoorEvent;
  setOutdoorEvent: Dispatch<SetStateAction<OutdoorEvent>>;
}) {
  const weeks = Array.from({ length: 53 }, (_, i) => i - 51);

  return (
    <div className="my-0 flex w-full flex-col items-center justify-center gap-4 md:my-4">
      <Carousel
        className="w-full"
        opts={{
          startIndex: weeks.length - 2,
          watchDrag: (_, event) => {
            if (findParentWithId(event.target as HTMLElement, "hour-scroll")) {
              return false;
            }

            return true;
          },
        }}
      >
        <CarouselContent className="md:mx-10">
          {weeks.map((offset) => (
            <CarouselItem
              key={`${offset}-${outdoorEvent.dayOfWeek}-${outdoorEvent.timeOfDay}`}
              className="dragging basis-full pl-4 md:basis-1/2 xl:basis-1/3"
            >
              <WeatherData
                outdoorEvent={outdoorEvent}
                setOutdoorEvent={setOutdoorEvent}
                offsetWeek={offset}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-0 top-10 md:top-1/2" />
        <CarouselNext className="right-0 top-10 md:top-1/2" />
      </Carousel>
    </div>
  );
}
