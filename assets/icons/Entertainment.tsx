import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";

const SvgEntertainment = (props: SvgProps) => (
  <Svg
    width={23}
    height={23}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M11.01 22.272c-6.076 0-11-4.925-11-11s4.924-11 11-11c6.075 0 11 4.925 11 11s-4.925 11-11 11Zm0-2a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm4.91-5.552-1.636-1.15a3.993 3.993 0 0 1-3.275 1.702c-1.319 0-2.529-.643-3.274-1.702l-1.636 1.15a5.993 5.993 0 0 0 4.91 2.552 5.993 5.993 0 0 0 4.911-2.552Zm-2.91-4.448v-2h2v2h-2Zm-6-2v2h2v-2h-2Z"
      fill="#fff"
    />
  </Svg>
);

export default SvgEntertainment;
