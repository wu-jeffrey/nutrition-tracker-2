import React from 'react';
import './home.css';
import Search from '../search/search.js'

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

function Home() {
  return (
    <div className="Home">
      <Card>
        <CardContent>
          Testtest
        </CardContent>
      </Card>

      <Search></Search>
    </div>
  );
}

export default Home;
