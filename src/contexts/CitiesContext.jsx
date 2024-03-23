import { createContext, useState, useEffect, useContext } from "react";

const URL = 'http://localhost:9000'
const ContextCities = createContext()

export default function CitiesProvider({children}){
  const [cities, setCities] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [currentCity, setCurrentCity] = useState({})

  useEffect(function(){
    async function fetchCities(){
      try{
        const res = await fetch(`${URL}/cities`)
        const data = await res.json()
        setCities(data)
      }catch{
        alert('There was an error loading data...')
      } finally {
        setIsLoading(false)
      }
      }
      fetchCities()
    }, [])

    async function getCity(id){
            try{
              const res = await fetch(`${URL}/cities/${id}`)
              const data = await res.json()
              setCurrentCity(data)
            }catch{
              alert('There was an error loading data...')
            } finally {
              setIsLoading(false)
            }
    }

    return <ContextCities.Provider value={{cities, isLoading, currentCity, getCity}}>
             {children}
           </ContextCities.Provider>

}

function useCities(){
    const context = useContext(ContextCities)
    if(context === undefined) throw new Error('CitiesContext was used outside the CitiesProvider')

    return context;
}

export {useCities}