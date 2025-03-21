import React from "react";

const SvgMock = ({
  className,
  width,
  height,
}: {
  className: string;
  width: number;
  height: number;
}) => (
  <svg className={className} width={width} height={height}>
    <rect width="100%" height="100%" fill="gray" />
  </svg>
);

export default SvgMock;
