import React, { useEffect } from 'react';
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Tabs } from 'antd';
import TheaterList from './TheaterList';


function Partner() {
 const { user } = useSelector((state) => state.user);

  const tabItems = [
    {
      key: "1",
      label: "Theaters",
      children: <TheaterList />,
    },
   
  ];

  useEffect(() => {
    if (user !== "null" && user.role !== "partner") {
      navigate("/");
    }
  }, [user]);

  return (
    <div>
      <h1>Partner page</h1>
      <Tabs items={tabItems} />
    </div>
  )
}

export default Partner
