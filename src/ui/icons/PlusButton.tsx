import type { FC } from "react";
import PlusButton from "../../assets/icons/Plus-button 13.10.46.svg?react";

const MinusButton: FC<React.SVGProps<SVGSVGElement>> = (props) => {
  return <PlusButton {...props} />;
};

export default MinusButton;
