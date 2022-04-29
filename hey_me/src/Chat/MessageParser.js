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
					"Origin": localStorage.getItem('api-origin')
				}
			};
			if (message.startsWith('?')) {
				message = ` ${message}`;
			}
			console.log("mensagem enviada", message);
			let response = await axios.get(`${localStorage.getItem("api-endpoint")}/chatbot/${message}`, config);
			let res = await response.data;
			console.log("message parser", res);
			await self.actionProvider.respondUser(res['msg']);
			console.log("called respond user");
		}
		sendMessage(self);
		// console.log("message sent");
	}
}
  
export default MessageParser;