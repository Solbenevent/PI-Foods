import Card from "../Card/Card"
import Loader from "../Loader/Loader";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getRecipes } from "../../Redux/actions";


const Cards = ({recipes}) => {
  //let recipes = useSelector(state => state.recipes);
//   const [page, setPage] = useState(1);
//   const [allPages, setAllPages] = useState(0);
//   const [recipePage, setRecipePage] = useState([]);
//   const [prevPage, setPrevPage] = useState(1);

//   useEffect(() => {
//    updateRecipesPage(1)
//    const maxPage = Math.ceil(recipes?.length / 10)
//    setAllPages(maxPage);
//   }, [recipes])
//   const updateRecipesPage = (page) => {
//    const startIndex = (page - 1) * 10
//    const endIndex = startIndex + 10
//    setRecipePage(recipes?.slice(startIndex, endIndex))
//    setPage(page);
//   }

//   const handlePageChange = (e) => {
//    if(recipes.length !== 0) {
//       const nextPage = e.target.name === "next" ? (page === allPages ? 1 : page + 1) : (page === 1 ? allPages : page - 1)
//       updateRecipesPage(nextPage)
//       setPrevPage(nextPage)
//    }
//   }

//   const handleInputPage = (event) => {
//    const newPage = event.target.value === '' ? '' : parseInt(event.target.value)
//    if(newPage === ''){
//      setPage(newPage)
//    }else if(/^[0-9]+$/.test(newPage)){
//      if(newPage >= 1 && newPage <= allPages){
//        setPage(newPage)
//      }else{
//        if(newPage < 1){
//          setPage(1)
//        }
//        if(newPage > allPages){
//          setPage(allPages)
//        }
//      }
//    }
//  }


  return(
    <div>
       {recipes.length > 0 && recipes?.map((recipe) => {
         return (
            <Card
            key = {recipe.id}
            id = {recipe.id}
            image = {recipe.image}
            name = {recipe.name}
            diets = {recipe?.diets} />
         )
       })}
  
    </div>
  )
}

export default Cards;