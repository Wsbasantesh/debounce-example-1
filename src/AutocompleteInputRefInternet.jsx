import React, { useState } from 'react'
import './AutocompleteInput.css';

const AutocompleteInput = ({ options }) => {
    const [display, setDisplay] = useState(false);
    const [search, setSearch] = useState("");

    const updatePokeDex = poke => {
        setSearch(poke);
        setDisplay(false);
    };

    return (
        <div className="flex-container flex-column pos-rel">
            <input
                id="auto"
                onClick={() => setDisplay(!display)}
                placeholder="Type to search"
                value={search}
                onChange={event => setSearch(event.target.value)}
            />
            {display && (
                <div className="autoContainer">
                    {options
                        .filter(({ title }) => title.indexOf(search.toLowerCase()) > -1)
                        .map(({ title, id }) => {
                            return (
                                <div
                                    onClick={() => updatePokeDex(title)}
                                    classtitle="option"
                                    key={id}
                                    tabIndex="0"
                                >
                                    <span>{title}</span>
                                </div>
                            );
                        })}
                </div>
            )}
        </div>
    );
};

export default AutocompleteInput;