"use client";

import type { OutdoorEvent, OutdoorLocation } from "~/server/types";
import OptionsPanel from "./options-panel";
import { BLANK_OUTDOOR_EVENT, DEFAULT_OUTDOOR_EVENT } from "~/constants";
import { useEffect, useState } from "react";
import {
  createOutdoorEventLocationStore,
  getAllOutdoorEventLocationStore,
  getOutdoorEventLocationStore,
} from "~/persister/events";
import { handleNewOrUpdatedOutdoorEventStore } from "~/lib/utils";

export default function Weather() {
  const [outdoorEvent, setOutdoorEvent] =
    useState<OutdoorEvent>(BLANK_OUTDOOR_EVENT);

  useEffect(() => {
    getAllOutdoorEventLocationStore().then((events) => {
      const eventId = events?.[0]?.id;
      if (!eventId) {
        createOutdoorEventLocationStore(DEFAULT_OUTDOOR_EVENT.location)
          .then((outdoorEventLocation) =>
            handleNewOrUpdatedOutdoorEventStore(
              outdoorEventLocation?.[0]!.data,
              setOutdoorEvent,
              outdoorEventLocation?.[0]!.id,
            ),
          )
          .catch(console.error);
      } else {
        getOutdoorEventLocationStore(eventId)
          .then((event) => {
            if (event.length === 0) {
              createOutdoorEventLocationStore(DEFAULT_OUTDOOR_EVENT.location)
                .then((outdoorEventLocation) =>
                  handleNewOrUpdatedOutdoorEventStore(
                    outdoorEventLocation?.[0]!.data,
                    setOutdoorEvent,
                    outdoorEventLocation?.[0]!.id,
                  ),
                )
                .catch(console.error);
            } else {
              setOutdoorEvent((prevOutdoorEvent) => ({
                ...prevOutdoorEvent,
                location: event[0]!.data as OutdoorLocation,
              }));
            }
          })
          .catch(console.error);
      }
    });
  }, []);

  return (
    <main className="flex flex-col items-center justify-start px-8 py-10">
      <h1 className="mb-4 text-2xl">
        <span className="font-thin text-green-600">weather</span>
        <span className="font-black text-green-600">events</span>
      </h1>
      <OptionsPanel
        outdoorEvent={outdoorEvent}
        setOutdoorEvent={setOutdoorEvent}
      />
    </main>
  );
}
