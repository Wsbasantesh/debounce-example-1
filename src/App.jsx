import { useState, useEffect } from 'react';
import axios from 'axios';
import AutocompleteInput from './AutocompleteInputDebounce';
import './App.css';
//needed imports

function App() { // main app component
   const [options, setOptions] = useState([]); //variable iniciator

   useEffect(() => {
     axios.get('https://db.ygoprodeck.com/api/v7/cardinfo.php/names') //makes a GET request to the YGOProDeck API to fetch card names
     .then(({ data }) => {
       console.log(data); 
       const names = data?.data?.map(card => card.name) || [];
       setOptions(names);
     }) //processes the API response
     .catch(err => console.error(err));
   }, []);

   console.log(options);

   return ( // Returns the JSX for rendering the component
     <div className="App"> 
       <p className="title">
         React Debounce example on YUGIOH Card API
       </p>
       <AutocompleteInput options={options} />
     </div>
   );
}

export default App; //export the component
