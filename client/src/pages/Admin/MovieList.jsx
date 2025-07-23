import React from 'react'

function MovieList() {
  const columns = [
    {
      title: "Poster",
      dataIndex: "poster",
      render: (url)
    },
    {
      title: "Movie Name",
      dataIndex: "movieName",
    },
    {
      title: "Description",
      dataIndex: "description",
      width: 300,
    },
    {
      title: "Duration (in mins)",
      dataIndex: "duration",
    },
    {
      title: "Genre",
      dataIndex: "genre",
    },
    {
      title: "Language",
      dataIndex: "language",
    },
    {
      title: "Release Date",
      dataIndex: "releaseDate",
      render: (value) => {
        return moment(value).format("MM-DD-YYYY");
      }
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
                setSelectedMovie(rowObj);
              }}
            >
              <EditOutlined />
            </Button>
            <Button
              onClick={() => {
                setIsDeleteModalOpen(true);
                setSelectedMovie(rowObj);
              }}
            >
              <DeleteOutlined />
            </Button>
          </div>
        );
      },
    },
  ]
  return (
    <div>
       <Table columns={columns} dataSource={movies} />
    </div>
  )
}

export default MovieList
