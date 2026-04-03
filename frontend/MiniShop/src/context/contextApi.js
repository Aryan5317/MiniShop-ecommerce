import { createContext } from "react";
export const propContext = createContext({
    isLoggedIn: false,
    setIsloggedIn: () => { }
})
