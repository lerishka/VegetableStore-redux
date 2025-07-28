import styles from "./QuantitySelector.module.scss";
import MinusButton from "../icons/MinusButton";
import PlusButton from "../icons/PlusButton";
import { useCart } from "../../context/CartContext";
import type { Good } from "../../types/good";

type QuantitySelectorProps = {
  id: number;
  good: Good;
};

const QuantitySelector = ({ id, good }: QuantitySelectorProps) => {
  const { cart, addToCart, removeFromCart } = useCart();

  const item = cart.find((item) => item.id === id);
  const quantity = item ? item.quantity : 0;

  return (
    <div className={styles.wrapper}>
      <MinusButton onClick={() => removeFromCart(id)} />
      <span>{quantity}</span>
      <PlusButton onClick={() => addToCart(good)} />
    </div>
  );
};

export default QuantitySelector;
