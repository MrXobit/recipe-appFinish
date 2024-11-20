import React from 'react'
import { Route, Routes } from 'react-router-dom';
import AddNewElem from './AddNewElem';
import Recives from './Recives';
import AlonRecive from './AlonRecive';



export const RouterX = () => {
  return (
    <div>
       <Routes>
        <Route path="/" element={<Recives/>} />
        <Route path="/newrecive" element={<AddNewElem/>} />
        <Route path="/recipe/:id" element={<AlonRecive/>} />
      </Routes>
    </div>
  )
}
export default RouterX;