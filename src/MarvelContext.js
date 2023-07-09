import { createContext, useContext, useState } from "react";

const MarvelContext = createContext(undefined)

export const MarvelProvider = ({ children }) => {
  const [historietas, setHistorietas] = useState([])
  const [personajes, setPersonajes] = useState([])

  
  return <MarvelContext.Provider value={{ historietas, personajes, setHistorietas, setPersonajes }} >{children}</MarvelContext.Provider>
}

export const useMarvel = () => useContext(MarvelContext)