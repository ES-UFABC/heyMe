// Config starter code
import { createChatBotMessage } from "react-chatbot-kit";

import LearningOptions from "./LearningOptions";

const config = {
	initialMessages: [createChatBotMessage(`Olá!`)],
	customComponents: {
		// Replaces the default header
		header: () => <div style={{
			"borderTopRightRadius": "5px",
			"borderTopLeftRadius": "5px",
			"backgroundColor": "#efefef",
			"fontFamily": "Arial",
			"display": "flex",
			"alignItems": "center",
			"fontSize": "0.85rem",
			"color": "#514f4f",
			"padding": "12.5px",
			"fontWeight": "bold"
			}}>
			Converse com Charles, o robô
			</div>
  	},
	widgets: [
		{
			widgetName: "learningOptions",
		widgetFunc: (props) => <LearningOptions {...props} />,
		},
	],
}

export default config