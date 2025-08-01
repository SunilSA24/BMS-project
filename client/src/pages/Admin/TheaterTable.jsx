import { Button, message, Table } from 'antd'
import React, {useState, useEffect } from 'react'
import { getAllTheatres, updateTheatre} from '../../apiCalls/theater';
import { useDispatch } from 'react-redux';
import { hideLoading, showLoading } from '../../redux/loaderSlice';

function TheaterTable() {
  const [theatres, setTheatres] = useState([]);
  const dispatch = useDispatch();

  const getData = async () => {
    try {
      dispatch(showLoading)
      const response = await getAllTheatres();
      if (response.success) {
        const allTheaters = response.data;
        setTheatres(allTheaters.map(function (data) {
          return { ...data, key: `theater${data._id}` };
        })
        )
      } else {
        message.error(response.message);
      }
      dispatch(hideLoading);

    } catch (err) {
      dispatch(hideLoading);
      message.error(err.message);
    }
  }

  const handleStatusChange = async (theatre) => {
    try {
      dispatch(showLoading());
      let values = {
        ...theatres,
        isActive: !theatre.isActive,
      };
      const response = await updateTheatre(theatre._id, values);
      console.log(response, theatre);
      if (response.success) {
        message.success(response.message);
        getData();
      }
      dispatch(hideLoading());
    } catch (err) {
      dispatch(hideLoading);
      message.error(err.message);
    }
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Owner",
      dataIndex: "owner",
      render: (text, data) => {
        return data.owner && data.owner.name;
      },
    },
    {
      title: "Phone Number",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (_, rowObj) => {
        if (rowObj.isActive) {
          return "Approved";
        } else {
          return "Pending/ Blocked";
        }
      },
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (_, rowObj) => {
        return (
          <div className="d-flex align-items-center gap-10">
            <Button onClick={() => handleStatusChange(rowObj)}>
              {rowObj.isActive ? "Block" : "Approve"}
            </Button>
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    getData();
  }, []);


  return (
    <>
      {theatres && theatres.length > 0 && (
        <Table dataSource={theatres} columns={columns} />
      )}
    </>
  )
}

export default TheaterTable
