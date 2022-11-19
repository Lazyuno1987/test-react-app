import React, { useState, useEffect } from 'react';

import './App.css';

import { Input, Li } from './App.styled';
import axios from 'axios';
import { v4 } from 'uuid';

let count;
function Home() {
  const [data, setData] = useState([]);
  const [selectedCountryHolidays, setselectedCountryHolidays] = useState([]);

  const [countryFull, setcountryFull] = useState();

  let countFull;

  const ListItems = items => {
    return (
      <ul>
        {items?.items.map(el => (
          <li
            onClick={onCountyClick}
            className="link-item"
            key={el.countryCode}
          >{el.name}
          </li>
        ))}
      </ul>
    );
  };

  useEffect(() => {
    axios
      .get('https://date.nager.at/api/v3/AvailableCountries')
      .then(response => {
        setData(response.data);
      })
      .catch(error => console.log('Axios error: ', error));
  }, []);

  const handleChange = (e) => {
    
    if (e.target.value) {
      const newData = data?.filter(el => el.name.includes( e.target.value))
      setData(newData)
    } else if (e.target.value === '') {
      axios
      .get('https://date.nager.at/api/v3/AvailableCountries')
      .then(response => {
        setData(response.data);
      })
      .catch(error => console.log('Axios error: ', error));
    }
  
     
}

  const onCountyClick = e => {
    countFull = e?.target?.textContent?.trim();
    setcountryFull(countFull);
    data?.map(el => {
      if (e?.target?.textContent?.trim() === el.name) {
        axios
          .get(
            `https://date.nager.at/api/v3/NextPublicHolidays/${el.countryCode}`
          )
          .then(response => {
            setselectedCountryHolidays(response.data);
          })
          .catch(error => console.log('Axios error: ', error));
      }
      return count;
    });
  };
  return (
    <div className="container">
      <h1>React Test</h1>
      <div className="body">
        <div className="search-area">
          <section className="search-field">
            <form>
              <label htmlFor="search">Search text</label>
              {/* #2 On the input, filter the countries listed below */}
              <Input
                onChange={handleChange}
                placeholder={countryFull ? countryFull : 'Write a country'}
                id="search"
                type="text"
              />
            </form>
          </section>
          <ListItems items={data}></ListItems>
        </div>
        <div className="info-area">
          {selectedCountryHolidays?.map(item => (
            <Li key={v4()}>
              <h3>Hollyday Name: {item.localName}</h3>
              {item.launchYear && <p>LaunchYear: {item.launchYear}</p>}
              <p>Date: {item.date}</p>
              {item.counties && (
                <p>
                  Countries:{' '}
                  {item && item?.counties?.map(county => <span>{county}</span>)}
                </p>
              )}
            </Li>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
