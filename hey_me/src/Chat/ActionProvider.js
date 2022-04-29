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
			const message = self.respondUser(response);
			
			// self.updateChatbotState(message);
		}
		sendMessage(self);
		
	};

	respondUser(message) {
		console.log("message received,", message);
		if (message.startsWith("|#|")) {
			console.log("inside if");
			message = message.substring(3, message.length);
			const responseMessage = this.createChatBotMessage(message, {
				widget: "learningOptions",
			});
			this.updateChatbotState(responseMessage);
		}
		else {
			console.log("mensagem seca");
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
