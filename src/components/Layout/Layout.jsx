import React from 'react';
import styles from './Layout.module.scss'
import NavBar from '../NavBar/NavBar';
import Footer from '../Footer/Footer';
import { Outlet } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

export function Layout() {

  const location = useLocation();

  React.useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  return (
    <>
      <NavBar />
      <div className={styles.layout}>
        <Outlet />
      </div>
      <Footer />
    </>
  )
}
