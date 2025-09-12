import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Visualizador from './componentes/Visualizador'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Visualizador />
  </StrictMode>,
)
