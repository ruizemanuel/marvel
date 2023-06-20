import { createContext, useContext, useEffect, useState } from "react";

const MarvelContext = createContext(undefined)

export const MarvelProvider = ({children}) => {
    const [comics, setComics] = useState([])
    const [characters, setCharacters] = useState([])

    const APIKEY = process.env.REACT_APP_API_APIKEY
    const HASH = process.env.REACT_APP_API_HASH

  const getComics = async () => {
    try {
      const res = await fetch(`https://gateway.marvel.com/v1/public/comics?limit=60&ts=1&apikey=${APIKEY}&hash=${HASH}`).then(result => result.json())
      const onlyComics = res.data.results.filter((comic) => Number(comic.issueNumber) > 0)
      setComics(onlyComics)
    } catch (e) {
      console.log('error', e)
    }

  }

  const getCharacters = async () => {
    try {
      const res = await fetch(`https://gateway.marvel.com/v1/public/characters?limit=60&ts=1&apikey=${APIKEY}&hash=${HASH}`).then(result => result.json())
      setCharacters(res.data.results)
    } catch (e) {
      console.log('error', e)
    }

  }

  useEffect(() => {
    getComics()
    getCharacters()
  }, [])
    return <MarvelContext.Provider value={{comics, characters}} >{children}</MarvelContext.Provider>
}

export const useMarvel = () => useContext(MarvelContext)