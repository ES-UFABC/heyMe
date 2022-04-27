import axios from 'axios';

// ActionProvider starter code
class ActionProvider {
  constructor(
   createChatBotMessage,
   setStateFunc,
   createClientMessage,
   stateRef,
   createCustomMessage,
   ...rest
 ) {
   this.createChatBotMessage = createChatBotMessage;
   this.setState = setStateFunc;
   this.createClientMessage = createClientMessage;
   this.stateRef = stateRef;
   this.createCustomMessage = createCustomMessage;
 }

 handleJavascriptList = (btnText) => {
  var self = this;
  var response = '';
  async function sendMessage(self) {
      let config = {
          headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
                "Origin": localStorage.getItem('api-origin')
          }
      };
      if (btnText.startsWith('?')) {
        btnText = ` ${btnText}`;
      }
      console.log("mensagem enviada", btnText);
      let response = await axios.get(`${localStorage.getItem("api-endpoint")}/chatbot/${btnText}`, config);
      let res = await response.data;
      console.log(res);
      // self.actionProvider.respondUser(res['msg']);
      response = res['msg'];
      const message = self.createChatBotMessage(
        response
      );
    
      self.updateChatbotState(message);
  }
  sendMessage(self);
  
};

 respondUser(message) {
   if (message == "Voce está se sentindo ansioso (a)?" || message == "Voce está se sentindo nervoso (a)?") {
    const responseMessage = this.createChatBotMessage(message, {
      widget: "learningOptions",
    });
    this.updateChatbotState(responseMessage);
   }
   else {
    const responseMessage = this.createChatBotMessage(message);
     this.updateChatbotState(responseMessage);
   }
 }

 updateChatbotState(message) {
  // NOTICE: This function is set in the constructor, and is passed in from the top level Chatbot component. The setState function here actually manipulates the top level state of the Chatbot, so it's important that we make sure that we preserve the previous state.

  this.setState((prevState) => ({
    ...prevState, messages: [...prevState.messages, message],
  }));
}

}

export default ActionProvider;
