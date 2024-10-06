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
  const { cityName, date, emoji, id, position } = city;
  const { currentCity} = useCities();

  // .cityItem--active {
  //   border: 2px solid var(--color-brand--2);
  //   border-left: 5px solid var(--color-brand--2);
  // }
  

  return (
    <li>
      <Link
        className={`${styles.cityItem} ${id === currentCity.id? styles['cityItem--active']: "" }`}
        to={`${id}?lat=${position.lat}&lng=${position.lng}`}
      >
        <span className={styles.emoji}>{emoji}</span>
        <span className={styles.name}>{cityName}</span>
        <time className={styles.date}>({formatDate(date)})</time>
        <button className={styles.deleteBtn}>&times;</button>
      </Link>
    </li>
  );
}
