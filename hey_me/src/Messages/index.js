import React, { useState, useEffect } from "react";
import { CometChatUI } from "../cometchat-pro-react-ui-kit/CometChatWorkspace/src";
import { CometChatUserListWithMessages } from "../cometchat-pro-react-ui-kit/CometChatWorkspace/src";
import { CometChat } from "@cometchat-pro/chat";

import Header from '../components/Header';

const Messages = () => {
    var authKey = "8f1ed710ae8fbed4da3f774ed784e1458c18f4a1";
    var isTherapist = localStorage.getItem('isTherapist');

    CometChat.getLoggedInUser().then(function(response) {
        console.log("user ", response.data);
    });
    // user;

    const [email, setEmail] = useState(null);

    // logout
    const logout = () => {};

    // add friend
    const addPatient = (e) => {
        e.preventDefault();
        const options = {
            method: "POST",
            headers: {
              appId: "209080691110ce73",
              apiKey: "922eb4fd0f54e17af971463c5f124e20fee2119f",
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify({ accepted: [email] }),
          };
        
          fetch(`https://api-us.cometchat.io/v3.0/users/${localStorage.getItem("userid")}/friends`, options)
            .then((response) => response.json())
            .then((response) => {
              console.log(response);
              // alert("Friend Added Successfully!");
            })
            .catch((err) => {
              console.error(err);
              // alert("Adding Friend Failed!");
            });
    };

    return (
        <div>
            <Header />
            <br/><br/><br/><br/><br/>
        {localStorage.getItem('useremail') && 
            (
            <section id="chat_body">
              {/* logout button */}
              {/* <button onClick={() => logout()}>Logout</button> */}
            <br/><br/>
    
              {/* add friend form */}
              {
                isTherapist == '1' &&
                <div>
                  <input type="email" required name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    />{" "}
                  <button onClick={(e) => addPatient(e)}>Adicionar Paciente</button>{" "}
                    {/* <button onClick={(e) => addFriend(e)}>Add Friend</button> */}
                </div>  
              }
            <br/><br/><br/><br/><br/>
    
            <div style={{width: '800px', height:'700px' , position: 'center', marginLeft: 'auto',
             marginRight: 'auto', marginTop: '-150px'}}>
            <CometChatUI/>
            {/* <CometChatUserListWithMessages chatWithUser="superhero5" /> */}
            </div>
              <div style={{ width: "95vw", height: "500px" }}>
                {/* chat will go here... */}
              </div>
            </section>
          )
        }
        </div>
            
            // <input type="email" required name="email"
            // value={email}
            // onChange={(e) => setEmail(e.target.value)}
            // />{" "}
            // <button onClick={(e) => addPatient(e)}>Adicionar Paciente</button>
        // </div>
    );
};

export default Messages;