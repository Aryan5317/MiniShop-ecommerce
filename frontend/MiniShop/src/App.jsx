import './App.css'
import LandingPage from './Pages/LandingPage'
import LoginPage from './components/component2/LoginPage';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
function App() {
  const routes = createBrowserRouter([
    {
      path: "/",
      element: (
        <LandingPage />
      )
    },
    {
      path: "/login",
      element: (
        <LoginPage />
      )
    }
  ],
    {
      future: {
        v7_startTransition: true,
      },
    }
  )
  return (
    <RouterProvider router={routes} />
  )
}

export default App
