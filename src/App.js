
import './App.css';

import { AssetLibrary } from "./pages/AssetLibrary/AssetLibrary"
import { DocumentLibrary } from "./pages/DocumentLibrary/DocumentLibrary"
import { ResourceLibrary } from "./pages/ResourceLibrary/ResourceLibrary"
import { AddResource } from "./pages/ResourceLibrary/AddResource"
import { SepeceficResourceLibrary } from "./pages/ResourceLibrary/SepeceficResourceLibrary"
import { Home } from "./pages/Home"
import { Login } from "./pages/Login"
import { NavBar } from './Navbar';
import { Col, Row } from 'antd';
import { Route, Routes } from 'react-router-dom';
import { auth } from "./config/firebase";

function App() {



  return (
    <div className="App">
      <NavBar></NavBar>
      <Row type="flex" justify="center">
        <Col span={24}>
          <Routes>
            <Route path='/' element={<Login />} />
            <Route path='/home' element={<Home />} />
            <Route path='/assets' element={<AssetLibrary />} />
            <Route path='/documents' element={<DocumentLibrary />} />
            <Route path='/resources' element={<ResourceLibrary />} />
            <Route path='/resources/add' element={<AddResource />} />
            <Route path='/resources/type' element={<SepeceficResourceLibrary />} />
          </Routes>
        </Col>
      </Row>
    </div>
  );
}

export default App;
