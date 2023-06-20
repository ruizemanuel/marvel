import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMarvel } from "../MarvelContext";

function SearchBar() {
    const [filteredData, setFilteredData] = useState([]);
    const [wordEntered, setWordEntered] = useState("");
    const [show, setShow] = useState(false)

    const { characters } = useMarvel()
    const { comics } = useMarvel()

    const handleFilter = (event) => {
        setShow(true)
        const searchWord = event.target.value;
        setWordEntered(searchWord);
        const newCharacters = characters.filter((value) => {
            return value.name.toLowerCase().includes(searchWord.toLowerCase());
        });

        const newComics = comics.filter((value) => {
            return value.title.toLowerCase().includes(searchWord.toLowerCase());
        });

        const newFilter = [...newCharacters, ...newComics];

        if (searchWord === "") {
            setFilteredData([]);
            setShow(false)
        } else {
            setFilteredData(newFilter);
        }
    };

    const clearInput = () => {
        setFilteredData([]);
        setWordEntered("");
        setShow(false)
    };

    return (
        <div className="search">
            <div className="searchInput">
                <input
                    type="text"
                    placeholder='Buscar...'
                    value={wordEntered}
                    onChange={(e) => handleFilter(e)}
                />

            </div>
            {show ? <FontAwesomeIcon className="clearBtn" icon={faClose} onClick={clearInput} /> : null}

            {filteredData.length !== 0 && (
                <div className="dataResult">
                    {filteredData.slice(0, 15).map((value) => {
                        return (

                            <Link
                                key={value.id}
                                to={value.title ? `/comics/${value.id}` : `/characters/${value.id}`}
                                onClick={clearInput}
                                className="dataItem"
                            >
                                <span>{value.name || value.title}</span>
                            </Link>


                        );
                    })}
                </div>
            )}
        </div>
    );
}

export default SearchBar;