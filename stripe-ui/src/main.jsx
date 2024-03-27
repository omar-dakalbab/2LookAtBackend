import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
const stripePromise = loadStripe("pk_test_51IpDUqAMbj3PxWjMCpKfwGrxarBEUeIlUXSTFAOjcAwFmBQ4Rb7VItXAGHZaQkZ7hqGAdRLYzeqXPRErByRFlPQi00TI1pjJOR");

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Elements stripe={stripePromise}>
      <App />
    </Elements>
  </React.StrictMode>,
)
