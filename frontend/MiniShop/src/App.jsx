import './App.css'
import LandingPage from './Pages/LandingPage'
import LoginPage from './Pages/LoginPage';
import RegisterPage from './Pages/RegisterPage';
import ForgetPasswordPage from './Pages/ForgetPasswordPage';
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
    },
    {
      path: "/register",
      element: (
        <RegisterPage />
      )
    },
    {
      path: "/forget-password",
      element: (
        <ForgetPasswordPage />
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
