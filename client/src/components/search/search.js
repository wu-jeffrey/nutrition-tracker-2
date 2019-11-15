import React from 'react';
import './search.css';

import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import DirectionsIcon from '@material-ui/icons/Directions';

function Search() {
  return (
    <div className="Search">
      <Paper component="form">
        <InputBase
          placeholder="Search Food"
          inputProps={{ 'aria-label': 'search food' }}
        />
        <IconButton type="submit" aria-label="search">
          <SearchIcon />
        </IconButton>
      </Paper>
    </div>
  );
}

export default Search;
