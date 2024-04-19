import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import "src/assets/styles.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    		<Router>
			<Routes>
				<Route path='/bim-software-realtime/' element={<App />} />
			</Routes>
		</Router>
  </React.StrictMode>
);
