import React, { useState, useEffect } from 'react';
import styles from '../styles/Featured.module.css';
import axios from 'axios';

const Featured = (props) => {
  const {filmType} = props;
  const [featuredInfo, setFeaturedInfo] = useState({});
  const [Background, setBackground] = useState({});
  const [showModal, setShowModal] = useState(false);

  useEffect(()=>{
    axios.get('http://localhost:5000/api/featured/'+filmType)
      .then(res=>{
        let result = res.data[0];
        setBackground({
          background: "linear-gradient(rgba(0, 0, 0, 0) 70%, rgb(0, 0, 0) 95%),url("+ window.location.origin + "/img/"+result.imageName +".webp)",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "top center"
        })
        setFeaturedInfo(result)
      })
      .catch(err=>{console.log(err)})
  },[filmType])

  const showModalHandler = () => {
    setShowModal(true);
  }  
  const closeInfoHandler = (e) => {
    setShowModal(false);
  }
  return (
    <div style={Background} className={styles.featured}>
      <div className={styles.info}>
        <img src={window.location.origin + "/img/"+featuredInfo.smallImage+".webp"} alt=""/>
        <span className={styles.desc}>
          {featuredInfo.description}
        </span>
        <div className={styles.buttons}>
          <button className={styles.play}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"/>
            </svg>
            Play
          </button>
          <button className={styles.details} onClick={showModalHandler}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
              <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
            </svg>
            More Info
          </button>
        </div>
      </div>
      <div style={ showModal ? {display:"block"} : {display:"none"}}>
        <div className={styles.modalContainer} onClick={closeInfoHandler}>
          <div className={styles.modal}>
            <div className={styles.modalTop}>
              <img src={window.location.origin+ "/img/"+featuredInfo.imageName+".webp"} alt=""/>
              <svg onClick={closeInfoHandler} xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
              </svg>
            </div>
            <div className={styles.modalBottom}>
              <div className={styles.modalHeader}>
                <h1>{featuredInfo.title}</h1>
                <button className={styles.play}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"/>
                  </svg> Play
                </button>
              </div>
              <div className={styles.modalSmall}>
                <p>{featuredInfo.genre}</p>
                <p>{featuredInfo.duration}</p>
                <p>{featuredInfo.year}</p>
              </div>
              <div className={styles.modalDescription}>
                <h3>{featuredInfo.description}</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>  
  )
}

export default Featured;