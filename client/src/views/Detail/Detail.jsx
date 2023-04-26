import style from "./Detail.module.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDetaillRecipe, cleanDetail } from "../../redux/actions";
import Loading from "../../components/Loading/Loading";

const Detail = ({ recipeId }) => {
  const dispatch = useDispatch();
  // cuando se monta, que haga el dispatch
  // useEffect()---- useDispatch()
  useEffect(() => {
    dispatch(cleanDetail());
  }, [dispatch]);

  let detail = useSelector((state) => state.recipe);

  useEffect(() => {
    dispatch(getDetaillRecipe(recipeId));
  }, [recipeId]);

  const dietsResults =
    detail.create === false
      ? detail.diets?.map((d) => <p>{d}</p>)
      : detail.diets?.map((d) => <p>{d.name}</p>);

  return (
    <>
      {detail.id ? (
        <section>
          <h1>{detail.nombre}</h1>
          <div className={style.divContainerDetailImg}>
            <div className={style.divDishTypeContainer}>
              <h4>Dish Type</h4>
              <div>
                {detail.tipoPlato?.map((t) => (
                  <p>{t}</p>
                ))}
              </div>
            </div>
            <div className={style.containerImg}>
              <h2>Health score</h2>
              <p> {detail.nivelSaludable}</p>
              <img src={detail.imagen} alt="" />
            </div>

            <div className={style.typeOfDietsContainer}>
              <h4>Type of diets</h4>
              {dietsResults}
            </div>
          </div>

          <div className={style.ContainerInfo}>
            <div className={style.sumaryRecipeContainer}>
              <h3>Summary</h3>
              <p>{detail.resumenPlato.replace(/<[^>]*>?/gm, "")}</p>
            </div>

            <div className={style.pasoApasoContainer}>
              <h3>The recipe step by step</h3>
              {detail.pasoApaso?.map((p) => p.map((pp) => <p>{pp}</p>))}
            </div>
          </div>
        </section>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default Detail;
