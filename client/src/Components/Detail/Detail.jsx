
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { detailRecipe, clearDetail } from "../../Redux/actions";
import leftArrow from "../Images/leftArrow.png";
import "../Detail/Detail.css";

const Detail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const recipe = useSelector((state) => state.detailRecipes);

  useEffect(() => {
    dispatch(detailRecipe(id));
    dispatch(clearDetail());
  }, [dispatch, id]);

  return (
    <div className="detail-container">
      <div>
        <Link to="/home">
          <button className="btn-detail">
            <img src={leftArrow} className="back-detail" alt="Back" />
          </button>
        </Link>

        <div className="detail-name">
          <h1>{recipe?.name}</h1>
        </div>

        <div className="container-img">
          <img src={recipe?.image} alt={recipe?.name} className="detail-img" />
        </div>

        <div className="container-detail-score">
          <h3 className="detail-score">{recipe?.healthScore}</h3>
        </div>

        <div className="container-detail-diets">
        {recipe?.diets && recipe.diets.length > 0
        ? recipe.diets.join(", ")
        : ""}
        </div>

        <hr />

        <div
          className="detail-summary"
          dangerouslySetInnerHTML={{ __html: recipe?.summary }}
        ></div>

        <hr />

        <div className="container-detail-steps">
        {recipe.steps?.map((step, index) => (
         <div key={index}>
         <p className="detail-steps">{step}</p>
         </div>
          ))}
       
        </div>

        <hr />

        <div className="id">
          <p className="detail-id">{recipe?.id}</p>
        </div>
      </div>
    </div>
  );
};

export default Detail;
