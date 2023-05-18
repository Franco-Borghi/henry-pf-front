import styles from "./NavBar.module.css";

import { Button, TextField } from "@mui/material";

export default function NavBar() {
  return (
    <div className={styles.ctnNavBar}>
      <img className={styles.logo} src={"./Logho-Mi-moto.png"} alt="logo" />

      <div className={styles.ctnInput}>
        <TextField
          className={styles.inputSearch}
          size="small"
          fullWidth
          placeholder="Search"
        />
        <Button variant="contained" className={styles.btnIconSearch}>
          <ion-icon size="small" name="search-outline"></ion-icon>
        </Button>
      </div>

      <div className={styles.ctnIcons}>
        <div>
          <Button variant="contained" className={styles.btnIcon}>
            <ion-icon size="small" name="person-outline"></ion-icon>
          </Button>
          <p className={styles.txtBtnIcons}>Profile</p>
        </div>

        <div>
          <Button variant="contained" className={styles.btnIcon}>
            <ion-icon size="small" name="cart-outline"></ion-icon>
          </Button>
          <p className={styles.txtBtnIcons}>Cart</p>
        </div>

        <div>
          <Button variant="contained" className={styles.btnIcon}>
            <ion-icon size="small" name="person-outline"></ion-icon>
          </Button>
          <p className={styles.txtBtnIcons}>Admin</p>
        </div>
      </div>
    </div>
  );
}
