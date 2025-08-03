import React from 'react';
import './App.css';
import FamilyForm from './component/FamilyForm.js';
import FamilyTree from './component/FamilyTree/FamilyTree.js';
import Logo from './assets/image.png'
function App() {


  return (
    <>
      <div className='header'>
       <div className='header'>
         <img src={Logo} alt="FamilyRoots logo" aria-label='logo' />
        <p>FamilyRoots</p>
       </div>
        <span>Family Tree Management System</span>
      </div>
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