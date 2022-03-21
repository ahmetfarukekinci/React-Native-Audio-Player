import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";

const SvgSearch = (props: SvgProps) => (
  <Svg
    width={20}
    height={20}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M8.119 16.238a8.119 8.119 0 1 1 6.414-3.14L20 18.564 18.565 20l-5.468-5.467a8.084 8.084 0 0 1-4.978 1.705Zm6.09-8.12a6.09 6.09 0 1 1-12.18.001 6.09 6.09 0 0 1 12.18 0Z"
      fill="#898F97"
    />
  </Svg>
);

export default SvgSearch;
