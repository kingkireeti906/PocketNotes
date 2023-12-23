import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Homepage from "./Components/Homepage/Homepage.jsx";
import Popup from './Components/popup/popup.jsx';
import Notepage from './Components/Notepage/Notepage.jsx';

function App() {
  return (
    <div>
      <Homepage/>
    </div>
  );
}

export default App;
