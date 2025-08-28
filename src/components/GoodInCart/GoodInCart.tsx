import styles from "./GoodInCart.module.scss";
import QuantitySelector from "../../ui/QuantitySelector/QuantitySelector";

type GoodInCartProps = {
  id: number;
  name: string;
  weight: string | null;
  price: number;
  image: string;
};

const GoodInCart = ({ id, name, weight, price, image }: GoodInCartProps) => {
  return (
    <div className={styles.good}>
      <div className={styles["image-wrapper"]}>
        <img className={styles.image} src={image} />
      </div>
      <div className={styles["good-info"]}>
        <div className={styles["good-name"]}>
          <div>{name}</div>
          <div className={styles.weight}>{weight}</div>
        </div>
        <div className={styles["good-price"]}>
          <div>$ {price}</div>
          <QuantitySelector id={id} />
        </div>
      </div>
    </div>
  );
};

export default GoodInCart;
