import styles from "./App.module.scss";
import Header from "../components/Header/Header";
import Catalog from "../components/Catalog/Catalog";

function App() {
  return (
    <>
      <div className={styles["header__container"]}>
        <Header />
      </div>
      <Catalog />
    </>
  );
}

export default App;
