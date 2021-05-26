/* eslint-disable no-plusplus */
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
  const [total, setTotal] = useState(0);
  const [limit, setLimit] = useState(10);
  const [pages, setPages] = useState<number[]>([] as number[]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hitFive, setHitFive] = useState<number[]>([]);
  const [selectedPage, setSelectedPage] = useState<number>(0);

  const useQuery = useCallback(function useQuery() {
    return new URLSearchParams(useLocation().search);
  }, []);

  const params = useQuery();
  const query = params.get('query');

  const handleGetMovies = useCallback(async () => {
    console.log(currentPage);

    const { data } = await api.get(
      `/${query}&page=${currentPage}&limit=${limit}`,
    );

    setTotal(data.totalResults);

    const totalPages = Math.ceil(data.totalResults / limit);

    const arrayPages = [] as number[];

    let result = [];
    let intervalNumber = currentPage - 3;
    while (intervalNumber < currentPage + 3) {
      result.push(intervalNumber);
      intervalNumber++;
    }

    result = result.filter(
      pageNumber => pageNumber >= 1 && pageNumber < totalPages,
    );

    console.log(result);

    for (let i = 1; i <= totalPages; i++) {
      arrayPages.push(i);
    }

    setPages(arrayPages);

    setHitFive(result);

    setMovies(data.Search);
  }, [currentPage, limit, query]);

  useEffect(() => {
    handleGetMovies();
  }, [selectedPage, currentPage, handleGetMovies]);

  const handleChangePage = useCallback(page => {
    setSelectedPage(page);
    setCurrentPage(page);
  }, []);

  const limits = useCallback(e => {
    setLimit(e.target.value);
    setCurrentPage(1);
  }, []);

  console.log('pages.length', pages.length);

  return (
    <>
      <Header />

      <S.Movies onChange={limits}>
        {movies?.length ? (
          movies?.map(eachMovie => (
            <Card key={eachMovie.imdbID} movie={eachMovie} />
          ))
        ) : (
          <h1>carregando...</h1>
        )}
      </S.Movies>
      <S.Pagination>
        <S.PaginationButton>
          {currentPage > 1 && (
            <S.PaginationItem onClick={() => handleChangePage(currentPage - 1)}>
              Previous
            </S.PaginationItem>
          )}
          {hitFive.map(page => (
            <S.PaginationTeste
              key={page}
              onClick={() => handleChangePage(page)}
              isSelected={page === currentPage}
            >
              {page}
            </S.PaginationTeste>
          ))}

          <S.PaginationTeste key={pages[pages.length]}>...</S.PaginationTeste>

          <S.PaginationTeste
            key={pages[pages.length - 1]}
            onClick={() => handleChangePage(pages[pages.length - 1])}
            isSelected={pages[pages.length - 1] === currentPage}
          >
            {pages[pages.length - 1]}
          </S.PaginationTeste>

          {currentPage <= pages.length && (
            <S.PaginationItem
              disabled={currentPage === pages.length}
              onClick={() => handleChangePage(currentPage + 1)}
            >
              Next
            </S.PaginationItem>
          )}
        </S.PaginationButton>
      </S.Pagination>
    </>
  );
};

export default Results;
