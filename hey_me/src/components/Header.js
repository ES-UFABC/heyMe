/* eslint-disable jsx-a11y/accessible-emoji */
import React, { useState, useEffect } from "react";
import "./Header.css";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Diario from "../Diario";

import { CSSTransition } from "react-transition-group";

export default function Header() {
  const [isNavVisible, setNavVisibility] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 700px)");
    mediaQuery.addListener(handleMediaQueryChange);
    handleMediaQueryChange(mediaQuery);

    return () => {
      mediaQuery.removeListener(handleMediaQueryChange);
    };
  }, []);

  const handleMediaQueryChange = mediaQuery => {
    if (mediaQuery.matches) {
      setIsSmallScreen(true);
    } else {
      setIsSmallScreen(false);
    }
  };

  const toggleNav = () => {
    setNavVisibility(!isNavVisible);
  };

  function handleClick() {
    const config = {
        headers: { 
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          "Origin": "https://main.d1w1cxbdfenujy.amplifyapp.com/"
        }
    };

    var res;
    console.log('token on logout', localStorage.getItem('token'));

    axios.delete(`${localStorage.getItem("api-endpoint")}/logout_back`, config)
            .then(function(response){
				res = response.data;
        console.log(res);
        localStorage.removeItem('token');
        navigate('/login');
       //Perform action based on response
        })
        .catch(function(error){
            console.log(error);
       //Perform action based on error
        });
  }

  function handleClickDiary() {
    navigate('/diario');
  }

  const navigate = useNavigate();

  return (
    <header className="Header">
      {/* <nav className="Logo"> */}
          <table className="Logo">
              <th>
                  <td>
                  <img src={require("../assets/psychology.png")} alt="logo"/>
                  </td>
                  <td style={{verticalAlign: 'top', borderTop: '400px', marginTop: 20}}>
                    <h2 className='titulo'>
                        <br style={{display: 'block', content: "", marginTop: 23}}
                    />&nbsp;HeyMe</h2>
                  </td>
              </th>
          </table>
        {/* </nav> */}
      <CSSTransition
        in={!isSmallScreen || isNavVisible}
        timeout={350}
        classNames="NavAnimation"
        unmountOnExit
      >
        <nav className="Nav">
          <a href="/welcome">Home</a>
          <a href="/diario">Diario</a>
          <a href="/">Chat</a>
          <button onClick={handleClick}>Logout</button>
        </nav>
      </CSSTransition>
      <button onClick={toggleNav} className="Burger">
        🦉 
      </button>
    </header>
  );
}