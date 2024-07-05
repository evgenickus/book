import { NavLink, useParams, useNavigate } from "react-router-dom"
import { Flex } from "antd"
import { useContext } from "react"
import AppContext from "../context/AppContext"

export const ArticlePage = () => {
  const { id } = useParams()
  const { articleData } = useContext(AppContext)
  const navigate = useNavigate()
  return (
    <Flex vertical>
      <NavLink onClick={() => navigate(-1)}>Back</NavLink>
      {articleData.filter(article => article.id == id).map(art => art.content)}
    </Flex>
  )
}