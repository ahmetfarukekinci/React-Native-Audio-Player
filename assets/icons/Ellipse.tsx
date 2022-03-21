import * as React from "react";
import Svg, { SvgProps, Circle } from "react-native-svg";

const SvgEllipse = (props: SvgProps) => (
  <Svg
    width={52}
    height={52}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Circle cx={26.186} cy={25.772} r={25.5} fill="#FF334B" />
  </Svg>
);

export default SvgEllipse;
