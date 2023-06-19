import './App.css';
import { Routes, Route } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { getRecipes } from './Redux/actions';
import Landing from './Components/Landing/Landing';
import Home from './Components/Home/Home';
import Detail from './Components/Detail/Detail';
import Form from './Components/Form/Form';

function App() {
  const dispatch = useDispatch();

  const getAllRecipes = async () => {
    try {
      dispatch(getRecipes())
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getAllRecipes()
  }, [])


  return (
    <div className="App">
      <Routes>
     <Route path = "/" element = {<Landing />} />
     <Route path = "/home" element = {<Home />} />
     <Route path = "/detail/:id" element = {<Detail />} />
     <Route path = "/create" element = {<Form />} />
      </Routes>
    </div>
  );
}

export default App;
