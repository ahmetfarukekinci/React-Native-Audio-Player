import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";

const SvgArt = (props: SvgProps) => (
  <Svg
    width={23}
    height={19}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M17.01 18.272a2 2 0 0 0 2-2h1a2 2 0 0 0 2-2v-10a2 2 0 0 0-2-2h-1a2 2 0 0 0-2-2h-12a2 2 0 0 0-2 2h-1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h1a2 2 0 0 0 2 2h12Zm0-16v14h-12v-14h12Zm-6 7.14V4.403l4.554 3.037-1.11 1.664-1.445-.964v3.632c0 1.453-1.395 2.5-3 2.5-1.604 0-3-1.047-3-2.5 0-1.454 1.396-2.5 3-2.5.348 0 .685.049 1 .14Zm-9-5.14h1v10h-1v-10Zm17 10h1v-10h-1v10Zm-8-2.5c0 .203-.396.5-1 .5-.605 0-1-.297-1-.5 0-.204.395-.5 1-.5.604 0 1 .296 1 .5Z"
      fill="#fff"
    />
  </Svg>
);

export default SvgArt;
