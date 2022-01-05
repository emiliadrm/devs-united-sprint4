import React, { useContext } from "react"
import { Route, Routes } from "react-router-dom"

/*ESTILOS*/
import './styles/style.css';
import './styles/desktop.css';
import './styles/mobile.css';

/*CONTEXTO*/
import { AppContext } from "./context/AppProvider"

/*IMPORTACION DE PAGINAS PARA LAS RUTAS*/
import LoginPage from "./pages/LoginPage";
import Perfil from "./pages/UserProfile"
import Feed from "./pages/FeedPage"
import Config from "./pages/ConfigPage"


function App() {
 
  const context = useContext(AppContext)

  return (
    <div className="App">
      <Routes>
        {context.user ? (<Route path="/" element={<Feed />}/>) 
        : 
        (<Route path="/" element={<LoginPage />} />)}
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/config" element={<Config />} />
      </Routes>
    </div>
  );
}


export default App;