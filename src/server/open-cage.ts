import { env } from "~/env";

export interface OpenCageResponse {
  documentation: string;
  licenses: License[];
  rate: Rate;
  results: Result[];
  status: Status;
  stay_informed: StayInformed;
  thanks: string;
  timestamp: Timestamp;
  total_results: number;
}

interface License {
  name: string;
  url: string;
}

interface Rate {
  limit: number;
  remaining: number;
  reset: number;
}

interface Result {
  annotations: Annotations;
  bounds: Bounds;
  components: Components;
  confidence: number;
  formatted: string;
  geometry: Geometry;
}

interface Annotations {
  DMS: DMS;
  FIPS?: FIPS;
  MGRS: string;
  Maidenhead: string;
  Mercator: Mercator;
  OSM: OSM;
  UN_M49: UN_M49;
  callingcode: number;
  currency: Currency;
  flag: string;
  geohash: string;
  qibla: number;
  roadinfo: Roadinfo;
  sun: Sun;
  timezone: Timezone;
  what3words: What3words;
  wikidata?: string;
}

interface DMS {
  lat: string;
  lng: string;
}

interface FIPS {
  county: string;
  state: string;
}

interface Mercator {
  x: number;
  y: number;
}

interface OSM {
  edit_url: string;
  note_url: string;
  url: string;
}

interface UN_M49 {
  regions: Regions;
  statistical_groupings: string[];
}

interface Regions {
  AMERICAS: string;
  NORTHERN_AMERICA: string;
  US?: string;
  WORLD: string;
  CA?: string;
}

interface Currency {
  alternate_symbols: string[];
  decimal_mark: string;
  disambiguate_symbol: string;
  html_entity: string;
  iso_code: string;
  iso_numeric: string;
  name: string;
  smallest_denomination: number;
  subunit: string;
  subunit_to_unit: number;
  symbol: string;
  symbol_first: number;
  thousands_separator: string;
}

interface Roadinfo {
  drive_on: string;
  speed_in: string;
}

interface Sun {
  rise: RiseSet;
  set: RiseSet;
}

interface RiseSet {
  apparent: number;
  astronomical: number;
  civil: number;
  nautical: number;
}

interface Timezone {
  name: string;
  now_in_dst: number;
  offset_sec: number;
  offset_string: string;
  short_name: string;
}

interface What3words {
  words: string;
}

interface Bounds {
  northeast: Coordinate;
  southwest: Coordinate;
}

interface Coordinate {
  lat: number;
  lng: number;
}

interface Components {
  "ISO_3166-1_alpha-2": string;
  "ISO_3166-1_alpha-3": string;
  "ISO_3166-2": string[];
  _category: string;
  _normalized_city: string;
  _type: string;
  borough?: string;
  city?: string;
  continent: string;
  country: string;
  country_code: string;
  county?: string;
  neighbourhood?: string;
  park?: string;
  state: string;
  state_code: string;
  state_district?: string;
  suburb?: string;
  house_number?: string;
  town?: string;
  postcode?: string;
  region?: string;
  residential?: string;
  quarter?: string;
  hamlet?: string;
}

interface Geometry {
  lat: number;
  lng: number;
}

interface Status {
  code: number;
  message: string;
}

interface StayInformed {
  blog: string;
  mastodon: string;
}

interface Timestamp {
  created_http: string;
  created_unix: number;
}

export async function getValidLocations(query: string) {
  const response = await fetch(
    `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(query)}&key=${env.OPEN_CAGE_API_KEY}`,
    {
      method: "GET",
      redirect: "follow",
    },
  );
  const geocode = (await response.json()) as OpenCageResponse;
  console.log("geocode", geocode);
  return geocode;
}
