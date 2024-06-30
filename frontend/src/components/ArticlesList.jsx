import { Flex } from 'antd'
import { NavLink } from 'react-router-dom'
import { useContext } from 'react'
import AppContext from './context/AppContext'

export default function ArticlesList() {
  const { articleData } = useContext(AppContext)

  return (
    <Flex vertical align="flex-start">
      {articleData.map((article) =>
        <div>
          <NavLink to={`/articles/${article.id}`}>{article.title}</NavLink>
        </div>
      )}
    </Flex>
  )
}