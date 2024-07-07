import { Flex } from "antd";
import AppContext from "../context/AppContext";
import { useContext } from "react"; 

const HomePage = () => {
  const { setMenuKey} = useContext(AppContext);
  setMenuKey("home")
  return (
    <Flex justify="center" > Welcome To Forum</Flex >
  )
}

export default HomePage