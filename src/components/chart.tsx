import React, { useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip as ChartTooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { CurrentConditions } from "~/server/visual-crossing";
import {
  CircleGauge,
  CircleHelp,
  CloudRain,
  Eye,
  Sun,
  Thermometer,
  Waves,
  Wind,
} from "lucide-react";
import { datetimeEpochToHour } from "~/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  ChartTooltip,
  Legend,
);

export const WEATHER_MAP = [
  {
    name: "Temperature",
    key: "temp",
    unit: "°F",
    description: "Temperature at the location in degrees Fahrenheit",
    icon: Thermometer,
    color: "#e11d48",
  },
  {
    name: "UV Index",
    key: "uvindex",
    unit: "UVI",
    description:
      "A value between 0 and 10 indicating the level of ultra violet (UV) exposure. 10 represents high level of exposure, and 0 represents no exposure",
    icon: Sun,
    color: "#ca8a04",
  },
  {
    name: "Wind",
    key: "windspeed",
    unit: "mph",
    description:
      "The sustained wind speed measured as the average windspeed that occurs during the preceding one to two minutes",
    icon: Wind,
    color: "#0d9488",
  },
  {
    name: "Precipitation",
    key: "precip",
    unit: "in",
    description:
      "The amount of liquid precipitation that fell or is predicted to fall. This includes the liquid-equivalent amount of any frozen precipitation such as snow or ice.",
    icon: CloudRain,
    color: "#16a34a",
  },
  {
    name: "Humidity",
    key: "humidity",
    unit: "%",
    description: "Relative humidity in percentage",
    icon: Waves,
    color: "#0284c7",
  },
  {
    name: "Visibility",
    key: "visibility",
    unit: "mi",
    description:
      "The distance at which distant objects are visible. Measured in miles",
    icon: Eye,
    color: "#4f46e5",
  },
  {
    name: "Pressure",
    key: "pressure",
    unit: "inHg",
    description:
      "The sea level atmospheric or barometric pressure in millibars (or hectopascals)",
    icon: CircleGauge,
    color: "#c026d3",
  },
];

export default function Chart({
  conditions,
  timezone,
}: {
  conditions: CurrentConditions[];
  timezone: string;
}) {
  const [chart, setChart] = useState(WEATHER_MAP[0]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  const labels = conditions.map((condition) =>
    datetimeEpochToHour(condition.datetimeEpoch, timezone),
  );

  const data = WEATHER_MAP.map((mapping) => {
    return {
      labels,
      datasets: [
        {
          label: mapping.name,
          id: mapping.key,
          data: labels.map(
            (_, index) =>
              conditions[index]?.[mapping.key as keyof CurrentConditions],
          ),
          borderColor: mapping.color,
          backgroundColor: mapping.color,
          cubicInterpolationMode: "monotone" as const,
        },
      ],
    };
  });

  const chartData = data.find((d) => d.datasets?.[0]?.id === chart?.key);
  if (!chartData || !chart) {
    return null;
  }
  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center justify-between gap-1">
        {/* Chart tooltip */}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="link"
                className="flex w-fit items-center justify-start gap-1 pl-0 text-base font-bold"
              >
                <CircleHelp className="h-4 w-4" />
                <span>{chart?.name}</span>
                <span>({chart?.unit})</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{chart?.description}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        {/* Chart switcher */}
        <Select
          value={chart?.key}
          onValueChange={(e) => {
            const updatedChart = WEATHER_MAP.find((item) => item.key === e);
            if (updatedChart) {
              setChart(updatedChart);
            }
          }}
        >
          <SelectTrigger className="w-fit">
            <chart.icon className="mr-2 h-4 w-4" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {WEATHER_MAP.map((item) => (
                <SelectItem key={item.key} value={item.key}>
                  <div className="flex items-center justify-center gap-4">
                    <item.icon className="h-4 w-4" />
                    <span>{item.name}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <Line options={options} data={chartData} />
      <span className="text-center text-xs lg:hidden">
        {chart?.description}
      </span>
    </div>
  );
}
