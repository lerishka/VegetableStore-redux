import styles from "./GoodCard.module.scss";
import { Button } from "@mantine/core";
import CartIcon from "../../ui/icons/CartIcon";
import QuantitySelectorInCard from "../../ui/QuantitySelectorInCard/QuantitySelectorInCard";
import { useCart } from "../../context/CartContext";
import { useEffect, useState } from "react";

type GoodCardProps = {
  id: number;
  fullName: string;
  price: number;
  image: string;
};

const GoodCard = ({ id, fullName, price, image }: GoodCardProps) => {
  const { addToCart, removeFromCart, getQuantityById } = useCart();
  const currentQuantity = getQuantityById(id);
  const [localQuantity, setLocalQuantity] = useState(currentQuantity || 1);

  const handleDecrement = () => {
    if (currentQuantity > 0) {
      removeFromCart(id);
    } else {
      setLocalQuantity((prev) => Math.max(1, prev - 1));
    }
  };

  const handleIncrement = () => {
    if (currentQuantity > 0) {
      addToCart({ id, name, weight, price, image }, 1);
    } else {
      setLocalQuantity((prev) => prev + 1);
    }
  };

  useEffect(() => {
    setLocalQuantity(currentQuantity || 1);
  }, [currentQuantity]);

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
              quantity={currentQuantity > 0 ? currentQuantity : localQuantity}
              setQuantity={setLocalQuantity}
              isInCart={currentQuantity > 0}
              onDecrement={handleDecrement}
              onIncrement={handleIncrement}
            />
          </section>
          <section className={styles["card-line"]}>
            <div className={styles.price}>$ {price}</div>
            <Button
              className={styles.button}
              radius={8}
              color="greenCustom"
              onClick={() =>
                addToCart({ id, name, weight, price, image }, localQuantity)
              }
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
