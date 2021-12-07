import React from "react";
/*import contextoData from "../dataContexto"; -- AQUI IRIA EL ARRAY SACADO DE USEEFFECT*/

export const APIContext = React.createContext();

export default function AppProvider({ children }) {
  return (
    <APIContext.Provider value={{ /*contextData*/ }}>
      {children}
    </APIContext.Provider>
  );
}