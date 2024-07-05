import { Flex } from "antd";
import { NavLink, useParams, useNavigate } from "react-router-dom";
import { useContext } from "react";
import AppContext from "../context/AppContext";

export const UserPage = () => {
  const { id } = useParams()
  const { users } = useContext(AppContext)
  const navigate = useNavigate()


  return (
    <Flex vertical>
      <NavLink onClick={() => navigate(-1)}>Back</NavLink>
      {users.filter(user => user.id == id).map(u =>
        <div key={u.id}>
          <h3>Username: {u.username}</h3>
          <p>Email: {u.email}</p>
        </div>
      )}
    </Flex>
  )
}