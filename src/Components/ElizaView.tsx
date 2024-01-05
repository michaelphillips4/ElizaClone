import {getElizaResponseToInput} from "../ElizaMachine.ts"
import React, { useState } from 'react';

type Chatter = {
  name: string
  text: string
}

const initialChatter = [{ name: "Eliza", text: "Hello how can I help you today." } as Chatter];

export default function Eliza() {
  const [chatter, setChatter] = useState(initialChatter);
  const [input, setInput] = useState("");
  
  return <div>
    <main>
      <article>
        <p>

          <span><b>Eliza</b> - {chatter[0].text}</span>
        </p>
        <p>

          <input type="text"
                 value={input}
                 onChange={(e) => setInput(e.target.value)} />

          <button onClick={() => {
            let res = input
            setInput("");
            const clone = [{ name: "Eliza", text: getElizaResponseToInput(res) } as Chatter,
                           { name: "You", text: res } as Chatter];
            const temp = [...clone, ...chatter];
            setChatter(temp);
            localStorage.setItem("chatter", JSON.stringify(temp));
          }} >Send</button>
        </p>
      </article>
      <br />
      <article >
        <details>
          <summary>Conversation</summary>
          <ul id="conversation" >
            {
              chatter.slice(1, chatter.length).map((s, index) => <li key={index}><b>{s.name}</b> -- {s.text} </li>)
            }
          </ul>
        </details>
      </article>
    </main>
  </div >
}