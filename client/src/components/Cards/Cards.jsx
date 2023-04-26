import style from "./Cards.module.css";
import Card from "../Card/Card";
// import { useSelector } from "react-redux";

const Cards = (props) => {
  return (
    <>
      {/* <div>
        {recipes.map((r) => {
          return (
            <Card
              id={r.id}
              name={r.nombre}
              imagen={r.imagen}
              diets={r.dietas}
            />
          );
        })}
        <h1>hola</h1>
      </div> */}

      <Card
        nivelSaludable={props.nivelSaludable}
        id={props.id}
        name={props.name}
        imagen={props.imagen}
        diets={props.diets}
      />
    </>
  );
};

export default Cards;
