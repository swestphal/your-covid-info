import React, { useState, useEffect } from 'react';
import { useThemeMode } from './useThemeMode';
/* Theme Provider */
import { ThemeProvider } from 'styled-components';
import newsApi from '../apis/newsApi';
import { daysFromTodayInDate } from '../utils'; // need for request to news api e.g. last 30 days
import styles from '../styles/App.module.scss';
import Searchbar from './Searchbar';
import Table from './Table'
/* ThemeProvider is a helper component in the styled-components library that provides theming support.
This helper component injects a theme into all React component below itself via the Context API.
In the rendering tree, all styled-components will have access to the provided theme,
even when they are multiple levels deep.
https://styled-components.com/docs/advanced#theming
 */

import { GlobalStyles } from '../styles/GlobalStyles';
import { lightTheme, darkTheme } from './Themes';
import ThemeToggler from './ThemeToggler';
import News from './News';

require('dotenv').config();

const App = () => {
  /* countries */
  const [countries, setCountries] = useState([]);
  const [activeCountry, setActiveCountry] = useState('www');

  const [searchResults, setSearchResults] = useState([]);

  const onSearchFormSubmit = (countryCode) => {
    console.log(countryCode);
    if (countryCode) {
      setActiveCountry(countryCode);
    }
  };

  const onSearchChange = () => {
    console.log('search changed');
  };
  /* theme */
  const [theme, themeToggler, mountedComponent] = useThemeMode();
  const themeMode = theme === 'light' ? lightTheme : darkTheme;
  const [news, setNews] = useState([]);

  useEffect(() => {
    const getCountriesData = async () => {
      const url = 'https://disease.sh/v3/covid-19/countries';
      await fetch(url)
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => ({
            id: country.countryInfo._id,
            name: country.country,
            value: country.countryInfo.iso2,
            flag: country.countryInfo.flag,
            casesPerOneMillion: country.casesPerOneMillion,
            deathsPerOneMillion: country.deathsPerOneMillion,
            recoveredPerOneMillion: country.recoveredPerOneMillion,
            cases: country.cases,
            deaths: country.deaths,
            revovered: country.recovered,
            testsPerOneMillion: country.testsPerOneMillion,
            tests: country.tests,
            oneCasePerPeople: country.oneCasePerPeople,
            oneDeathPerPeople: country.oneDeathPerPeople,
            oneTestPerPeople: country.oneTestPerPeople,

          }));
          setCountries(countries);
          setSearchResults(countries);
        });

    };
    getCountriesData();
  }, []);

  useEffect(() => {
    const getNewsData = async () => {
      const response = await newsApi.get('/everything', {
        params: {
          language: 'en',
          from: daysFromTodayInDate(30),
          q: 'covid+OR+coronavirus',
          sortBy: 'publishedAt',
        },
      });
      setNews(response.data.articles);
    };
    getNewsData();
  }, []);
  const setSearchResultList = (data) => {
    setSearchResults(data);
  };





  //const newCountries = countries2.compareValues(oneCasePerPeople, 'desc');
  /* return empty div if useThemeMode component is mounted -  this avoids loading the light theme first on
    page reload if user has selected the dark theme */
  if (!mountedComponent) return <div />;
  return (
    /* ThemeProvider is a helper component of the styled-components and wraps everything
        in the return statement and injects any components below it */
    <ThemeProvider theme={themeMode}>
      <>
        <GlobalStyles />
        <ThemeToggler theme={theme} toggleTheme={themeToggler} />
        <div className={`${styles.App} app`}>
          <div className={styles.App__heading}>
            <h1 className={styles.App__title}>Your Covid Info</h1>
          </div>
          <Searchbar
            countries={countries}
            className={styles.App__search}
            setSearchResultList={setSearchResultList}
            onSelect={onSearchFormSubmit}
          ></Searchbar>
          <div className={styles.App__graph}></div>

          <div className={styles.App__countries}>
            <Table countries={countries} />
          </div>

          <div className={styles.App__news}>
            <News news={news} theme={theme} />
          </div>
          <div className={styles.App__top10graph}></div>
          <div className={styles.App__hints}></div>
          <div className={styles.App__map}></div>
        </div>
      </>
    </ThemeProvider >
  );
};

export default App;
