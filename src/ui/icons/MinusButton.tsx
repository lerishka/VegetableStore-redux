import type { FC } from "react";
import MinusButtonSVG from "../../assets/icons/Minus-button 13.10.46.svg?react";

const MinusButton: FC<React.SVGProps<SVGSVGElement>> = (props) => {
  return <MinusButtonSVG {...props} />;
};

export default MinusButton;
