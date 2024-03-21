import Spinner from "./Spinner";
import styles from "./CountryList.module.css";
import CountryItem from "./CountryItem";
import Message from "./Message";
import { useState } from "react";
import { useCities } from "../contexts/CitiesContext";
// import { useCities } from "../contexts/CitiesContext";

function CountriesList() {

//   const countries = cities.reduce((arr,city)=>{
//     if(!arr.map(el=>el.city).includes(city.country))
//        return [...arr, {country: city.country, emoji: city.emoji}] 
//     else return arr
//     },[])
    const {cities, isLoading} = useCities()

    const countries = cities
    .map(city => city.country) // extrage toate țările
    .filter((country, index, array) => array.indexOf(country) === index); // păstrează doar intrările unice

  if (isLoading) return <Spinner />;

  if (!countries.length)
    return (
      <Message message="Add your first city by clicking on a city on the map" />
    );

  return (
    <ul className={styles.countryList}>
      {countries.map((country) => (
        <CountryItem country={country}  />
      ))}
    </ul>
  );
}

export default CountriesList;
