import logo from "../../assets/logo.svg";
import styles from "./Header.module.scss";
import { Button } from "@mantine/core";
import CartIcon from "../../ui/icons/CartIcon";
import { useState } from "react";
import Cart from "../Cart/Cart";
import { useCart } from "../../context/CartContext";

const Header = () => {
  let [cartOpen, setcartOpen] = useState<Boolean>(false);
  const { cart } = useCart();

  return (
    <header>
      <a href="/">
        <img src={logo} className="logo" alt="Vegetable shop logo" />
      </a>
      <Button
        radius={8}
        color="greenCustom"
        onClick={() => setcartOpen((prev) => !prev)}
      >
        <span className={styles["label-wrapper"]}>
          <div className={cart?.length > 0 ? styles.quantity : styles.none}>
            {cart.length}
          </div>
          <span style={{ color: "#fff" }}>Cart</span>
          <CartIcon />
        </span>
      </Button>

      {cartOpen && (
        <div
          data-testid="cart-region-in-header"
          className={`${styles["opened-cart"]} ${
            cart.length === 0 ? styles.empty : ""
          }`}
        >
          <Cart />
        </div>
      )}
    </header>
  );
};

export default Header;
