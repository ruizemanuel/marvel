import { createContext, useContext, useEffect, useState } from "react";

const MarvelContext = createContext(undefined)

export const MarvelProvider = ({children}) => {
    const [comics, setComics] = useState([])
    const [characters, setCharacters] = useState([])

    const URL_COMICS = process.env.REACT_APP_API_COMICS_MARVEL
    const URL_CHARACTERS = process.env.REACT_APP_API_CHARACTERS_MARVEL

  const getComics = async () => {
    //console.log('URL', URL_COMICS)
    try {
      const res = await fetch(URL_COMICS).then(result => result.json())

      console.log('RESULTADO SIN FILTRO', res.data.results)
      const onlyComics = res.data.results.filter((comic) => Number(comic.issueNumber) > 0)
      console.log('RESULTADO', onlyComics)
      setComics(onlyComics)
    } catch (e) {
      console.log('error', e)
    }

  }

  const getCharacters = async () => {
    //console.log('URL', URL_COMICS)
    try {
      const res = await fetch(URL_CHARACTERS).then(result => result.json())
      //const onlyCharacters = res.data.results.filter((comic) => Number(comic.issueNumber) > 0)
      console.log('RESULTADOSSSSS', res.data.results)
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