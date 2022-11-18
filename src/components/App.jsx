import React, { useState, useEffect } from 'react'
// import ReactDOM from 'https://esm.sh/react-dom@18.2.0'
import './App.css';
import axios from 'axios'
import {v4} from 'uuid'
function App() {
  const [data, setData] = useState([]);
  const [selectedCountryHolidays, setselectedCountryHolidays] = useState([]);
  const [country, setCountry] = useState()
  let count;
  const ListItems = (items) => {
   // console.log(items.items)
    return (
      <ul>
        {items?.items.map(el => (<li key={el.countryCode}>{el.name}</li>))}
      </ul>
    )
  }


  useEffect(() => {
  
    axios
      .get('https://date.nager.at/api/v3/AvailableCountries')
      .then((response) => {
        //console.log("Data Items: ", response.data)
        setData(response.data)
      })
      .catch(error => console.log("Axios error: ", error));

   
  }, []);
 
  const handleChange = (e) => {
   
    data?.map(el => {
      if (e.target.value === el.name) {
      
        count = el.countryCode
      }
    })
    return setCountry(count)
   
  }
 
  
  const onCountyClick = (e) => {
e.preventDefault()
    if (country) {
      axios
        .get(`https://date.nager.at/api/v3/NextPublicHolidays/${country}`)
        .then((response) => {
         
          setselectedCountryHolidays(response.data)
        })
        .catch(error => console.log("Axios error: ", error));
    }

  }                      
  return (
    
    <div className="container">
      <h1>React Test</h1>
      <div className="body">
        <div className="search-area">
          <section className="search-field" >
            <form onSubmit={onCountyClick}>
<label htmlFor="search">Search text</label>
            {/* #2 On the input, filter the countries listed below */}
            <input id="search" type="text" onChange={handleChange} />
            <button type='submit'>Choose</button>
            </form>
            
          </section>
          <ListItems items={data}></ListItems>
        </div>
        <div className="info-area">
          {selectedCountryHolidays?.map(item => (
            <div key={v4()}>
              <h3>{item.name}</h3>
              <p>launchYear: {item.launchYear}</p>
              <p>date: {item.date}</p>
              {/* <p>countries: {item && item?.counties.map(country => <span>{country}</span>)}</p> */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;