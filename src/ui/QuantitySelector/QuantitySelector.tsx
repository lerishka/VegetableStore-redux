import styles from "./QuantitySelector.module.scss";
import MinusButton from "../icons/MinusButton";
import PlusButton from "../icons/PlusButton";
import { incrementQuantity, decrementQuantity } from "../../store/cartSlice";
import { useTypedSelector, useTypedDispatch } from "../../hooks/redux";

type QuantitySelectorProps = {
  id: number;
};

const QuantitySelector = ({ id }: QuantitySelectorProps) => {
  const currentQuantities = useTypedSelector((state) => state.cart.quantities);
  const dispatch = useTypedDispatch();

  const quantity = currentQuantities[id] || 1;

  return (
    <div className={styles.wrapper}>
      <MinusButton onClick={() => dispatch(decrementQuantity({ id }))} />
      <span>{quantity}</span>
      <PlusButton onClick={() => dispatch(incrementQuantity({ id }))} />
    </div>
  );
};

export default QuantitySelector;
