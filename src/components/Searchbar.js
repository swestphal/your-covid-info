import React, { useState, useEffect } from 'react';

const Searchbar = (props) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState(props.countries);

  useEffect(() => {
    getSuggestions();
  }, [searchTerm]);

  // https://developer.mozilla.org/en/docs/Web/JavaScript/Guide/Regular_Expressions#Using_Special_Characters
  function escapeRegexCharacters(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  const wrapSearchTerm = (country, term) => {
    return (
      <span>
        {country.split(term).reduce((prev, current, foundPos) => {
          if (!foundPos) {
            return [current];
          }
          return prev.concat(<b key={term + current}>{term}</b>, current);
        }, [])}
      </span>
    );
  };

  const getSuggestions = () => {
    if (searchTerm.length > 0) {
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
    console.log('onchange:', e.target.value);
  };

  const renderedResults = results.map((country) => (
    <div key={country.value} className="item">
      <div className="content">
        <div className="header">{wrapSearchTerm(country.name, searchTerm)}</div>
      </div>
    </div>
  ));

  return (
    <div>
      <div className="ui form">
        <div className="field">
          <label>Enter country</label>
          <input value={searchTerm} onChange={onChangeSearch} />
        </div>
      </div>
      <div>{renderedResults}</div>
    </div>
  );
};

export default Searchbar;
