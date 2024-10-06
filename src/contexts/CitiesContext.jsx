import { createContext, useContext, useEffect, useState } from "react";

const CitiesContext = createContext();

const BASE_URL = "http://localhost:9000";

function CitiesProvider({children}){
    const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCity, setCurrentCity] = useState({})// THIS STATE IS NEEDED IN MULTIPLE COMPONENTS, SO THAT'S WHY IT HAS TO BE PLACE INSIDE THE CONTEXT

  useEffect(function () {
    async function fetchCities() {
      try {
        setIsLoading(true);
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        setCities(data);
        // console.log(data);
      } catch {
        alert("There was an error loading this data");
      } finally {
        setIsLoading(false);
      }
    }
    fetchCities();
  }, []);
  async function getCity(id){
    // console.log("Fetching city with ID:", id);
        try {
          setIsLoading(true);
          const res = await fetch(`${BASE_URL}/cities/${id}`);
          const data = await res.json();
          if (!res.ok) {
            const errorText = await res.text(); // Read the response as plain text
            throw new Error(`Error: ${res.status} - ${errorText}`); // Throw an error with status and text
          }
          setCurrentCity(data);
        } catch(error) {
          console.error("Error fetching city data:", error);

          alert("There was an error loading this data");
        } finally {
          setIsLoading(false);
        }
      }
  
  return (
    <CitiesContext.Provider value={{
        cities, 
        isLoading,
        currentCity,
        getCity,
    }}>

        {children}
    </CitiesContext.Provider>
)
}
function useCities(){
    const context = useContext(CitiesContext)
    if(context === undefined) throw new Error("Context is used outside the CitiesProvider"); // THIS IS TO CHECK IF THE CONTEXT IS USED OUTSIDE OF THE CITIESPROVIDER, THIS IS DONE TO LET OTHER DEVELOPERS KNOW WHAT THE ERROR IS AND HOW TO DEBUG IT.
    return context
}

export {CitiesProvider, useCities}