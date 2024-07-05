import { Flex } from "antd";
import { NavLink } from "react-router-dom";
import { useContext, useEffect } from "react";
import AppContext from "../context/AppContext";
import axios from "axios";


export default function UserList() {
  const { users, setAuth, auth } = useContext(AppContext)

  useEffect(() => {
    const token = localStorage.getItem("token")
    axios.get(`http://127.0.0.1:8000/token/${token}`).then(resp => {
      if (resp.data.message == "Token is valid") { setAuth(true) } else { setAuth(false) };
      console.log(resp.data.message == "Token is valid");
    })
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