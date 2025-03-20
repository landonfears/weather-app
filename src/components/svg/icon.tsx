import React from "react";
import { weatherIcons } from "./map";

interface SvgIconProps {
  icon: string;
  className?: string;
  width?: string | number;
  height?: string | number;
}

const SvgIcon: React.FC<SvgIconProps> = ({
  icon,
  className,
  width,
  height,
}) => {
  const SVG = weatherIcons[icon];
  if (!SVG) {
    return null;
  }
  return <SVG className={className} width={width} height={height} />;
};

export default SvgIcon;
