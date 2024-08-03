import { ToastContainer } from 'react-toastify';
import React from 'react';
import {BrowserRouter,Routes,Route} from "react-router-dom"
import ManageOrders from './ManageOrders';
import AddProducts from './AddProducts';
import ViewProducts from './ViewProducts';

function App() {

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<ManageOrders />}></Route>
          <Route path='/AddProducts' element={<AddProducts />}></Route>
          <Route path='/AddProducts' element={<AddProducts />}></Route>
          <Route path='/ViewProducts/:id' element={<ViewProducts />}></Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </div>
  );
}

export default App;
