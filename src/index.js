import React from 'react';
import { positions, Provider as AlertProvider, transitions } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { HashRouter as Router } from 'react-router-dom';
import './assets/css/vendor/bootstrap.min.css';
import App from './containers/App';
import './index.css';
import store from './redux';
import * as serviceWorker from './serviceWorker';

const options = {
  position: positions.BOTTOM_CENTER,
  timeout: 5000,
  offset: '30px',
  transition: transitions.SCALE
};

const MainApp = () => (
  <Provider store={store}>
    <Router basename={process.env.PUBLIC_URL}>
      <AlertProvider template={AlertTemplate} {...options}>
        <App />
      </AlertProvider>
    </Router>
  </Provider>
);

ReactDOM.render(<MainApp />, document.getElementById('root'));

serviceWorker.unregister();
