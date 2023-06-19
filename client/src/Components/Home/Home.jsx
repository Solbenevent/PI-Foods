import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import NavBar from "../NavBar/NavBar";
import Cards from "../Cards/Cards";
import FiltersOrders from "../Filter&Order/FiltersOrders";
import Pagination from "../Pagination/Pagination";
import { useSelector, useDispatch } from "react-redux";
import { filterRecipes } from "../../Redux/actions";


const Home = () => {
  const dispatch = useDispatch();


  const [currentPage, setCurrentPage] = useState(1);
  const recipesPerPage = 10;

  const recipes = useSelector(state => state.recipes);

  const handlePaginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  }

  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const currentRecipes = recipes?.length > 0 && recipes.slice(
    indexOfFirstRecipe,
    indexOfLastRecipe
  );



  return (
    <div>
        <NavBar />
        <h1>Este es el Home</h1>
        <div>
          <FiltersOrders setCurrentPage={setCurrentPage} />
        </div>
        <div>
          <Pagination
          recipePerPage={recipesPerPage}
          totalRecipes={recipes?.length}
          currentPage={currentPage}
          handlePaginate={handlePaginate} />
        </div>
        <div>
          <Cards recipes = {currentRecipes} />
        </div>
    </div>
  )
}

export default Home;

