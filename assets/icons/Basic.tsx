import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";

const SvgBasic = (props: SvgProps) => (
  <Svg
    width={16}
    height={12}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M2 0h12c.736 0 1.333.597 1.333 1.333v9.334c0 .736-.597 1.333-1.333 1.333H2a1.333 1.333 0 0 1-1.333-1.333V1.333C.667.597 1.264 0 2 0Zm0 4.412v6.255h12V4.412l-6 3-6-3Zm0-1.49 6 3 6-3V1.333H2v1.588Z"
      fill="#898F97"
    />
  </Svg>
);

export default SvgBasic;
