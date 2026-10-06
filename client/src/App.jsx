import React from 'react'
import { useRoutes, Link } from 'react-router-dom'
import Locations from './pages/Locations'
import LocationEvents from './pages/LocationEvents'
import Event from './components/Event'
import './App.css'

const App = () => {
let element = useRoutes([
    {
      path: '/',
      element: <Locations />
    },
    {
      path: '/locations/:id',
      element: <LocationEvents />
    },
    {
      path: '/events',
      element: <Event />
    }
  ])

  return (
    <div className='app'>

      <header className='main-header'>
        <h1>UnityGrid Plaza</h1>

        <div className='header-buttons'>
          <Link to='/' role='button'>Home</Link>
          <Link to='/events' role='button'>Events</Link>
        </div>
      </header>

      <main>
        {element}
      </main>
    </div>
  )
}

export default App