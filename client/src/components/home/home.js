import React from 'react';
import './home.css';
import Search from '../search/search.js'

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

function Home() {
  return (
    <div className="home">
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card className="card">Summary</Card>
        </Grid>
        <Grid item xs={5}>
          <Card className="card">List</Card>
        </Grid>
        
        <Grid container item xs={7} spacing={3}>
          {/* Food Search Card */}
          <Grid item xs={12}>
            <Card className="card">
              <CardContent>
                <Search></Search>
              </CardContent>
            </Card>
          </Grid>
          {/* Custom Macro Card */}
          <Grid item xs={12}>
            <Card className="card">Custom Macros</Card>
          </Grid>
        </Grid>
      </Grid>      
    </div>
  );
}

export default Home;
