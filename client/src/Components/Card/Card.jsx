import { useNavigate } from "react-router-dom";
import "../Card/Card.css";


const Card = ({ id, name, image, diets }) => {
  const navigate = useNavigate();

  return (
    <div onClick={() => navigate(`/detail/${id}`)} className="card-container">
        <div className="card-name">
        <h1 className="name-card">{name}</h1>
        </div>
        <div className="card-image">
            <img src={image} className="image-card"/>
        </div>
        <div className="card-diets">
          {diets?.map((diet, index) => (
            <p key={index} className="diets-card">{diet}</p>
          ))}
        </div>
    </div>
  )
}

export default Card;