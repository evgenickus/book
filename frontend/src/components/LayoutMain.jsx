
import { NavLink, Outlet } from "react-router-dom"
import { Button, Layout, Menu, theme, Typography } from 'antd';
import { useContext } from "react";
import AppContext from "../context/AppContext";
const { Header, Content, Footer } = Layout;


export const LayoutMain = () => {
  const { login, setLogin, currentUser, setAuth, menuKey } = useContext(AppContext)

  const firstLetterUppercase = (name) => {
    const capitalized = name &&
      name.charAt(0).toUpperCase()
      + name.slice(1)
    return capitalized
  };

  const logout = () => {
    setLogin(false)
    localStorage.removeItem("token")
    setAuth(false)
  };

  const { token: { colorBgContainer, borderRadiusLG } } = theme.useToken();
  const items = [
    { "key": "home", "label": <NavLink to="/">Home</NavLink> },
    { "key": "articles", "label": <NavLink to="/articles">Articles</NavLink> },
    login && { "key": "users", "label": <NavLink to="/users">Users</NavLink> },
    !login && { "key": "login", "label": <NavLink to="/login">Login</NavLink> },
    !login && { "key": "register", "label": <NavLink to="/register">Register</NavLink> },
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
          selectedKeys={menuKey}
          // defaultSelectedKeys={['home']}
          items={items}
          style={{
            flex: 1,
            minWidth: 0,
          }}
        />

        {login &&
          <div>
            <Button style={{ color: "#ffffffa6", padding: 0 }} type="link" onClick={logout}>Logout</Button>
            <Typography.Text style={{ color: "#ffffffa6", paddingLeft: 30 }} >{firstLetterUppercase(currentUser)}</Typography.Text>
          </div>}
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