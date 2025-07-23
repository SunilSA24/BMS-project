import React, { useEffect } from 'react'
import { getCurrentUser } from '../apiCalls/user';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../redux/userSlice';
import { hideLoading, showLoading } from '../redux/loaderSlice';
import { Link, useNavigate } from "react-router-dom";
import {
  HomeOutlined,
  LogoutOutlined,
  ProfileOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import { Header } from "antd/es/layout/layout";

function ProtectedRoute({ children }) {
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.user);
  const disPatch = useDispatch();

  const fetchData = async () => {
    disPatch(showLoading());
    const response = await getCurrentUser();
    if (response.status === 401) {
      localStorage.removeItem("token");
      navigate("/login")
    } else {
      disPatch(setUser(response.data));
      disPatch(hideLoading());
    }
  }

  const navItems = [
    {
      label: "Home",
      icon: <HomeOutlined />,
      onClick: () => {
        navigate("/");
      }
    },
    {
      label: `${!!user ? user.name : ""}`,
      icon: <UserOutlined />,
      children: [
        {
          label: (
            <span
              onClick={() => {
                if (user.role === "admin") {
                  navigate("/admin");
                } else if (user.role === "partner") {
                  navigate("/partner");
                } else {
                  navigate("/profile");
                }
              }}
            >
              My Profile
            </span>
          ),
          icon: <ProfileOutlined />,
        },
        {
          label: (
            <Link
              to="/login"
              onClick={() => {
                dispatch(SetUser(null));
                localStorage.removeItem("token");
              }}
            >
              Logout
            </Link>
          ),
          icon: <LogoutOutlined />,
        },
      ],
    },
  ];

  useEffect(() => {
    if (localStorage.getItem("token")) {
      fetchData();
    } else {
      navigate("/login")
    }
  }, []);

  return (
    <div>
      {user && (
        <Layout>
          <Header
            className="d-flex justify-content-between"
            style={{
              position: "sticky",
              top: 0,
              zIndex: 1,
              width: "100%",
              display: "flex",
              alignItems: "center",
            }}
          >
            <h3 className="demo-logo text-white m-0" style={{ color: "white" }}>
              Book My Show
            </h3>
            <Menu theme="dark" mode="horizontal" items={navItems} />
          </Header>
          <div style={{ padding: 24, minHeight: "100vh", background: "#fff" }}>
            {children}
          </div>
        </Layout>
      )}
    </div>
  )
}

export default ProtectedRoute
