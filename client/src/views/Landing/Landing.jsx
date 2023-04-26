import style from "./Landing.module.css";
import { Link } from "react-router-dom";

const Landing = () => {
  // const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(getAllRecipes());
  // }, [dispatch]);
  return (
    <div className={style.containerLanding}>
      <h1>HENRY PI FOOD</h1>
      <Link to="/home">
        <button>Go to Home</button>
      </Link>
    </div>
  );
};

export default Landing;
