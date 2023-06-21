import SearchBar from "../SearchBar/SearchBar";


const NavBar = ({ setCurrentPage }) => {
    return(
        <div>
            <div>
                <SearchBar setCurrentPage = {setCurrentPage} />
            </div>
        </div>
    )
}

export default NavBar;