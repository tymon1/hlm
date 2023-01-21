import React from 'react';
// import ReactDOM from 'react-dom';
import ReactDOMClient from 'react-dom/client';
import './index.css';
import Hellmutt from './Hellmutt';
import { hlm } from './app/app';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';

// old 1
//
// ReactDOM.render(
//   <React.StrictMode>
//     <Provider store={ hlm }>
//       <Hellmutt />
//     </Provider>
//   </React.StrictMode>,
//   document.getElementById('root')
// );

const container = document.getElementById('root');
const root = ReactDOMClient.createRoot(container);

root.render( 
  <React.StrictMode>
    <Provider store={ hlm }>
      <Hellmutt/>
    </Provider>
  </React.StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
