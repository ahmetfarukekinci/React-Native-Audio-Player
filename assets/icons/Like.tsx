import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";

const SvgLike = (props: SvgProps) => (
  <Svg
    width={17}
    height={17}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M.687 8.272c0-1.346.904-2.4 2.4-2.4h2.458l-.022-.061-.146-.386a91.85 91.85 0 0 1-.128-.338 12.576 12.576 0 0 1-.353-1.063c-.135-.493-.209-.936-.209-1.352 0-1.178.726-1.91 1.801-2.222.485-.141.907-.178 1.399-.178h.383l.24.299c.272.338.805.947 1.42 1.649 1.133 1.295 2.543 2.907 3.1 3.718a1.6 1.6 0 0 1 .457-.066h1.6a1.6 1.6 0 0 1 1.6 1.6v7.2a1.6 1.6 0 0 1-1.6 1.6h-1.6c-.55 0-1.035-.277-1.323-.7a3.912 3.912 0 0 1-.808.394 5.393 5.393 0 0 1-1.897.305H3.887c-2.204 0-3.2-3.245-3.2-8Zm10.13 6.187c.708-.253 1.07-.666 1.07-1.388V7.472a1.33 1.33 0 0 0-.114-.544c-.14-.327-1.408-1.774-2.61-3.145-.62-.708-1.223-1.396-1.644-1.9-.201.016-.39.047-.583.103-.459.133-.65.325-.65.686 0 .253.052.562.153.927.075.272.172.561.31.93l.12.316v.002l.155.41c.104.28.172.487.22.676.198.8-.001 1.539-.957 1.539h-3.2c-.553 0-.8.287-.8.8 0 3.832.788 6.4 1.6 6.4h5.63c.35.006.841-.049 1.3-.213Zm4.27.213v-7.2h-1.6v7.2h1.6Z"
      fill="#898F97"
    />
  </Svg>
);

export default SvgLike;
