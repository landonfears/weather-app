import Dexie, { type EntityTable } from "dexie";
import { IDB_EVENTS_DB_NAME } from "~/constants";
import { OutdoorEvent, OutdoorLocation } from "~/server/types";

interface OutdoorEventLocationStore {
  id: number;
  data: OutdoorEvent;
  cancels: Date[];
  createdAt: Date;
  updatedAt: Date;
}

const db = new Dexie(IDB_EVENTS_DB_NAME) as Dexie & {
  outdoorEventLocations: EntityTable<OutdoorEventLocationStore, "id">;
};

// Schema declaration:
db.version(1).stores({
  outdoorEventLocations: "++id, data, cancels, createdAt, updatedAt", // primary key "id" (for the runtime!)
});

const createOutdoorEventLocationStore = async (event: OutdoorEvent) => {
  const template = {
    data: event,
    cancels: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const id = await db.outdoorEventLocations.add(template);

  return [
    {
      id,
      ...template,
    },
  ];
};

const getAllOutdoorEventLocationStore = async () => {
  return db.outdoorEventLocations.toArray();
};

const getOutdoorEventLocationStore = async (id: number) => {
  return db.outdoorEventLocations.where("id").equals(id).toArray();
};

const updateOutdoorEventLocationStore = async (
  id: number,
  data?: OutdoorEvent,
  cancels?: Date[],
) => {
  const res = await db.outdoorEventLocations.update(id, {
    data,
    cancels,
    updatedAt: new Date(),
  });
  return res;
};

export type { OutdoorEventLocationStore };
export {
  db,
  createOutdoorEventLocationStore,
  getOutdoorEventLocationStore,
  updateOutdoorEventLocationStore,
  getAllOutdoorEventLocationStore,
};
