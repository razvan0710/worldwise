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
import CitiesProvider from './contexts/CitiesContext'
import { AuthProvider } from './contexts/FakeAuthContext'
import ProtectedRoute from './pages/ProtectedRoute'



export default function App() {
  return (
    <AuthProvider>
    <CitiesProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="product" element={<Product />} />
        <Route path="pricing" element={<Pricing />} />
        <Route 
          path="/app" 
          element={
            <ProtectedRoute>
               <AppLayout />
            </ProtectedRoute> 
          }>
          <Route index element={<CityList/>} />
          <Route path='cities' element={<CityList/>} />
          <Route path='cities/:id' element={<City/>} />
          <Route path='countries' element={<CountriesList/>} />
          <Route path='form' element={<Form />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
    </CitiesProvider>
    </AuthProvider>
  )
}


