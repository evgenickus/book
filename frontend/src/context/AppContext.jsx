import { createContext, useContext, useState, useEffect } from "react";
import axios from 'axios'

const AppContext = createContext({
  login: false,
  auth: false,
  articleData: [],
  users: [],
  currentUser: null,
});

export function AppContextProvider({ children }) {
  const [login, setLogin] = useState(false);
  const [articleData, setArticleData] = useState([]);
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [auth, setAuth] = useState(false);


  useEffect(() => {
    axios.get("http://127.0.0.1:8000/articles").then(resp => {
      setArticleData(resp.data)
    })
  }, [])

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/users").then(resp => {
      setUsers(resp.data)
    })
  }, [])


  const addUser = (newUser) => {
    setUsers((prev) => [...prev, newUser])
  }

  return <AppContext.Provider value={{
    login,
    setLogin,
    articleData,
    setArticleData,
    users,
    setUsers,
    currentUser,
    setCurrentUser,
    addUser,
    auth,
    setAuth,
  }}>{children}</AppContext.Provider>
}

export default AppContext

export function useAppContext() {
  return useContext(AppContext)
}
