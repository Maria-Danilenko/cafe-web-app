import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Body from './components/Body';
import ProductDetails from './components/ProductDetails';
import DishesPage from './components/DishesPage';
import ProvidersPage from './components/ProvidersPage';
import SalesPage from './components/SalesPage';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Body />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path='/dishes' element={<DishesPage />} />
          <Route path='/providers' element={<ProvidersPage />} />
          <Route path='/sales' element={<SalesPage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}
export default App;