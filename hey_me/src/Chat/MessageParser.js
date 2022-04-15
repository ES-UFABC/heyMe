import axios from 'axios';
// MessageParser starter code
class MessageParser {
    constructor(actionProvider, state) {
      this.actionProvider = actionProvider;
      this.state = state;
    }

    
  
    parse(message) {
    // this.state = {open: false};
    var self = this;
    async function sendMessage(self) {
        let config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                  // "Origin": localStorage.getItem('api-origin')
                // "Origin": "localhost:5000"
            }
        };
        let response = await axios.get(`${localStorage.getItem("api-endpoint")}/chatbot/${message}`, config);
        let res = await response.data;
        console.log(res);
        self.actionProvider.respondUser(res['response']);
    }
    sendMessage(self);
    console.log("message sent");
    }
  }
  
  export default MessageParser;