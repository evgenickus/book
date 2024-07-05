import ArticlesList from "./components/ArticlesList";
import HomePage from "./components/HomePage";
import { Route, Routes } from "react-router-dom"
import RegisterUser from "./components/RegisterUser";
import UserList from "./components/UserList";
import { LayoutMain } from "./components/LayoutMain";
import { ArticlePage } from "./components/ArticlePage";
import { UserPage } from "./components/UserPage";
import { LoginUser } from "./components/LoginUser";
import { AppContextProvider } from "./context/AppContext";
import AppContext from "./context/AppContext";
import { useContext } from "react";
import { RequireAuth } from "./components/hoc/RequireAuth";

export default function App() {
  const { users } = useContext(AppContext)
  return (
    <AppContextProvider>
      <Routes>
        <Route path="/" element={<LayoutMain />}>
          <Route index element={<HomePage />} />
          <Route path="articles" element={<ArticlesList />} />
          <Route path="articles/:id" element={<ArticlePage />} />
          <Route path="users" element=
            {<RequireAuth>
              <UserList />
            </RequireAuth>
            }
          />
          <Route path="users/:id" element={<UserPage />} />
          <Route path="login" element={<LoginUser />} />
          <Route path="register" element={<RegisterUser />} />
        </Route>
      </Routes>
    </AppContextProvider>
  )
}

