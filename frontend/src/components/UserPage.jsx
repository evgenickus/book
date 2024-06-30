import { Flex } from "antd";
import { NavLink, useParams } from "react-router-dom";
import { useContext } from "react";
import AppContext from "./context/AppContext";

export const UserPage = () => {
  const { id } = useParams()
  const { users } = useContext(AppContext)

  return (
    <Flex vertical>
      <NavLink to="/users">Back</NavLink>
      {users.filter(user => user.id == id).map(u =>
        <div>
          <h3>Username: {u.username}</h3>
          <p>Email: {u.email}</p>
        </div>
      )}
    </Flex>
  )
}