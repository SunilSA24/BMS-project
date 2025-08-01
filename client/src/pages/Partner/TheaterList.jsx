import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { hideLoading, showLoading } from "../../redux/loaderSlice";
import { getAllTheatresByAnOwner } from "../../apiCalls/theater"

import { Button, Table } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import TheatreModal from "./theaterForm";
import TheatreDelete from "./deleTheater";



function TheaterList() {
    const { user } = useSelector((state) => state.user);
    const [theaters, setTheaters] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [formType, setFormType] = useState("add");
    const [selectedTheater, setSelectedTheater] = useState(null);
    const dispatch = useDispatch();

    const columns = [
        {
            title: "Name",
            dataIndex: "name",
            key: "name"
        },
        {
            title: "Address",
            dataIndex: "address",
            key: "address"
        },
        {
            title: "Phone Number",
            dataIndex: "phone",
            key: "phone",
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email"
        },
        {
            title: "Status",
            dataIndex: "isActive",
            render: (_, rowObj) => {
                if (rowObj.isActive) {
                    return "Approved";
                } else {
                    return "Pending/Blocked";
                }
            },
        },
        {
            title: "Actions",
            render: (_, rowObj) => {
                return (
                    <div style={{ display: "flex", gap: "4px" }}>
                        <Button
                            onClick={() => {
                                setIsModalOpen(true);
                                setFormType("edit");
                                setSelectedTheater(rowObj);
                            }}
                        >
                            <EditOutlined />
                        </Button>
                        <Button
                            onClick={() => {
                                setIsDeleteModalOpen(true);
                                setSelectedTheater(rowObj);
                            }}
                        >
                            <DeleteOutlined />
                        </Button>
                    </div>
                );
            },
        },
    ]

    const fetchAllTheatres = async () => {
        dispatch(showLoading());
        const response = await getAllTheatresByAnOwner(user._id);
        const allTheaters = response?.data?.map((theater) => {
            return { ...theater, key: `${theater._id}` }
        })
        setTheaters(allTheaters);
        dispatch(hideLoading());
    }

    useEffect(() => {
        if (user) {
            fetchAllTheatres();
        }
    }, [user]);


    return (
        <div>
            <div className="d-flex justify-content-end mb-10px">
                <Button onClick={() => {
                    setIsModalOpen(true);
                    setFormType("add")
                }}>Add Theater</Button>
            </div>
            <Table columns={columns} dataSource={theaters} />
            {isModalOpen && (
                <TheatreModal
                    isModalOpen={isModalOpen}
                    setIsModalOpen={setIsModalOpen}
                    selectedTheatre={selectedTheater}
                    formType={formType}
                    setSelectedTheatre={setSelectedTheater}
                    getData={fetchAllTheatres}
                />
            )}
            {isDeleteModalOpen && (
                <TheatreDelete
                    isDeleteModalOpen={isDeleteModalOpen}
                    selectedTheatre={selectedTheater}
                    setIsDeleteModalOpen={setIsDeleteModalOpen}
                    setSelectedTheatre={setSelectedTheater}
                    getData={fetchAllTheatres}
                />
            )}

        </div>
    )
}

export default TheaterList

