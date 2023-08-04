
import { useEffect, useState } from "react";
import NavBar from "../NavBar/NavBar";
import Cards from "../Cards/Cards";
import Pagination from "../Pagination/Pagination";
import { useSelector, useDispatch } from "react-redux";
import {getDiets, filterByDiets, orderAlphabetic, orderByHealthScore, filterByOrigin, deleteFilters, getRecipes } from "../../Redux/actions";
import "../Home/Home.css";


const Home = () => {
  const dispatch = useDispatch();
  const { recipes, diets, filteredRecipes } = useSelector(state => state);

  const [currentPage, setCurrentPage] = useState(1);
  const recipesPerPage = 10;


  const handlePaginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  }

  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const currentRecipes = recipes?.length > 0 && recipes.slice(
    indexOfFirstRecipe,
    indexOfLastRecipe
  );
 
  useEffect(() => {
   dispatch(getDiets())
  }, [dispatch]);

  const filterHandler = (e) => {
    const { name, value } = e.target;
    if(name === "Diets") {
      dispatch(filterByDiets(value));
      setCurrentPage(1)
    } else {
      dispatch(filterByOrigin(value));
      setCurrentPage(1);  
  } 
  if(value === "All") {
    dispatch(getRecipes());
  }
  }

  const orderHandler = (e) => {
    const { name, value } = e.target;
    if(name === "Alphabetic") {
      dispatch(orderAlphabetic(value));
    } else {
      dispatch(orderByHealthScore(value));
    }
  }

  const resetAll = () => {
    dispatch(deleteFilters());
    const selectElements = document.getElementsByTagName("select");
    for (let i = 0; i < selectElements.length; i++) {
      selectElements[i].selectedIndex = 0;
    }
    dispatch(getRecipes());
  }

  return (
    <div>
        <NavBar setCurrentPage={setCurrentPage} />
      <div className="container-filters">
        <div>
        <select name="Origin" onChange={filterHandler} defaultValue='Filter By Origin' className="select-origin">
          <option disabled >Filter By</option>
          <option value="All">All</option>
          <option value="Api">Api</option>
          <option value="DataBase">DataBase</option>
        </select>
        </div>

        <div>
        <select name="Diets" onChange={filterHandler} defaultValue='Filter By Diets' className="select-diets">
          <option>Filter By</option>
          <option value="All">All</option>
          {diets?.map((diet) => {
            return (
              <option value={diet} key={diet.id}>
                {diet}
              </option>
            );
          })}
        </select>
        </div>

        <div>
        <select name="Alphabetic" onChange={orderHandler} defaultValue='Alphabetic Order' className="select-order">
          <option disabled >Order By</option>
          <option value="A-Z">A-Z</option>
          <option value="Z-A">Z-A</option>
        </select>
        </div>

        <div>
        <select name="HealthScore" onChange={orderHandler} defaultValue='HealthScore Order' className="select-score">
          <option disabled > Order By</option>
          <option value="Ascendente">Lowest Score</option>
          <option value="Descendente">Highest Score</option>
        </select>
        </div>
        <div>
          <button onClick={resetAll}>Reset</button>
        </div>
        </div>

        <h1>¡Welcome! Here are the recipes you are looking for</h1>

        <div>
          <Pagination
          recipePerPage={recipesPerPage}
          totalRecipes={recipes?.length}
          currentPage={currentPage}
          handlePaginate={handlePaginate} />
        </div>
        <div>
          <Cards recipes = {filteredRecipes.length > 0 ? filteredRecipes : currentRecipes} />
        </div>
    </div>
  )
}

export default Home;

