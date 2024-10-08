import { getElizaResponseToInput } from "./ElizaMachine.ts";
import { useState } from "react";
import { Chatter } from "./Definitions.ts";

const initialChatter = [
  { name: "Eliza", text: "Hello how can I help you today." } as Chatter,
];

export default function Eliza() {
  const [chatter, setChatter] = useState(initialChatter);
  const [input, setInput] = useState("");

  return (
    <div>
      <main>
        <article>
          <p>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />

            <button
              onClick={() => {
                setInput("");
                const clone = [
                  {
                    name: "Eliza",
                    text: getElizaResponseToInput(input),
                  } as Chatter,
                  { name: "You", text: input } as Chatter,
                ];
                const temp = [...clone, ...chatter];
                setChatter(temp);
                localStorage.setItem("chatter", JSON.stringify(temp));
              }}
            >
              Send
            </button>
          </p>

          <br />
          <ul id="conversation">
            {chatter.map((s, index) => (
              <li key={index}>
                <b>{s.name}</b> -- {s.text}{" "}
              </li>
            ))}
          </ul>
        </article>
      </main>
    </div>
  );
}
