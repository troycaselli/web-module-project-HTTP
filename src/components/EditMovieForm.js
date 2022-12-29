import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';

import {baseURL} from '../baseURL';

const EditMovieForm = (props) => {
	const { push } = useHistory();
	const {id} = useParams();

	const { 
		setMovies, 
		setFavoriteMovies,
		movies,
		favoriteMovies,
	} = props;
	
	const [movie, setMovie] = useState({
		title:"",
		director: "",
		genre: "",
		metascore: 0,
		description: ""
	});

	useEffect(() => {
		movies.map((element) => {
			if (element.id === id) setMovie(element);
		});
	}, []);

	const handleChange = (e) => {
        setMovie({
            ...movie,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`${baseURL}/${id}`, movie)
            .then(res=>{
				setFavoriteMovies([...favoriteMovies.filter(element => element.id !== id), movie]);
                setMovies(res.data);
                push(`/movies/${movie.id}`);
			})
			.catch(err=>{
				console.log(err);
			})
	}
	
	const { title, director, genre, metascore, description } = movie;

    return (
		<div className="col">
			<div className="modal-content">
				<form onSubmit={handleSubmit}>
					<div className="modal-header">						
						<h4 className="modal-title">Editing <strong>{title}</strong></h4>
					</div>
					<div className="modal-body">					
						<div className="form-group">
							<label>Title</label>
							<input 
								className="form-control"
								type="text" 
								name="title" 
								value={title} 
								onChange={handleChange} 
							/>
						</div>
						<div className="form-group">
							<label>Director</label>
							<input 
								className="form-control"
								type="text" 
								name="director" 
								value={director} 
								onChange={handleChange} 
							/>
						</div>
						<div className="form-group">
							<label>Genre</label>
							<input 
								className="form-control"
								type="text" 
								name="genre" 
								value={genre} 
								onChange={handleChange} 
							/>
						</div>
						<div className="form-group">
							<label>Metascore</label>
							<input 
								className="form-control"
								type="number" 
								name="metascore" 
								value={metascore} 
								onChange={handleChange} 
							/>
						</div>		
						<div className="form-group">
							<label>Description</label>
							<textarea 
								className="form-control"
								name="description" 
								value={description} 
								onChange={handleChange} 
							></textarea>
						</div>
										
					</div>
					<div className="modal-footer">			    
						<input type="submit" className="btn btn-info" value="Save"/>
						<Link to={`/movies/1`}>
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

export default EditMovieForm;