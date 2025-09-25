import { useState } from "react";
import git from "../assets/img/git.png";
import styled from "styled-components";

export default function Visualizador() {
  const [graphLength, setGraphLength] = useState("");
  const [graph, setGraph] = useState({});
  const [errorMsg, setErrorMsg] = useState("");
  const [origem, setOrigem] = useState("");
  const [destino, setDestino] = useState("");
  const [custo, setCusto] = useState("");
  const [showGraph, setShowGraph] = useState(false);
  const [origemBusca, setOrigemBusca] = useState("");
  const [destinoBusca, setDestinoBusca] = useState("");

  // Estados do backtracking
  const [steps, setSteps] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);

  function handleSubmit(e) {
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
      setErrorMsg(`Origem e destino devem ser menores ou iguais ao tamanho.`);
      return;
    }

    setErrorMsg("");
    setOrigem("");
    setDestino("");
    setCusto("");
    insertEdge(o, d, c);
  }

  function handleForm(e) {
    e.preventDefault();

    const num = parseInt(graphLength, 10);

    if (isNaN(num) || num < 1 || num > 10) {
      setErrorMsg("Digite um número entre 1 e 10.");
      setGraph({});
    } else {
      const obj = {};
      setErrorMsg("");
      for (let i = 0; i <= num; i++) {
        obj[i] = null;
      }
      setGraph(obj);
      setShowGraph(true);
    }
  }

  function showLine(key, line) {
    let value = <></>;
    while (line != null) {
      const isActive =
        steps[currentStep]?.type === "aresta" &&
        steps[currentStep]?.from === parseInt(key) &&
        steps[currentStep]?.to === line.dest;

      value = (
        <>
          {value}
          <Edge>
            {" --> "}
            <div style={{ borderColor: isActive ? "yellow" : "black" }}>{line.dest}</div>
            <div style={{ borderColor: isActive ? "yellow" : "black" }}>{line.cost}</div>
          </Edge>
        </>
      );
      line = line.next;
    }
    return value;
  }

  function insertList(next, d, c) {
    let newL = {
      dest: d,
      cost: c,
      next: next,
    };
    return newL;
  }

  function insertEdge(o, d, c) {
    let newGraph = { ...graph };
    newGraph[o] = insertList(graph[o], d, c);
    setGraph(newGraph);
  }

  function path(d, p, vet, snapshots) {
    const current = vet[p - 1];
  
    // Evento: entrou no nó atual
    snapshots.push({
      type: "visita",
      node: current,
      path: [...vet.slice(0, p)],
    });
  
    if (current === d) {
      // Encontrou destino
      snapshots.push({
        type: "encontrou",
        node: current,
        path: [...vet.slice(0, p)],
      });
      return;
    }
  
    let l = graph[current];
    while (l != null) {
      // verifica apenas os elementos do caminho atual (0..p-1)
      if (!vet.slice(0, p).includes(l.dest)) {
        // Evento: explorando aresta
        snapshots.push({
          type: "aresta",
          from: current,
          to: l.dest,
          path: [...vet.slice(0, p)],
        });
  
        vet[p] = l.dest;
        path(d, p + 1, vet, snapshots);
  
        // limpar a posição adicionada para não "vazar" para outros ramos
        vet[p] = undefined;
  
        // Evento: backtracking (voltou do destino)
        snapshots.push({
          type: "backtrack",
          node: current,
          path: [...vet.slice(0, p)],
        });
      }
      l = l.next;
    }
  }

  function generateSteps() {
    const o = parseInt(origemBusca, 10);
    const d = parseInt(destinoBusca, 10);
  
    if (isNaN(o) || isNaN(d)) {
      setErrorMsg("Origem e destino devem ser números.");
      return;
    }
    if (o < 0 || d < 0 || o > graphLength || d > graphLength) {
      setErrorMsg("Origem e destino devem estar dentro do tamanho do grafo.");
      return;
    }

    setErrorMsg("");
    let vet = [o];
    let snapshots = [];
    path(d, 1, vet, snapshots);
  
    // reset final
    snapshots.push({ type: "final", path: [] });
  
    setSteps(snapshots);
    setCurrentStep(0);
  }  

  function nextStep() {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  }

  const currentStepData = steps[currentStep] || {};

  return (
    <Page>
      <Text>Tamanho do Grafo:</Text>
      <form onSubmit={handleForm}>
        <input
          type="number"
          min="1"
          max="10"
          value={graphLength}
          onChange={(e) => setGraphLength(e.target.value)}
          placeholder=""
        />
        <button type="submit"> Enviar </button>
      </form>

      {showGraph && (
        <>
          <Text>Informe a Aresta do Grafo:</Text>
          <form onSubmit={handleSubmit}>
            <input
              type="number"
              placeholder="Origem"
              value={origem}
              onChange={(e) => setOrigem(e.target.value)}
            />
            <input
              type="number"
              placeholder="Destino"
              value={destino}
              onChange={(e) => setDestino(e.target.value)}
            />
            <input
              type="number"
              placeholder="Custo"
              value={custo}
              onChange={(e) => setCusto(e.target.value)}
            />

            <button type="submit">Enviar</button>
          </form>

          {errorMsg && <MsgE>{errorMsg}</MsgE>}

          <Graph>
            {Object.entries(graph).map(([key, line]) => {
              const nodeId = parseInt(key);
              let bg = "rgb(91, 119, 141)";

              if (currentStepData.type === "visita" && currentStepData.node === nodeId) {
                bg = "blue";
              } else if (
                currentStepData.type === "backtrack" &&
                currentStepData.node === nodeId
              ) {
                bg = "red";
              } else if (
                currentStepData.type === "encontrou" &&
                currentStepData.path?.includes(nodeId)
              ) {
                bg = "green";
              } else if (currentStepData.path?.includes(nodeId)) {
                bg = "orange";
              }

              return (
                <div key={key}>
                  <Node style={{ backgroundColor: bg }}>{key}</Node>
                  <Pointers>{showLine(key, line)}</Pointers>
                </div>
              );
            })}
          </Graph>
            
          <TextDown>Nós para Gerar Todos os Caminhos:</TextDown>
          <Buttons>
            <input
                type="number"
                placeholder="Origem"
                value={origemBusca}
                onChange={(e) => setOrigemBusca(e.target.value)}
            />
            <input
                type="number"
                placeholder="Destino"
                value={destinoBusca}
                onChange={(e) => setDestinoBusca(e.target.value)}
            />
            <button onClick={generateSteps}>Gerar</button>
            <button
              onClick={nextStep}
              disabled={currentStep >= steps.length - 1}
            >
              Próximo
            </button>
          </Buttons>

          <p>
            Passo {currentStep + 1} / {steps.length}{" "}
            {currentStepData.type && `(${currentStepData.type})`}
          </p>
        </>
      )}
      <Git target="_blank" href="https://github.com/igorFrotte/GraphView">
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
    border-radius: 20%;
  }

  @media (max-width: 480px) {
    top: 10px;
    right: 10px;

    img {
      width: 40px;
    }
  }
`;

const Page = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  font-family: "Raleway";

  input {
    width: 80px;
    height: 40px;
    background: #ffffff;
    border-radius: 5px;
    font-size: 14px;
    color: #031634;
    padding-left: 10px;
    margin: 10px;
  }

  button {
    width: 100px;
    height: 40px;
    border-radius: 5px;
    font-size: 16px;
    color: #323131;
    cursor: pointer;
    font-weight: 600;
    margin: 10px;
  }

  @media (max-width: 480px) {
    input {
      width: 70px;
      margin: 10px 5px;
      height: 30px;
    }
    button {
      width: 80px;
      height: 30px;
    }
  }
`;

const Text = styled.div`
  font-size: 22px;
  font-weight: 600;
  margin-top: 10px;
  color: #000000;
`;

const TextDown = styled.div`
  font-size: 22px;
  font-weight: 600;
  margin-top: 20px;
  color: #000000;
`;

const Graph = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 18px;

  & > div {
    display: flex;
    align-items: center;
    margin-top: 10px;
  }
`;

const Pointers = styled.div`
  display: flex;
  align-items: center;

  @media (max-width: 480px) {
    flex-wrap: wrap;
  }
`;

const Node = styled.div`
  border: 2px solid black;
  min-width: 50px;
  min-height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgb(91, 119, 141);
  margin: 0px 10px;
  color: white;
  font-weight: bold;
`;

const Edge = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  & > div {
    border: 2px solid black;
    width: 50px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgb(134, 157, 174);
    margin-top: 5px;
  }
`;

const MsgE = styled.div`
  color: #963232;
  font-size: 20px;
  font-weight: 600;
  margin: 20px 0px;
  text-align: center;
`;

const Buttons = styled.div`
  display: flex;
  margin: 10px;
`;
