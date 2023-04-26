// import Cards from "../../components/Cards/Cards";
import { useState } from "react";
import style from "./Wrapper.module.css";

const Wrapper = ({ pagina, setPagina, maximo }) => {
  const [input, setInput] = useState(1);

  const nexPage = () => {
    setInput(parseInt(input) + 1);
    setPagina(parseInt(pagina) + 1);
  };
  const previosPage = () => {
    setInput(parseInt(input) - 1);
    setPagina(parseInt(pagina) - 1);
  };

  const onKeyDown = (e) => {
    console.log(e.value);
    if (e.keyCode == 13) {
      setPagina(parseInt(e.target.value));
    }
    if (
      parseInt(e.target.value < 1) ||
      parseInt(e.target.value) > Math.ceil(maximo) ||
      isNaN(parseInt(e.target.vale))
    ) {
      setPagina(1);
      setInput(1);
    } else {
      setPagina(parseInt(e.target.value));
    }
  };
  const onChange = (e) => {
    setInput(e.target.value);
  };

  return (
    <div className={style.container}>
      <button disabled={pagina === 1 || pagina < 1} onClick={previosPage}>
        <svg viewBox="0 0 69 69" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M55.1429 0H13.7857C6.17207 0 0 6.17847 0 13.8V55.2C0 62.8215 6.17207 69 13.7857 69H55.1429C62.7565 69 68.9286 62.8215 68.9286 55.2V13.8C68.9286 6.17847 62.7565 0 55.1429 0Z"
            fill="#242424"
          />
          <path
            d="M47.2647 53.1508C46.9674 53.3056 46.6335 53.3764 46.299 53.3557C45.9645 53.3349 45.6419 53.2234 45.3659 53.0329L21.4699 36.4725C21.2257 36.3031 21.0262 36.077 20.8884 35.8136C20.7505 35.5503 20.6786 35.2573 20.6786 34.9599C20.6786 34.6625 20.7505 34.3697 20.8884 34.1062C21.0262 33.8428 21.2257 33.6167 21.4699 33.4474L45.3659 16.8869C45.6417 16.6959 45.9645 16.584 46.2992 16.5634C46.6339 16.5428 46.9678 16.6143 47.2649 16.7701C47.562 16.9259 47.8108 17.16 47.9844 17.4473C48.1581 17.7345 48.2499 18.0637 48.25 18.3993V51.5204C48.25 51.8563 48.1583 52.1859 47.9846 52.4732C47.8109 52.7607 47.562 52.9948 47.2647 53.1508Z"
            fill="white"
          />
        </svg>
      </button>
      <input
        onChange={onChange}
        onKeyDown={(e) => onKeyDown(e)}
        name="page"
        autoComplete="off"
        value={input}
      />
      <p>de {maximo}</p>
      <button
        disabled={pagina === Math.ceil(maximo) || pagina > Math.ceil(maximo)}
        onClick={nexPage}
      >
        <svg
          width="69"
          height="69"
          viewBox="0 0 69 69"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M55.2143 0H13.8572C6.24351 0 0.0714417 6.17847 0.0714417 13.8V55.2C0.0714417 62.8215 6.24351 69 13.8572 69H55.2143C62.8279 69 69 62.8215 69 55.2V13.8C69 6.17847 62.8279 0 55.2143 0Z"
            fill="#242424"
          />
          <path
            d="M21.7357 53.1508C22.0321 53.3056 22.3671 53.3764 22.7007 53.3557C23.0357 53.3349 23.3583 53.2234 23.634 53.0329L47.5301 36.4725C47.7741 36.3031 47.974 36.077 48.1119 35.8136C48.2497 35.5503 48.3214 35.2573 48.3214 34.9599C48.3214 34.6625 48.2497 34.3697 48.1119 34.1062C47.974 33.8428 47.7741 33.6167 47.5301 33.4474L23.634 16.8869C23.3583 16.6959 23.0357 16.584 22.7007 16.5634C22.3657 16.5428 22.0321 16.6143 21.7357 16.7701C21.4379 16.9259 21.1898 17.16 21.0161 17.4473C20.8424 17.7345 20.75 18.0637 20.75 18.3993V51.5204C20.75 51.8563 20.8424 52.1859 21.0161 52.4732C21.1898 52.7607 21.4379 52.9948 21.7357 53.1508Z"
            fill="white"
          />
        </svg>
      </button>
    </div>
  );
};

export default Wrapper;
