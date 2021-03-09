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
        const foods = await response.json();

        // Response contains contains multiple (2 of em AFAICT) arrays of common and branded foods
        // First map and flat squashes both arrays into a single one then second map remaps keys to camel case
        const results = Object.keys(foods)
          .map((key) => foods[key])
          .flat()
          .map((food) => {
            return {
              name: food.food_name,
              brandName: food.brand_name,
              nameWithBrand: food.brand_name_item_name,
              nixItemId: food.nix_item_id,
              tagId: food.tag_id,
              imageSrc: food.photo?.thumb,
            };
          })

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
          `/api/food-search/nutrition-facts/${!!food.nixItemId}/${food.nixItemId || food.name}`
        )
      );
      const payload = await response.json();

      const fieldsMapping = {
        'food_name': 'name',
        'serving_qty': 'servingQty',
        'serving_unit': 'servingUnit',
        'serving_weight_grams': 'servingWeightGrams',
        'nf_calories': 'calories',
        'nf_protein': 'protein',
        'nf_total_carbohydrate': 'carbohydrate',
        'nf_total_fat': 'fat',
      };

      const nutritionFacts = Object.keys(payload.foods[0])
        .filter((key) => fieldsMapping[key]) // Filter out keys not in the mapping
        .reduce((acc, key) => {
          acc[fieldsMapping[key]] = payload.foods[0][key];
          return acc
        }, {});

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