import React, { useState, useEffect } from 'react'
import './App.css';
import Map from './Components/Map';
import InfoBox from './Components/InfoBox';
import { MenuItem, FormControl, Select, CardContent, Card, } from "@material-ui/core";

function App() {
  // https://disease.sh/v3/covid-19/countries
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState('worldwide');
  const [countryInfo, setCountryInfo] = useState({});
  useEffect(() => {
    const getCountiesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country, //name of the country
            value: country.countryInfo.iso2, // 
          }));

          setCountries(countries);
        });
    };
    getCountiesData();
  }, [])
  const onCountryChagnge =async(e) => {
    const countryCode = e.target.value;
    setCountry(countryCode);
    console.log(countryCode);
    const url = countryCode === "worldwide"
        ? "https://disease.sh/v3/covid-19/all" : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

        await fetch(url)
      .then((response) => response.json())
      .then((data) => {
     
        setCountryInfo(data);
        // console.log("dhg",data)
        console.log(data);
      })

    //  await fetch("https://disease.sh/v3/covid-19/all")
    //  .then((response) => {
    //    console.log(response);
    //  });


  };
  // console.log( " csf>>>",countryInfo);

  //https://disease.sh/v3/covid-19/all
  //https://disease.sh/v3/covid-19/countries/[COUNTRY_CODE]
  return (
    <div className='app'>
      <div className='app__left'>
        <div className='app__header'>
          <h1> Covid-19 tracker by rupesh !!  </h1>
          <FormControl className="app__dropdown">
            <Select variant="outlined" onChange={onCountryChagnge} value={country} >
              <MenuItem value="worldwide">Worldwide</MenuItem>
              {
                countries.map((country, key) => (
                  <MenuItem value={country.value} key={key}> {country.name}</MenuItem>
                ))
              }
            </Select>
          </FormControl>
        </div>
        <div className='app__stats'>
          <InfoBox title='Coronavirus Cases' cases={123} total={300} />
          <InfoBox title='Recoverd' cases={76} total={200} />

          <InfoBox title='Deaths' cases={76} total={200} />

          {/* {Title select input dropdwon} */}
          {/* {Infobox} */}
          {/* {Infobox} */}
          {/* {Infobox} */}

        </div>

        {/* {table} */}
        {/* {map} */}
        <Map />
      </div>
      <Card className='app__right'>
        <CardContent>
          <h3> Live cases by country </h3>
          <h3> Worldwide new Cases</h3>
        </CardContent>
      </Card>
    </div>
  )
}

export default App
