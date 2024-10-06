import styles from "./Map.module.css";
import { useSearchParams, useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvent } from "react-leaflet";
import { useEffect, useState } from "react";
import { useCities } from "../contexts/CitiesContext"
import { useGeolocation } from "../hooks/useGeolocation"
import Button from "./Button";
import { UseUrlPosition } from "../hooks/useUrlPosition";
export default function Map() {
  const {cities} = useCities();
  const[ mapPosition, setMapPosition] = useState([40, 0])
  const {isLoading: isLoadingPosition, position: geolocationPosition, getPosition } = useGeolocation();
  
const [mapLat, mapLng] = UseUrlPosition()
  
useEffect(function(){
  if(mapLat && mapLng) setMapPosition([mapLat, mapLng]) //With this the map position state is synced with the current latitude and longitude as it comes from the URL
}, [mapLat, mapLng])

useEffect(function(){
  if(geolocationPosition) setMapPosition([geolocationPosition.lat, geolocationPosition.lng])
}, [geolocationPosition])

  return (
    <div className={styles.mapContainer} >
     {!geolocationPosition && <Button type="position" onClick={getPosition}>
        {isLoadingPosition? "Loading..." : "Use your position"}
      </Button>}
      <MapContainer center={mapPosition} zoom={13} scrollWheelZoom={true} className={styles.map}>
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.fr/hot/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    {cities.map(city => <Marker position={[city.position.lat, city.position.lng]} key={city.id}>
      <Popup>
       <span>{city.emoji}</span> <span>{city.cityName}</span>
      </Popup>
    </Marker>)}
    <ChangeCenter position={mapPosition} />
    <DetectClick />
  </MapContainer>
    </div>
  );
}

function ChangeCenter({ position }){
  const map = useMap()
  map.setView(position);
  return null
}

// TO IMPLEMENT THE FEATURE WHERE A FORM WILL DISPLAY WHEN USERS CLICK ANYWHERE ON THE MAP, WE HAVE TO CREATE YET ANOTHER CUSTOM HOOK FOR THAT: 
function DetectClick(){
  const navigate = useNavigate();
  useMapEvent({
    click: e => navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`)
    
  }) //THIS IS ANOTHER IMPORTANT REACT LEAFLET CUSTOM LIBRARY. INSIDE OF IT WE WILL PASS IN AN OBJECT WHERE WE CAN DEFINE A FEW PROPERTIES FOR DIFFERENT TYPES OF EVENT.
}

// WE WOULD NEED ANOTHER EFFECT TO SYNC THE MAP POSITION TO THE CURRENT POSITION 


// CLICKING ON THE MAP TO BE ABLE TO NAVIGATE TO THE FORM COMPONENT CAN'T BE DONE WITH A LINK SO WE WOULD DO THAT PROGRAMMATICALLY WITH useNAVIGATE 