import React, { useEffect, useState } from "react";
import { Route, Switch, Redirect, useHistory } from "react-router-dom";
import axios from 'axios';

import MovieList from './components/MovieList';
import Movie from './components/Movie';
import MovieHeader from './components/MovieHeader';
import FavoriteMovieList from './components/FavoriteMovieList';
import EditMovieForm from './components/EditMovieForm';
import AddMovieForm from './components/AddMovieForm';
import DeleteMovieModal from './components/DeleteMovieModal';
import {baseURL} from './baseURL';

const App = (props) => {
  const {push} = useHistory();

  const [movies, setMovies] = useState([]);
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const [deleteWarning, setDeleteWarning] = useState(false);
  const [movie, setMovie] = useState('');

  useEffect(()=>{
    axios.get(baseURL)
      .then(res => {
        setMovies(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const deleteMovie = (id)=> {
    setDeleteWarning(false);
    axios.delete(`${baseURL}/${id}`)
      .then(res => {
        setFavoriteMovies(favoriteMovies.filter(element => element.id !== id));
        setMovies(res.data);
        push('/movies');
      })
      .catch(err => console.log(err));
  }

  const toggleWarning = () => {
    setDeleteWarning(!deleteWarning);
  }

  const addMovie = (movie) => {
    axios.post(baseURL, movie)
      .then(res => {
        setMovies(res.data);
        push('/movies');
      })
      .catch(err => console.log(err));
  }

  const addToFavorites = (newMovie) => {
    const found = favoriteMovies.find(element => newMovie.id === element.id);
    if (!found) setFavoriteMovies([...favoriteMovies, newMovie]);
  }

  return (
    <div>
      <nav className="navbar navbar-dark bg-dark">
        <span className="navbar-brand" > HTTP / CRUD Module Project</span>
      </nav>

      <div className="container">
        <MovieHeader/>
        <div className="row ">
          <FavoriteMovieList favoriteMovies={favoriteMovies} />

          <Switch>
            <Route path="/movies/add">
              <AddMovieForm addMovie={addMovie} />
            </Route>

            <Route path="/movies/edit/:id">
              <EditMovieForm 
                setMovies={setMovies} 
                movies={movies} 
                setFavoriteMovies={setFavoriteMovies} 
                favoriteMovies={favoriteMovies} 
              />
            </Route>

            <Route path="/movies/:id">
              {deleteWarning 
                ? <DeleteMovieModal 
                    deleteMovie={deleteMovie} 
                    movie={movie} toggleWarning={toggleWarning} 
                  /> 
                : <Movie
                    toggleWarning={toggleWarning} 
                    movie={movie} 
                    setMovie={setMovie} 
                    addToFavorites={addToFavorites} 
                  />}
            </Route>

            <Route path="/movies">
              <MovieList movies={movies}/>
            </Route>

            <Route path="/">
              <Redirect to="/movies"/>
            </Route>
          </Switch>
        </div>
      </div>
    </div>
  );
};


export default App;

