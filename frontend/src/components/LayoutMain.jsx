
import { NavLink, Outlet } from "react-router-dom"
import { Layout, Menu, theme } from 'antd';
import { useContext } from "react";
import AppContext from "./context/AppContext";
const { Header, Content, Footer } = Layout;


export const LayoutMain = () => {
  const { login } = useContext(AppContext)
  const { currentUser } = useContext(AppContext)

  const firstLetterUppercase = (name) => {
    const capitalized = name &&
      name.charAt(0).toUpperCase()
      + name.slice(1)
    return capitalized
  }

  const { token: { colorBgContainer, borderRadiusLG } } = theme.useToken();
  const items = [
    { "key": "home", "label": <NavLink to="/">Home</NavLink> },
    { "key": "articles", "label": <NavLink to="/articles">Articles</NavLink> },
    { "key": "user", "label": <NavLink to="/users">Users</NavLink> },
    login && { "key": "login", "label": <NavLink to="/login">Login</NavLink> },
    { "key": "register", "label": <NavLink to="/register">Register</NavLink> },
    // !login && { "key": "profile", "label": firstLetterUppercase(currentUser) },
  ]

  return (
    <Layout>
      <Header
        style={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['home']}
          items={items}
          style={{
            flex: 1,
            minWidth: 0,
          }}
        />
        <div style={{ color: "white" }} >{!login && firstLetterUppercase(currentUser)}</div>
      </Header >
      <Content style={{ padding: '8px 38px' }}>
        <div
          style={{
            background: colorBgContainer,
            height: "78vh",
            padding: 24,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet />
        </div>
      </Content>
      <Footer
        style={{
          textAlign: 'center',
        }}
      >
        Ant Design ©{new Date().getFullYear()} Created by Ant UED
      </Footer>
    </Layout >
  )
}