import React, { useMemo, useEffect, useState } from 'react'
import axios from 'axios';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Chip from '@material-ui/core/Chip';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import { useCatchedPokemons } from '../../hooks/useCatchedPokemons';
import PokemonLoader from '../PokemonLoader';

export const Pokemon = ({ url, isCatchedPokemon, onButtonClick }) => {
  const [loading, setLoading] = useState(true)
  const [pokemon, setPokemon] = useState({})

  function fetchPokemon() { 
    axios.get(url).then(response => {
      setPokemon(response.data);
      setLoading(false)
    });
  }

  useEffect(() => {
    fetchPokemon();
  }, [])

  const image = useMemo(() => {
    const { front_default, other } = pokemon.sprites || {};

    if (front_default) {
      return front_default;
    }

    if (other && other['official-artwork'] && other['official-artwork'].front_default) {
      return other['official-artwork'].front_default
    }

    return 'http://www.pngall.com/wp-content/uploads/4/Pokemon-Pokeball-Transparent.png';
  }, [pokemon])

  return loading ? (
    <PokemonLoader />
  ) : (
    <Card variant="outlined">
      <CardContent>
      <Grid container={true} spacing={2}>
        <Grid item={true} xs={4} sm={3} md={2} container={true} justify="center">
          <img style={{ maxWidth: 96 }} src={image} alt={pokemon.name}/>
        </Grid>
        <Grid container={true} item={true} xs={6} sm={6} md={8}>
          <Grid item={true} xs={12}>
            #{pokemon.order}
          </Grid>
          <Grid item={true} xs={12}>
            <Typography variant="h6">{pokemon.name}</Typography>
          </Grid>
          <Grid item={true} xs={12}>
            {pokemon.types.map(({ type }) => (
              <Chip style={{ marginRight: 5 }} key={type.name} size="small" label={type.name} />
            ))}
          </Grid>
        </Grid>
        <Grid item={true} xs={2} sm={3} md={2} container={true} alignItems="center">
          <Button 
            onClick={() => onButtonClick(url)} 
            disabled={false}
            variant="contained"
            color="primary"
          >
            {isCatchedPokemon ? 'Drop it!' : 'Catch!'}
          </Button>
        </Grid>
      </Grid>
      </CardContent>
    </Card>
  )
}

export default Pokemon