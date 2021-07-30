import React, {useState, useContext, useEffect} from 'react'
import { Link, navigate } from '@reach/router'
import axios from 'axios'
import styles from '../styles/Loginpage.module.css'
import Footer from '../components/Footer'
import UserContext from "../UserContext"

const Loginpage = () => {
  const context = useContext(UserContext);
  const Background = window.location.origin + "/background.jpg";
  const [email, setEmail] = useState(""); 
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(()=>{
    axios.get('http://localhost:5000/api/status',{ withCredentials: true })
      .then(res=>{
        if (res.data.verified === "Approved")
          navigate("/browse");
      })
      .catch(err=>{console.log(err.response)})
  },[])

  const loginUserHandler = e => {
    e.preventDefault();
    axios.post('http://localhost:5000/api/login', {email, password}, { withCredentials: true })
      .then(res=> {
        const userName = res.data.info.userName;
        localStorage.setItem("user", userName)
        context.setLoggedUser(userName);
        navigate("/browse")
      })
      .catch(err=>{ 
        try {
          console.clear();
          if (err.response.data.error) 
            setErrorMessage(err.response.data.error);
        }
        catch(err) {console.log(err)}
      })
      e.target.password.value = "";
  }

  return (
    <div>
      <div style={{background: `linear-gradient(to bottom, rgb(0,0,0,0) 0%, rgb(0,0,0,1) 100%),url(${Background})` }} className={styles.loginpage}>
        <div className={styles.loginNav}>
          <div className={styles.navContainer}>
            <div className={styles.left}>
              <h2 className={styles.reactflixLogo}>REACTFLIX</h2>
            </div>
            <div className={styles.right}>
              <button className={styles.registerButton}><Link to="/register">Register</Link></button>
            </div>
          </div>
        </div>
        <div className={styles.mainContainer}>
          <form onSubmit={loginUserHandler}>
            <h1>{context.loggedUser}</h1>
            <h1 className={styles.formTitle}>Sign In</h1>
            { errorMessage ? <span className={styles.errorMessage}> {errorMessage}</span>: <span></span> }
            <input className={styles.formInputs} type="email" placeholder="Email address" name="email" autoComplete="off" onChange = {(e)=>setEmail(e.target.value)} required/>
            <input className={styles.formInputs} type="password" placeholder="Password" name="password" autoComplete="off" onChange = {(e)=>setPassword(e.target.value)} required/>
            <button className={styles.submitButton} type="submit">Sign In</button>
            <div className={styles.smallSection}>
              <p className={styles.smallLeft}><input type="checkbox"/>&nbsp;&nbsp;Remember Me</p>
              <p className={styles.smallRight}>Need help?</p>
            </div>
            <p>New to Reactflix? <Link to="/register">&nbsp;Sign up now.</Link></p>
            <br/>
            <p><Link to="/browse">Continue as guest</Link></p>
            <br/>
            <small>This page is protected by Google reCAPTCHA to ensure you're not a bot. </small>
          </form>
        </div>
      </div>
      <Footer/>
    </div>
  )
}

export default Loginpage;