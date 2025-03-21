import ClearDay from "~/icons/1/clear-day.svg";
import ClearNight from "~/icons/1/clear-night.svg";
import Cloudy from "~/icons/1/cloudy.svg";
import Fog from "~/icons/1/fog.svg";
import Hail from "~/icons/1/hail.svg";
import PartlyCloudyDay from "~/icons/1/partly-cloudy-day.svg";
import PartlyCloudyNight from "~/icons/1/partly-cloudy-night.svg";
import RainSnowShowersDay from "~/icons/1/rain-snow-showers-day.svg";
import RainSnowShowersNight from "~/icons/1/rain-snow-showers-night.svg";
import Rain from "~/icons/1/rain.svg";
import ShowersDay from "~/icons/1/showers-day.svg";
import ShowersNight from "~/icons/1/showers-night.svg";
import Sleet from "~/icons/1/sleet.svg";
import SnowShowersDay from "~/icons/1/snow-showers-day.svg";
import SnowShowersNight from "~/icons/1/snow-showers-night.svg";
import Snow from "~/icons/1/snow.svg";
import ThunderRain from "~/icons/1/thunder-rain.svg";
import ThunderShowersDay from "~/icons/1/thunder-showers-day.svg";
import ThunderShowersNight from "~/icons/1/thunder-showers-night.svg";
import Thunder from "~/icons/1/thunder.svg";
import Wind from "~/icons/1/wind.svg";

export const weatherIcons: Record<
  string,
  React.FunctionComponent<React.SVGProps<SVGSVGElement>>
> = {
  "clear-day": ClearDay as React.FunctionComponent<
    React.SVGProps<SVGSVGElement>
  >,
  "clear-night": ClearNight as React.FunctionComponent<
    React.SVGProps<SVGSVGElement>
  >,
  cloudy: Cloudy as React.FunctionComponent<React.SVGProps<SVGSVGElement>>,
  fog: Fog as React.FunctionComponent<React.SVGProps<SVGSVGElement>>,
  hail: Hail as React.FunctionComponent<React.SVGProps<SVGSVGElement>>,
  "partly-cloudy-day": PartlyCloudyDay as React.FunctionComponent<
    React.SVGProps<SVGSVGElement>
  >,
  "partly-cloudy-night": PartlyCloudyNight as React.FunctionComponent<
    React.SVGProps<SVGSVGElement>
  >,
  "rain-snow-showers-day": RainSnowShowersDay as React.FunctionComponent<
    React.SVGProps<SVGSVGElement>
  >,
  "rain-snow-showers-night": RainSnowShowersNight as React.FunctionComponent<
    React.SVGProps<SVGSVGElement>
  >,
  rain: Rain as React.FunctionComponent<React.SVGProps<SVGSVGElement>>,
  "showers-day": ShowersDay as React.FunctionComponent<
    React.SVGProps<SVGSVGElement>
  >,
  "showers-night": ShowersNight as React.FunctionComponent<
    React.SVGProps<SVGSVGElement>
  >,
  sleet: Sleet as React.FunctionComponent<React.SVGProps<SVGSVGElement>>,
  "snow-showers-day": SnowShowersDay as React.FunctionComponent<
    React.SVGProps<SVGSVGElement>
  >,
  "snow-showers-night": SnowShowersNight as React.FunctionComponent<
    React.SVGProps<SVGSVGElement>
  >,
  snow: Snow as React.FunctionComponent<React.SVGProps<SVGSVGElement>>,
  "thunder-rain": ThunderRain as React.FunctionComponent<
    React.SVGProps<SVGSVGElement>
  >,
  "thunder-showers-day": ThunderShowersDay as React.FunctionComponent<
    React.SVGProps<SVGSVGElement>
  >,
  "thunder-showers-night": ThunderShowersNight as React.FunctionComponent<
    React.SVGProps<SVGSVGElement>
  >,
  thunder: Thunder as React.FunctionComponent<React.SVGProps<SVGSVGElement>>,
  wind: Wind as React.FunctionComponent<React.SVGProps<SVGSVGElement>>,
};
