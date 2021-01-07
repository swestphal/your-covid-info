import React from 'react';

export const daysFromTodayInDate = (days) => {
  var d = new Date();
  d.setDate(d.getDate() - days);
  return d.toISOString().split('T')[0].replace(/-/g, '/');
};

// https://developer.mozilla.org/en/docs/Web/JavaScript/Guide/Regular_Expressions#Using_Special_Characters
export const escapeRegexCharacters = (str) => {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
};

export const wrapStringWithTag = (country, term) => {
  console.log(country);
  console.log(term);
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
