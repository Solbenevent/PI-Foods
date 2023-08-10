import Card from "../Card/Card"
import Loader from "../Loader/Loader";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getRecipes } from "../../Redux/actions";


const Cards = ({recipes}) => {


  return(
    <div>
       {recipes.length > 0 && recipes?.map((recipe) => {
         return (
            <Card
            key = {recipe.id}
            id = {recipe.id}
            image = {recipe.image}
            name = {recipe.name}
            diets = {recipe?.diets?.map(diet => diet)} />
         )
       })}
  
    </div>
  )
}

export default Cards;