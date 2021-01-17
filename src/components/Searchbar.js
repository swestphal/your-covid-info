import React, { useState, useEffect, useRef } from 'react';
import styles from '../styles/Searchbar.module.scss'
import { FiGlobe } from "react-icons/fi";

const Searchbar = (props) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState(props.countries);
  const [openAutosuggest, setOpenAutosuggest] = useState(false)
  const [found, setFound] = useState('');
  const ref = useRef(null);
  const refInput = useRef(null);

  useEffect(() => {
    console.log('useeff search');
    getSuggestions();
  }, [searchTerm]);

  useEffect(() => {
    console.log('useeffect results');
    props.setSearchResultList(results);
  }, [results]);
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(e) {
      console.log(refInput.current.getAttribute("data-country-code"))
      if (ref.current && !ref.current.contains(e.target)) {
        console.log("click outside", found)
      }
    }

    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      console.log("unbind")
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);

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
      setResults(props.countries);
    } else {
      const regex = new RegExp('^' + searchTerm, 'i');

      const filteredResults = props.countries.filter((country) =>
        regex.test(country.name)
      );
      setOpenAutosuggest(true)
      setResults(filteredResults);
    }
  };

  const onChangeSearch = (e) => {
    //setSearchTerm(escapeRegexCharacters(e.target.value));
    const enteredValue = e.target.value;
    const firstUpperValue =
      enteredValue.charAt(0).toUpperCase() + enteredValue.slice(1);
    // TODO extract first upper function in utils
    setSearchTerm(firstUpperValue);
  };

  const clearAutosuggest = (e) => {
    console.log(e)
    setSearchTerm('');
    setOpenAutosuggest(false);
  }


  const renderedResults = results.map((country, i) => (
    <div
      key={`${country.name}_${i}`}
      className={`${styles.Search__autosuggest_item} theme__search__autosuggest_item`}
      countrycode={country.value}
      onClick={(e) => {
        setFound(country.value)
        props.onSelect(country.value);
        setSearchTerm(country.name);
      }}
    >
      {wrapSearchTerm(country.name, searchTerm)}
    </div>
  ));

  return (
    <div>
      <div className={styles.Search} ref={ref} >
        <div className={`${styles.Search__input} theme__search__input`}>

          <input ref={refInput} value={searchTerm} onClick={(e) => clearAutosuggest(e)} onChange={onChangeSearch} data-country-code={found} /><FiGlobe></FiGlobe>
        </div>
        <div className={`${styles.Search__autosuggest}  theme__search__autosuggest ${openAutosuggest === true && found !== true ? 'active' : ''}`}>{renderedResults}</div>
      </div>
    </div>
  );
};

export default Searchbar;

// TODO when click outside of input close autosuggest
