
import React, { useState, useRef, useEffect } from 'react'
import './AutocompleteInput.css';

function AutocompleteInput({ options }) {
    const [showOptions, setShowOptions] = useState(false);
    const [album, setAlbum] = useState('');
    const autocompleteRef = useRef(null)

    const selectAlbumHandler = (newAlbumValue) => {
        setAlbum(newAlbumValue);
        setShowOptions(false);
    };

    useEffect(() => {
        window.addEventListener("mousedown", clickOutsideHandler);
        return () => {
            window.addEventListener("mousedown", clickOutsideHandler);
        }
    }, []);

    const clickOutsideHandler = (ev) => {
        if (autocompleteRef &&
            autocompleteRef.current &&
            !autocompleteRef.current.contains(ev.target)
        ) {
            setShowOptions(false)
        }
    }

    return (
        <div className="autocomplete" ref={autocompleteRef}>
            <input
                onClick={() => setShowOptions(!showOptions)}
                value={album}
                onChange={e => setAlbum(e.target.value)}
            />
            {showOptions &&
                <ul className="options">
                    {
                        options
                            .filter(opt => opt.title.toLowerCase().indexOf(album.toLowerCase()) >= 0)
                            .map(opt => (<li
                                key={opt.id}
                                onClick={() => selectAlbumHandler(opt.title)}
                                tabIndex="0"
                            >
                                {opt.title}
                            </li>))
                    }
                </ul>
            }
        </div>
    )
}

export default AutocompleteInput
