import React, {useState, useEffect} from 'react'

const useDebounce = (val, offset) => { //Defines a custom hook useDebounce, which takes two parameters
                                       // val value to debounce, offset delay time in miliseconds
    const [debouncedVal, setDebouncedVal] = useState(val)

    useEffect(() => {
        const timeoutRef = setTimeout(() => { //Sets up a useEffect hook that runs every time 
                                              //the val changes afte "X" offset
            setDebouncedVal(val);
        }, offset);
        
        return () => {
            clearTimeout(timeoutRef) //Cleans up the timeout by calling clearTimeout when the component
                                     // re-renders or when val changes.
        }
    }, [val])

    return debouncedVal;
}

export default useDebounce;