import type { ButtonHTMLAttributes, FC } from "react";
import PlusButtonSVG from "../../../assets/icons/Plus-button 13.10.46.svg?react";
import styles from "./PlusButton.module.scss";

type IconButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

const MinusButton: FC<IconButtonProps> = (props) => {
  return (
    <button type="button" className={styles.iconButton} {...props}>
      <PlusButtonSVG />
    </button>
  );
};

export default MinusButton;
