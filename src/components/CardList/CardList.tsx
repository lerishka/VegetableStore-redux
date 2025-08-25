import styles from "./CardList.module.scss";
import GoodCard from "../GoodCard/GoodCard";
import { useEffect } from "react";
import { useTypedDispatch, useTypedSelector } from "../../hooks/redux";
import { fetchGoods } from "../../store/cartSlice";
import loading from "../../assets/loading.svg";

const CardList = () => {
  const dispatch = useTypedDispatch();
  const goods = useTypedSelector((state) => state.cart.goods);
  const status = useTypedSelector((state) => state.cart.status);
  const error = useTypedSelector((state) => state.cart.error);

  useEffect(() => {
    dispatch(fetchGoods());
  }, []);

  useEffect(() => {
    console.log(goods);
  }, [goods]);

  return (
    <ul className={styles.wrapper}>
      {status === "loading" &&
        Array.from({ length: 8 }).map((_, i) => (
          <li key={i}>
            <GoodCard id={i} fullName={""} price={0} image={loading} />
          </li>
        ))}

      {status === "resolved" &&
        goods.map((good) => (
          <li key={good.id}>
            <GoodCard
              id={good.id}
              fullName={good.name}
              price={good.price}
              image={good.image}
            />
          </li>
        ))}

      {status === "rejected" && <p style={{ color: "red" }}>Ошибка: {error}</p>}
    </ul>
  );
};

export default CardList;
