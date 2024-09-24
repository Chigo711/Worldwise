import styles from "./Map.module.css";
import { useSearchParams, useNavigate } from "react-router-dom";
export default function Map() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");
  return (
    <div className={styles.mapContainer} onClick={() => {navigate("form")}}>
      <h1>
        Map Position {lat} - {lng}
      </h1>

      <button onClick={()=> {
        setSearchParams({lat: 24, lng: 45})
      }}>Change Position</button>
    </div>
  );
}
