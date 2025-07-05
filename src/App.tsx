import React from 'react';
import Header from './components/Header';
import HowItWorks from './components/HowItWorks';
import Features from './components/Features';
import LiveDemo from './components/LiveDemo';
import Testimonials from './components/Testimonials';
import DownloadCTA from './components/DownloadCTA';
import Footer from './components/Footer';
import './styles/globals.css';
function App() {
  return (
    <div className="App">
      <Header />
      <HowItWorks />
      <Features />
      <LiveDemo />
      <Testimonials />
      <DownloadCTA />
      <Footer />
    </div>
  );
}

export default App;