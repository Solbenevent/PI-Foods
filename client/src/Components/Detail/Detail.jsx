import { useEffect, useState } from "react";
import { useDispatch, useSelector} from "react-redux"
import { useParams, Link } from "react-router-dom";
import { detailRecipe } from "../../Redux/actions";

// ID.
// Nombre.
// Resumen del plato.
// Nivel de comida saludable (health score).
// Paso a paso.
// Imagen.
// Tipos de dieta.

const Detail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const recipe = useSelector(state => state.detailRecipes);


 useEffect(() => {
    dispatch(detailRecipe(id))
 }, [dispatch, id])

  return (
    <div>
        <div>
            <Link to = "/home">
            <button>Back</button>
            </Link>

        <div>
            <h1>{recipe?.name}</h1>
        </div>

        <div>
            <img src ={recipe?.image} alt={recipe.name}/>
        </div>

        <div>
            <h3>{recipe?.healthScore}</h3>
        </div>

        <div>
            <h3>{recipe?.diets}</h3>
        </div>
       <hr />
        <div>
            <p>{recipe.summary}</p>
        </div>
     <hr />
        <div>
           <p>{recipe.steps}</p>
        </div>
       <hr />
        <div>
            <p>{recipe.id}</p>
        </div>   
        </div>
    </div>
  )

}

export default Detail; 