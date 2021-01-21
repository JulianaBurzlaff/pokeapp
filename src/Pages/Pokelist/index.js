import { useEffect, useState, useMemo } from 'react'
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import Pagination from '@material-ui/lab/Pagination';
import Pokemon from '../../Components/Pokemon'
import Header from '../../Components/Header'
import * as S from './styled';

const ENDPOINT = 'https://pokeapi.co/api/v2/pokemon?limit=1118'
const PAGE_LIMIT = 20;

function App(props) {
  const [loading, setLoading] = useState(true)
  const [pokemons, setPokemons] = useState([])
  const [pages, setPages] = useState(0)
  const [page, setPage] = useState(0)

  function search() {
    const offset = (page - 1) * 20;

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

  const pokemonList = useMemo(() => {
    const index = page * PAGE_LIMIT;
    const offset = index + PAGE_LIMIT;

    return pokemons.slice(index, offset)
  }, [pokemons, page])

  return ( 
    <>
      <Header />
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
                <Pokemon url={url} buttonLabel="Catch!" />
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