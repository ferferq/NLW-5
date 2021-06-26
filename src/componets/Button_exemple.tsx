import { useState } from "react";

type ButtonProps = {
  text: string;
  number: number;
}

export function ButtonTeste (props: ButtonProps) {
  const [contador, SetContador] = useState(0);

  function Increment () {
    let contador2 = contador + 2;

    SetContador(contador2);
    console.log(contador2);
  }
  
  return (
  <button onClick={Increment}>Indice {props.number} LOCAL {props.text} contador:{contador}</button>
  );
}