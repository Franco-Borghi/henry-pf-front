import React from "react";
import SearchBar from "../SearchBar/SearchBar";
import styles from "./NavBar.module.scss";
import logo from '../Footer/dinamo.png'
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { changeFilterBrand, changeFilterCategory, fetchDataByName } from "../../redux/actions";
import { useRef } from "react";
import { LoginBtn } from "../LoginBtn/LoginBtn";
import { LogoutBtn } from "../LogoutBtn/LogoutBtn";
import { useAuth0 } from "@auth0/auth0-react";

export default function NavBar(props) {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const searchInput = useRef(null);
  const categoriesFilter = useSelector(state => state.filterCategory);
  const brandsFilter = useSelector(state => state.filterBrand);
  const shoppingCart = useSelector(state => state.shoppingCart);
  const reduxUser = useSelector(state => state.user);
  const { isAuthenticated, user } = useAuth0();
  const [cartItems, setCartItems] = React.useState(0);
  const [dropdownActive, setDropdownActive] = React.useState(false);

  function onClickLogo (){
    navigate('/')
    // fetchDataByName(dispatch, "");
    // searchInput.current.value = "";
    // categoriesFilter.forEach(c => dispatch(changeFilterCategory(c)))
    // brandsFilter.forEach(b => dispatch(changeFilterBrand(b)))
  }

  React.useEffect(() => {
    if (shoppingCart.length) {
      let counter = 0;
      shoppingCart.forEach(el => {
        counter = counter + el.quantity
      });
      setCartItems(counter);
    }
  }, [shoppingCart])

  React.useEffect(() => {
    if (isAuthenticated) {
    }
  }, [isAuthenticated])

  return (
    <>
      <nav className={styles['nav-bar-container']}>
        <div className={styles.ctnNavBar}>
          <img onClick={onClickLogo} className={styles.logo} src={logo} alt="logo" />

          <SearchBar setSearchQuery={props.setSearchQuery} searchInput={searchInput}></SearchBar>

          <div className={styles.ctnIcons}>
            <div className={styles.ctnIcons}>

              <Link to={"/"}>
                <div className={styles['icon-container']} >
                  <button className={styles.btnIcon}>
                    <ion-icon style={{ color: "#fff"}} className='svg' size="small" name="home"></ion-icon>
                  </button>
                  <p className={styles.txtBtnIcons}>Home</p>

                </div> 
              </Link>

            {
              isAuthenticated  && reduxUser && reduxUser.role === 'client' && 
                <Link to="/favourites">
                  <div className={styles['icon-container']} >
                    <button className={styles.btnIcon}>
                      <ion-icon style={{ color: "#fff"}} className='svg' size="small" name="heart-circle-sharp"></ion-icon>
                    </button>
                    <p className={styles.txtBtnIcons}>Favourites</p>
                  </div>
                </Link>
            }

            {
              isAuthenticated  && reduxUser && reduxUser.role === 'client'
              &&  <Link to="/shopping-cart">
                      <div className={styles['icon-container']} >
                        {
                          shoppingCart.length
                          ? <div className={styles.itemsNumber}>{cartItems}</div>
                          : null
                        }
                        <button className={styles.btnIcon} data-testid="cartButton">
                          <ion-icon style={{ color: "#fff"}} className='svg' size="small" name="cart-outline"></ion-icon>
                        </button>
                        <p className={styles.txtBtnIcons}>Cart</p>
                      </div>
                  </Link>
            }

            
               

          

              {
                isAuthenticated  && reduxUser && reduxUser.role === 'admin'
                &&  <Link to={"/admin"}>
                      <div className={styles['icon-container']} >
                        <button className={styles.btnIcon}>
                          <ion-icon style={{ color: "#fff"}} className='svg' size="small" name="person-outline"></ion-icon>
                        </button>
                        <p className={styles.txtBtnIcons}>Admin</p>

                      </div> 
                    </Link>
              }

              <div className={styles['icon-container']} >
                {
                  isAuthenticated && reduxUser  && reduxUser.role === 'client'
                  ? <>
                      <Link to={`/profile`}>
                        {/* <div style={{height: '40px', width: '40px', borderRadius: '50%', cursor: 'pointer',backgroundColor: '#c7c7c7', backgroundImage: user && `url('${user.picture}')`, backgroundSize: 'cover', backgroundPosition: 'center'}}></div> */}
                        <img style={{height: '40px', width: '40px', borderRadius: '50%', cursor: 'pointer', backgroundColor: '#c7c7c7'}} src={user && user.picture} />
                        <p className={styles.txtBtnIcons}>Profile</p>
                      </Link>
                    </>
                  : <div style={{height: '40px', width: '40px'}} />
                }
              </div>

              <div className={styles['icon-container']} >
                <button className={styles.btnIcon} aria-label="logout/in" style={{ width: 'fit-content', paddingLeft: '10px', paddingRight: '10px', color: '#fff'}}>
                  {
                    isAuthenticated 
                    ? <LogoutBtn />
                    : <LoginBtn />
                  }
                </button>
              </div> 
                  
            </div>
          </div>
        </div>
      </nav>

      <nav className={styles['nav-bar-container-mobile']}>
        <div className={styles['mobile-container']}>
          <img onClick={onClickLogo} className={styles.logo} src={logo} alt="logo" />
          <div className={styles['dropdown-container']}>
            {
              isAuthenticated && reduxUser  
              ? <>
                  <Link className={styles["logo-link"]} to={`/profile`}>
                    {/* <div style={{height: '40px', width: '40px', borderRadius: '50%', cursor: 'pointer',backgroundColor: '#c7c7c7', backgroundImage: user && `url('${user.picture}')`, backgroundSize: 'cover', backgroundPosition: 'center'}}></div> */}
                    <img style={{height: '100%', aspectRatio: '1 / 1', borderRadius: '50%', cursor: 'pointer', backgroundColor: '#c7c7c7'}} src={user && user.picture} />
                  </Link>
                </>
              : null
            }

            <ion-icon onClick={() => setDropdownActive(!dropdownActive)} style={{ color: '#fff', fontSize: '25px', cursor: 'pointer'}} name="menu"></ion-icon>    
          </div>
        </div>
        {
          dropdownActive
          ? <div className={styles['dropdown-content']}>
              <div className={styles['searchbar-div']}>
                <SearchBar setSearchQuery={props.setSearchQuery} searchInput={searchInput} setDropdownActive={setDropdownActive}></SearchBar>
              </div>
              <div className={styles['items']}>
                <div onClick={() => {navigate('/'); setDropdownActive(false)}} style={{ display: 'flex', alignItems: 'center', gap: '10px'}}>                    
                  <ion-icon style={{ color: "#fff"}} className='svg' size="small" name="home"></ion-icon>
                  Home
                </div>
                {
                  isAuthenticated
                  ? <>
                      {
                        isAuthenticated  && reduxUser && reduxUser.role !== 'admin'
                        ? <>
                            <div onClick={() => {navigate('/favourites'); setDropdownActive(false)}} style={{ display: 'flex', alignItems: 'center', gap: '10px'}}>
                              <ion-icon style={{ color: "#fff"}} className='svg' size="small" name="heart-circle-sharp"></ion-icon>
                              Favourites
                            </div>
                            <div onClick={() => {navigate('/shopping-cart'); setDropdownActive(false)}} style={{ display: 'flex', alignItems: 'center', gap: '10px'}}>
                              <ion-icon style={{ color: "#fff"}} className='svg' size="small" name="cart-outline"></ion-icon>
                              Cart
                            </div>
                          </>
                        : <div onClick={() => {navigate('/admin'); setDropdownActive(false)}} style={{ display: 'flex', alignItems: 'center', gap: '10px'}}>
                            <ion-icon style={{ color: "#fff"}} className='svg' size="small" name="person-outline"></ion-icon>
                            Admin
                          </div>
                      }
                      <div onClick={() => {navigate('/profile'); setDropdownActive(false)}} style={{ display: 'flex', alignItems: 'center', gap: '10px'}}>
                        <ion-icon style={{ color: "#fff"}} className='svg' size="small" name="person-circle"></ion-icon>
                        Profile
                      </div>
                    </>
                  : null
                }
                {
                  isAuthenticated 
                  ? <div className={styles['logout']}>
                      <LogoutBtn />
                    </div>
                  : <div className={styles['login']}>
                      <LoginBtn />
                    </div>
                }
              </div>
            </div>
          : null
        }
      </nav>
    </>
  );
}

