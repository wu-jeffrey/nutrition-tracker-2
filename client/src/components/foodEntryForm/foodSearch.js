import React, { useState } from 'react';
import {
  TextField,
  CircularProgress,
  Grid,
  Avatar,
  Table,
  TableRow,
  TableBody,
  TableCell,
} from '@material-ui/core';
import {
  Search,
} from '@material-ui/icons'


export function FoodSearch({ onFoodClicked }) {
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  function onSearch(event) {
    const value = event.target.value;
    // This is a hacky debounce, should replace it later
    if (value === '') {
      setSearchResults([])
    } else if (value.length > 2) {
      setLoading(true);

      (async () => {
        const response = await fetch(encodeURI(`/api/food-search/foods/${value}`));
        const results = await response.json();

        setSearchResults(results);
        setLoading(false);
      })();
    } else {
      setLoading(false);
    }
  }


  function onRowClicked(event, food) {
    if (food === undefined) return;

    (async () => {
      const response = await fetch(
        encodeURI(
          `/api/food-search/nutrition-facts/${food.isBranded}/${food.nixItemId || food.name}`
        )
      );
      const nutritionFacts = await response.json();

      if (typeof onFoodClicked === 'function') {
        // Callback
        const customEvent = new CustomEvent('foodClick');
        onFoodClicked(customEvent, nutritionFacts);
      }
    })();
  }

  return (
    <>
      <TextField
        label="Search Foods"
        margin="normal"
        fullWidth
        variant="outlined"
        onChange={onSearch}
        InputProps={{
          endAdornment: (
            <React.Fragment>
              {loading ? <CircularProgress color="inherit" size={20} /> : <Search />}
            </React.Fragment>
          ),
        }}
      />
      <div style={{ height: 300, overflowY: 'scroll' }}>
        {
          searchResults.length === 0 ? emptyState() : (
            <Table>
              <TableBody>
                {searchResults.map((result, i) => buildTableRow(result, i))}
              </TableBody>
            </Table>
          )
        }
      </div>
    </>

  )

  function buildTableRow(row, key) {
    return (
      <TableRow
        hover
        key={key}
        onClick={(e) => { onRowClicked(e, row) }}
      >
        <TableCell>
          {/* NOTE Avatar Child is fallback for null imageSrc */}
          <Avatar alt={row.name} src={row.imageSrc} >{row.name[0].toUpperCase()}</Avatar>
        </TableCell>

        <TableCell>{row.nameWithBrand || row.name}</TableCell>
      </TableRow>
    )
  }

  function emptyState() {
    return (
      <Grid container direction="column" justify="center" alignItems="center">
        <Grid item>
          No Search Results
        </Grid>
      </Grid >
    )
  }


}