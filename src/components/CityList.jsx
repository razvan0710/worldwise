import Spinner from "./Spinner";
import styles from "./CityList.module.css";
import CityItem from "./CityItem";
import Message from "./Message";
import { useState } from "react";
// import { useCities } from "../contexts/CitiesContext";

function CityList({cities, isLoading}) {
  // const { cities, isLoading } = useState({
  //   "cityName": "Lisbon",
  //   "country": "Portugal",
  //   "emoji": "🇵🇹",
  //   "date": "2027-10-31T15:59:59.138Z",
  //   "notes": "My favorite city so far!",
  //   "position": {
  //     "lat": 38.727881642324164,
  //     "lng": -9.140900099907554
  //   },
  //   "id": 73930385
  // });

  if (isLoading) return <Spinner />;

  if (!cities.length)
    return (
      <Message message="Add your first city by clicking on a city on the map" />
    );

  return (
    <ul className={styles.cityList}>
      {cities.map((city) => (
        <CityItem city={city} key={city.id} />
      ))}
    </ul>
  );
}

export default CityList;
