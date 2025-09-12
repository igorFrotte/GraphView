import { StrictMode } from 'react'
import GlobalStyle from "./assets/styles/globalStyles";
import { createRoot } from 'react-dom/client'
import Visualizador from './componentes/Visualizador'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GlobalStyle />
    <Visualizador />
  </StrictMode>,
)
