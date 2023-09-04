import { useState } from 'react';
import './App.css';
import SearchBar from './components/SearchBar';
import SearchResult from './components/SearchResults';
import SearchResultList from './components/SearchResultList';

function App() {

  const [results, setResults] = useState([])
  const [finalResults, setFinalResults] = useState([])
  const [fieldsNames, setFieldsNames] = useState([])
  const [searchValue, setSearchValue] = useState("");

  const handleSearchValueChange = (value) => {
    setSearchValue(value);
  };

  console.log(finalResults);

  return (
    <div className='container' style={{background: "grey", height: 360}}>
      <SearchBar setResults={setResults} setFieldsNames={setFieldsNames} onInputChange={handleSearchValueChange} />
      <SearchResult results={results} fieldsNames={fieldsNames} searchValue={searchValue} setFinalResults={setFinalResults}/>
      <SearchResultList finalResults={finalResults}/>
    </div>
  );
}

export default App;
