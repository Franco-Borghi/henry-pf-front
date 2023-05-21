import SearchBar from "../SearchBar/SearchBar";
import styles from "./NavBar.module.scss";
import logo from '../Footer/dinamo.png'
import { Link } from "react-router-dom";

export default function NavBar(props) {
  return (
    <nav className={styles['nav-bar-container']}>
      <div className={styles.ctnNavBar}>
        <img className={styles.logo} src={logo} alt="logo" />

        <SearchBar setSearchQuery={props.setSearchQuery}></SearchBar>


        <div className={styles.ctnIcons}>
        <Link to="/create">
          <div className={styles['icon-container']} >
            <button className={styles.btnIcon}>
              <ion-icon style={{ color: "#fff"}} className='svg' size="small" name="create-outline"></ion-icon>
            </button>
            <p className={styles.txtBtnIcons}>Add Product</p>
            </div>
            </Link>
          

        {/* <div className={styles.ctnIcons}>
          <div className={styles['icon-container']} >
            <button className={styles.btnIcon}>
              <ion-icon style={{ color: "#fff"}} className='svg' size="small" name="person-outline"></ion-icon>
            </button>
            <p className={styles.txtBtnIcons}>Profile</p>
          </div>

          <div className={styles['icon-container']} >
            <button className={styles.btnIcon}>
              <ion-icon style={{ color: "#fff"}} className='svg' size="small" name="cart-outline"></ion-icon>
            </button>
            <p className={styles.txtBtnIcons}>Cart</p>
          </div>

          <div className={styles['icon-container']} >
            <button className={styles.btnIcon}>
              <ion-icon style={{ color: "#fff"}} className='svg' size="small" name="person-outline"></ion-icon>
            </button>
            <p className={styles.txtBtnIcons}>Admin</p>
          </div> */}
        </div>
      </div>
    </nav>
  );
}
