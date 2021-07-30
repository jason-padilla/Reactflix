import React from 'react';
import styles from '../styles/Browse.module.css';
import Navbar from '../components/Navbar';
import Featured from '../components/Featured';
import GenreRow from '../components/GenreRow';
import Footer from '../components/Footer'

const Browse = () => {
  return (
    <div className={styles.home}>  
      <Navbar category="Browse" />
      <Featured filmType={"main"}/>
      <div className={styles.rowsContainer}>
        <GenreRow title="Trending"/>
        <GenreRow title="Action"/>
        <GenreRow title="Anime"/>
        <GenreRow title="Comedy"/>
        <GenreRow title="Children"/>
        <GenreRow title="Crime"/>
        <GenreRow title="Documentary"/>
        <GenreRow title="Drama"/>
        <GenreRow title="Horror"/>
        <GenreRow title="International"/>
        <GenreRow title="Thriller"/>
        <GenreRow title="Sci-Fi"/>
        <GenreRow title="Romance"/>
      </div>
      <Footer/>
    </div>
  )
}
export default Browse;