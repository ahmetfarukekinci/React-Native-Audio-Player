import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";

const SvgShape = (props: SvgProps) => (
  <Svg
    width={16}
    height={19}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M1.5 17.415V1.585c0-.024.005-.032.007-.035a.105.105 0 0 1 .039-.034.124.124 0 0 1 .058-.016.1.1 0 0 1 .055.019l12.8 7.915c.024.015.03.026.033.03.004.007.008.02.008.036a.077.077 0 0 1-.008.036c-.002.004-.009.015-.033.03l-12.8 7.915a.1.1 0 0 1-.055.019.125.125 0 0 1-.058-.016.105.105 0 0 1-.039-.034c-.002-.003-.007-.01-.007-.035Z"
      stroke="#fff"
      strokeWidth={3}
    />
  </Svg>
);

export default SvgShape;
