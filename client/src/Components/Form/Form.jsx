// Nombre.
// Resumen del plato.
// Nivel de comida saludable (health score).
// Paso a paso.
// Imagen.
// Posibilidad de seleccionar/agregar varios tipos de dieta en simultáneo.
// Botón para crear la receta.
// import axios from "axios";
// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { getDiets, createRecipe, getRecipes } from "../../Redux/actions";
// import { Link } from "react-router-dom";
// import validations from "./validations";
// import "../Form/Form.css"
// import leftArrow from "../Images/leftArrow.png";

// const Form = () => {
//     const diets = useSelector(state => state.diets);
//     const dispatch = useDispatch();

//     useEffect(() => {
//         dispatch(getDiets())
//     }, [dispatch])
    
//     const [data, setData] = useState({
//         name: "",
//         summary: "",
//         healthScore: 0,
//         steps: [],
//         image: "",
//         diets: []
//     })

//     const [errors, setErrors] = useState({
//         name: "",
//         summary: "",
//         healthScore: ""
//     })

//     const handleInputChange = (e) => {
//         const property = e.target.name;
//         const value = e.target.value;
//         //const updatedRecipe = {...data, [property]: value};
//         if(property.startsWith("step")) {
//             const stepIndex = parseInt(property.slice(4));
//             setData((prevData) => {
//                 const updatedSteps = [...prevData.steps];
//                 updatedSteps[stepIndex - 1] = value;
//                 return {
//                     ...prevData, steps: updatedSteps
//                 } 
//             });
//         } else {
//             const updatedRecipe = {...data, [property]: value}
//             setData(updatedRecipe);
//             validations(updatedRecipe, errors, setErrors);
//         }
//     }
    
//     const handleMultiSelectChange = (e) => {
//         const {value, checked } = e.target;
//         setData((prevRecipe) => {
//             if(checked) {
//                 return {
//                     ...prevRecipe,
//                     diets: [...prevRecipe.diets, value],
//                 };
//             } else {
//                 return {
//                     ...prevRecipe,
//                     diets: prevRecipe.diets.filter(diet => diet !== value)
//                 }
//             }
//         });
//     }

//     // const handleSumbit = () => {
//     //     if (Object.values(errors).every((error) => error === "")) {
//     //         dispatch(createRecipe({...data, diets: data.diets.join(",")}));
//     //         return alert("¡Recipe created successfully!")
//     //     }
//     //     return alert("Sorry, something went wrong");
//     // }
   
//     const handleSumbit = (e) => {
//         axios.post("http://localhost:3001/recipes", data)
//         .then(res => dispatch(getRecipes()))
//         .catch(err => alert(err))
//     }
      

//     return (
//        <div>
//         <Link to = "/home">
//         <button className="back-btn-form"><img src = {leftArrow} alt="leftArrow" className="left-arrow"/></button>
//         </Link>
//         <form className="form-container" onSubmit={handleSumbit}>
//             <div>
//                 <h1 className="form-title">Create a Recipe!</h1>
//             </div>

//             <div>
//                 <label className="form-name">Name:</label>
//                 <input
//                 type="text"
//                 name="name"
//                 value={data.name}
//                 onChange={handleInputChange} />
//                 <p>{errors.name}</p>
//             </div>

//            <div className="container-img-url">
//                <label>Image URL:</label>
//                <input
//                type="text"
//                name="image"
//                value={data.image}
//                onChange={handleInputChange} />
//            </div>

//             <div className="container-form-summary">
//                 <label>Summary:</label>
//                 <textarea
//                 name="summary"
//                 value={data.summary}
//                 onChange={handleInputChange} />
//                 <p>{errors.summary}</p>
//             </div>
             
//            <div className="container-form-score">
//                <label>Health Score:</label>
//                <input
//                type="number"
//                name="healthScore"
//                value={data.healthScore}
//                onChange={handleInputChange} />
//                <p>{errors.healthScore}</p>
//             </div>

          
//           <div className="container-form-diet">
//             <label className="form-diet" >Select a diet:</label>
//             {diets?.map((diet) => (
//             <label key={diet}>
//             <input
//             key={diet}
//             type="checkbox"
//             value={diet}
//             name="diets"
//             checked={data.diets.includes(diet)}
//             onChange={handleMultiSelectChange}
//             />
//              {diet}
            
//             </label>
//         ))}
//         </div>  
//         <div className="container-form-steps">
//             <label>Add the steps you want:</label>
//             <p>Step 1</p> <textarea name="step1" value={data.steps[0]} onChange={handleInputChange}/>
//             <p>Step 2</p> <textarea name="step2" value={data.steps[1]} onChange={handleInputChange}/>
//             <p>Step 3</p> <textarea name="step3" value={data.steps[2]} onChange={handleInputChange}/>
//         </div>
//         <div>
//             <button className="btn-create">CREATE</button>
//         </div>
//         </form>
//        </div>
        
//     )
// }

// export default Form;

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDiets, createRecipe } from "../../Redux/actions";
import { Link } from "react-router-dom";
import validations from "./validations";
import "../Form/Form.css"
import leftArrow from "../Images/leftArrow.png";

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
        summary: "",
        healthScore: ""
    })

    const handleInputChange = (e) => {
        const property = e.target.name;
        const value = e.target.value;
        //const updatedRecipe = {...data, [property]: value};
        if(property.startsWith("step")) {
            const stepIndex = parseInt(property.slice(4));
            setData((prevData) => {
                const updatedSteps = [...prevData.steps];
                updatedSteps[stepIndex - 1] = value;
                return {
                    ...prevData, steps: updatedSteps
                } 
            });
        } else {
            const updatedRecipe = {...data, [property]: value}
            setData(updatedRecipe);
            validations(updatedRecipe, errors, setErrors);
        }
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

    const handleSumbit = () => {
        if (Object.values(errors).every((error) => error === "")) {
            dispatch(createRecipe({...data, diets: data.diets}));
            return alert("¡Recipe created successfully!")
        }
        return alert("Sorry, something went wrong");
    }

    return (
       <div>
        <Link to = "/home">
        <button className="back-btn-form"><img src = {leftArrow} alt="leftArrow" className="left-arrow"/></button>
        </Link>
        <form className="form-container">
            <div>
                <h1 className="form-title">Create a Recipe!</h1>
            </div>

            <div>
                <label className="form-name">Name:</label>
                <input
                type="text"
                name="name"
                value={data.name}
                onChange={handleInputChange} />
                <p>{errors.name}</p>
            </div>

           <div className="container-img-url">
               <label>Image URL:</label>
               <input
               type="text"
               name="image"
               value={data.image}
               onChange={handleInputChange} />
           </div>

            <div className="container-form-summary">
                <label>Summary:</label>
                <textarea
                name="summary"
                value={data.summary}
                onChange={handleInputChange} />
                <p>{errors.summary}</p>
            </div>
             
           <div className="container-form-score">
               <label>Health Score:</label>
               <input
               type="number"
               name="healthScore"
               value={data.healthScore}
               onChange={handleInputChange} />
               <p>{errors.healthScore}</p>
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
        <div className="container-form-steps">
            <label>Add the steps you want:</label>
            <p>Step 1</p> <textarea name="step1" value={data.steps[0]} onChange={handleInputChange}/>
            <p>Step 2</p> <textarea name="step2" value={data.steps[1]} onChange={handleInputChange}/>
            <p>Step 3</p> <textarea name="step3" value={data.steps[2]} onChange={handleInputChange}/>
        </div>
        <div>
            <button onClick={handleSumbit} className="btn-create">CREATE</button>
        </div>
        </form>
       </div>
        
    )
}

export default Form;