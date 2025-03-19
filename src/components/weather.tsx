"use client";

import type { OutdoorEvent } from "~/server/types";
import OptionsPanel from "./options-panel";
import { DEFAULT_OUTDOOR_EVENT } from "~/constants";
import { useState } from "react";

export default function Weather() {
  const [outdoorEvent, setOutdoorEvent] = useState<OutdoorEvent>(
    DEFAULT_OUTDOOR_EVENT,
  );

  return (
    <main className="flex flex-col items-center justify-start px-8 py-16">
      <h1 className="mb-4 text-2xl">
        <span className="font-thin text-pink-600">weather</span>
        <span className="font-black text-pink-600">events</span>
      </h1>
      <OptionsPanel
        outdoorEvent={outdoorEvent}
        setOutdoorEvent={setOutdoorEvent}
      />
    </main>
  );
}
