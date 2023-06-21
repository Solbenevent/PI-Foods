import { Link } from "react-router-dom";
import cooking from "../Images/cooking.png";
import "../Landing/Landing.css";

const Landing = () => {
    return (
     <div className="landing-container">
        <div className="container-landing-img">
            <img src ={cooking} alt="chef cooking"/>
        </div>
        <div className="landing-title">
            <h1 className="welcome">WELCOME TO THE API FOODS</h1>
        </div>

       
            <Link to = "/home">
            <button className="btn-landing">Ingresar</button>
            </Link>

     </div>
    )
}

export default Landing;