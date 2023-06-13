// Nombre.
// Resumen del plato.
// Nivel de comida saludable (health score).
// Paso a paso.
// Imagen.
// Posibilidad de seleccionar/agregar varios tipos de dieta en simultáneo.
// Botón para crear la receta.

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDiets, createRecipe } from "../../Redux/actions";
import { Link } from "react-router-dom";

const Form = () => {
    const diets = useSelector(state => state.diets);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getDiets())
    }, [dispatch])
    
    const [data, setData] = useState({
        name: "",
        summary: "",
        healthScore: 0,
        steps: [],
        image: "",
        diets: []
    })

    const [errors, setErrors] = useState({
        name: "",
        diets: [],
        healthScore: ""
    })

    const handleInputChange = (e) => {
        const property = e.target.name;
        const value = e.target.value;
        const updatedRecipe = {...data, [property]: value};
        setData(updatedRecipe);
    }
    
    const handleMultiSelectChange = (e) => {
        const {value, checked } = e.target;
        setData((prevRecipe) => {
            if(checked) {
                return {
                    ...prevRecipe,
                    diets: [...prevRecipe.diets, value],
                };
            } else {
                return {
                    ...prevRecipe,
                    diets: prevRecipe.diets.filter(diet => diet !== value)
                }
            }
        });
    }
 
    return (
       <div>
        <form>
            <div>
                <h1>Create a Recipe!</h1>
            </div>

            <div>
                <label>Name:</label>
                <input
                type="text"
                name="name"
                value={data.name}
                onChange={handleInputChange} />
            </div>

           <div>
               <label>Image URL:</label>
               <input
               type="text"
               name="image"
               value={data.image}
               onChange={handleInputChange} />
           </div>

            <div>
                <label>Summary:</label>
                <textarea
                name="summary"
                value={data.summary}
                onChange={handleInputChange} />
            </div>
             
           <div>
               <label>Health Score:</label>
               <input
               type="number"
               name="healthScore"
               value={data.healthScore}
               onChange={handleInputChange} />
            </div>

          
        <div className="container-form-diet">
            <label className="form-diet" >Select a diet:</label>
            {diets?.map((diet) => (
           <label key={diet}>
           <input
            key={diet}
            type="checkbox"
            value={diet}
            name="diets"
            checked={data.diets.includes(diet)}
            onChange={handleMultiSelectChange}
    />
    {diet}
  </label>
))}
        </div>  

        </form>
       </div>
        
    )
}

export default Form;