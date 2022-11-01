import React, { useEffect, useState } from "react";
import { Route, Switch, Redirect, useHistory } from "react-router-dom";
import axios from 'axios';

import MovieList from './components/MovieList';
import Movie from './components/Movie';
import MovieHeader from './components/MovieHeader';
import FavoriteMovieList from './components/FavoriteMovieList';
import EditMovieForm from './components/EditMovieForm';
import AddMovieForm from './components/AddMovieForm';
import {baseURL} from './baseURL';

const App = (props) => {
  const {push} = useHistory();

  const [movies, setMovies] = useState([]);
  const [favoriteMovies, setFavoriteMovies] = useState([]);

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
    axios.delete(`${baseURL}/${id}`)
      .then(res => {
        setMovies(res.data);
        push('/movies');
      })
      .catch(err => console.log(err));
  }

  const addToFavorites = (movie) => {
    axios.post(baseURL, movie)
      .then(res => {
        setMovies(res.data);
        push('/movies');
      })
      .catch(err => console.log(err));
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
              <AddMovieForm addToFavorites={addToFavorites} />
            </Route>

            <Route path="/movies/edit/:id">
              <EditMovieForm setMovies={setMovies} movies={movies} />
            </Route>

            <Route path="/movies/:id">
              <Movie deleteMovie={deleteMovie} />
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

