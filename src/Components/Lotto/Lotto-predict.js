
import './Lotto-predict.css';
import React, { useState } from 'react';
import * as tf from "@tensorflow/tfjs";

function LottoPredict() {
  // Declare a new state variable, which we'll call "count"
  const [lottos, setLotto] = useState([]);

  const createLottoIem =() => {
    let lotto = [];
    while (lotto.length < 6) {
      const r = Math.floor((Math.random() * 58) + 1);
      const i = lotto.findIndex((x) => x === r);
      console.log(r, i)
      if (i === -1) { lotto.push(r); }
    }

    const clone = Array.from(lottos);
    clone.push(lotto);
    setLotto(clone);
    console.log(clone)
  }

  const listLotos = (a) => a.map((lotto, index) => <li key={index}>{lotto.join(",")}</li>)

  const tensorA = tf.tensor(lottos);
  
  return (
    <div>
      <h2>Tensor data {tensorA.rank} {tensorA.shape} </h2>
      <button onClick={() => createLottoIem()}>
        Add Number
      </button>
      <div>
        <ol>
          {listLotos(lottos)}
        </ol>
      </div>


     


    </div>
  );
}

export default LottoPredict;