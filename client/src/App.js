import React, {useState, useMemo, useEffect} from 'react'
import { Router, navigate } from '@reach/router'
import './App.css'
import Home from './views/Home'
import Login from './views/Login'
import Register from './views/Register'
import Browse from './views/Browse'
import Movies from './views/Movies'
import Series from './views/Series'
import New from './views/New'
import Kids from './views/Kids'
import UserContext from './UserContext'

function App() {
  const [loggedUser, setLoggedUser] = useState(null);
  const providerValue = useMemo(()=> ({loggedUser,setLoggedUser}),[loggedUser,setLoggedUser])

  const NotFound = (props) => {
    useEffect(()=>{navigate(props.route)})
    return (<div></div>)
  }
  return (
      <div className="App">
        <UserContext.Provider value={providerValue}>
          <Router>  
            <Home path="/"/>
              <NotFound default route={"/browse"}/>
            <Login path="/signin"/>
              <NotFound path="/signin/*" route={"/signin"}/>
            <Register path="/register"/>
              <NotFound path="/register/*" route={"/register"}/>
            <Browse path="/browse"/>
              <NotFound path="/browse/*" route={"/browse"}/>
            <Movies path="/movies"/>
              <NotFound path="/movies/*" route={"/movies"}/>
            <Series path="/series"/>
              <NotFound path="/series/*" route={"/series"}/>
            <New path="/new"/>
              <NotFound path="/new/*" route={"/new"}/>
            <Kids path="/kids"/>
              <NotFound path="/kids/*" route={"/kids"}/>
          </Router>
        </UserContext.Provider>
      </div>
  );
}

export default App;  