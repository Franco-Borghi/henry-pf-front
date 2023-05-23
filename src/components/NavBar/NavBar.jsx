import React from "react";
import SearchBar from "../SearchBar/SearchBar";
import styles from "./NavBar.module.scss";
import logo from '../Footer/dinamo.png'
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { changeFilterBrand, changeFilterCategory, fetchDataByName } from "../../redux/actions";
import { useRef } from "react";

export default function NavBar(props) {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const searchInput = useRef(null);
  const categoriesFilter = useSelector(state => state.filterCategory)
  const brandsFilter = useSelector(state => state.filterBrand)
  const activeSearch = useSelector(state => state.activeSearch)

  function onClickLogo (){
    navigate('/')
    fetchDataByName(dispatch, "");
    searchInput.current.value = "";
    categoriesFilter.forEach(c => dispatch(changeFilterCategory(c)))
    brandsFilter.forEach(b => dispatch(changeFilterBrand(b)))
  }

  React.useEffect(() => {
    if (activeSearch) {
      document.getElementById('searchbar-input').value = activeSearch;
    }
  }, [])

  return (
    <nav className={styles['nav-bar-container']}>
      <div className={styles.ctnNavBar}>
        <img onClick={onClickLogo} className={styles.logo} src={logo} alt="logo" />

        <SearchBar setSearchQuery={props.setSearchQuery} searchInput={searchInput}></SearchBar>


        <div className={styles.ctnIcons}>
        <Link to="/create">
          <div className={styles['icon-container']} >
            <button className={styles.btnIcon}>
              <ion-icon style={{ color: "#fff"}} className='svg' size="small" name="create-outline"></ion-icon>
            </button>
            <p className={styles.txtBtnIcons}>Add Product</p>
            </div>
            </Link>
          

         <div className={styles.ctnIcons}>
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

          </div> 

        </div>

      </div>
      </div>
    </nav>
  );
}

