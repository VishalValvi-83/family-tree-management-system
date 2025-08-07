import React from 'react';
import './App.css';
import FamilyForm from './component/FamilyForm.js';
import FamilyTree from './component/FamilyTree/FamilyTree.js';
import Header from './component/Header/Header.js';
function App() {


  return (
    <>
      <Header/>
      <div className="container">
        <FamilyTree />
        <div>
          <FamilyForm />
        </div>
      </div>
    </>
  );
}

export default App;