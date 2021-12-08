import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { usePromiseTracker } from 'react-promise-tracker';
import Loader from 'react-loader-spinner';

//Credit: https://www.basefactor.com/react-how-to-display-a-loading-indicator-on-fetch-calls
const Loading = props => {
  const {promiseInProgress} = usePromiseTracker();
  return (
    promiseInProgress &&
    <div style={{
      width: "100%",
      height: "100",
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    }}>

      <Loader type="ThreeDots" height="100" width="100" color="#0275d8"></Loader>
    </div>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <App />
    <Loading />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
