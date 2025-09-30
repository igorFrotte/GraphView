import { useState } from "react";
import git from "../assets/img/git.png";
import * as Style from "../assets/styles/visualizadorStyle.js";

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
          <Style.Edge>
            {" --> "}
            <div style={{ borderColor: isActive ? "yellow" : "black" }}>{line.dest}</div>
            <div style={{ borderColor: isActive ? "yellow" : "black" }}>{line.cost}</div>
          </Style.Edge>
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
    <Style.Page>
      <Style.Text>Tamanho do Grafo:</Style.Text>
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
          <Style.Text>Informe a Aresta do Grafo:</Style.Text>
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

          {errorMsg && <Style.MsgE>{errorMsg}</Style.MsgE>}

          <Style.Graph>
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
                  <Style.Node style={{ backgroundColor: bg }}>{key}</Style.Node>
                  <Style.Pointers>{showLine(key, line)}</Style.Pointers>
                </div>
              );
            })}
          </Style.Graph>
            
          <Style.TextDown>Nós para Gerar Todos os Caminhos:</Style.TextDown>
          <Style.Buttons>
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
          </Style.Buttons>

          <p>
            Passo {currentStep + 1} / {steps.length}{" "}
            {currentStepData.type && `(${currentStepData.type})`}
          </p>
        </>
      )}
      <Style.Git target="_blank" href="https://github.com/igorFrotte/GraphView">
        <img src={git} />
      </Style.Git>
    </Style.Page>
  );
}
