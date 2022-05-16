/* eslint-disable jsx-a11y/accessible-emoji */
import React, { useState, useEffect } from "react";
import "./Header.css";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CSSTransition } from "react-transition-group";
import { CometChat } from "@cometchat-pro/chat";

export default function Header() {
  const [isNavVisible, setNavVisibility] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
	var isTherapist = localStorage.getItem('isTherapist');

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
          "Origin": localStorage.getItem("api-origin")
        }
    };
    localStorage.removeItem('token');

    var res;
    console.log('token on logout', localStorage.getItem('token'));

    axios.delete(`${localStorage.getItem("api-endpoint")}/logout_back`, config)
            .then(function(response){
				res = response.data;
        console.log(res);
        CometChat.logout().then(
          () => {
            console.log("Logout completed successfully");
          },error=>{
            console.log("Logout failed with exception:",{error});
          }
        );
        navigate('/login');
       //Perform action based on response
        })
        .catch(function(error){
            console.log(error);
       //Perform action based on error
        });
  }

  const navigate = useNavigate();

  return (
    <header className="Header">
          <table className="Logo">
            <thead>
              <tr>
                  <td>
                    <img src={require("../assets/psychology.png")} alt="logo"/>
                  </td>
                  <td style={{verticalAlign: 'top', borderTop: '400px', marginTop: 20}}>
                    <h2 className='titulo'>
                        <br style={{display: 'block', content: "", marginTop: 23}}
                    />&nbsp;HeyMe</h2>
                  </td>
              </tr>
              </thead>
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
          {isTherapist == '0' && 
            <a href="/diario">Diario</a>
          }
          {isTherapist == '0' && 
            <a href="/chat">Chatbot</a>
          }
          {isTherapist == '0' && 
            <a href="/messages">Terapeuta</a>
          }
          {isTherapist != '0' && 
            <a href="/messages">Pacientes</a>
          }
          {/* <a href="/messages">Terapeuta</a> */}
          <button onClick={handleClick}>Logout</button>
        </nav>
      </CSSTransition>
      <button onClick={toggleNav} className="Burger">
        🦉 
      </button>
    </header>
  );
}