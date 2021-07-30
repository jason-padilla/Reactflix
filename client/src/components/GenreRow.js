import React, {useRef, useState, useEffect} from 'react'
import axios from 'axios'
import styles from '../styles/GenreRow.module.css'
import FilmItem from '../components/FilmItem'

const GenreRow = (props) => {
  const listRef = useRef();
  const [sliderIdx, setSliderIdx] = useState(0);
  const [idxAtStart, setIdxAtStart] = useState(true);
  const [films, setFilms] = useState([])
  const [toShow, setToShow] = useState(false)
  const [clickedFilm, setClickedFilm] = useState({});

  useEffect(()=>{
    const genre = props.title
    if (genre === "Trending") {
      axios.get('http://localhost:5000/api/films/trending')
        .then(res=>{
          let result = res.data;
          result.sort( () => .5 - Math.random() );
          setFilms(result);
        })
        .catch(err=>{console.log(err)})
    }
    else {
      axios.get('http://localhost:5000/api/films/' + genre)
      .then(res=>{
        let result = res.data;
        result.sort( () => .5 - Math.random() );
        setFilms(result);
      })
      .catch(err=>{console.log(err)})
    }
  },[props.title])

  const getFilmItemWidth=() =>{
    const windowWidth = window.innerWidth;
    if(windowWidth >= 1000){ return 295;}
    else if((windowWidth >= 511) && (windowWidth < 1000)){return 225;}
    else if((windowWidth >= 400) && (windowWidth < 511)){return 150;}
    else return 120;
  }

  const getArrowWidth=() =>{
    const windowWidth = window.innerWidth;
    if(windowWidth >= 1000){ return 50;}
    else if((windowWidth >= 511) && (windowWidth < 1000)){return 30;}
    else return 20;
  }
  
  const handleArrowClick = (direction) => {
    const filmWidth = getFilmItemWidth();
    const arrowWidth = getArrowWidth();
    const ave = Math.floor(window.innerWidth/filmWidth);
    let distance = listRef.current.getBoundingClientRect().x - arrowWidth;

    if (direction === "left" && sliderIdx > 0){
      listRef.current.style.transform = `translate(${filmWidth + 10 + distance}px)`
      setSliderIdx(sliderIdx-1);
      if (sliderIdx === 1){setIdxAtStart(true)}
    }
    if (direction === "right" && (sliderIdx+ave) < 12) {
      setIdxAtStart(false)
      listRef.current.style.transform = `translate(${-(filmWidth + 10) + distance}px)`
      setSliderIdx(sliderIdx+1);
    }
  }

  const filmClickHandler = (e) => { setToShow(true); setClickedFilm(e); }
  const closeInfoHandler = (e) => { setToShow(false); }

  return ( 
    <div className={styles.genreRow}>
      <span className={styles.genreTitle}>{props.title}</span>
      <div className={styles.genreContainer}>
        <svg onClick={()=>handleArrowClick("left")} className={styles.leftArrow} style={{display: idxAtStart && "none"}}xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
          <path fillRule="evenodd" d="M9.224 1.553a.5.5 0 0 1 .223.67L6.56 8l2.888 5.776a.5.5 0 1 1-.894.448l-3-6a.5.5 0 0 1 0-.448l3-6a.5.5 0 0 1 .67-.223z"/>
        </svg>
        <div className={styles.genreFilms} ref={listRef}>
          {films.map((film, idx)=>{
              return <div key={idx} onClick={()=>filmClickHandler(film)}>
                  <FilmItem imageName={film.imageName}/>
              </div>
          })}
          {films.map((film, idx)=>{
              return <div key={idx} onClick={()=>filmClickHandler(film)}>
                  <FilmItem imageName={film.imageName}/>
              </div>
          })}
        </div>
        <svg onClick={()=>handleArrowClick("right")} className={styles.rightArrow} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
          <path fillRule="evenodd" d="M6.776 1.553a.5.5 0 0 1 .671.223l3 6a.5.5 0 0 1 0 .448l-3 6a.5.5 0 1 1-.894-.448L9.44 8 6.553 2.224a.5.5 0 0 1 .223-.671z"/>
        </svg>
      </div>
      <div style={ toShow ? {display:"block"} : {display:"none"}} >
        <div className={styles.clickedInfo}>
          <div className={styles.clickedInfoContainer}>
          <div className={styles.infoLeft}>
            <div className={styles.infoLeftHeader}>
              <h1>{clickedFilm.title}</h1>
              <button className={styles.play}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"/>
                </svg> Play
              </button>
            </div>
            <div className={styles.descriptionSmall}>
              <p>{clickedFilm.genre}</p>
              <p>{clickedFilm.duration}</p>
              <p>{clickedFilm.year}</p>
            </div>
            <div className={styles.descriptionBox}>
              <h3>{clickedFilm.description}</h3>
            </div>
          </div>
          <div className={styles.infoRight}>
            <img src={window.location.origin+ "/img/"+clickedFilm.imageName+".jpeg"} alt=""/>
            <svg onClick={closeInfoHandler} xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
              <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
            </svg>
          </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GenreRow;