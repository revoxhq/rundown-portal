
import './App.css';

import { AssetLibrary } from "./pages/AssetLibrary"
import { DocumentLibrary } from "./pages/DocumentLibrary"
import { Home } from "./pages/Home"
import { Login } from "./pages/Login"

import { Route, Routes } from 'react-router-dom';


function App() {




  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/home' element={<Home />} />
        <Route path='/assets' element={<AssetLibrary />} />
        <Route path='/documents' element={<DocumentLibrary />} />
      </Routes>
    </div>
  );
}

export default App;
