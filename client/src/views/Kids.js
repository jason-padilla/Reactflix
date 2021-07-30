import React, {useState, useEffect} from 'react';
import styles from '../styles/Kids.module.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer'
import Featured from '../components/Featured'
import axios from 'axios';

const Kids = () => {
  const [films, setFilms] = useState([])
  const [toShow, setToShow] = useState(false)
  const [clickedFilm, setClickedFilm] = useState({});

  useEffect(()=>{
    axios.get('http://localhost:5000/api/films/kids')
    .then(res=>{
      const result = res.data;
      result.sort( () => .5 - Math.random() );
      setFilms(result);
    })
    .catch(err=>{console.log(err)})
  },[])

  const filmClickHandler = (e) => {
    setToShow(true);
    setClickedFilm(e);
  }
  const closeInfoHandler = (e) => {
    setToShow(false);
  }

  return (
    <div className={styles.kidsBody}>
      <Navbar category="Kids"/>
      <Featured filmType="kids"/>
      <div className={styles.kidsContainer}>
        <h1 className={styles.kidsTitle}>Kids</h1>
        <div className={styles.kidsWrapper}>
          {films.map((film, idx)=>{
            return <div className={styles.filmBoxOutter} key={idx} onClick={()=>filmClickHandler(film)}>
                <div  className={styles.filmBox} >
                  <img src={window.location.origin+ "/img/"+film.imageName+".jpeg"} alt=""/>
                </div>
              </div>
            })
          }
        </div>
      </div>
      <div style={ toShow ? {display:"block"} : {display:"none"}}>
        <div className={styles.modalContainer} onClick={closeInfoHandler}>
          <div className={styles.modal}>
            <div className={styles.modalTop}>
              <img src={window.location.origin+ "/img/"+clickedFilm.imageName+".jpeg"} alt=""/>
              <svg onClick={closeInfoHandler} xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
              </svg>
            </div>
            <div className={styles.modalBottom}>
              <div className={styles.modalHeader}>
                <h1>{clickedFilm.title}</h1>
                <button className={styles.play}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"/>
                  </svg> Play
                </button>
              </div>
              <div className={styles.modalSmall}>
                <p>{clickedFilm.genre}</p>
                <p>{clickedFilm.duration}</p>
                <p>{clickedFilm.year}</p>
              </div>
              <div className={styles.modalDescription}>
                <h3>{clickedFilm.description}</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  )
}

export default Kids;