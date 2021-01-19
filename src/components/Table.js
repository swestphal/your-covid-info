import React, { useState, useEffect } from 'react'
import styles from '../styles/Table.module.scss';

const Table = ({ countries }) => {
    const [activeCol, setActiveCol] = useState('country');
    const [activeColToggle, setActiveColToggle] = useState({});
    const [sortedCountries, setSortedCountries] = useState([]);

    useEffect(() => {

        setSortedCountries(countries)
    }, [countries]); // eslint-disable-line react-hooks/exhaustive-deps

    function sortByColumn(a, colIndex, reverse) {
        console.log(colIndex)
        if (reverse === true) {
            a.sort(sortFunction).reverse();
        } else {
            a.sort(sortFunction);
        }

        function sortFunction(a, b) {

            if (a[colIndex] === b[colIndex]) {
                return 0;
            } else {
                return (a[colIndex] < b[colIndex]) ? -1 : 1;
            }
        }
        return a;
    }

    const colKeys = [
        { name: '', key: 'flag', size: 0 },
        { name: 'Country', key: 'name', size: 2 },
        { name: 'Case / People', key: 'oneCasePerPeople', size: 1 },
        { name: 'Death / People', key: 'oneDeathPerPeople', size: 1 },
        { name: 'Test / People', key: 'oneTestPerPeople', size: 1 },
        { name: 'Test / Mio', key: 'testsPerOneMillion' }]

    const handleSortClick = (key) => {

        const prevState = activeColToggle[key] ? true : false;
        if (activeCol === key) {
            setActiveColToggle({ ...activeColToggle, [key]: !prevState });
            const newCountries = (sortByColumn(sortedCountries, activeCol, !prevState))
            setSortedCountries(newCountries);
            console.log(sortedCountries)
        } else {
            setActiveCol(key);
        }
    }

    const renderedTableHeading =
        colKeys.map((colKey) => {
            return (
                <th
                    key={colKey.key}
                    onClick={() => handleSortClick(colKey.key,)}> { colKey.name}
                    <span
                        className={activeCol === colKey.key ? styles.Table__toggle_active : ''}
                    > {colKey.key !== 'flag' ? activeColToggle[colKey.key] ? '↑' : '↓' : ''}
                    </span >
                </th >)
        })


    return (
        <>
            <table className={styles.Table__countryTable}>
                <thead>
                    <tr>
                        {renderedTableHeading}
                    </tr>
                </thead>
                <tbody>
                    {sortedCountries.map((country, i) => {

                        return (<tr key={i}>
                            <td><img src={country.flag} /></td>
                            <td>{country.name}</td>
                            <td>{country.oneCasePerPeople}</td>
                            <td>{country.oneDeathPerPeople}</td>
                            <td>{country.oneTestPerPeople}</td>
                            <td>{country.testsPerOneMillion}</td>
                        </tr>
                        )
                    })}
                </tbody>
            </table>
        </ >
    )
}


export default Table
