import axios from 'axios';
// MessageParser starter code
class MessageParser {
    constructor(actionProvider, state) {
      this.actionProvider = actionProvider;
      this.state = state;
    }
  
    parse(message) {
    //   console.log(message)
    this.state = {open: false};
    var self = this;
    async function sendMessage() {
        let config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                  // "Origin": "https://main.d1w1cxbdfenujy.amplifyapp.com/"
                "Origin": "localhost:5000"
            }
        };
        let response = await axios.get(`${localStorage.getItem("api-endpoint")}/chatbot/${message}`, config);
        let res = await response.data;
        console.log(res);
        self.setState({open: true});
    }
    sendMessage();
    }
  }
  
  export default MessageParser;