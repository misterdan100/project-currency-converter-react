import { useState, useEffect } from "react";
import styled from "@emotion/styled";
import ImagenCripto from "./img/imagen-criptos.png";
import Formulario from "./components/Formulario";
import Resultado from "./components/Resultado";
import Spinner from "./components/Spinner";

const Contenedor = styled.div`
position: relative;
  max-width: 900px;
  width: 90%;
  margin: 0 auto 10px;
  @media (min-width: 992px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem;
  }
`;

const Imagen = styled.img`
  max-width: 400px;
  width: 80%;
  margin: 100px auto 0 auto;
  display: block;
`;

const Heading = styled.h1`
  font-family: "Lato", sans-serif;
  color: #fff;
  text-align: center;
  font-weight: 700;
  margin-top: 80px;
  margin-bottom: 50px;
  font-size: 34px;

  &::after {
    content: "";
    width: 90%;
    height: 6px;
    background-color: #66a2fe;
    display: block;
    margin: 10px auto 0 auto;
  }
`;

const Credits = styled.p`
  font-family: "Lato", sans-serif;
  font-style: italic;
  color: #fff;
  font-size: 10px;
  margin-top: 30px;
  /* position: absolute;
  bottom: 10px; */
  a {
    color: #69a4fb;
  }
`;

function App() {
  const [monedas, setMonedas] = useState({});
  const [resultado, setResultado] = useState({});
  const [cargando, setCargando] = useState(false);

  useEffect(() => {
    if (Object.keys(monedas).length > 0) {
      const { moneda, criptomoneda } = monedas;

      //* Get data from API
      const cotizarCripto = async () => {
        setCargando(true);
        setResultado({});

        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`;
        const respuesta = await fetch(url);
        const resultado = await respuesta.json();
        setResultado(resultado.DISPLAY[criptomoneda][moneda]);

        setCargando(false);
      };
      cotizarCripto();
    }
  }, [monedas]);

  return (
    <Contenedor>
      <Imagen src={ImagenCripto} alt="imagenes criptomonedas" />

      <div>
        <Heading>Cotizador de Criptomonedas al Instante</Heading>
        <Formulario setMonedas={setMonedas} setResultado={setResultado} />
        {cargando && <Spinner />}
        {resultado && resultado.PRICE && <Resultado resultado={resultado} />}
      </div>

      <Credits className="credits">
        Developed by{" "}
        <a href="https://github.com/misterdan100" target="_blank">
          Daniel Caceres
        </a>
      </Credits>
    </Contenedor>
  );
}

export default App;
