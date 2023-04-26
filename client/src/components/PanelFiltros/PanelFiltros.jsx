import { useState, useEffect } from "react";
import style from "./PanelFiltros.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  getDiets,
  filterCardsTypyDiets,
  orderCardsAlfa,
  orderCardsHealScore,
  orderCardsCreateR,
} from "../../redux/actions";

const PanelFiltros = () => {
  const dispatch = useDispatch();

  const changeHanlderDiets = (event) => {
    const value = event.target.value;
    console.log(value);
    dispatch(filterCardsTypyDiets(value));
  };

  const handleOrderChangeAlfa = (event) => {
    const value = event.target.value;

    dispatch(orderCardsAlfa(value));
  };

  const handleOrderChangeNivelSalu = (event) => {
    const value = event.target.value;

    dispatch(orderCardsHealScore(value));
  };

  const handleOrderChangeCreate = (event) => {
    const value = event.target.value;

    dispatch(orderCardsCreateR(value));
  };

  useEffect(() => {
    dispatch(getDiets());
  }, []);
  const dietasData = useSelector((state) => state.dietas);

  return (
    <div className={style.panelContainer}>
      <select onChange={handleOrderChangeCreate}>
        <option>Create True</option>
        <option value="All">All Recipes</option>
        <option value="create">Recipes Create</option>
      </select>

      <select onChange={handleOrderChangeNivelSalu}>
        <option>Health Score</option>
        <option value="Ascendiente_nivelSaludable">
          Ascendente Health Score
        </option>
        <option value="Descendiente_nivelSaludable">
          Descendente Health Score
        </option>
      </select>
      <select onChange={handleOrderChangeAlfa}>
        <option>A-Z---Z-A</option>
        <option value="Ascendiente_alfa">Ascendente Alfabético</option>
        <option value="Descendiente_alfa">Descendente Alfabético</option>
      </select>
      <select onChange={changeHanlderDiets} name="dietas">
        <option name="default">Filter diets</option>
        {dietasData.map((d, index) => {
          return (
            <option key={index} value={d.name}>
              {d.name}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default PanelFiltros;
