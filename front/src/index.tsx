import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

console.log(process.env.NODE_ENV);
console.log(process.env.REACT_APP_API_URL);

const container = document.getElementById('root') as HTMLElement;
const root = ReactDOM.createRoot(container);
root.render(
	<Router>
		<App />
	</Router>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
