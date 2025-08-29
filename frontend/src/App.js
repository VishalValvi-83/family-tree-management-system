import React from 'react';
import './App.css';
import FamilyForm from './component/FamilyForm.js';
import FamilyTree from './component/FamilyTree/FamilyTree.js';
import Header from './component/Header/Header.js';
import HeroSection from './component/Hero/HeroSection.js';
import Footer from './component/Footer/Footer.js';
function App() {

  return (
    <>
      <Header />
      <HeroSection />
      <div className="container">
        <FamilyTree />
        <div>
          <FamilyForm />
        </div>
      </div>
      <Footer />
    </>
  );
}

export default App;