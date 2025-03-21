import { useEffect, useState } from "react";

import { useQuery } from "@tanstack/react-query";
import type { OpenCageResponse } from "~/server/open-cage";
import { OutdoorLocation } from "~/server/types";
import { formatLocation, resultToOutdoorLocation } from "~/lib/utils";
import { useDebounce } from "~/hooks/use-debounce";
import { AutoComplete, Option } from "./ui/autocomplete";

export function LocationSearch({
  currentLocation,
  onSelect,
}: {
  currentLocation: OutdoorLocation;
  onSelect: (value: OutdoorLocation) => void;
}) {
  const [search, setSearch] = useState<string>(formatLocation(currentLocation));
  useEffect(() => {
    setSearch(formatLocation(currentLocation));
  }, [currentLocation]);

  const readySearch = useDebounce(search ?? "", 500);
  const { data, isFetching } = useQuery({
    queryKey: ["geocode", readySearch],
    queryFn: async () => {
      const response = await fetch(`/api/geocode?query=${readySearch}`);
      return (await response.json()) as OpenCageResponse;
    },
    enabled: !!readySearch,
  });

  return (
    <div className="relative w-full md:static">
      <AutoComplete
        options={
          (data?.results.map((res) => ({
            label: formatLocation({
              search: readySearch,
              components: res.components,
              formatted: res.formatted,
            } as OutdoorLocation),
            value: res.formatted,
          })) ?? []) as Option[]
        }
        hasOptions={!!data && !!data?.results}
        emptyMessage="No results."
        placeholder="Find location..."
        inputClassName="text-base p-0 h-fit py-2"
        commandClassName="border rounded-md shadow-sm"
        isLoading={isFetching}
        inputValue={search}
        setInputValue={setSearch}
        onValueChange={(st) => {
          const locationObj = data?.results.find(
            (res) =>
              formatLocation(resultToOutdoorLocation(res, readySearch)) ===
              st.label,
          );
          if (locationObj) {
            onSelect(resultToOutdoorLocation(locationObj, readySearch));
          }
        }}
        value={
          {
            label: search,
            value: search,
          } as Option
        }
        disabled={false}
      />
    </div>
  );
}
