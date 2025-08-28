import styles from "./GoodCard.module.scss";
import { Button } from "@mantine/core";
import CartIcon from "../../assets/icons/CartIcon";
import { useEffect, useState } from "react";
import QuantitySelectorInCard from "../../ui/QuantitySelectorInCard/QuantitySelectorInCard";
import {
  addGood,
  incrementQuantity,
  decrementQuantity,
} from "../../store/cartSlice";
import { useTypedDispatch, useTypedSelector } from "../../hooks/redux";

type GoodCardProps = {
  id: number;
  fullName: string;
  price: number;
  image: string;
};

const GoodCard = ({ id, fullName, price, image }: GoodCardProps) => {
  const dispatch = useTypedDispatch();
  const currentQuantities = useTypedSelector((state) => state.cart.quantities);
  const [localQuantity, setLocalQuantity] = useState(1);

  const inCart = currentQuantities[id] !== undefined;

  useEffect(() => {
    if (!inCart) {
      setLocalQuantity(1);
    }
  }, [inCart]);

  const parseNameAndWeight = (fullName: string) => {
    if (fullName.includes(" - ")) {
      const [name, weight] = fullName.split(" - ");
      return {
        name: name.trim(),
        weight: weight.trim(),
      };
    }
    return {
      name: fullName.trim(),
      weight: null,
    };
  };

  const { name, weight } = parseNameAndWeight(fullName);

  const handleAddToCard = () => {
    dispatch(
      addGood({
        good: { id, name, weight, price, image },
        quantity: localQuantity,
      })
    );
  };

  const handleIncrementLocal = () => setLocalQuantity((prev) => prev + 1);
  const handleDecrementLocal = () =>
    setLocalQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const handleIncrementCart = () => {
    dispatch(incrementQuantity({ id }));
  };

  const handleDecrementCart = () => {
    dispatch(decrementQuantity({ id }));
  };

  const quantity = currentQuantities[id];

  const isPlaceholder = price === 0;

  return (
    <div className={styles.card}>
      <section>
        <img className={styles.image} src={image} />
      </section>

      {!isPlaceholder && (
        <>
          <section className={styles["card-line"]}>
            <section className={styles["product-info"]}>
              <div className={styles["good-name"]}>{name}</div>
              <div className={styles.weight}>{weight}</div>
            </section>
            <QuantitySelectorInCard
              quantity={inCart ? quantity : localQuantity}
              isInCart={!!quantity}
              onIncrement={inCart ? handleIncrementCart : handleIncrementLocal}
              onDecrement={inCart ? handleDecrementCart : handleDecrementLocal}
            />
          </section>
          <section className={styles["card-line"]}>
            <div className={styles.price}>$ {price}</div>
            <Button
              className={styles.button}
              radius={8}
              color="greenCustom"
              onClick={handleAddToCard}
              style={{ backgroundColor: "#E7FAEB" }}
            >
              <span className={styles["label-wrapper"]}>
                <span style={{ color: "#3B944E" }}>Add to cart</span>
                <CartIcon style={{ color: "#3B944E" }} />
              </span>
            </Button>
          </section>
        </>
      )}
    </div>
  );
};

export default GoodCard;
