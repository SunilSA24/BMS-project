import React, { useEffect } from 'react';
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Tabs } from 'antd';

import MovieList from './MovieList';
import TheatreTable from './TheaterTable';

function Admin() {
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const tabItems = [
    {
      key: "1",
      label: "Movies",
      children: <MovieList />,
    },
    {
      key: "2",
      label: "Theatres",
      children: <TheatreTable />,
    },
  ];

  useEffect(() => {
    if (user !== "null" && user.role !== "admin") {
      navigate("/");
    }
  }, [user]);

  return (
    <div>
      <h1>Admin page</h1>
      <Tabs items={tabItems} />
    </div>
  )
}

export default Admin
