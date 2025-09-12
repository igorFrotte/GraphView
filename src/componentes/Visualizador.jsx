import { useState } from "react";
import git from "../assets/img/git.png";
import styled from "styled-components"; 

export default function Visualizador() {
    const [inputValue, setInputValue] = useState("");
    const [graph, setGraph] = useState({});
    const [errorMsg, setErrorMsg] = useState("error");

    function handleForm(e){
        e.preventDefault();
    
        const num = parseInt(inputValue, 10);
    
        if (isNaN(num) || num < 5 || num > 20) {
          setErrorMsg("Digite um número entre 5 e 20.");
          setGraph({});
        } else {
          const obj = {};
          setErrorMsg("");
          for (let i = 0; i <= num; i++) {
              obj[i] = {dest:1, cost:2, next:{dest:3, cost:4, next:null}};
          }
          setGraph(obj);
        }
    };

    function showLine(line){
        let value = <></>;
        console.log(line);
        while(line != null){
            value = <>{value} {"  -->  "} <Edge><div>{line.dest}</div><div>{line.cost}</div></Edge></>;
            line = line.next;
        }   
        return value; 
    }

    return (
      <Page>
        {errorMsg && <p>{errorMsg}</p>}

        <form onSubmit={handleForm}>
            <input
            type="number"
            min="5"
            max="20"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Digite de 5 a 20"
            />
            <button type="submit"> Enviar </button>
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
