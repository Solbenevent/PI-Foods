//import searchImage from "../Images/busqueda.png"
import { Link } from "react-router-dom";

const SearchBar = () => {
  return (
    <div>
        <input type ="search" placeholder="Search a recipe"/>
       {/* <button><img src={searchImage} alt ="searchIcon"/></button> */}
       <Link to = "/create">
       <button>Create a Recipe!</button>
       </Link>
    </div>
  )
}

export default SearchBar;