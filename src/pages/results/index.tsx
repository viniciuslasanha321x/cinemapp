/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React, { useState, FormEvent, useCallback, useEffect } from 'react';
// import { useHistory } from 'react-router-dom';

import { useLocation } from 'react-router';
import Header from '../../components/header';
// import { addToLocalStorage } from '../../utils/LocalStorage';
import { api } from '../../services/api';
import * as S from './styles';
import Card from '../../components/card';

export interface IMovie {
  imdbID: string;
  Title: string;
  Year: string;
  Rated: string;
  Poster: string;
}

interface IMoviesResults {
  moviesResults: IMovie[];
}

const Results = (props: IMovie) => {
  const [movies, setMovies] = useState<IMovie[]>([]);

  const useQuery = useCallback(function useQuery() {
    return new URLSearchParams(useLocation().search);
  }, []);

  const params = useQuery();
  const query = params.get('query');

  async function handleGetMovies() {
    const { data } = await api.get(`/${query}`);

    setMovies(data.Search);
  }

  useEffect(() => {
    handleGetMovies();
  }, []);

  return (
    <>
      <Header />

      <S.Movies>
        {movies.map(eachMovie => (
          <Card movie={eachMovie} />
        ))}
      </S.Movies>
    </>
  );
};

export default Results;
