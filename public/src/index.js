import React from 'react';
import ReactDOM from 'react-dom/client';
import './components/pages/main/index.css';

import './components/common/Header.css'
import './components/common/Footer.css'
import './components/shared/order/Orders.css'
import './components/section/Collections.css'
import './components/pages/productPage/ShowFullItems.css'
import './components/pages/about/About.css'
import './components/pages/contacts/Contacts.css'
import "./components/pages/authorization/Authorization.css"
import "./components/pages/registration/Registration.css"
import "./components/pages/productOrder/ProductOrder.css"
import "./components/pages/profile/Profile.css"
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
