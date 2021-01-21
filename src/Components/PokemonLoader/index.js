import React, { useMemo, useEffect, useState } from 'react'
import axios from 'axios';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Chip from '@material-ui/core/Chip';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import Skeleton from '@material-ui/lab/Skeleton';

export const PokemonLoader = () => {
  return (
    <Card variant="outlined">
      <CardContent>
      <Grid container={true} spacing={2}>
        <Grid item={true} xs={4} sm={3} md={2} container={true} justify="center">
          <Skeleton width="60px" height="90px" />
        </Grid>
        <Grid container={true} item={true} xs={6} sm={6} md={8}>
          <Grid item={true} xs={12}>
            <Skeleton width="60px" />
          </Grid>
          <Grid item={true} xs={12}>
            <Skeleton width="200px" />
          </Grid>
          <Grid item={true} xs={12}>
            {[1, 2].map((index) => (
              <Chip style={{ marginRight: 5 }} key={index} size="small" label={<Skeleton width="40px" />} />
            ))}
          </Grid>
        </Grid>
        <Grid item={true} xs={2} sm={3} md={2} container={true} alignItems="center">
          <Skeleton width="80px" height="56px" />
        </Grid>
      </Grid>
      </CardContent>
    </Card>
  )
}

export default PokemonLoader