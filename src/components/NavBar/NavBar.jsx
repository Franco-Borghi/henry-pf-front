import styles from "./NavBar.module.css";

export default function NavBar() {
  return (
    <div className={styles.ctnNavBar}>
      <img className={styles.logo} src={"./Logho-Mi-moto.png"} alt="logo" />

      <div className={styles.ctnInput}>
        <input
          className={styles.inputSearch}
          size="small"
          fullWidth
          placeholder="Search"
        />
        <button className={styles.btnIconSearch}>
          <ion-icon size="small" name="search-outline"></ion-icon>
        </button>
      </div>

      <div className={styles.ctnIcons}>
        <div>
          <button className={styles.btnIcon}>
            <ion-icon size="small" name="person-outline"></ion-icon>
          </button>
          <p className={styles.txtBtnIcons}>Profile</p>
        </div>

        <div>
          <button className={styles.btnIcon}>
            <ion-icon size="small" name="cart-outline"></ion-icon>
          </button>
          <p className={styles.txtBtnIcons}>Cart</p>
        </div>

        <div>
          <button className={styles.btnIcon}>
            <ion-icon size="small" name="person-outline"></ion-icon>
          </button>
          <p className={styles.txtBtnIcons}>Admin</p>
        </div>
      </div>
    </div>
  );
}
