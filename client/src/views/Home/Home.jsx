import Cards from "../../components/Cards/Cards";
import PanelFiltros from "../../components/PanelFiltros/PanelFiltros";
import style from "./Home.module.css";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllRecipes } from "../../redux/actions";
import Wrapper from "../../components/Wrapper/Wrapper";
import Loading from "../../components/Loading/Loading";

const Home = (props) => {
  const [data, setData] = useState();
  // cuando se monta, que haga el dispatch
  // useEffect()---- useDispatch()
  const dispatch = useDispatch();
  let recipes = useSelector((state) => state.recipes);
  useEffect(() => {
    dispatch(getAllRecipes());
  }, [dispatch]);

  console.log(recipes);
  useEffect(() => {
    setData(recipes);
  }, [recipes]);

  const [pagina, setPagina] = useState(1);
  const [porPagina, setporPagina] = useState(9);
  // maximo de paginas de acuerdo a la cantidad de recetas que tenga
  let maximo = Math.ceil(data?.length / porPagina);

  // lo que contiene esta variable si la cantidad de receta es menor a 10 me las muestre en la pagina 1
  const valor =
    recipes?.length < 10
      ? recipes?.map((r, index) => (
          <Cards
            key={index}
            nivelSaludable={r.nivelSaludable}
            id={r.id}
            name={r.nombre}
            imagen={r.imagen}
            diets={r.diets}
          />
        ))
      : recipes
          ?.slice(
            (pagina - 1) * porPagina,
            (pagina - 1) * porPagina + porPagina
          )
          ?.map((r, index) => (
            <Cards
              key={index}
              nivelSaludable={r.nivelSaludable}
              id={r.id}
              name={r.nombre}
              imagen={r.imagen}
              diets={r.diets}
            />
          ));

  const results = valor;

  return (
    <>
      {recipes?.length > 0 ? (
        <div className={style.containeHome}>
          <PanelFiltros />
          <h1>Available Recipes</h1>
          <div className={style.divContainerCardsHome}>{results}</div>
          <Wrapper maximo={maximo} pagina={pagina} setPagina={setPagina} />
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default Home;
