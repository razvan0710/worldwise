import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Product from './pages/Product'
import Pricing from './pages/Pricing'
import Homepage from './pages/Homepage'
import PageNotFound from './pages/PageNotFound'
import AppLayout from './pages/AppLayout'
import Login from './pages/Login'
import CityList from './components/CityList'
import CountriesList from './components/CountriesList'
import City from './components/City'
import Form from './components/Form'


const URL = 'http://localhost:9000'
export default function App() {
  const [cities, setCities] = useState([])
  const [isLoading, setIsLoading] = useState(false)

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
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="product" element={<Product />} />
        <Route path="pricing" element={<Pricing />} />
        <Route path="/app" element={<AppLayout />}>
          <Route index element={<p>aaaa</p>} />
          <Route path='cities' element={<CityList cities={cities} 
          isLoading={isLoading}/>} />
          <Route path='cities/:id' element={<City/>} />
          <Route path='countries' element={<CountriesList cities={cities}
          isLoading={isLoading}/>} />
          <Route path='form' element={<Form />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  )
}


