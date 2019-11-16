import React from 'react';
import './home.css';
import Search from '../search/search.js'

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';

function Home() {
  return (
    <div className="home">
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card className="card">
            <CardContent>
              Stuff
            </CardContent>
          </Card>
        </Grid>

        {/* Left Column */}
        <Grid item xs={5}>
          <Card className="card">List</Card>
        </Grid>
        
        {/* Right Column */}
        <Grid item xs={7}>
          <Card className="card">
            <CardContent>
              <Search></Search>
            </CardContent>
          </Card>
        </Grid>
      </Grid>      
    </div>
  );
}

export default Home;
