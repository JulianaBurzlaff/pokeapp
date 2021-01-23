import { useEffect, useState, useMemo } from 'react'
import { useHistory } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Pagination from '@material-ui/lab/Pagination';
import Pokemon from '../../Components/Pokemon'
import Header from '../../Components/Header'
import { useCatchedPokemons } from '../../hooks/useCatchedPokemons';
import * as S from './styled';

const PAGE_LIMIT = 20;

function App(props) {
  const history = useHistory();
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
        {pokemonList.length > 0 ? (
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
        ) : (
          <Box mt={4}>
            <Grid container={true} spacing={2} justify="center">
              <Grid item={true} xs={12}>
                <Typography variant="h5" align="center">
                  You have no catched pokemons.
                </Typography>
              </Grid>
              <Grid container={true} item={true} xs={12} justify="center">
                <Button onClick={() => history.push('/')} variant="contained" color="primary">
                  Catch them!
                </Button>
              </Grid>
            </Grid>
          </Box>
        )}
      </S.PokeList>
    </>
  );
}

export default App;