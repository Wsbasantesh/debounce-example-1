import React, { useState } from 'react'
import './AutocompleteInput.css';

function AutocompleteInput({ options }) {
    const [showOptions, setShowOptions] = useState(false);
    const [album, setAlbum] = useState('')

    const selectElementHandler = (newAlbumValue) => {
        setAlbum(newAlbumValue);
        setShowOptions(false);
    };

    return (
        <div className="autocomplete">
            <input
                onClick={() => setShowOptions(!showOptions)}
                value={album}
                onChange={e => setAlbum(e.target.value)}
            />
            {showOptions &&
                <ul className="options">
                    {
                        options
                            .filter(opt => opt.title.indexOf(album) >= 0)
                            .map(opt => (<li
                                key={opt.id}
                                onClick={() => selectElementHandler(opt.title)}
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
