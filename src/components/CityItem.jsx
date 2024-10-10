import { useCities } from "../contexts/CitiesContext";
import styles from "./CityItem.module.css";
import { Link } from "react-router-dom";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));

export default function CityItem({ city }) {
  const { currentCity, deleteCity} = useCities();
  const { cityName, date, emoji, id, position } = city;

  // .cityItem--active {
  //   border: 2px solid var(--color-brand--2);
  //   border-left: 5px solid var(--color-brand--2);
  // }
  function handleClick(e){
    e.preventDefault();
    console.log("Test Click")
    deleteCity(id)// THIS LOGIC DELETES A CITY onCLICK, AND IT COMES FROM THE CitiesContext
  }
  

  return (
    <li>
      <Link
        className={`${styles.cityItem} ${id === currentCity.id? styles['cityItem--active']: "" }`}
        to={`${id}?lat=${position.lat}&lng=${position.lng}`}
      >
        <span className={styles.emoji}>{emoji}</span>
        <span className={styles.name}>{cityName}</span>
        <time className={styles.date}>({formatDate(date)})</time>
        <button className={styles.deleteBtn} onClick={handleClick}>&times;</button> {/*THIS IS WHERE THE FUNCTION IS CALLED ON EACH CLICK  */}
      </Link>
    </li>
  );
}
