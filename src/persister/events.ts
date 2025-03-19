import Dexie, { type EntityTable } from "dexie";
import { IDB_EVENTS_DB_NAME } from "~/constants";
import { OutdoorLocation } from "~/server/types";

interface OutdoorEventLocationStore {
  id: number;
  data: OutdoorLocation;
  createdAt: Date;
  updatedAt: Date;
}

const db = new Dexie(IDB_EVENTS_DB_NAME) as Dexie & {
  outdoorEventLocations: EntityTable<OutdoorEventLocationStore, "id">;
};

// Schema declaration:
db.version(1).stores({
  outdoorEventLocations: "++id, data, createdAt, updatedAt", // primary key "id" (for the runtime!)
});

const createOutdoorEventLocationStore = async (event: OutdoorLocation) => {
  const template = {
    data: event,
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
  data: OutdoorLocation,
) => {
  const res = await db.outdoorEventLocations.update(id, {
    data,
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
