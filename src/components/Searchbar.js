import React, { useState, useEffect } from 'react';

const Searchbar = (props) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState(props.countries);

  useEffect(() => {
    console.log('useeff search');
    getSuggestions();
  }, [searchTerm]);

  useEffect(() => {
    console.log('useeffect results');
    console.log(results);
    props.setSearchResultList(results);
  }, [results]);

  // https://developer.mozilla.org/en/docs/Web/JavaScript/Guide/Regular_Expressions#Using_Special_Characters
  function escapeRegexCharacters(str) {
    //to escaperegex
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  const wrapSearchTerm = (country, term) => {
    return (
      <span key={country}>
        {country.split(term).reduce((prev, current, foundPos) => {
          if (!foundPos) {
            return [current];
          }
          return prev.concat(
            <b key={`${current}_${foundPos}`}>{term}</b>,
            current
          );
        }, [])}
      </span>
    );
  };

  const getSuggestions = () => {
    if (searchTerm.length === 0) {
      console.log('zero');
      setResults(props.countries);
    } else {
      const regex = new RegExp('^' + searchTerm, 'i');

      const filteredResults = props.countries.filter((country) =>
        regex.test(country.name)
      );
      setResults(filteredResults);
    }
  };

  const onChangeSearch = (e) => {
    //setSearchTerm(escapeRegexCharacters(e.target.value));
    const enteredValue = e.target.value;
    const firstUpperValue =
      enteredValue.charAt(0).toUpperCase() + enteredValue.slice(1);
    //todo extract first upper function in utils
    setSearchTerm(firstUpperValue);
  };

  const renderedResults = results.map((country, i) => (
    <div
      key={`${country.name}_${i}`}
      className="item"
      countrycode={country.value}
      onClick={(e) => {
        props.onSelect(country.value);
        setSearchTerm(country.name);
      }}
    >
      {wrapSearchTerm(country.name, searchTerm)}
    </div>
  ));

  return (
    <div>
      <div className="ui form">
        <div className="field">
          <label>Enter country</label>
          <input value={searchTerm} onChange={onChangeSearch} />
        </div>
        <div>{renderedResults}</div>
      </div>
    </div>
  );
};

export default Searchbar;
