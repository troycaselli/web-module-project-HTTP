import React from 'react';

const DeleteMovieModal = (props) => {
    const {deleteMovie, movie, toggleWarning} = props;

    return (
        <div id="deleteEmployeeModal">
            <div className="modal-dialog">
                <div className="modal-content">
                    <form>
                        <div className="modal-header">
                            <h4 className="modal-title">Delete Movie</h4>
                            <button 
                                className="close" 
                                type="button" 
                                data-dismiss="modal" 
                                aria-hidden="true" 
                                onClick={toggleWarning}
                            >&times;</button>
                        </div>
                        <div className="modal-body">
                            <p>Are you sure you want to delete these records?</p>
                            <p className="text-warning">
                                <small>This action cannot be undone.</small>
                            </p>
                        </div>
                        <div className="modal-footer">
                            <input 
                                className="btn btn-default" 
                                type="button" 
                                value="Cancel" 
                                data-dismiss="modal" 
                                onClick={toggleWarning}
                            />
                            <input 
                                className="btn btn-danger" 
                                type="submit" 
                                value="Delete" 
                                onClick={() => deleteMovie(movie.id)}
                            />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default DeleteMovieModal;