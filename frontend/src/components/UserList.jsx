import { Flex } from "antd";
import { NavLink } from "react-router-dom";
import { useContext, useEffect } from "react";
import AppContext from "../context/AppContext";
import axios from "axios";


export default function UserList() {
  const { users, setAuth, setLogin, setMenuKey } = useContext(AppContext)

  
  useEffect(() => {
    setMenuKey('users')
    const token = localStorage.getItem("token")
    axios.get(`http://127.0.0.1:8000/token/${token}`).then(function () {
        setAuth(true)
      }).catch(function(error) {
        localStorage.removeItem("token")
        setAuth(false)
        setLogin(false)
      } )
  }, [])

  return (
    <Flex vertical>
      {users.map((user) =>
        <div key={user.id}>
          <NavLink to={`/users/${user.id}`}>{user.username}</NavLink>
        </div>
      )}
    </Flex>
  )
}