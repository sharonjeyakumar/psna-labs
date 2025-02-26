import { useEffect, useState } from 'react'
import './App.css'
import BarcodeScanner from './barcodeScanner';

function App() {
  
  useEffect(() => {
    const searchbar=  document.querySelector('.mainSearch');
    const menuIcon=  document.querySelector('.menuIcon');
    const search=  document.querySelector('.search');
    
  
    const handleFocus = () => {
      searchbar.classList.add('searchActive');
      menuIcon.style.borderLeftColor = '#74b4b9'; 
    };
  
    const handleBlur = () => {
      searchbar.classList.remove('searchActive');
      menuIcon.style.borderLeftColor = ''; 
    };
  
    search.addEventListener('focus', handleFocus);
    search.addEventListener('blur', handleBlur);
  
    return () => {
      search.removeEventListener('focus', handleFocus);
      search.removeEventListener('blur', handleBlur);
    };
  }, []);
  

  return (
    <>
      <div className="headerSection">
        <div className="iconWrapper">
        <div className="pageIcon"></div>
        <h3 className='pageName'>PSNA-Labs</h3>
        </div>
        <ul className="navItemHolder">
          <li>Scanner</li>
          <li>Dashboard</li>
          <li>Reports</li>
          <li>Configuration</li>
        </ul>
      </div>

     <div className="mainSearchSection">
        <div className="mainSearch">
          <div className="msWrapper"></div>
          <div className="searchIcon"></div>
          <input className='search' type='text' placeholder='Search...'></input>
          <div className="menuIcon"></div>
        </div>
     </div>
      <hr></hr>
        
    <div className='scannerFrame'>
      <BarcodeScanner />
    </div>
      
      
    </>
  )
}

export default App
