import styles from "./QuantitySelectorInCard.module.scss";
import MinusButton from "../icons/MinusButton";
import PlusButton from "../icons/PlusButton";

type QuantitySelectorInCardProps = {
  quantity: number;
  setQuantity: (value: number) => void;
  isInCart: boolean;
  onDecrement: () => void;
  onIncrement: () => void;
};

const QuantitySelectorInCard = ({
  quantity,
  onDecrement,
  onIncrement,
}: QuantitySelectorInCardProps) => {
  return (
    <div className={styles.wrapper}>
      <MinusButton
        onClick={onDecrement}
        // disabled={!isInCart && quantity <= 1}
      />
      <span>{quantity}</span>
      <PlusButton onClick={onIncrement} />
    </div>
  );
};

export default QuantitySelectorInCard;
