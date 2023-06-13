import { useNavigate } from "react-router-dom";



const Card = ({ id, name, image, diets }) => {
  const navigate = useNavigate();

  return (
    <div onClick={() => navigate(`/detail/${id}`)}>
        <div>
        <label>{name}</label>
        </div>
        <div>
            <img src={image}/>
        </div>
        <div>
          {diets?.map((diet, index) => (
            <p key={index}>{diet}</p>
          ))}
        </div>
    </div>
  )
}

export default Card;