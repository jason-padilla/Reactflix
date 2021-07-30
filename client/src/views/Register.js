import React, {useState, useContext, useEffect} from 'react'
import { Link, navigate } from '@reach/router'
import axios from 'axios'
import styles from '../styles/Registerpage.module.css'
import Footer from '../components/Footer'
import UserContext from "../UserContext"

const Registerpage = (props) => {
  const context = useContext(UserContext);
  const [passedEmail, setPassedEmail] = useState("");
  const [name, setName] = useState("");
  const [typedEmail, setTypedEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessages, setErrorMessages] = useState([]);
  const Background = window.location.origin + "/background.jpg";

  useEffect(()=>{
    axios.get('http://localhost:5000/api/status',{ withCredentials: true })
      .then(res=> {
        if (res.data.verified === "Approved")
          navigate("/browse");
        else
          if(props.location.state !== null) setPassedEmail(props.location.state.formEmail);
      })
      .catch(err=>{console.log(err.response)})
  })

  const submitRegisterHandler = (e) => {
    e.preventDefault();
    let email = "";
    if (typedEmail === "") email = passedEmail;
    else email = typedEmail;
    axios.post('http://localhost:5000/api/register', {name, email, password}, {withCredentials: true})
      .then(res=> {
        const userName = res.data.info.userName;
        localStorage.setItem("user", userName);
        context.setLoggedUser(userName);
        navigate("/browse")
      })
      .catch(err=>{ 
        try {
          console.clear();
          const errorResponse = err.response.data.errors;
          const errorArr = [];
          for(const key of Object.keys(errorResponse)){
            errorArr.push(errorResponse[key].message)
          }
          setErrorMessages(errorArr);
        }
        catch(err){console.log(err)}
      })
    e.target.password.value = "";
  }

  return (
    <div>
      <div className={styles.loginNav}>
        <div className={styles.navContainer}>
          <div className={styles.left}>
            <h2 className={styles.reactflixLogo}>REACTFLIX</h2>
          </div>
          <div className={styles.right}>
            <button className={styles.signinButton}><Link to="/signin">Sign In</Link></button>
          </div>
        </div>
      </div>
      <div style={{background: `linear-gradient(to bottom, rgb(0,0,0,0) 0%, rgb(0,0,0,1) 100%),url(${Background})`}} className={styles.loginpage}>
        <div className={styles.mainContainer}>
          <form onSubmit={submitRegisterHandler}>
            <h1 className={styles.formTitle}>Register</h1>
            { errorMessages.map((err, idx)=>{return <span key={idx} className={styles.errorMessage}> {err}</span>}) }
            <input className={styles.formInputs} type="text" name="name" placeholder="Name" onChange={(e)=>setName(e.target.value)} autoComplete="off" required/>
            <input className={styles.formInputs} type="email" name="email" placeholder="Email address" defaultValue={passedEmail} onChange={(e)=>{setTypedEmail(e.target.value)}} autoComplete="off" required/>
            <input className={styles.formInputs} type="password" name="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)} autoComplete="off" required/>
            <button className={styles.submitButton}>Register</button>
            <div className={styles.smallSection}>
              <p className={styles.smallLeft}><input type="checkbox"/>&nbsp;&nbsp;Remember Me</p>
              <p className={styles.smallRight}>Need help?</p>
            </div>
            <p>Have an account? <Link to="/signin"> &nbsp;Sign in here.</Link></p> 
            <br/>
            <p><Link to="/browse">Continue as guest</Link></p>
          </form>
        </div>
      </div>
      <Footer/>
    </div>
  )
}

export default Registerpage;