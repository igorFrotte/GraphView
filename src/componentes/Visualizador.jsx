import { useState } from "react";
import git from "../assets/img/git.png";
import styled from "styled-components"; 

export default function Visualizador() {


    return (
      <Page>
        <Pointers>
            <div>oblkgfnbklgfnlkfgbkngfbli</div>
        </Pointers>
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

const Pointers = styled.div`
    & > div {
        background-color: #447390;
        width: 150px;
        padding: 10px;
        margin: 5px;
        border-radius: 5px;
        flex-direction: column;

        & > div:first-child {
            font-weight: bold;
            font-size: 22px;
        }

        & > div {
            display: flex;
            margin: 3px;
            font-size: 18px;

            & > div {
                padding: 0 5px;
            }
        }
    }
`;
