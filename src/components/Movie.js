import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

import {baseURL} from '../baseURL';

const Movie = (props) => {
    const { addToFavorites, toggleWarning, movie, setMovie } = props;
    const { id } = useParams();

    useEffect(()=>{
        axios.get(`${baseURL}/${id}`)
            .then(res=>{
                setMovie(res.data);
            })
            .catch(err=>{
                console.log(err.response);
            })
    }, [id]);

    return(
        <div className="modal-page col">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">						
                        <h4 className="modal-title">{movie.title} Details</h4>
                    </div>
                    <div className="modal-body">
                        <div className="flexContainer">
                            <section className="movie-details">
                                <div>
                                    <label>Title: <strong>{movie.title}</strong></label>
                                </div>
                                <div>
                                    <label>Director: <strong>{movie.director}</strong></label>
                                </div>
                                <div>
                                    <label>Genre: <strong>{movie.genre}</strong></label>
                                </div>
                                <div>
                                    <label>Metascore: <strong>{movie.metascore}</strong></label>
                                </div>
                                <div>
                                    <label>Description:</label>
                                    <p><strong>{movie.description}</strong></p>
                                </div>
                            </section>
                            <section>
                                <span 
                                    className="m-2 btn btn-dark" 
                                    onClick={() => addToFavorites(movie)}
                                >Favorite</span>
                                <Link 
                                    to={`/movies/edit/${movie.id}`} 
                                    className="m-2 btn btn-success"
                                >Edit</Link>
                                <span className="delete">
                                    <input 
                                        type="button" 
                                        className="m-2 btn btn-danger" 
                                        value="Delete"
                                        onClick={() => toggleWarning(movie.id)}
                                    />
                                </span>
                            </section>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Movie;