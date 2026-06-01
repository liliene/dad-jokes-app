import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';

/**
 * App
 * Root component. Composes layout: Header → Page → Footer.
 */
export default function App() {
  return (
    <>
      <Header />
      <Home />
      <Footer />
    </>
  );
}
