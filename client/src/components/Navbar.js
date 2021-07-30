import React, {useState, useEffect, useContext} from 'react'
import axios from 'axios'
import { Link } from '@reach/router'
import styles from '../styles/Navbar.module.css'
import UserContext from "../UserContext"

const Navbar = (props) => {
  const context = useContext(UserContext);
  const [isLogged, setIsLogged] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [displayOptions] = useState([{ Browse:"block", Movies:"block", Series:"block", New:"block", Kids:"block" }])

  displayOptions[0][props.category] = "none";
  
  useEffect(()=> {
    axios.get('http://localhost:5000/api/status',{ withCredentials: true })
      .then(res=>{
        if (res.data.verified === "Approved")
        {
          context.setLoggedUser(localStorage.getItem("user"));
          setIsLogged(true);
        }
        setIsLoaded(true);
      })
      .catch(err=>{console.log(err.response)})
  })

  window.onscroll = () => {
    setHasScrolled(window.pageYOffset === 0 ? false: window.pageYOffset);
    return () => (window.onscroll = null)
  }

  const onLogout = () => {
    axios.get('http://localhost:5000/api/logout',{ withCredentials: true })
      .then(res=>{
        localStorage.removeItem("user");
        setIsLogged(false);
        context.setLoggedUser(null);
      })
      .catch(err=>{console.log(err)})
  }

  return (
    <div className={ hasScrolled > 100 ? styles.navbarScrolledBody : styles.navbarBody}>
      <div className={styles.navbarContainer}>
        <div className={styles.left}>
          <h2 className={styles.reactflixLogo}>REACTFLIX</h2>
          <div className={styles.leftLinks}>
            <span><Link to="/browse">Home</Link></span>
            <span><Link to="/movies">Movies</Link></span>
            <span><Link to="/series">Series</Link></span>
            <span><Link to="/new">New</Link></span>
          </div>
          <div className={styles.leftCollapsed}>
            <div className={styles.dropdown}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
                </svg>
                <div className={styles.dropdownOptions}>
                  <span style={{display:displayOptions[0].Browse}}><Link to="/browse">Browse</Link></span>
                  <span style={{display:displayOptions[0].Movies}}><Link to="/movies">Movies</Link></span>
                  <span style={{display:displayOptions[0].Series}}><Link to="/series">Series</Link></span>
                  <span style={{display:displayOptions[0].New}}><Link to="/new">New</Link></span>
                  <span style={{display:displayOptions[0].Kids}}><Link to="/kids">Kids</Link></span>
                </div>
            </div>
            <p>&nbsp; {props.category}</p>
          </div>
        </div>
        { isLoaded ?
            isLogged ?
              <div className={styles.right}>
                <span className={styles.navKids}><Link to="/kids">KIDS</Link></span>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zm.995-14.901a1 1 0 1 0-1.99 0A5.002 5.002 0 0 0 3 6c0 1.098-.5 6-2 7h14c-1.5-1-2-5.902-2-7 0-2.42-1.72-4.44-4.005-4.901z"/>
                </svg>
                <div className={styles.loggedUser}>
                  <img className={styles.profileImage}src={window.location.origin + "/img/smileblue.png"} alt="not-found"/>
                  <div className={styles.profileLinks}>
                    <span><Link to="/browse">{context.loggedUser}</Link></span>
                    <span><Link to="/browse">Help</Link></span>
                    <span><Link to="/browse">Account</Link></span>
                    <span onClick={onLogout}>Logout</span>
                  </div>
                </div>
              </div>
            :
              <div className={styles.right}>
                <button className={styles.registerButton}><Link to="/signin">Sign In</Link></button>
              </div>
          :
          <div></div>
        }
      </div>
    </div>
)}

export default Navbar;