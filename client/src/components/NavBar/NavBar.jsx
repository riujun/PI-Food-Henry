import { Link } from "react-router-dom";
import style from "./NavBar.module.css";
import SearchBar from "../SearchBar/SearchBar";

const NavBar = (props) => {
  return (
    <>
      <div className={style.navBarDivContainer}>
        <Link to="/home">Home</Link>
        <Link to="/create">FORM</Link>

        {
          <SearchBar
            recipesQuerySearch={props.recipesQuerySearch}
            setRecipesQuerySearch={props.setRecipesQuerySearch}
            // submitHandler={props.submitHandler}
          />
        }
      </div>
    </>
  );
};

export default NavBar;
