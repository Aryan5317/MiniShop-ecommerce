import './App.css'
import { useState, useEffect } from 'react';
import handleToken from './services/hadleToken';
import LandingPage from './Pages/LandingPage'
import LoginPage from './Pages/LoginPage';
import RegisterPage from './Pages/RegisterPage';
import ForgetPasswordPage from './Pages/ForgetPasswordPage';
import HomePage from './Pages/HomePage';
import ResetPasswordPage from './Pages/resetPasswordPage';
import SelectedMobilePage from './Pages/selectedItemPage/selectedMobilePage';
import { MobilePage, BagsPage, ClothesPage, EarphonesPage, KitchenPage, ShoesPage, WatchPage } from './Pages/itemsPages/itemsPages';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { propContext } from './context/contextApi';

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
  },
  {
    path: "/reset-password",
    element: (
      <ResetPasswordPage />
    )
  },
  {
    path: "/home",
    element: (
      <HomePage />
    )
  },
  {
    path: "/home/mobilePhones",
    element: (
      <MobilePage />
    )
  },
  {
    path: "/home/bagsPages",
    element: (
      <BagsPage />
    )
  },
  {
    path: "/home/clothes",
    element: (
      <ClothesPage />
    )
  },
  {
    path: "/home/earphones",
    element: (
      <EarphonesPage />
    )
  },
  {
    path: "/home/kitchen",
    element: (
      <KitchenPage />
    )
  },
  {
    path: "/home/shoes",
    element: (
      <ShoesPage />
    )
  },
  {
    path: "/home/watches",
    element: (
      <WatchPage />
    )
  },
  {
    path: "/mobile/:id",
    element:(
      <SelectedMobilePage/>
    )
  }

],
  {
    future: {
      v7_startTransition: true,
    },
  }
)

function App() {
  const [isLoggedIn, setIsloggedIn] = useState(false)
  const [storeInputValue, setStoreInputValue] = useState("")
  useEffect(() => {
    const checkToken = async () => {
      const responseData = await handleToken()
      console.log("Response Data for token is: ", responseData)
      if (responseData) {
        setIsloggedIn(true)
      }
      else {
        setIsloggedIn(false)
      }
    }
    checkToken()
  }, [])

  return (
    <>
      <propContext.Provider value={{ isLoggedIn, setIsloggedIn, storeInputValue, setStoreInputValue }} >
        <RouterProvider router={routes} />
      </propContext.Provider>
    </>
  )
}

export default App
