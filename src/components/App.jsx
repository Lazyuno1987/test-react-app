// import React, { useState, useEffect } from 'react'

// import './App.css';

// import {Button, Input, Li} from './App.styled'
// import axios from 'axios'
// import {v4} from 'uuid'


// function App() {
//   const [data, setData] = useState([]);
//   const [selectedCountryHolidays, setselectedCountryHolidays] = useState([]);
//   const [country, setCountry] = useState()
//   let count;
 
  


//   const ListItems = (items) => {
  
//     return (
//       <ul>
//         {items?.items.map(el => (<li className='link-item' key={el.countryCode}>  {el.name}</li>))}
//       </ul>
//     )
//   }


//   useEffect(() => {
  
//     axios
//       .get('https://date.nager.at/api/v3/AvailableCountries')
//       .then((response) => {
//         // console.log("Data Items: ", response.data)
//         setData(response.data)
//       })
//       .catch(error => console.log("Axios error: ", error));

   
//   }, []);
 
//   const handleChange = (e) => {
   
//     data?.map((el)=>{
//       if (e.target.value === el.name) {
//     count = el.countryCode
//       }
//       return count
//     })
//     return setCountry(count)
   
//   }
 
  
//   const onCountyClick = (e) => {
// e.preventDefault()
//     if (country) {
//       axios
//         .get(`https://date.nager.at/api/v3/NextPublicHolidays/${country}`)
//         .then((response) => {
         
//           setselectedCountryHolidays(response.data)
//         })
//         .catch(error => console.log("Axios error: ", error));
//     }

//   }                      
//   return (
    
//     <div className="container">
//       <h1>React Test</h1>
//       <div className="body">
//         <div className="search-area">
//           <section className="search-field" >
//             <form onSubmit={onCountyClick}>
// <label htmlFor="search">Search text</label>
//             {/* #2 On the input, filter the countries listed below */}
//             <Input placeholder='Write a country' id="search" type="text" onChange={handleChange} />
//             <Button type='submit'>Choose</Button>
//             </form>
            
//           </section>
//           <ListItems items={data}></ListItems>
//         </div>
//         <div className="info-area">
//           {selectedCountryHolidays?.map(item => (
//             <Li key={v4()}>
//               <h3>Hollyday Name: {item.localName}</h3>
//               {item.launchYear && <p>LaunchYear: {item.launchYear}</p>}
//               <p>Date: {item.date}</p>
//               {item.counties && <p>Countries: {item && item?.counties?.map(county => <span>{county}</span>)}</p>}
//             </Li>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default App;

import { Route, Routes } from 'react-router-dom'
import Home from './Home';

export const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />}></Route>
    </Routes>
  );
};