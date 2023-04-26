import style from "./Card.module.css";
import { Link } from "react-router-dom";

const Card = (props) => {
  return (
    <div className={style.mainContainer}>
      <article className={style.cardsContainer}>
        <h2> {props.name}</h2>

        <img src={props.imagen} alt=" imagen de receta" />
        <div>
          <div className={style.divDiets}>
            <h3> Diets</h3>

            {props.diets?.map((d, index) => {
              return <p key={index}> {d?.name}</p>;
            })}
          </div>
        </div>
      </article>
      <div className={style.buttonContainer}>
        <Link to={`/detail/${props.id}`}>
          <button className={style.buttonCards}>{"Read Recipe--" + ">"}</button>
        </Link>
      </div>
      <div className={style.cotainerHealth}>
        {" "}
        Health score: {props.nivelSaludable}
      </div>
    </div>
  );
};

export default Card;
