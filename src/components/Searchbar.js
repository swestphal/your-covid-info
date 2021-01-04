import React, { useState } from 'react';

const Searchbar = (props) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState(props.countries);

  // https://developer.mozilla.org/en/docs/Web/JavaScript/Guide/Regular_Expressions#Using_Special_Characters
  function escapeRegexCharacters(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }
  const getSuggestions = () => {
    if (searchTerm.length > 0) {
      const regex = new RegExp('^' + searchTerm, 'i');

      const filteredResults = props.countries.filter((country) =>
        regex.test(country.name)
      );
      const filteredCountries = filteredResults.map((country) => {
        return (
          <div key={country.value} className="item">
            <div className="content">
              <div className="header">{country.name}</div>
            </div>
          </div>
        );
      });
      setResults(filteredCountries);
    }
  };

  const onChangeSearch = (e) => {
    setSearchTerm(escapeRegexCharacters(e.target.value));
    getSuggestions();
  };
  return (
    <div>
      <div className="ui form">
        <div className="field">
          <label>Enter country</label>
          <input value={searchTerm} onChange={onChangeSearch} />
        </div>
      </div>
      <div>{results}</div>
    </div>
  );
};

export default Searchbar;
