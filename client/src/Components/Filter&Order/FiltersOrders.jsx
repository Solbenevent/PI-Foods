// Botones/Opciones para ordenar tanto ascendentemente como descendentemente las recetas por orden alfabético y por "comida saludable" (health score).
// Botones/Opciones para filtrar por tipo de dieta, y por si su origen es de la API o de la base de datos (creados por nosotros desde el formulario).
import { useEffect, useState } from "react";
import { getDiets, filterRecipes } from "../../Redux/actions";
import { useDispatch, useSelector } from "react-redux";

const FiltersOrders = ({ setCurrentPage }) => {
  const dispatch = useDispatch();
  const diets = useSelector(state => state.diets);

  useEffect(() => {
    dispatch(getDiets())
  }, [])



    
 
  return (
    <div>
        <div>
       <label>Diets</label>
       <select>
       <option value ="all">All</option>
       {diets?.map((diet) => {
        return (
          <option key={diet.id} name={diet.id} value ={diet.name}>
            {diet}
          </option>
        )
       })}
       </select>
       </div>

       <div>
        <label>Origin</label>
        <select>
        <option value="all">All</option>
        <option value="api">API</option>
        <option value="created">Created</option>
        </select>
       </div>

       <div>
        <label>Sort Order:</label>
        <select>
        <option value="all" default>All</option>
        <option value ="desc_name">Descending</option>
        <option value="asc_name">Ascending</option>
        <option value="desc_score">Health Score(Lower-Higher)</option>
        <option value="asc_score">Health Score(Higher-Lower)</option>
        </select>
       </div>
    </div>
  )
}

export default FiltersOrders;