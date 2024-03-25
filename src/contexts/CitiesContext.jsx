import { createContext, useState, useEffect, useContext, useReducer, useCallback } from "react";

const URL = 'http://localhost:9000'
const ContextCities = createContext()

const initialState = {
  cities: [],
  isLoading: false,
  currentCity: {},
  error: ''
}
function reducer(state, action){
  switch(action.type){
    case 'loading':
      return {...state, isLoading: true}
    case 'cities/loaded':
      return {
        ...state, 
        isLoading: false, 
        cities: action.payload
      }
    case 'city/loaded':
      return{
        ...state,
        isLoading: false,
        currentCity: action.payload
      }
    case 'city/created':
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payload],
        currentCity: action.payload
      }
    case 'city/deleted':
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter(city => city.id !== action.payload),
        currentCity: {}
      }
    case 'rejected':
      return {
        ...state,
        isLoading: false,
        error: action.payload
      }

  }
}

export default function CitiesProvider({children}){
  
  const [{cities, isLoading, currentCity}, dispatch] = 
  useReducer(
    reducer, 
    initialState
  )
  // const [cities, setCities] = useState([])
  // const [isLoading, setIsLoading] = useState(false)
  // const [currentCity, setCurrentCity] = useState({})

  useEffect(function(){
    async function fetchCities(){
      dispatch({type: 'loading'})
      try{
        const res = await fetch(`${URL}/cities`)
        const data = await res.json()
        dispatch({type: 'cities/loaded', payload: data})
      }catch{
        dispatch({
          type: 'rejected',
          payload: 'There was an error loading data...'
        })
      }}
      fetchCities()
    }, [])

    const getCity = useCallback( async function getCity(id){
      dispatch({type: 'loading'})
      try{
        const res = await fetch(`${URL}/cities/${id}`)
        const data = await res.json()
        dispatch({type: 'city/loaded', payload: data})
      }catch{
        dispatch({
          type: 'rejected',
          payload: 'There was an error loading data...'
        })
      }
    }, [currentCity.id])

    async function createCity(newCity){
      dispatch({type: 'loading'})
      try{
        const res = await fetch(`${URL}/cities`, {
          method: "POST",
          body: JSON.stringify(newCity),
          headers: {
            "Content-Type": "application/json"
          }  
        })
        const data = await res.json()
        dispatch({type: 'city/created', payload: data})
        
      }catch{
        dispatch({
          type: 'rejected',
          payload: 'There was an error Creating the City...'
        })
      }
    }

    async function deleteCity(id){
      dispatch({type: 'loading'})
      try{
        const res = await fetch(`${URL}/cities/${id}`, {
          method: "DELETE",  
        })
        dispatch({type:'city/deleted', payload:id})
        
      }catch{
        dispatch({
          type: 'rejected',
          payload: 'There was an error deleteing city...'
        })
      }
    }

    return (
      <ContextCities.Provider 
      value={{
        cities, 
        isLoading, 
        currentCity, 
        getCity, 
        createCity, 
        deleteCity
      }}
      >
        {children}
      </ContextCities.Provider>
    ) 

}

function useCities(){
    const context = useContext(ContextCities)
    if(context === undefined) throw new Error('CitiesContext was used outside the CitiesProvider')

    return context;
}

export {useCities}