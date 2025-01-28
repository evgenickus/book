import { createContext, useContext, useState, useEffect } from "react";
import axios from 'axios'

const AppContext = createContext({
  login: false,
  auth: false,
  articleData: [],
  myArticlesData: [],
  users: [],
  currentUser: null,
  menuKey: [""],
  allArticles: true,
});

export function AppContextProvider({ children }) {
  const [login, setLogin] = useState(false);
  const [articleData, setArticleData] = useState([]);
  const [myArticlesData, setMyArticlesData] = useState(articleData)
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [auth, setAuth] = useState(false);
  const [menuKey, setMenuKey] = useState(null);
  const [allArticles, setAllArticles] = useState(true)

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

  const addNewArticle = (newArticle) => {
    setArticleData((prev) => [...prev, newArticle])
    setMyArticlesData((prev) => [...prev, newArticle])
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
    addNewArticle,
    auth,
    setAuth,
    menuKey,
    setMenuKey,
    allArticles,
    setAllArticles,
    myArticlesData,
    setMyArticlesData
  }}>{children}</AppContext.Provider>
}

export default AppContext

export function useAppContext() {
  return useContext(AppContext)
}
