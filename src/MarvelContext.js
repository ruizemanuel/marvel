import { createContext, useContext, useEffect, useState } from "react";

const MarvelContext = createContext(undefined)

export const MarvelProvider = ({children}) => {
    const [comics, setComics] = useState([])
    const [characters, setCharacters] = useState([])

    const URL_COMICS = process.env.REACT_APP_API_COMICS_MARVEL
    const URL_CHARACTERS = process.env.REACT_APP_API_CHARACTERS_MARVEL

  const getComics = async () => {
    try {
      const res = await fetch(URL_COMICS).then(result => result.json())
      const onlyComics = res.data.results.filter((comic) => Number(comic.issueNumber) > 0)
      setComics(onlyComics)
    } catch (e) {
      console.log('error', e)
    }

  }

  const getCharacters = async () => {
    try {
      const res = await fetch(URL_CHARACTERS).then(result => result.json())
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