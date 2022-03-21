import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";

const SvgSecur = (props: SvgProps) => (
  <Svg
    width={14}
    height={14}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M4.333 5A4.667 4.667 0 1 1 9 9.667H7.667V11H6.333v1.333H5v1.334H.333v-3.61L4.432 5.96A4.684 4.684 0 0 1 4.333 5Zm2 3.333H9A3.333 3.333 0 1 0 5.81 5.97l.115.382-4.258 4.259v1.723h2V11H5V9.667h1.333V8.333ZM7.667 5a1.333 1.333 0 1 0 2.666 0 1.333 1.333 0 0 0-2.666 0Z"
      fill="#898F97"
    />
  </Svg>
);

export default SvgSecur;
