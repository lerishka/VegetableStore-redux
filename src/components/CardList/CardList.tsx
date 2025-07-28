import styles from "./CardList.module.scss";
import GoodCard from "../GoodCard/GoodCard";
import { useEffect, useState } from "react";
import type { Good } from "../../types/good";
import loading from "../../assets/loading.svg";

const CardList = () => {
  const [goods, setGoods] = useState<Good[]>([]);
  const [error, setError] = useState<Error | null>(null);

  async function getGoods() {
    try {
      const response = await fetch(
        "https://res.cloudinary.com/sivadass/raw/upload/v1535817394/json/products.json"
      );
      const goodsArray = await response.json();
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      setGoods(goodsArray);
    } catch (e: unknown) {
      if (e instanceof Error) {
        setError(e);
      }
    }
  }

  useEffect(() => {
    getGoods();
  }, []);

  useEffect(() => {
    console.log(goods);
  }, [goods]);

  return (
    <ul className={styles.wrapper}>
      {goods?.length
        ? goods.map((good) => {
            return (
              <li>
                <GoodCard
                  key={good.id}
                  id={good.id}
                  fullName={good.name}
                  price={good.price}
                  image={good.image}
                />
              </li>
            );
          })
        : Array.from({ length: 8 }).map((_, i) => (
            <GoodCard key={i} id={i} fullName={""} price={0} image={loading} />
          ))}
    </ul>
  );
};

export default CardList;
