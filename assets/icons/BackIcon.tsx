import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";

const SvgBackIcon = (props: SvgProps) => (
  <Svg
    width={19}
    height={18}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="m3.829 10 6.293 6.293-1.415 1.414L0 9 8.707.293l1.415 1.414L3.829 8h14.586v2H3.829Z"
      fill="#fff"
    />
  </Svg>
);

export default SvgBackIcon;
