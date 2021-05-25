/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, FormEvent, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import Header from '../../components/header';
import * as S from './styles';

export interface IMovie {
  imdbID: string;
  Title: string;
  Year: string;
  Rated: string;
  Poster: string;
}

interface ISearch {
  Search: IMovie[];
}

const Dashboard: React.FC = () => {
  const [newMovie, setNewMovie] = useState('');

  const history = useHistory();

  async function handleAddMovies(
    event: FormEvent<HTMLFormElement>,
  ): Promise<void> {
    event.preventDefault();
    history.push(`/results?query=${newMovie}`);
  }
  return (
    <>
      <Header />
      <S.Container>
        <S.Title>Qual filme você quer procurar?</S.Title>
        <S.Form onSubmit={handleAddMovies}>
          <input
            value={newMovie}
            onChange={e => setNewMovie(e.target.value)}
            type="text"
            placeholder="Coloque o nome do filme aqui"
          />
          <button type="submit">Pesquisar</button>
        </S.Form>
      </S.Container>
    </>
  );
};

export default Dashboard;
