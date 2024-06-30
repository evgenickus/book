import { NavLink, useParams } from "react-router-dom"
import { Flex } from "antd"
import { useContext } from "react"
import AppContext from "./context/AppContext"

export const ArticlePage = () => {
  const { id } = useParams()
  const { articleData } = useContext(AppContext)
  return (
    <Flex vertical>
      <NavLink to="/articles">Back</NavLink>
      {articleData.filter(article => article.id == id).map(art => art.content)}
    </Flex>
  )
}