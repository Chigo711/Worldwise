// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";

import styles from "./Form.module.css";
import Button from "./Button";
import Message from "./Message";
import Spinner from "./Spinner";
import { useNavigate } from "react-router-dom";
import { UseUrlPosition } from "../hooks/useUrlPosition";
import DatePicker from "react-datepicker";
import { useCities } from "../contexts/CitiesContext";

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}


const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client"

function Form() {
  const { createCity, isLoading } = useCities()

  const [lat, lng] = UseUrlPosition()

  const [isLoadingGeoCoding, setIsLoadingGeoCoding] = useState(false);
  const [cityName, setCityName] = useState("");
  const [countryName, setCountryName] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [emoji, setEmoji] = useState("");
  const [geocodingError, setGeocodingError] = useState("")
  const navigate = useNavigate()



  useEffect(function(){
    if(!lat && !lng) return; // THIS IS A GUARD CLAUSE TO AVOID IT FROM RUNNING WITHOUT A LATITUDE AND LONGITUDE. SO WITH THIS THERE WON'T BE ANY HTTP REQUEST FIRED OFF.
    async function fetchCityData(){
      try{
        setIsLoadingGeoCoding(true)
        setGeocodingError("")
        const res = await fetch(`${BASE_URL}?latitude=${lat}&longitude=${lng}`)
        const data = await res.json();
        // console.log(data)
        if(!data.countryCode) throw new Error("This doesn't seem like an actual city. Click somewhere else 🙂")

        setCityName(data.city || data.locality || "")
        setCountryName(data.country || data.countryCode || "")
        setEmoji(convertToEmoji(data.countryCode));
      }
      catch(error){
        setGeocodingError(error.message)
      }finally {
        setIsLoadingGeoCoding(false)
      }
    }
    fetchCityData();
  }, [lat, lng])

  async function handleSubmit(e){
    e.preventDefault()
    if(!cityName || !date) return ;
    const newCity = {
      cityName,
      emoji, 
      date,
      countryName,
      notes, 
      position: {lat, lng}
    }
 
   await createCity(newCity)
    navigate("/app/cities")
  }

  if(isLoadingGeoCoding) return <Spinner />

  if(!lat && !lng) return <Message message="Start by clicking somewhere on the map 🌍" />

  if(geocodingError) return <Message message={geocodingError} />

  return (
    <form className={`${styles.form} ${isLoading ? styles.isLoading : ""}`} onSubmit={handleSubmit}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        {/* <input
          id="date"
          onChange={(e) => setDate(e.target.value)}
          value={date}
        /> */}
        <DatePicker onChange={date => setDate(date) } id={date} selected={date} dateFormat="dd/MM/yyyy" />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary">Add</Button>
        <Button type="back" onClick={(e)=>{
          e.preventDefault();
           navigate(-1)}
           }>&larr; Back</Button>
        {/* WHEN WE DO THIS IT WILL NAVIGATE BACK TO THE CITIES IN A FLASH AND THEN COME BACK TO THE FORM PAGE, THIS IS BECAUSE THE BUTTON IS INSIDE THE FORM COMPONENT, THEREFORE THIS WILL TRIGGER THE FORM TO RELOAD. So TO SOLE THIS WE HAD TO PREVENT DEFAULT ACTION */}
      </div>
    </form>
  );
}

export default Form;
