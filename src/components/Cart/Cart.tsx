import styles from "./Cart.module.scss";
import GoodInCart from "../GoodInCart/GoodInCart";
import { useTypedSelector } from "../../hooks/redux";
import emptyCart from "../../assets/emptyСart.svg";

const Cart = () => {
  const cart = useTypedSelector((state) => state.cart.cart);
  const total = useTypedSelector((state) => state.cart.totalPrice);

  return cart?.length ? (
    <div className={styles.wrapper} data-testid="cart">
      <div
        className={`${styles.cartList} ${
          cart.length > 4 ? styles.scrollable : ""
        }`}
      >
        {cart.map((good) => {
          return (
            <GoodInCart
              key={good.id}
              id={good.id}
              name={good.name}
              weight={good.weight}
              price={good.price}
              image={good.image}
            />
          );
        })}
      </div>
      <div className={styles.total}>
        <div>Total</div>
        <div>$ {total}</div>
      </div>
    </div>
  ) : (
    <div className={styles.empty}>
      <img src={emptyCart} alt="Empty cart" />
      <span className={styles["cart-text"]}>You cart is empty!</span>
    </div>
  );
};

export default Cart;
