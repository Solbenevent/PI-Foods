import { Link } from "react-router-dom";

const Landing = () => {
    return (
     <div>
        <div>
            <h1>This is the Landing Page</h1>
        </div>
        <div>
            <Link to = "/home">
            <button>Ingresar</button>
            </Link>
        </div>
     </div>
    )
}

export default Landing;