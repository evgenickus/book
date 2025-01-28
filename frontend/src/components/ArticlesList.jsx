import AppContext from '../context/AppContext'
import { Button, Flex, Card, List } from 'antd'
import { NavLink, useNavigate } from 'react-router-dom'
import { useContext, useState, useEffect } from 'react'
import { NewArticleModal } from './NewArticleModal'
import { firstLetterUppercase } from '../utils/utils'
import axios from 'axios'

export default function ArticlesList() {
  const {
    articleData,
    setMenuKey,
    login,
    setLogin,
    currentUser,
    allArticles,
    setAllArticles,
    myArticlesData,
    setMyArticlesData,
  } = useContext(AppContext)
  const [ articleModal, setArticleModal ] = useState(false)
  const navigate = useNavigate();
  const token = localStorage.getItem("token")


  useEffect(() => {
    setMenuKey("articles")
    // axios.get(`http://127.0.0.1:8000/token/${token}`).then(function(resp) {
    //   console.log(resp);
    // })
  }, [])
  
  const addArticle = () => {
    setArticleModal(true)
  }

  const getMyArticles = () => {
    axios.get(`http://127.0.0.1:8000/token/${token}`).catch(function(resp) {
      navigate("/login");
      setLogin(false)
      console.log(resp);
    })
    setMyArticlesData(articleData.filter((article) => (article.username === currentUser)))
    setAllArticles(false)
  }
  return (
    <>
      { login && 
        <Flex
          // vertical
          justify="space-around"
          align="center"
          style={{
            padding: 15
          }}
        >
          <Button type="primary" onClick={addArticle}>Add New</Button>
          
          {!allArticles && <Button type="primary" onClick={() => setAllArticles(true)}>All Articles</Button>}
          {allArticles && <Button type="primary" onClick={getMyArticles}>{firstLetterUppercase(currentUser) + "'s Articles"}</Button>}
        </Flex>
      }

      <List
        grid={{
          gutter: 10,
          column: 4,
        }}
        dataSource={allArticles ? articleData : myArticlesData}
        renderItem={(article) => (
          <List.Item>
            <Card
              title={<NavLink to={`/articles/${article.id}`}>{article.title}</NavLink>}
            >
              {article.content}
            </Card>
          </List.Item>
        )}
      />

      { articleModal && <Flex>
        <NewArticleModal hook={ setArticleModal } state={ articleModal }/>
      </Flex>}
    </>
  )
}