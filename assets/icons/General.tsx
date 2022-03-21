import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";

const SvgGeneral = (props: SvgProps) => (
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
      d="M22.01 11.272c0-6.075-4.925-11-11-11-6.076 0-11 4.925-11 11s4.924 11 11 11c6.075 0 11-4.925 11-11Zm-20 0c0-3.788 2.34-7.03 5.654-8.358-1.049 2.025-1.655 5.03-1.655 8.358 0 3.328.606 6.333 1.655 8.358a9.003 9.003 0 0 1-5.655-8.358Zm14 0c0 3.328-.606 6.333-1.655 8.358a9.003 9.003 0 0 0 0-16.716c1.049 2.025 1.654 5.03 1.654 8.358Zm-8 0c0-5.016 1.593-9 3-9 1.406 0 3 3.984 3 9s-1.594 9-3 9c-1.407 0-3-3.984-3-9Z"
      fill="#fff"
    />
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="m20.072 9.923 1.874.698c-.741 1.99-5.623 3.65-10.937 3.65-5.723 0-10.275-1.429-10.958-3.713l1.917-.572c.116.388.982.972 2.45 1.433 1.726.542 4.033.853 6.591.853 4.548 0 8.716-1.419 9.063-2.35Z"
      fill="#fff"
    />
  </Svg>
);

export default SvgGeneral;
