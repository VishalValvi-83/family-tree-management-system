import React from 'react';
import './App.css';
import FamilyForm from './component/FamilyForm.js';
import FamilyTree from './component/FamilyTree/FamilyTree.js';

function App() {


  return (
    <div className="container">
      <FamilyTree />
      <div>
        <h1>FamilyRoots: Family tree management system</h1>
        <FamilyForm />
      </div>
    </div>
  );
}

export default App;