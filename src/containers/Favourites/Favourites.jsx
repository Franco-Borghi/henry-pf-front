import React from 'react';
import styles from './Favourites.module.scss';
import { useSelector } from 'react-redux';
import { FavouriteCard } from '../../components/FavouriteCard/FavouriteCard';
import { Link } from 'react-router-dom';

export const Favourites = () => {

  const favourites = useSelector(state => state.favourites);

  return (
    <div style={{ justifyContent: favourites && favourites.length ? "" : "center"}} className={styles.container}>
      {
        favourites && favourites.length
        ? <>
            <h1>FAVOURITES</h1>
            <div className={styles['grid-container']}>
              {
                favourites && favourites.length 

                ? favourites.map((el, i) => (
                  <div key={i} className={styles['grid-item']}>
                    <FavouriteCard 
                    data = { el }
                    />
                  </div>
                ))

                : null
              }
            </div>
          </>
        : <div className={styles['no-favs-section']}>
            <h4>No Favorites Yet!</h4>
            <p>Explore our collection of motorcycles and save your favorites for easy access later.</p>
            <Link to='/'>Explore</Link>
          </div>
      }
    </div>
  )
}
