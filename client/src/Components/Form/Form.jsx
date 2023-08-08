
// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { getDiets, createRecipe, getRecipes } from "../../Redux/actions";
// import { Link } from "react-router-dom";
// import validations from "./validations";
//import "../Form/Form.css"
// import leftArrow from "../Images/leftArrow.png";

// const Form = ({getAllRecipes}) => {
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

//     const handleSumbit = () => {
//         if (Object.values(errors).every((error) => error === "")) {
//             dispatch(createRecipe({...data, diets: data.diets}));
//             alert("¡Recipe created successfully!");
          
//         }
//         return alert("Sorry, something went wrong");
//     }

//     return (
//        <div>
//         <Link to = "/home">
//         <button className="back-btn-form"><img src = {leftArrow} alt="leftArrow" className="left-arrow"/></button>
//         </Link>
//         <form className="form-container">
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
//             <button onClick={handleSumbit} className="btn-create">CREATE</button>
//         </div>
//         </form>
//        </div>
        
//     )
// }
import axios from "axios";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { getDiets } from "../../Redux/actions";
import { useEffect, useState } from "react";


const Form = () => {
    //Dispatch y Selector
    const dispatch = useDispatch();
    const diets = useSelector(state => state.diets); 
    
    //local States
;

    //useEffect
    useEffect(() => {
        dispatch(getDiets())
    }, [dispatch]); 
    
    // useForm
    const { register, handleSubmit, setValue, watch, formState: {errors} } = useForm({defaultValues: { diets: []}});

    //Manejar selección múltiple de dietas
    // const handleSelectDiets = (e) => {
    //     const selectedOptions = Array.from(e.target.selectedOptions, (option) => option.value);
    //     //setSelectedDiet([...selectedDiet, ...selectedOptions]);
    //     setValue("diets", selectedOptions); 
    // }

    // const handleCheck = () => {
    //     setIsChecked(!isChecked); 
    // }
    // const handleDietChange = (event) => {
    //     const { name, checked } = event.target;
    //     setSelectedDiets((prevSelected) => ({ ...prevSelected, [name]: checked }));
    //   };
    const selectedDiets = watch("diets"); 
     
    //Manejar borrado de dietas
    // const handleDeleteDiet = (index) => {
    //   const deleteSelectedDiet = [...selectedDiets];
    //   deleteSelectedDiet.splice(index, 1); // --> el método splice se usa para agregar o eliminar elementos de un array. 
    //   setSelectedDiets(deleteSelectedDiet); 
    // }

    //Manejar el envío del formulario
  // const onSubmit = handleSubmit(async (data) => {
  //  try {
  //   console.log(data);
  //   const { name, steps, summary, image, diets, healthScore } = data;
  //   const response = await axios.post("http://localhost:3001/recipes", {
  //     name,
  //     summary,
  //     steps,
  //     diets: selectedDiets,
  //     image,
  //     healthScore
  //   });
  //   console.log(response.data); 
  //  } catch (error) {
  //   throw new Error ("Algo salió mal") +  error; 
  //  }
  // });
  // const onSubmit = async data => {
  //   try {
  //     console.log("hola")
  //     console.log(data); 
  //     //const { name, diets, summary, steps, image, healthScore } = data;
  //     await axios.post("http://localhost:3001/recipes", data)
  //   } catch (error) {
  //     console.log(1); 
  //     console.log(error);
  //     throw new Error ("Error al enviar el formulario") + error
  //   }
  // }
  const onSubmit = async data => {
    try {
      console.log(data)
      const { name, summary, healthScore, image, steps, diets } = data;
      const selectedDiets = data.diets.map(diet => diet.name); // Esto asume que cada dieta tiene un campo "name"
      
      const formData = {
        name,
        summary,
        healthScore,
        image,
        diets: selectedDiets,
        steps: steps.split("\n")
      };
  
      await axios.post("http://localhost:3001/recipes", formData);
      console.log("Receta enviada exitosamente");
    } catch (error) {
      console.log(error);
      throw new Error("Error al enviar el formulario: " + error);
    }
  }
  
    
    return(
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor="name">Nombre:</label>  
                <input 
                type= "text"
                {...register("name" , {
                    required: {
                        value: true,
                        message: "El nombre es requerido"
                    },
                    minLength: {
                        value: 2,
                        message: "El nombre debe tener al menos 2 caracteres"
                    },
                    maxLength: {
                        value: 25,
                        message: "El nombre no puede contener mas de 25 caracteres"
                    }
                })}
                 />
                 {
                  errors.name && <span>{errors.name.message}</span>
                 }

                <label htmlFor="image">URL de Imagen:</label>
                <input 
                type = "text"
                {...register("image", {
                    required: true
                }) 
                } />
                {
                 errors.image && <span>La imagen es requerida</span>
                }

                <label htmlFor="summary">Descripción</label>
                <textarea 
                {...register("summary", {
                    required: true
                })
                }/>  
                 {
                  errors.summary && <span>La descripción es requerida</span> 
                 } 
                <label htmlFor="healthScore">Puntuación de salud:</label>
                <input 
                type = "number"
                {...register("healthScore", {
                    required: true
                })} />
                 {
                 errors.healthScore && <span>La puntuación es requerida</span>
                } 

                <label htmlFor="steps">Paso a paso:</label>
                <textarea
                {...register("steps", {
                    required: true
                })} />
                 {
                 errors.steps && <span>Al menos un paso es requerida</span>
                } 

                
              
                
                <div className="container-form-diet">
        <label className="form-diet">Selecciona una dieta:</label>
        {diets?.map((diet, index) => (
          <label key={diet}>
            <input
              key ={index}
              type="checkbox"
              name="diets"
              value={diet}
              {...register("diets", {
                required: {
                  value: true,
                  message: "Selecciona al menos una dieta",
                },
              })}
            />
            {diet}
          </label>
        ))}
      </div>


                {
                 errors.diets && <span>Selecciona al menos una dieta</span>
                }
                <hr />
            {/* <div>
                <h5>Dietas seleccionadas:</h5>
                <ul>
                    {
                      selectedDiets.map((diet, index) => (
                        <div>
                            <button onClick={() => handleDeleteDiet(index)}>x</button>
                        <li key ={index} value = {diet}>{diet}</li>
                        </div>
                      ))  
                    }
                </ul>
            </div> */}

                <button type = "submit">Crear</button>
            </form>
        </div>
    )
}

export default Form;