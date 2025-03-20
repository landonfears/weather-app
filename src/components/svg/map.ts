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
  "clear-day": ClearDay,
  "clear-night": ClearNight,
  cloudy: Cloudy,
  fog: Fog,
  hail: Hail,
  "partly-cloudy-day": PartlyCloudyDay,
  "partly-cloudy-night": PartlyCloudyNight,
  "rain-snow-showers-day": RainSnowShowersDay,
  "rain-snow-showers-night": RainSnowShowersNight,
  rain: Rain,
  "showers-day": ShowersDay,
  "showers-night": ShowersNight,
  sleet: Sleet,
  "snow-showers-day": SnowShowersDay,
  "snow-showers-night": SnowShowersNight,
  snow: Snow,
  "thunder-rain": ThunderRain,
  "thunder-showers-day": ThunderShowersDay,
  "thunder-showers-night": ThunderShowersNight,
  thunder: Thunder,
  wind: Wind,
};
