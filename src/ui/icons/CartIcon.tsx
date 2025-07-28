import type { FC } from "react";
import CartSVG from "../../assets/icons/CartIcon.svg?react";

const CartIcon: FC<React.SVGProps<SVGSVGElement>> = (props) => {
  return <CartSVG {...props} />;
};

export default CartIcon;
