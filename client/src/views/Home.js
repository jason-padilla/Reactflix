import React, {useState, useEffect} from 'react'
import {Link, navigate} from '@reach/router'
import axios from 'axios'
import styles from '../styles/Homepage.module.css'
import Footer from '../components/Footer'

const Homepage = () => {
  const Background = window.location.origin + "/background.jpg";
  const [email, setEmail] = useState("");

  useEffect(()=>{
    axios.get('http://localhost:5000/api/status',{ withCredentials: true })
      .then(res=> {
        if (res.data.verified === "Approved")
          navigate("/browse");
      })
      .catch(err=>{console.log(err.response)})
  },[])

  return (
    <div>
      <div className={styles.homeNav}>
        <div className={styles.navContainer}>
          <div className={styles.left}>
            <h2 className={styles.reactflixLogo}>REACTFLIX</h2>
          </div>
          <div className={styles.right}>
            <button className={styles.signBtn}><a href="/signin">Sign In</a></button>
          </div>
        </div>
      </div>
      <div style={{background: `linear-gradient(to bottom, rgb(0,0,0,0) 0%, rgb(0,0,0,1) 100%),url(${Background})` }} className={styles.homepage}>
        <div className={styles.mainContainer}>
          <div className={styles.mainHeader}>
            <h1>Unlimited movies, TV shows, and more.</h1>
          </div>    
          <h2>Watch anywhere. cancel anytime.</h2>
          <h3>Ready to watch? Enter your email to create or restart your membership</h3>
          <div className={styles.getStartedCtr}>
            <input className={styles.emailInput} type="email" placeholder="Email address" onChange={(e)=>setEmail(e.target.value)}/>
            <Link to="/register" state={{formEmail:email}}>
              <button className={styles.startedButton}> 
                Get Started
                <svg className={styles.rightArrow} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path fillRule="evenodd" d="M6.776 1.553a.5.5 0 0 1 .671.223l3 6a.5.5 0 0 1 0 .448l-3 6a.5.5 0 1 1-.894-.448L9.44 8 6.553 2.224a.5.5 0 0 1 .223-.671z"/>
                </svg>
              </button>
            </Link>
          </div>
          <Link to="/browse">Continue as guest</Link>
        </div>
      </div>
      <Footer/>
    </div>
  )
}

export default Homepage;