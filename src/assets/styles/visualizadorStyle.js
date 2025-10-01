import styled from "styled-components";

export const Git = styled.a`
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

export const Page = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  font-family: "Roboto";

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

export const Text = styled.div`
  font-size: 22px;
  font-weight: 600;
  margin-top: 10px;
  color: #000000;
`;

export const TextDown = styled.div`
  font-size: 22px;
  font-weight: 600;
  margin-top: 20px;
  color: #000000;
`;

export const Graph = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 18px;

  & > div {
    display: flex;
    align-items: center;
    margin-top: 10px;
  }
`;

export const Pointers = styled.div`
  display: flex;
  align-items: center;

  @media (max-width: 480px) {
    flex-wrap: wrap;
  }
`;

export const Node = styled.div`
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

export const Edge = styled.div`
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

export const MsgE = styled.div`
  color: #963232;
  font-size: 20px;
  font-weight: 600;
  margin: 20px 0px;
  text-align: center;
`;

export const Buttons = styled.div`
  display: flex;
  margin: 10px;
`;

export const Steps = styled.div`
  font-size: 20px;
  font-weight: 600;
  padding: 8px;
  background-color: ${(props) => props.bg || "#444"};
  color: white;
  border-radius: 6px;
  margin-top: 20px;
  border: 2px solid black;
`;

export const VetDisplay = styled.div`
  margin-top: 10px;
  font-size: 18px;
  font-weight: 600;
  text-align: center;

  & > p {
    margin: 5px;
  }
`;