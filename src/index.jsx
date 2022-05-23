import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { timestep } from "./shared/definitions";

const root = ReactDOM.createRoot(document.getElementById("root"));
setInterval(() => {
	root.render(
		<React.StrictMode>
			<App />
		</React.StrictMode>
	);
}, timestep);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
