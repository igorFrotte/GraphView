import { useState } from "react";
import git from "../assets/img/git.png";
import styled from "styled-components"; 

export default function Visualizador() {
    const [graphLength, setGraphLength] = useState("");
    const [graph, setGraph] = useState({});
    const [errorMsg, setErrorMsg] = useState("error");
    const [origem, setOrigem] = useState("");
    const [destino, setDestino] = useState("");
    const [custo, setCusto] = useState("");
    const [showGraph, setShowGraph] = useState(false);

    function handleSubmit(e){
        e.preventDefault();

        const o = parseInt(origem, 10);
        const d = parseInt(destino, 10);
        const c = parseInt(custo, 10);

        if (isNaN(o) || isNaN(d) || isNaN(c)) {
        setErrorMsg("Todos os campos devem ser números.");
        return;
        }
        if (o <= 0 || d <= 0 || c <= 0) {
        setErrorMsg("Todos os valores devem ser positivos e não nulos.");
        return;
        }
        if (o > graphLength || d > graphLength) {
        setErrorMsg(`Origem e destino devem ser menores ou iguais a ${graphLength}.`);
        return;
        }

        setErrorMsg("");
        insertEdge(o, d, c);
    }

    function handleForm(e){
        e.preventDefault();
    
        const num = parseInt(graphLength, 10);
    
        if (isNaN(num) || num < 5 || num > 20) {
          setErrorMsg("Digite um número entre 5 e 20.");
          setGraph({});
        } else {
          const obj = {};
          setErrorMsg("");
          for (let i = 0; i <= num; i++) {
              obj[i] = {dest:1, cost:2, next:{dest:3, cost:4, next:null}}; //null
          }
          setGraph(obj);
          setShowGraph(true);
        }
    }

    function showLine(line){
        let value = <></>;
        while(line != null){
            value = <>{value} {"  -->  "} <Edge><div>{line.dest}</div><div>{line.cost}</div></Edge></>;
            line = line.next;
        }   
        return value; 
    }

    function insertList(next, d, c){
        let newL = {
            dest : d,
            cost : c,
            next : next
        };
        return newL;
    }
    
    function insertEdge(o, d, c){
        let newGraph = { ...graph };
        newGraph[o] = insertList(graph[o], d, c);
        setGraph(newGraph);
    }

    return (
      <Page>
        {errorMsg && <p>{errorMsg}</p>}

        <form onSubmit={handleForm}>
            <input
            type="number"
            min="5"
            max="20"
            value={graphLength}
            onChange={(e) => setGraphLength(e.target.value)}
            placeholder="Digite de 5 a 20"
            />
            <button type="submit"> Enviar </button>
        </form>

        {showGraph && (
            <>
                <form onSubmit={handleSubmit} className="flex flex-col gap-3 max-w-xs">
                    <input
                    type="number"
                    placeholder="Origem"
                    value={origem}
                    onChange={(e) => setOrigem(e.target.value)}
                    className="border px-2 py-1 rounded"
                    />
                    <input
                    type="number"
                    placeholder="Destino"
                    value={destino}
                    onChange={(e) => setDestino(e.target.value)}
                    className="border px-2 py-1 rounded"
                    />
                    <input
                    type="number"
                    placeholder="Custo"
                    value={custo}
                    onChange={(e) => setCusto(e.target.value)}
                    className="border px-2 py-1 rounded"
                    />

                    <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                    Enviar
                    </button>
                </form>

                <Graph>
                    {Object.entries(graph).map(([key, line]) => (
                        <div key={key}>
                        <Node>{key}</Node>
                        <Pointers>
                            {showLine(line)}
                        </Pointers>
                        </div>
                    ))}
                </Graph>
            </>
        )}
        <Git href="https://github.com/igorFrotte">
            <img src={git} />
        </Git>
      </Page>
    );
}

const Git = styled.a`
    position: fixed;
    top: 30px;
    right: 30px;
    
    img {
        width: 80px;
        border-radius: 20px;
    }

`;

const Page = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    font-family: 'Raleway';

    div {
        display: flex;
        align-items: center;
        justify-content: center;
    }
`;

const Graph = styled.div`
    display: flex;
    flex-direction: column;

    & > div {
        display: flex;
    }
`;

const Pointers = styled.div`
    border: 3px solid red;
`;

const Node = styled.div`
    border: 3px solid black;
`;

const Edge = styled.div`
    border: 3px solid blue;

    & > div {
        border: 3px solid yellow;
    }
`;
