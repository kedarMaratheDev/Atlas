import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'
import AppLayout from './components/layout/AppLayout'
import Landing from './pages/Landing'
import Dashboard from './pages/Dashboard'
import Trips from './pages/Trips'
import NewTrip from './pages/NewTrip'
import TripDetail from './pages/trip/TripDetail'
import TripOverview from './pages/trip/TripOverview'
import TripItinerary from './pages/trip/TripItinerary'
import TripBookings from './pages/trip/TripBookings'
import TripExpenses from './pages/trip/TripExpenses'
import TripDocuments from './pages/trip/TripDocuments'
import Documents from './pages/Documents'
import Settings from './pages/Settings'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Landing />,
  },
  {
    element: <AppLayout />,
    children: [
      { path: '/dashboard', element: <Dashboard /> },
      { path: '/trips', element: <Trips /> },
      { path: '/trips/new', element: <NewTrip /> },
      {
        path: '/trips/:id',
        element: <TripDetail />,
        children: [
          { index: true,           element: <TripOverview /> },
          { path: 'itinerary',     element: <TripItinerary /> },
          { path: 'bookings',      element: <TripBookings /> },
          { path: 'expenses',      element: <TripExpenses /> },
          { path: 'documents',     element: <TripDocuments /> },
        ],
      },
      { path: '/documents', element: <Documents /> },
      { path: '/settings',  element: <Settings /> },
      { path: '*',          element: <Navigate to="/dashboard" replace /> },
    ],
  },
])

export default function App() {
  return <RouterProvider router={router} />
}
