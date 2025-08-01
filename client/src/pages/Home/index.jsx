import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { getCurrentUser } from '../../apiCalls/user';

function Home() {
  const navigate = useNavigate();

  const fetchUserDetails = async () => {
    const response = await getCurrentUser();
    console.log(response)
    if(!response.success) {
      navigate("/login")
    }
  }

  useEffect(() => {
    console.log("Home useEffect");
    fetchUserDetails();
  }, []);

  return (
    <div>Home</div>
  )
}

export default Home