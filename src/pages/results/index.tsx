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
  const [limit, setLimit] = useState(5);
  const [pages, setPages] = useState<number[]>([] as number[]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hitFive, setHitFive] = useState<number[]>([] as number[]);
  const [selectedPage, setSelectedPage] = useState<number>(0);

  const useQuery = useCallback(function useQuery() {
    return new URLSearchParams(useLocation().search);
  }, []);

  const params = useQuery();
  const query = params.get('query');

  async function handleGetMovies() {
    console.log(currentPage);

    const { data } = await api.get(
      `/${query}&page=${currentPage}&limit=${limit}`,
    );

    setTotal(data.totalResults);

    const totalPages =
      total % 10 ? Math.floor(total / 10) + 1 : Math.floor(total / 10);

    setLimit(totalPages);

    const arrayPages = [] as number[];

    for (let i = 1; i <= totalPages; i++) {
      arrayPages.push(i);
    }

    setPages(arrayPages);

    setMovies(data.Search);

    const parsedPages = pages.slice(selectedPage, selectedPage + 5);

    setHitFive(parsedPages as number[]);
  }

  useEffect(() => {
    handleGetMovies();
  }, [currentPage, total, hitFive]);

  const handleChangePage = useCallback(page => {
    setSelectedPage(page);
    setCurrentPage(page);
  }, []);

  const limits = useCallback(e => {
    setLimit(e.target.value);
    setCurrentPage(1);
  }, []);

  return (
    <>
      <Header />

      <S.Movies onChange={limits}>
        {movies.length ? (
          movies?.map(eachMovie => <Card movie={eachMovie} />)
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
            >
              {page}
            </S.PaginationTeste>
          ))}

          <S.PaginationTeste key={pages[pages.length]}>...</S.PaginationTeste>

          <S.PaginationTeste
            key={pages[pages.length - 1]}
            onClick={() => handleChangePage(pages[pages.length - 1])}
          >
            {pages[pages.length - 1]}
          </S.PaginationTeste>

          {currentPage < pages.length && (
            <S.PaginationItem
              disabled={currentPage === limit}
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
