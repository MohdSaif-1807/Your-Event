import { Route, Routes } from "react-router-dom"
import { Login } from "./Components/LoginComponents/Login"
import { EventSection } from "./Components/EventComponents/EventSection"
import { AppContext } from "./AppContext"
import { useState } from "react"

export const App = () => {
  const serverAddress = "http://localhost:5000";
  const [userInfo, setUserInfo] = useState([]);
  const [allEvents, setAllEvents] = useState([]);

  return (
    <>
      <AppContext.Provider value={{ serverAddress, userInfo, setUserInfo, allEvents, setAllEvents }}>
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/dashboard" element={<EventSection />}></Route>
        </Routes>
      </AppContext.Provider>
    </>
  )
}