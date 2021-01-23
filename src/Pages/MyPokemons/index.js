import { useEffect, useState, useMemo } from 'react'
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import Pagination from '@material-ui/lab/Pagination';
import Pokemon from '../../Components/Pokemon'
import Header from '../../Components/Header'
import { useCatchedPokemons } from '../../hooks/useCatchedPokemons';
import * as S from './styled';

const PAGE_LIMIT = 20;

function App(props) {
  const {
    catchedPokemons,
    catchPokemon,
    dropPokemon,
    isCatchedPokemon 
  } = useCatchedPokemons()
  const [pages, setPages] = useState(0)
  const [page, setPage] = useState(0)

  useEffect(() => {
    setPages(Math.ceil(catchedPokemons.length / PAGE_LIMIT))
  }, [catchedPokemons])
  
  const onPageChange = (event, page) => {
    setPage(page - 1);
  }

  const onButtonClick = (url) => {
    if (isCatchedPokemon(url)) {
      dropPokemon(url);
    } else {
      catchPokemon(url);
    }
  }

  const pokemonList = useMemo(() => {
    const index = page * PAGE_LIMIT;
    const offset = index + PAGE_LIMIT;

    return catchedPokemons.slice(index, offset)
  }, [catchedPokemons, page])

  return ( 
    <>
      <Header />
      <S.PokeList>
        <Grid container={true} spacing={2}>
          {pokemonList.map((url) => (   
            <Grid item={true} xs={12} key={url}>
              <Pokemon
                url={url}
                onButtonClick={onButtonClick}
                isCatchedPokemon={isCatchedPokemon(url)}
              />
            </Grid>
          ))}
          <Grid container={true} item={true} xs={12} justify="center">
            <Pagination onChange={onPageChange} count={pages} />
          </Grid>
        </Grid>
      </S.PokeList>
    </>
  );
}

export default App;