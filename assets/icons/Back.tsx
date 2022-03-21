import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";

const SvgBack = (props: SvgProps) => (
  <Svg
    width={18}
    height={18}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M3.774 4.5H7.2v1.8H.9V0h1.8v2.943C4.253 1.064 6.476 0 9 0a9 9 0 1 1-9 9h1.8A7.2 7.2 0 1 0 9 1.8c-2.154 0-4.002.97-5.226 2.7Z"
      fill="#fff"
    />
  </Svg>
);

export default SvgBack;
