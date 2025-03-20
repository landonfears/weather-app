"use client";

import { DropdownMenu } from "./dropdown-menu";
import { DAYS_OF_WEEK, TIMES_OF_DAY } from "~/constants";
import { LocationSearch } from "./location-search";
import type {
  DayOfWeek,
  OutdoorEvent,
  OutdoorLocation,
  TimeOfDay,
} from "~/server/types";
import {
  getAllOutdoorEventLocationStore,
  updateOutdoorEventLocationStore,
} from "~/persister/events";
import { handleNewOrUpdatedOutdoorEventStore } from "~/lib/utils";
import { Dispatch, SetStateAction } from "react";

export default function OptionsPanel({
  outdoorEvent,
  setOutdoorEvent,
}: {
  outdoorEvent: OutdoorEvent;
  setOutdoorEvent: Dispatch<SetStateAction<OutdoorEvent>>;
}) {
  return (
    <div className="static flex w-full flex-col items-center justify-center space-y-4 md:relative md:w-full md:flex-row md:space-x-4 md:space-y-0">
      <LocationSearch
        currentLocation={outdoorEvent?.location}
        onSelect={(value: OutdoorLocation) => {
          getAllOutdoorEventLocationStore().then((events) => {
            const eventId = events?.[0]?.id;

            if (eventId) {
              const buildEvent = {
                ...outdoorEvent,
                location: value,
              };
              updateOutdoorEventLocationStore(eventId, buildEvent).then(() => {
                handleNewOrUpdatedOutdoorEventStore(
                  buildEvent,
                  setOutdoorEvent,
                  eventId,
                );
              });
            }
          });
        }}
      />
      <div className="flex w-full items-start justify-between space-x-4">
        <DropdownMenu
          items={DAYS_OF_WEEK}
          placeholder="Select a day"
          value={outdoorEvent?.dayOfWeek}
          onSelect={(value: string) => {
            getAllOutdoorEventLocationStore().then((events) => {
              const eventId = events?.[0]?.id;

              if (eventId) {
                const buildEvent = {
                  ...outdoorEvent,
                  dayOfWeek: value as DayOfWeek,
                };
                updateOutdoorEventLocationStore(eventId, buildEvent).then(
                  () => {
                    handleNewOrUpdatedOutdoorEventStore(
                      buildEvent,
                      setOutdoorEvent,
                      eventId,
                    );
                  },
                );
              }
            });
          }}
          triggerClassName="w-full text-base font-black"
        />
        <DropdownMenu
          items={TIMES_OF_DAY.map((tod) => tod.name)}
          placeholder="Select time of day"
          value={outdoorEvent?.timeOfDay}
          onSelect={(value: string) => {
            getAllOutdoorEventLocationStore().then((events) => {
              const eventId = events?.[0]?.id;

              if (eventId) {
                const buildEvent = {
                  ...outdoorEvent,
                  timeOfDay: value as TimeOfDay,
                };
                updateOutdoorEventLocationStore(eventId, buildEvent).then(
                  () => {
                    handleNewOrUpdatedOutdoorEventStore(
                      buildEvent,
                      setOutdoorEvent,
                      eventId,
                    );
                  },
                );
              }
            });
          }}
          triggerClassName="w-full text-base font-black"
        />
      </div>
    </div>
  );
}
