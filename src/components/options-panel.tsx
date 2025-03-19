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

export default function OptionsPanel({
  outdoorEvent,
  setOutdoorEvent,
}: {
  outdoorEvent: OutdoorEvent;
  setOutdoorEvent: (outdoorEvent: OutdoorEvent) => void;
}) {
  return (
    <div className="static flex w-full flex-col items-center justify-center space-y-4 md:relative md:w-full md:flex-row md:space-x-4 md:space-y-0">
      <LocationSearch
        currentLocation={outdoorEvent?.location}
        onSelect={(value: OutdoorLocation) =>
          setOutdoorEvent({ ...outdoorEvent, location: value })
        }
      />
      <div className="flex w-full items-start justify-between space-x-4">
        <DropdownMenu
          // label="Day"
          items={DAYS_OF_WEEK}
          placeholder="Select a day"
          value={outdoorEvent?.dayOfWeek}
          onSelect={(value: string) =>
            setOutdoorEvent({ ...outdoorEvent, dayOfWeek: value as DayOfWeek })
          }
          triggerClassName="w-full text-base font-black"
        />
        <DropdownMenu
          // label="Time"
          items={TIMES_OF_DAY.map((tod) => tod.name)}
          placeholder="Select time of day"
          value={outdoorEvent?.timeOfDay}
          onSelect={(value: string) =>
            setOutdoorEvent({ ...outdoorEvent, timeOfDay: value as TimeOfDay })
          }
          triggerClassName="w-full text-base font-black"
        />
      </div>
    </div>
  );
}
