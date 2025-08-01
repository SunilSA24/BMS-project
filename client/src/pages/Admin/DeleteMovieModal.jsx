import { Modal } from "antd";
import { deleteMovie,  } from "../../apiCalls/movie";
import moment from "moment";

function DeleteMovieModal({
    isDeleteModalOpen,
    setIsDeleteModalOpen,
    selectedMovie,
    setSelectedMovie,
    fetchAllMovies,
}) {
    if (selectedMovie) {
        selectedMovie.releaseDate = moment(selectedMovie.releaseDate).format(
            "YYYY-MM-DD"
        );
    }

    const handleOK = async() => {
        try {
            setIsDeleteModalOpen(false);
            const movieId = selectedMovie._id;
            const response = await deleteMovie(movieId);
            if(response.success) {
                fetchAllMovies();
                setSelectedMovie(null);
            }
        } catch (err) {
            console.log(err)
        }
        
    }

    const handleCancel = () => {
        setIsDeleteModalOpen(false);
        selectedMovie(null);
    }



    return (
        <div>
            <Modal
                centered
                title="Delete Movie"
                open={isDeleteModalOpen}
                onOk={handleOK}
                onCancel={handleCancel}
                width={800}
            >
                <p className="pt-3 fs-18">Are you sure you want to delete this movie?</p>
                <p className="pb3 fs-18">
                    This action can't be undone and you'll lose this movie data.
                </p>
            </Modal>
        </div>
    )
}

export default DeleteMovieModal

