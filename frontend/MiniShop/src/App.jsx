import './App.css'
import { useState, useEffect } from 'react';
import handleToken from './services/hadleToken';
import LandingPage from './Pages/LandingPage'
import LoginPage from './Pages/LoginPage';
import RegisterPage from './Pages/RegisterPage';
import ForgetPasswordPage from './Pages/ForgetPasswordPage';
import HomePage from './Pages/HomePage';
import ResetPasswordPage from "./Pages/ResetPasswordPage"
import SelectedMobilePage from './Pages/selectedItemPage/SelectedMobilePage';
import CheckOutPage from './Pages/selectedItemPage/CheckOutPage';
import PaymentGateway from './Pages/selectedItemPage/PaymentGateway';
import OrderSuccessPage from './Pages/selectedItemPage/OrderSuccessPage';
import EditDetailsPage from './Pages/EditDetailsPage';
import { MobilePage, BagsPage, ClothesPage, EarphonesPage, KitchenPage, ShoesPage, WatchPage } from './Pages/itemsPages/itemsPages';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { propContext } from './context/contextApi';
import CartPage from './Pages/CartPage';
import AccountPage from './Pages/AccountPage';
import OrderPage from './Pages/OrderPage';
import EditLocationPage from './Pages/EditLocationPage';
import AddNewLocation from './Pages/AddNewLocation';
import CartOrderSummaryPage from './Pages/CartOrderSummaryPage';
import CartPaymentGateway from './Pages/CartPaymentGateway';
import CartOrderSuccessPage from './Pages/CartOrderSuccessPage';
import SelectedBagsPage from './Pages/selectedItemPage/SelectedBagsPage';
import SelectedWatchPage from './Pages/selectedItemPage/SelectedWatchPage';
import SelectedClothesPage from './Pages/selectedItemPage/SelectedClothesPage';
import SelectedEarPhonePage from './Pages/selectedItemPage/SelectedEarPhonePage';
import SelectedShoesPage from './Pages/selectedItemPage/SelectedShoesPage';

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
    path: "/profile/update-details",
    element: (
      <EditDetailsPage />
    )
  },
  {
    path: "/account",
    element: (
      <AccountPage />
    )
  },
  {
    path: "/account/update-location",
    element: (
      <EditLocationPage />
    )
  },
  {
    path: "/account/add-location",
    element: (
      <AddNewLocation />
    )
  },
  {
    path: "/order",
    element: (
      <OrderPage />
    )
  },
  {
    path: "/cart",
    element: (
      <CartPage />
    )
  },
  {
    path: "/order/summary",
    element: (
      <CartOrderSummaryPage />
    )
  },
  {
    path: "/cart/payment-gateway",
    element: (
      <CartPaymentGateway />
    )
  },
  {
    path: "/cartOrder/success",
    element: (
      <CartOrderSuccessPage />
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
    path: "/phones/:id",
    element: (
      <SelectedMobilePage />
    )
  },
  {
    path: "/bags/:id",
    element: (
      <SelectedBagsPage />
    )
  },
  {
    path: "/watches/:id",
    element: (
      <SelectedWatchPage />
    )
  },
  {
    path: "/clothes/:id",
    element: (
      <SelectedClothesPage />
    )
  },
  {
    path: "/earphones/:id",
    element: (
      <SelectedEarPhonePage />
    )
  },
  {
    path: "/shoes/:id",
    element: (
      <SelectedShoesPage />
    )
  },
  {
    path: "/product/:id/orderSummary",
    element: (
      <CheckOutPage />
    )
  },
  {
    path: "/product/:id/orderSummary/payment-gateway",
    element: (
      <PaymentGateway />
    )
  },
  {
    path: "/order/success",
    element: (
      <OrderSuccessPage />
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
      if (responseData?.success) {
        setIsloggedIn(true)
      } else {
        setIsloggedIn(false)
      }
    }
    checkToken()
    const interval = setInterval(() => {
      checkToken()
    }, 25 * 60 * 1000)
    return () => clearInterval(interval)
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
