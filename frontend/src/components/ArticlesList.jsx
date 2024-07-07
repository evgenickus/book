import { Button, Flex } from 'antd'
import { NavLink } from 'react-router-dom'
import { useContext, useState } from 'react'
import AppContext from '../context/AppContext'
import { NewArticleForm } from './NewArticleForm'

export default function ArticlesList() {
  const { articleData, setMenuKey, login } = useContext(AppContext)
  const [ articleForm, setArticleForm] = useState(false)
  setMenuKey("articles")
  
  const addArticle = () => {
    setArticleForm(true)
  }

  return (
    <>
      <Flex  vertical align="flex-end">
      { login && <Button type="link" onClick={addArticle}>Add New</Button> }
      </Flex>
      <Flex vertical align="flex-start">
        {articleData.map((article) =>
          <div key={article.id}>
            <NavLink to={`/articles/${article.id}`}>{article.title}</NavLink>
          </div>
        )}
      </Flex>
      { articleForm && <Flex>
        <NewArticleForm />
      </Flex>}
    </>
  )
}