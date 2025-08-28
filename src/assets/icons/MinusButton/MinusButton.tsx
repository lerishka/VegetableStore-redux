import type { ButtonHTMLAttributes, FC } from "react";
import MinusButtonSVG from "../../../assets/icons/Minus-button 13.10.46.svg?react";
import styles from "./MinusButton.module.scss";

type IconButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

const MinusButton: FC<IconButtonProps> = (props) => {
  return (
    <button type="button" className={styles.iconButton} {...props}>
      <MinusButtonSVG />
    </button>
  );
};

export default MinusButton;
