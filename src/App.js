import { useState } from 'react';
import './App.css';
import SearchBar from './components/SearchBar';
import SearchResult from './components/SearchResults';
import SearchResultList from './components/SearchResultList';

function App() {

  const [results, setResults] = useState([])
  const [fieldsNames, setFieldsNames] = useState([])
  const [searchValue, setSearchValue] = useState("");
  const [selectedFieldName, setSelectedFieldName] = useState(null); // Khởi tạo bằng null hoặc một giá trị mặc định

  const handleSearchValueChange = (value) => {
    setSearchValue(value);
  };

  return (
    <div className='container' style={{background: "grey", height: 360}}>
      <SearchBar setResults={setResults} setFieldsNames={setFieldsNames} onInputChange={handleSearchValueChange} />
      <SearchResult results={results} fieldsNames={fieldsNames} searchValue={searchValue} setSelectedFieldName={setSelectedFieldName} />
      <SearchResultList selectedFieldName={selectedFieldName} searchValue={searchValue}/>
    </div>
  );
}

export default App;
