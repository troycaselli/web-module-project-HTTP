import React, {useState} from 'react';
import {Link} from 'react-router-dom';

const initialData = {
    title: "",
    director: "",
    metascore: 0,
    genre: "",
    description: ""
}

const AddMovieForm = (props) => {
    const {addMovie} = props;

    const [newMovie, setNewMovie] = useState(initialData);

    const handleChange = (e) => {
        setNewMovie({...newMovie, [e.target.name]: e.target.value});
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        addMovie(newMovie);
        setNewMovie(initialData);
    }

    return(
        <div className="col">
            <div className="modal-content">
                 <form onSubmit={handleSubmit}>
                    <div className="modal-header">
                        <h4 className="modal-title">Add Movie</h4>
                    </div>
                    <div className="modal-body">
                        <div className="form-group">
                            <label>Title</label>
                            <input 
                                className="form-control"
                                type="text" 
                                name="title" 
                                value={newMovie.title} 
                                onChange={handleChange} 
                            />
                        </div>
                        <div className="form-group">
                            <label>Director</label>
                            <input 
                                className="form-control"
                                type="text" 
                                name="director" 
                                value={newMovie.director} 
                                onChange={handleChange} 
                            />
                        </div>
                        <div className="form-group">
                            <label>Genre</label>
                            <input 
                                className="form-control"
                                type="text" 
                                name="genre" 
                                value={newMovie.genre} 
                                onChange={handleChange} 
                            />
                        </div>
                        <div className="form-group">
                            <label>Metascore</label>
                            <input 
                                className="form-control"
                                type="number" 
                                name="metascore" 
                                value={newMovie.metascore} 
                                onChange={handleChange} 
                            />
                        </div>
                        <div className="form-group">
                            <label>Description</label>
                            <textarea 
                                className="form-control"
                                name="description" 
                                value={newMovie.description} 
                                onChange={handleChange} 
                            ></textarea>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <input 
                            className="btn btn-info" 
                            type="submit" 
                            value="Add"
                        />
                        <Link to={`/movies`}>
                            <input 
                                className="btn btn-default" 
                                type="button" 
                                value="Cancel"
                            />
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddMovieForm;