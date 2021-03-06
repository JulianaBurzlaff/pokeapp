import { useEffect, useState, useMemo } from 'react'
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import Pagination from '@material-ui/lab/Pagination';
import Pokemon from '../../Components/Pokemon'
import Header from '../../Components/Header'
import { useCatchedPokemons } from '../../hooks/useCatchedPokemons';
import * as S from './styled';


const ENDPOINT = 'https://pokeapi.co/api/v2/pokemon?limit=1118'
const PAGE_LIMIT = 20;

function App(props) {
  const {
    catchPokemon,
    dropPokemon,
    isCatchedPokemon 
  } = useCatchedPokemons()
  const [searchValue, setSearchValue] = useState('')
  const [loading, setLoading] = useState(true)
  const [pokemons, setPokemons] = useState([])
  const [pages, setPages] = useState(0)
  const [page, setPage] = useState(0)

  function search() {
    axios.get(ENDPOINT).then(response => {
      const { count, results } = response.data;

      setPokemons(results);
      setPages(Math.ceil(count / PAGE_LIMIT))
      setLoading(false)
    });
  }

  useEffect(() => {
    search();
  }, [])
  
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

  const filteredPokemons = useMemo(() => {
    return pokemons.filter(pokemon => pokemon.name.includes(searchValue))
  }, [searchValue, pokemons])

  const pokemonList = useMemo(() => {
    const index = page * PAGE_LIMIT;
    const offset = index + PAGE_LIMIT;

    return filteredPokemons.slice(index, offset)
  }, [filteredPokemons, page])

  const onSearchChange = (event) => {
    const value = event.target.value
    const list = pokemons.filter(pokemon => pokemon.name.includes(value))

    setSearchValue(value)
    setPage(0)
    setPages(Math.ceil(list.length / PAGE_LIMIT))
  }

  return ( 
    <>
      <Header searchValue={searchValue} onSearchChange={onSearchChange} />
      <S.PokeList>
        {loading ? (
          <Grid container={true} alignItems="center" justify="center">
            <Box mt={10}>
              <CircularProgress size={80} />
            </Box>
          </Grid>
        ) : (
          <Grid container={true} spacing={2}>
            {pokemonList.map(({ url }) => (   
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
        )}
      </S.PokeList>
    </>
  );
}

export default App;