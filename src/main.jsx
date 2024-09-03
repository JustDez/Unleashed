import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


import './index.css'
import { Home, } from './components'; //Cart, Product, Checkout, Payment 
import { theme } from './Theme/themes';
import { ThemeProvider } from '@mui/material';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  
      <ThemeProvider theme={theme}>
        <Router>
          <Routes>
            <Route path='/' element={<Home />} />
            {/* <Route path='/cart' element={<Cart />} />
            <Route path='/product/:id' element={<Product />} />
            <Route path='/checkout' element={<Checkout />} />
            <Route path='/payment' element={<Payment />} />  */}
          </Routes>
        </Router>
      </ThemeProvider>
    
  </React.StrictMode>,
)
