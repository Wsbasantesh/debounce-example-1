import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import './AutocompleteInput.css';
import useDebounce from './hooks/useDebounce';

function AutocompleteInput() {
    const [showOptions, setShowOptions] = useState(false); //Initialises showOptions to control wheere the options are displayed
    const autocompleteRef = useRef(null);
    const [cardName, setCardName] = useState('');
    const debouncedCardName = useDebounce(cardName, 600); //Debounces the cardName input to reduce API calls, delaying updates by 600ms.
    const [options, setOptions] = useState([]);

    const selectCardHandler = (newCardValue) => {
        setCardName(newCardValue);
        setShowOptions(false);
    };

    useEffect(() => {
        window.addEventListener('mousedown', clickOutsideHandler); //Adds an event listener to detect clicks outside 
        return () => {                                             //the autocomplete component and cleans it up when the component unmounts
            window.removeEventListener('mousedown', clickOutsideHandler);
        };
    }, []);

    const clickOutsideHandler = (ev) => {
        if ( //Checks if a click occurred outside the component and hides the dropdown if true.
            autocompleteRef &&
            autocompleteRef.current &&
            !autocompleteRef.current.contains(ev.target)
        ) {
            setShowOptions(false);
        }
    };

    useEffect(() => {
        if (!debouncedCardName.trim()) {
            setOptions([]);
            return; //Clears the options if the debounced input is empty.
        }

        axios
            .get('https://db.ygoprodeck.com/api/v7/cardinfo.php/names') //Makes a GET request to fetch all card names from the API
            .then(({ data }) => {
                const filteredData = data?.data?.filter((opt) =>
                    opt.name.toLowerCase().includes(debouncedCardName.toLowerCase())
                );
                setOptions(filteredData || []); //filters the API response to include only names matching the debounced input
            })
            .catch((err) => {
                console.error(err);
                setOptions([]);
            });
    }, [debouncedCardName]);

    return (
        <div className="autocomplete" ref={autocompleteRef}>
            <input
                onClick={() => setShowOptions(!showOptions)} //shows the current value, and updates the input state
                value={cardName}
                onChange={(e) => setCardName(e.target.value)}
            />
            {showOptions && options.length > 0 && (
                <ul className="options">
                    {options.map((opt) => (
                        <li
                            key={opt.id}
                            onClick={() => selectCardHandler(opt.name)}
                            tabIndex="0"
                        >
                            {opt.name} 
                        </li>
                    ))} 
                </ul>
            )}
        </div> //Maps over the options array to render each card name as a list item
    );
}

export default AutocompleteInput;
