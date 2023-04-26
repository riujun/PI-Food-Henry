import { useState, useEffect } from "react";
import style from "./Form.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getDiets, postData } from "../../redux/actions";

const validate = (form) => {
  const errors = {};

  if (form.nombre === "") {
    errors.nombre = "Se requiere nombre";
  }
  if (form.resumenPlato === "") {
    errors.resumenPlato = "Se requiere que ingrese informacion";
  }
  if (form.nivelSaludable <= 0) {
    errors.nivelSaludable = "Ingrese un nivel saludable superior a 0";
  }
  if (form.pasoApaso.length === 0) {
    errors.pasoApaso = "Ingresa mas informacion en el campo paso a paso";
  }
  if (form.imagen === "") {
    errors.imagen = "Se requiere una url";
  }

  return errors;
};

const Form = () => {
  const recipes = useSelector((state) => state.recipesInfo);

  const [form, setForm] = useState({
    nombre: "",
    resumenPlato: "",
    nivelSaludable: 0,
    pasoApaso: [],
    imagen: "",
    dietas: [],
  });
  const [errors, setErrors] = useState({
    nombre: "",
    resumenPlato: "",
    nivelSaludable: "",
    pasoApaso: [],
    imagen: "",
  });

  const changeHanlderForm = (event) => {
    const propiedad = event.target.name;
    let value;

    if (event.target.name === "nivelSaludable") {
      value = Number(event.target.value);
      setForm({
        ...form,
        [propiedad]: value,
      });
    } else if (propiedad === "pasoApasos") {
      value = event.target.value;
      setForm({
        ...form,
        pasoApaso: [[value]],
      });
    } else if (propiedad === "dietas") {
      value = Number(event.target.value);
      console.log(value);
      setForm({ ...form, dietas: [...form.dietas, value] });
    } else {
      value = event.target.value;
      setForm({
        ...form,
        [propiedad]: value,
      });
    }

    setErrors(
      validate({
        ...form,
        [propiedad]: value,
      })
    );
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getDiets());
  }, []);
  const dietasData = useSelector((state) => state.dietas);

  const dietasSelecionadas = dietasData.filter((item) =>
    form.dietas.includes(item.id)
  );

  const submitHandler = (event) => {
    event.preventDefault();
    // ayudara a saber si tengo una receta con el mismo nombre creado
    let newRecipe = true;
    recipes.map((reci) => {
      if (reci.nombre === form.nombre) {
        newRecipe = false;
      }
    });
    const errors = validate(form);
    setErrors(errors);
    // si tengo errores en mo formulario no me dejara hacer el envio
    if (Object.keys(errors).length === 0) {
      // tengo la recet o no
      if (newRecipe) {
        dispatch(postData(form));
        alert("Complete data");
        setErrors({
          nombre: "",
          resumenPlato: "",
          nivelSaludable: "",
          pasoApaso: [],
        });
        setForm({
          nombre: "",
          resumenPlato: "",
          nivelSaludable: 0,
          pasoApaso: [],
          imagen: "",
          dietas: [],
        });
      } else {
        alert("this recipe already exists");
      }
    } else {
      alert("You Must Correct Errors");
    }
  };

  return (
    <section className={style.containerSectionForm}>
      <form className={style.formContainer} onSubmit={submitHandler}>
        <div className={style.containerForm}>
          <div className={style.containerIndividual}>
            <label className={style.label} htmlFor="nombre">
              Recipe Title:
            </label>
            <input
              type="text"
              name="nombre"
              value={form.nombre}
              onChange={changeHanlderForm}
              className={style.input}
            />
            {errors.nombre}
          </div>
          <div>
            <label className={style.label} htmlFor="resumenPlato">
              Summary:
            </label>
            <input
              type="text"
              name="resumenPlato"
              onChange={changeHanlderForm}
              value={form.resumenPlato}
              className={style.input}
            />
            {errors.resumenPlato}
          </div>
        </div>
        <div className={style.containerForm}>
          <div className={style.containerIndividual}>
            <label className={style.label} htmlFor="nivelSaludable">
              Health Score:
            </label>
            <input
              type="number"
              name="nivelSaludable"
              onChange={changeHanlderForm}
              value={form.nivelSaludable}
              className={style.input}
            />
            {errors.nivelSaludable}
          </div>

          <div>
            <label className={style.label} htmlFor="pasoApasos">
              StepsReceipt:
            </label>
            {/* pasoApaso */}
            <input
              type="text"
              name="pasoApasos"
              onChange={changeHanlderForm}
              value={form.pasoApaso}
              className={style.input}
            />
            {errors.pasoApaso}
          </div>
        </div>
        <div className={style.containerForm}>
          <div className={style.containerIndividual}>
            <label className={style.label} htmlFor="imagen">
              image Recipe:
            </label>
            <input
              type="text"
              name="imagen"
              onChange={changeHanlderForm}
              value={form.imagen}
              className={style.input}
            />
            {errors.imagen}
          </div>

          <div>
            <select onChange={changeHanlderForm} name="dietas">
              <option>Type of Diets</option>
              {dietasData.map((d) => {
                return <option value={d.id}>{d.name}</option>;
              })}
            </select>
          </div>
        </div>
        <div className={style.divContainerButton}>
          <button type="submit">
            <span className={style.button_top}>Create Recipe</span>
          </button>
          <span className={style.dietsSelec}>
            {dietasSelecionadas.map((n) => (
              <p>{n.name}</p>
            ))}
          </span>
        </div>
      </form>
    </section>
  );
};

export default Form;
