import { Flex } from "antd";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import AppContext from "./context/AppContext";

export default function UserList() {
  const { users } = useContext(AppContext)

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