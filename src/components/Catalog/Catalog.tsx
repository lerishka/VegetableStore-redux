import CardList from "../CardList/CardList";
import styles from "./Catalog.module.scss";

const Catalog = () => {
  return (
    <div className={styles["catalog-container"]}>
      <h1>Catalog</h1>
      <CardList />
    </div>
  );
};

export default Catalog;
