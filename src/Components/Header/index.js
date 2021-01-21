import React from 'react';
import { useHistory } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';

const Header: React.Component = props => {
  const history = useHistory();

  return (
    <AppBar position="static">
      <Toolbar>
        <Grid container={true}>
          <Grid item={true} xs={2}>
            <Typography variant="h6">
              POKEAPP
            </Typography>
          </Grid>
          <Grid container={true} item={true} xs={6} alignItems="center">
            <SearchIcon />
            <InputBase style={{ width: '80%', color: '#fff', marginLeft: 10 }} placeholder="Search…" inputProps={{ 'aria-label': 'search' }} />
          </Grid>
          <Grid container={true} item={true} xs={4} justify="flex-end">
            <Button onClick={() => history.push('/')} color="inherit">POKEDEX</Button>
            <Button onClick={() => history.push('/my-pokemons')} color="inherit">MY POKEMONS</Button>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  )
}

export default Header;