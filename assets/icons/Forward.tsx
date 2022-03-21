import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";

const SvgForward = (props: SvgProps) => (
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
      d="M14.226 4.5H10.8v1.8h6.3V0h-1.8v2.943C13.747 1.064 11.524 0 9 0a9 9 0 1 0 9 9h-1.8A7.2 7.2 0 1 1 9 1.8c2.154 0 4.002.97 5.226 2.7Z"
      fill="#fff"
    />
  </Svg>
);

export default SvgForward;
